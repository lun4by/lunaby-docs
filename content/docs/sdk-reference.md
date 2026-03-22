---
title: "SDK Overview"
description: "TypeScript-first SDK with full type definitions, streaming support, and comprehensive error handling."
section: "SDK Reference"
order: 8
---

`lunaby-sdk` is a TypeScript-first SDK with full type definitions, ESM + CJS support, streaming with async iterators, and comprehensive error handling.

## Installation

```bash
npm install lunaby-sdk
```

## Client Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | `string` | `env.LUNABY_API_KEY` | API key. Defaults to `process.env.LUNABY_API_KEY`. |
| `baseURL` | `string` | `https://api.lunie.dev/v1` | Base URL of the API. |
| `timeout` | `number` | `120000` | Timeout per request (ms). |
| `maxRetries` | `number` | `2` | Maximum retry count. |
| `defaultModel` | `Model` | `lunaby-pro` | Model used when none is specified. |
| `defaultHeaders` | `Record<string, string>` | — | Additional headers for every request. |
| `fetch` | `FetchFunction` | — | Custom fetch implementation (optional). |

## client.chat.create()

```typescript
// Signature
create(
  messages: ChatMessage[],
  options?: CreateChatCompletionOptions
): Promise<ChatResponse<ChatCompletionResponse>>

// Example
const res = await client.chat.create(messages, {
  model: 'lunaby-pro',
  max_tokens: 1024,
  temperature: 0.7,
  signal: abortController.signal, // optional
  timeout: 30000,                  // optional override
});

// Access data
res.data.choices[0].message.content
res.data.usage.total_tokens
res.status        // HTTP status code
res.getHeader('x-request-id')
res.getRateLimitInfo()  // { limit, remaining, reset }
```

## client.chat.stream()

```typescript
// Async generator — simplest approach
for await (const chunk of client.chat.stream(messages, options)) {
  const content = chunk.choices[0].delta.content;
  if (content) process.stdout.write(content);
}
```

## client.chat.createStream()

```typescript
// Returns ChatStream object with multiple methods
const stream = await client.chat.createStream(messages, options);

// Properties
stream.fullContent  // string — accumulated content
stream.usage        // TokenUsage | undefined

// Methods
stream.abort()                    // Cancel stream
await stream.toContent()          // Collect all → string
await stream.toArray()            // Collect all → ChatCompletionChunk[]
await stream.process({ onContent, onDone, onError, onChunk })
```

## client.images.generate()

```typescript
const res = await client.images.generate(prompt, {
  model: 'lunaby-vision',
  aspect_ratio: '16:9',  // '1:1'|'16:9'|'9:16'|'4:3'|'3:4'|'21:9'
  output_format: 'png',  // 'png'|'jpeg'|'webp'
  seed: 42,
  negative_prompt: 'blurry',
});

res.data.data[0].b64_json       // base64 string
res.data.data[0].revised_prompt // enhanced prompt
```

## client.images.generateBuffer()

```typescript
// Shortcut returning a Buffer directly (Node.js)
const { buffer, revisedPrompt, usage } = await client.images.generateBuffer(
  prompt,
  options
);

import fs from 'fs';
fs.writeFileSync('output.png', buffer);
```

## TypeScript Types

```typescript
import type {
  // Messages
  ChatMessage,           // { role, content, name? }
  MessageRole,           // 'system' | 'user' | 'assistant'

  // Requests
  ChatCompletionRequest,
  ImageGenerationRequest,

  // Responses
  ChatCompletionResponse,
  ChatCompletionChunk,
  ImageGenerationResponse,
  ImageData,
  TokenUsage,

  // Config
  Model,        // 'lunaby-pro' | 'lunaby-reasoning' | 'lunaby-vision' | string
  AspectRatio,  // '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '21:9'
  OutputFormat, // 'png' | 'jpeg' | 'webp'
  LunabyClientOptions,
  RequestOptions,
} from 'lunaby-sdk';
```

## Environment Variables

```bash
LUNABY_API_KEY=your_api_key_here
LUNABY_BASE_URL=https://api.lunie.dev/v1   # optional
```
