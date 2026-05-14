#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), '..');

const requiredFiles = [
  'README.md',
  '.env.example',
  'LICENSE',
  'LICENSE_TEMPLATE.txt',
  'workflow/ai-morning-os-template.json',
  'docs/INSTALLATION.md',
  'docs/CONFIGURATION.md',
  'docs/TROUBLESHOOTING.md',
  'docs/QUALITY_CHECKLIST.md',
  'docs/CUSTOMER_HANDOFF_NOTE.md',
  'docs/MARKETPLACE_LISTING.md',
];

const forbiddenFiles = [
  'docs/KURULUM.md',
  'docs/DEGISTIRILECEK_ALANLAR.md',
  'docs/SORUN_GIDERME.md',
  'docs/MUSTERIYE_GONDERILECEK_NOT.md',
];

const textFiles = requiredFiles.filter((file) => !file.endsWith('.json'));
const turkishCharacterPattern = new RegExp('[\\u011f\\u011e\\u00fc\\u00dc\\u015f\\u015e\\u0131\\u0130\\u00f6\\u00d6\\u00e7\\u00c7]');
const secretPattern = /\bgsk_[A-Za-z0-9_-]{20,}\b/;

const fail = (message) => {
  console.error(`Validation failed: ${message}`);
  process.exit(1);
};

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

for (const file of requiredFiles) {
  if (!exists(file)) fail(`missing required file: ${file}`);
}

for (const file of forbiddenFiles) {
  if (exists(file)) fail(`old Turkish file still exists: ${file}`);
}

for (const file of textFiles) {
  const content = read(file);
  if (turkishCharacterPattern.test(content)) fail(`Turkish characters remain in ${file}`);
  if (secretPattern.test(content)) fail(`possible Groq API key leaked in ${file}`);
}

const workflowText = read('workflow/ai-morning-os-template.json');
if (turkishCharacterPattern.test(workflowText)) fail('Turkish characters remain in workflow JSON');
if (secretPattern.test(workflowText)) fail('possible Groq API key leaked in workflow JSON');

let workflow;
try {
  workflow = JSON.parse(workflowText);
} catch (error) {
  fail(`workflow JSON is invalid: ${error.message}`);
}

if (workflow.active !== false) fail('workflow must be inactive by default');
if (!Array.isArray(workflow.nodes) || workflow.nodes.length === 0) fail('workflow has no nodes');
if (!workflow.connections || typeof workflow.connections !== 'object') fail('workflow has no connections');

const nodeNames = new Set();
for (const node of workflow.nodes) {
  if (!node.name) fail('workflow contains a node without a name');
  if (nodeNames.has(node.name)) fail(`duplicate node name: ${node.name}`);
  nodeNames.add(node.name);

  const code = node.parameters?.jsCode;
  if (code) {
    try {
      new Function(code);
    } catch (error) {
      fail(`code syntax error in node "${node.name}": ${error.message}`);
    }
  }
}

for (const [sourceName, outputs] of Object.entries(workflow.connections)) {
  if (!nodeNames.has(sourceName)) fail(`connection source does not exist: ${sourceName}`);
  const mainOutputs = outputs.main ?? [];
  for (const output of mainOutputs) {
    for (const connection of output) {
      if (!nodeNames.has(connection.node)) {
        fail(`connection target does not exist: ${connection.node}`);
      }
    }
  }
}

const requiredNodeNames = [
  'USER CONFIG - EDIT ME',
  'Validate Config',
  'Fetch Weather',
  'Normalize Weather',
  'Read Tech RSS',
  'Read Jobs RSS',
  'Build AI Prompt',
  'Generate Briefing (Groq)',
  'Format Notification',
  'Send ntfy Notification',
];

for (const nodeName of requiredNodeNames) {
  if (!nodeNames.has(nodeName)) fail(`required node missing: ${nodeName}`);
}

const readme = read('README.md');
for (const file of requiredFiles.filter((file) => file.startsWith('docs/'))) {
  if (!readme.includes(file)) fail(`README does not reference ${file}`);
}

console.log('Package validation passed.');
