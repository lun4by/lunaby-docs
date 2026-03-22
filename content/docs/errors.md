---
title: "Error Handling"
description: "SDK error classes, HTTP error codes, and retry behavior."
section: "SDK Reference"
order: 9
---

The SDK exports comprehensive error classes. Use `instanceof` to handle each error type. The SDK automatically retries with exponential backoff for `408, 429, 500–504` errors.

## Error Classes

| Class | HTTP | Description |
| --- | --- | --- |
| `AuthenticationError` | 401 | Invalid API key or missing Authorization header. |
| `RateLimitError` | 429 | Rate limit exceeded. SDK auto-retries. Read `error.retryAfter` (seconds). |
| `TimeoutError` | — | Request exceeded timeout (default 120s). |
| `AbortError` | — | Request was manually cancelled via AbortController. |
| `ContentFilterError` | 400 | Content was blocked by the safety filter. See `error.categories`. |
| `ConnectionError` | 503 | Could not connect to server. SDK retries 2 times. |
| `ValidationError` | — | Invalid input, thrown on the client before sending the request. |
| `StreamError` | — | Error occurred while reading the SSE stream. |
| `APIError` | — | Other HTTP errors (400, 403, 404, 500...). |

## Full Example

```typescript
import Lunaby, {
  AuthenticationError,
  RateLimitError,
  TimeoutError,
  AbortError,
  ContentFilterError,
  ConnectionError,
  ValidationError,
  StreamError,
  APIError,
} from 'lunaby-sdk';

const client = new Lunaby({ apiKey: process.env.LUNABY_API_KEY });

try {
  const response = await client.chat.create([
    { role: 'user', content: 'Hello!' }
  ]);
  console.log(response.data.choices[0].message.content);

} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key');

  } else if (error instanceof RateLimitError) {
    console.error(`Rate limited. Retry after ${error.retryAfter}s`);

  } else if (error instanceof TimeoutError) {
    console.error('Request timeout — increase timeout if needed');

  } else if (error instanceof ContentFilterError) {
    console.error('Content blocked:', error.categories);

  } else if (error instanceof AbortError) {
    console.log('Request was cancelled');

  } else if (error instanceof ConnectionError) {
    console.error('Cannot connect to server');

  } else if (error instanceof ValidationError) {
    console.error('Invalid input:', error.message);

  } else if (error instanceof APIError) {
    console.error(`API Error ${error.status}: ${error.message}`);
  }
}
```

## HTTP Error Reference

| Code | Description | Auto Retry? |
| --- | --- | --- |
| `400` | Bad Request — missing field or invalid format | No |
| `401` | Unauthorized — invalid or missing API key | No |
| `403` | Forbidden — key deactivated | No |
| `404` | Not Found — endpoint does not exist | No |
| `408` | Request Timeout | Yes |
| `429` | Rate Limit Exceeded | Yes |
| `500` | Internal Server Error | Yes |
| `502/503/504` | Service Unavailable | Yes |
