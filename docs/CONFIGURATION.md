# Configuration Reference

All buyer-facing settings are inside **USER CONFIG - EDIT ME**.

| Field | Purpose | Recommended Example |
| --- | --- | --- |
| `user_name` | Name used in the briefing greeting. | `Alex` |
| `city_name` | Display name for the weather section. | `Istanbul` |
| `weather_latitude` | Latitude used by Open-Meteo. | `41.0082` |
| `weather_longitude` | Longitude used by Open-Meteo. | `28.9784` |
| `user_profile` | Personalization context for the AI briefing. | `Product leader focused on AI tools, SaaS growth, and remote teams` |
| `output_language` | Language for the final notification. | `English` |
| `tech_rss_url` | RSS feed for technology news. | `https://techcrunch.com/feed/` |
| `jobs_rss_url` | RSS feed for career or job opportunities. | `https://weworkremotely.com/categories/remote-programming-jobs.rss` |
| `ntfy_topic` | Private ntfy topic that receives the notification. | `morning-os-alex-2026-private` |
| `ntfy_title` | Notification title shown by ntfy. | `AI Morning OS` |
| `ntfy_priority` | ntfy priority value. | `default` |
| `ntfy_tags` | Comma-separated ntfy tags. | `sunrise,briefing,ai` |
| `groq_api_key` | Buyer-owned Groq API key. | `gsk_...` |
| `groq_model` | Groq model used for the briefing. | `llama-3.3-70b-versatile` |
| `ai_temperature` | Creativity level for the model. | `0.6` |
| `max_words` | Maximum length requested in the prompt. | `220` |
| `max_completion_tokens` | Maximum model output budget. | `700` |

## Required Changes

Change these before the first test:

- `user_name`
- `city_name`
- `weather_latitude`
- `weather_longitude`
- `user_profile`
- `tech_rss_url`
- `jobs_rss_url`
- `ntfy_topic`
- `groq_api_key`

## Advanced Tuning

Use `ai_temperature` between `0.4` and `0.8` for a professional daily briefing. Lower values make the output more consistent. Higher values make it more varied.

Use `max_words` to control notification length. A range of `180` to `260` works well for mobile notifications.

Use `groq_model` only with a model available in your Groq account. The default is selected for production reliability and high-quality writing.

## Schedule Setting

The run time is configured in **Schedule Trigger**, not in **USER CONFIG - EDIT ME**.
