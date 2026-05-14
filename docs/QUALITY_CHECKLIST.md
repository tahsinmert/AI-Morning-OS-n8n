# Quality Checklist

Use this checklist before selling or delivering the package.

## Package Hygiene

- `node tools/validate-package.mjs` passes.
- No real API keys are included.
- No personal ntfy topics are included.
- No n8n credentials are included.
- No execution data is pinned in the workflow.
- All customer-facing text is in English.
- All documentation links point to existing files.

## Workflow Import

- `workflow/ai-morning-os-template.json` imports into n8n.
- The workflow imports as inactive.
- **README - SETUP** is visible and clear.
- **USER CONFIG - EDIT ME** contains only safe placeholders.

## Configuration Test

- Placeholder config values trigger a clear validation error.
- Real config values pass **Validate Config**.
- Invalid coordinates trigger a validation error.
- Invalid RSS URLs trigger a validation error.

## Runtime Test

- **Fetch Weather** returns weather data or a fallback.
- **Read Tech RSS** returns an item or the briefing continues with a fallback.
- **Read Jobs RSS** returns an item or the briefing continues with a fallback.
- **Generate Briefing (Groq)** returns a concise final briefing.
- **Send ntfy Notification** sends the final message to the right topic.

## Buyer Acceptance Criteria

- The buyer can import the workflow without editing JSON.
- The buyer only needs to edit **USER CONFIG - EDIT ME** and **Schedule Trigger**.
- The first manual test provides clear success or clear next action.
- The notification is readable on mobile.
- Links remain unchanged and clickable.
