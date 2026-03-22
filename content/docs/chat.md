---
title: "Chat Completions"
description: "Create AI model responses from a conversation. Supports both non-streaming and streaming (SSE)."
section: "Core API"
order: 5
---

Create model responses from a conversation. Supports both non-streaming and streaming (SSE). Requires API key authentication.

## Endpoint

`POST /v1/chat/completions`

## Request Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `messages` | `ChatMessage[]` | Yes | — | Array of messages. Each item has `role` ('system' \| 'user' \| 'assistant') and `content` (string). |
| `model` | `string` | No | `lunaby-pro` | Model ID to use. |
| `max_tokens` | `integer` | No | — | Maximum tokens in the response. |
| `temperature` | `float` | No | `1` | Creativity from 0 to 2. Higher = more random. |
| `top_p` | `float` | No | `1` | Nucleus sampling. Alternative to temperature. |
| `stream` | `boolean` | No | `false` | Enable streaming SSE response. |
| `stop` | `string \| string[]` | No | — | String or array of strings to stop generation. |
| `presence_penalty` | `float` | No | `0` | Penalize tokens that have appeared, -2.0 to 2.0. |
| `frequency_penalty` | `float` | No | `0` | Penalize frequent tokens, -2.0 to 2.0. |
| `user` | `string` | No | — | User ID for tracking. |

## Example — Non-streaming

```typescript
import Lunaby from 'lunaby-sdk';

const client = new Lunaby({ apiKey: process.env.LUNABY_API_KEY });

const response = await client.chat.create([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'What is TypeScript?' }
], {
  model: 'lunaby-pro',
  temperature: 0.7,
  max_tokens: 1024,
});

console.log(response.data.choices[0].message.content);
console.log('Tokens:', response.data.usage.total_tokens);
```

## Example — cURL

```bash
curl https://api.lunie.dev/v1/chat/completions \
  -H "Authorization: Bearer $LUNABY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "lunaby-pro",
    "messages": [
      { "role": "system", "content": "You are a helpful assistant." },
      { "role": "user", "content": "What is TypeScript?" }
    ],
    "temperature": 0.7
  }'
```

## Response

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1742500000,
  "model": "lunaby-pro",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "TypeScript is a programming language..."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}
```

## Multi-turn Conversation

```typescript
import type { ChatMessage } from 'lunaby-sdk';

const messages: ChatMessage[] = [
  { role: 'system', content: 'You are a math tutor.' }
];

// Turn 1
messages.push({ role: 'user', content: 'What is 2 + 2?' });
let res = await client.chat.create(messages);
const answer1 = res.data.choices[0].message.content;
messages.push({ role: 'assistant', content: answer1 });

// Turn 2
messages.push({ role: 'user', content: 'Multiply that result by 3?' });
res = await client.chat.create(messages);
console.log(res.data.choices[0].message.content);
```
