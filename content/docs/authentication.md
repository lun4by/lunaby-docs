---
title: "Authentication"
description: "Learn how to authenticate with the Lunaby API using Bearer tokens."
section: "Getting Started"
order: 3
---

Lunaby API uses **Bearer Token** authentication. Every request to `/v1/` must include an `Authorization` header.

## API Key

```http
Authorization: Bearer YOUR_API_KEY
```

API keys are created via the Admin Dashboard. Keys do not expire but can be deactivated or deleted by an admin at any time.

## Environment Variables

The SDK automatically reads from environment variables:

```env
LUNABY_API_KEY=your_api_key_here
LUNABY_BASE_URL=https://api.lunie.dev/v1   # optional
```

## Direct Configuration

```typescript
const client = new Lunaby({
  apiKey: 'your-api-key',   // or process.env.LUNABY_API_KEY
});
```

## Authentication Errors

| HTTP Code | Cause                      |
| --------- | -------------------------- |
| `401`     | Missing or invalid API key |
| `403`     | Key has been deactivated   |

## Security Best Practices

- Never commit API keys to source code or Git repositories
- Always use environment variables or a secret manager
- Create separate keys for each environment (dev / staging / production)
