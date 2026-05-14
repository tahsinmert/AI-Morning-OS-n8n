# Troubleshooting Guide

## No Notification Arrives

- Confirm `ntfy_topic` exactly matches the topic subscribed in ntfy.
- Do not use spaces in the topic name.
- Check **Send ntfy Notification** for an HTTP success response.
- Confirm the workflow is active if you are testing the scheduled run.

## Validate Config Fails

The workflow checks important fields before making external API calls.

Common causes:

- `groq_api_key` still contains the placeholder value.
- `ntfy_topic` still contains `CHANGE_ME`.
- Latitude or longitude is outside a valid range.
- RSS URLs do not start with `http://` or `https://`.
- `ai_temperature`, `max_words`, or `max_completion_tokens` is not numeric.

Fix the value in **USER CONFIG - EDIT ME** and run the workflow again.

## Groq AI Fails

- Confirm the API key is correct and active.
- Confirm the model in `groq_model` is available in your Groq account.
- Check your Groq usage limits, billing status, and project permissions.
- Lower `max_completion_tokens` if your account is hitting output limits.

If Groq returns an error, the workflow sends a short diagnostic notification instead of silently failing.

## Weather Looks Wrong

- `city_name` is only a label in the notification.
- Weather data is fetched from `weather_latitude` and `weather_longitude`.
- Confirm the coordinates match the intended city.

## RSS Feed Is Empty

- Open the RSS URL in a browser and confirm it returns XML/RSS data.
- Some sites block RSS access from automation platforms.
- Replace the feed with a more reliable source.

If a feed is empty or temporarily unavailable, the briefing continues with a clear fallback line.

## The Schedule Runs at the Wrong Time

- Check the n8n timezone setting.
- For self-hosted n8n, check the server timezone.
- Re-save **Schedule Trigger** after changing timezone settings.

## The Briefing Is Too Long

- Lower `max_words`.
- Lower `max_completion_tokens`.
- Use a lower `ai_temperature`, such as `0.4` or `0.5`.

## Import Fails

- Confirm you are importing `workflow/ai-morning-os-template.json`.
- Confirm the file was not edited by a rich text editor.
- Try importing into a current n8n version.
