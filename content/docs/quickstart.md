---
title: "Quick Start"
description: "Send your first request to Lunaby API in minutes."
section: "Getting Started"
order: 2
---

## Step 1 — Get an API Key

Sign in to the [Lunaby Dashboard](https://api.lunie.dev) → Admin Panel → Create a new API key. The key is shown only once, so save it immediately.

## Step 2 — Install the SDK

```bash
npm install lunaby-sdk
```

## Step 3 — Set your API Key

```env
LUNABY_API_KEY=your_api_key_here
```

## Step 4 — Send your first request

```typescript
import Lunaby from 'lunaby-sdk';

const client = new Lunaby({
  apiKey: process.env.LUNABY_API_KEY,
});

const response = await client.chat.create([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Hello!' }
]);

console.log(response.data.choices[0].message.content);
console.log('Tokens:', response.data.usage.total_tokens);
```

## Or use cURL

```bash
curl https://api.lunie.dev/v1/chat/completions \
  -H "Authorization: Bearer $LUNABY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "lunaby-pro",
    "messages": [
      { "role": "user", "content": "Hello!" }
    ]
  }'
```

> **You are all set!** Continue to [Chat API](/docs/chat) or [Image Generation](/docs/images) to explore more.
