# Installation Guide

Follow these steps after receiving the package.

## 1. Prepare Your Accounts

You need:

- An n8n Cloud account or a self-hosted n8n instance.
- A Groq API key.
- ntfy installed on your phone, desktop, or browser.
- A private ntfy topic name that is hard to guess.
- Your city name, latitude, and longitude.
- One technology RSS feed URL and one career RSS feed URL.

## 2. Import the Workflow

1. Open n8n.
2. Go to **Workflows**.
3. Create a new workflow or use **Import from File**.
4. Select `workflow/ai-morning-os-template.json`.

The workflow imports as inactive. Do not activate it before testing.

## 3. Configure USER CONFIG

Open **USER CONFIG - EDIT ME** and replace all placeholder values.

Minimum required fields:

- `user_name`
- `city_name`
- `weather_latitude`
- `weather_longitude`
- `user_profile`
- `tech_rss_url`
- `jobs_rss_url`
- `ntfy_topic`
- `groq_api_key`

Recommended optional fields:

- `output_language`
- `ntfy_title`
- `ntfy_priority`
- `ntfy_tags`
- `groq_model`
- `ai_temperature`
- `max_words`
- `max_completion_tokens`

See `docs/CONFIGURATION.md` for every field.

## 4. Create Your ntfy Topic

1. Open ntfy.
2. Subscribe to a private topic name.
3. Use a unique topic with no spaces.
4. Paste the same topic into `ntfy_topic`.

Recommended format:

```text
morning-os-yourname-2026-private
```

## 5. Add Your Groq API Key

1. Open your Groq dashboard.
2. Create or copy an API key.
3. Paste it into `groq_api_key`.

Keep the API key private. Do not publish screenshots that expose it.

## 6. Set the Schedule

Open **Schedule Trigger** and choose the time you want the briefing to run.

If you use self-hosted n8n, confirm the server timezone before activating the workflow.

## 7. Run a Manual Test

1. Click **Execute workflow**.
2. Confirm these nodes complete successfully:
   - **Validate Config**
   - **Fetch Weather**
   - **Read Tech RSS**
   - **Read Jobs RSS**
   - **Generate Briefing (Groq)**
   - **Send ntfy Notification**
3. Confirm the notification arrives in ntfy.
4. Review the wording and links.

## 8. Activate

Activate the workflow only after the manual test succeeds.

For commercial delivery, complete `docs/QUALITY_CHECKLIST.md` before sending the package to a buyer.
