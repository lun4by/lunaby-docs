---
title: "Streaming"
description: "Real-time streaming responses using Server-Sent Events (SSE)."
section: "Core API"
order: 6
---

When `stream: true`, the server sends responses as **Server-Sent Events (SSE)**. The SDK provides 3 ways to handle streams.

## Endpoint

`POST /v1/chat/completions`

## Method 1 — Async Iterator (simplest)

```typescript
for await (const chunk of client.chat.stream([
  { role: 'user', content: 'Tell me a short story' }
])) {
  const content = chunk.choices[0].delta.content;
  if (content) process.stdout.write(content);
}
```

## Method 2 — Callbacks

```typescript
const stream = await client.chat.createStream([
  { role: 'user', content: 'Count from 1 to 10' }
]);

await stream.process({
  onChunk: (chunk) => {
    // Receive the full chunk object
  },
  onContent: (content, accumulated) => {
    process.stdout.write(content);
  },
  onDone: (fullContent, usage) => {
    console.log('\nTokens:', usage?.total_tokens);
  },
  onError: (error) => {
    console.error('Stream error:', error);
  }
});
```

## Method 3 — Collect all

```typescript
const stream = await client.chat.createStream([
  { role: 'user', content: 'Summarize the history of Vietnam' }
]);

// Wait until stream completes
const fullContent = await stream.toContent();
console.log(fullContent);

// Or collect as array of chunks
const chunks = await stream.toArray();
```

## Abort Stream

```typescript
const stream = await client.chat.createStream(messages);

// Cancel stream at any time
setTimeout(() => stream.abort(), 3000);

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0].delta.content ?? '');
}
```

## Raw SSE (cURL)

```bash
curl https://api.lunie.dev/v1/chat/completions \
  -H "Authorization: Bearer $LUNABY_API_KEY" \
  -H "Content-Type: application/json" \
  --no-buffer \
  -d '{
    "model": "lunaby-pro",
    "messages": [{ "role": "user", "content": "Hello!" }],
    "stream": true
  }'
```

```text
data: {"id":"chatcmpl-abc","object":"chat.completion.chunk","choices":[{"delta":{"content":"Hello"},"index":0}]}

data: {"id":"chatcmpl-abc","object":"chat.completion.chunk","choices":[{"delta":{"content":"!"},"index":0}]}

data: [DONE]
```
