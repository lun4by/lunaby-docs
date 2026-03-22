---
title: "Image Generation"
description: "Generate images from text prompts with automatic prompt enhancement."
section: "Core API"
order: 7
---

Generate images from text prompts. Lunaby API automatically **enhances prompts** before sending to the model for best results. Blacklisted content will be rejected.

## Endpoint

`POST /v1/images/generations`

## Request Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `prompt` | `string` | Yes | — | Image description. Prompt is automatically enhanced before sending to model. |
| `model` | `string` | No | `lunaby-vision` | Image generation model. |
| `aspect_ratio` | `string` | No | `1:1` | Aspect ratio: '1:1' \| '16:9' \| '9:16' \| '4:3' \| '3:4' \| '21:9'. |
| `output_format` | `string` | No | `png` | Output format: 'png' \| 'jpeg' \| 'webp'. |
| `seed` | `integer` | No | — | Seed for reproducible results. |
| `negative_prompt` | `string` | No | — | Describe what should NOT appear in the image. |

## Example — Save to file (Node.js)

```typescript
import Lunaby from 'lunaby-sdk';
import fs from 'fs';

const client = new Lunaby({ apiKey: process.env.LUNABY_API_KEY });

const result = await client.images.generateBuffer(
  'A beautiful Vietnamese landscape at golden hour',
  {
    aspect_ratio: '16:9',
    output_format: 'png',
    negative_prompt: 'blurry, low quality, dark',
    seed: 42,
  }
);

fs.writeFileSync('output.png', result.buffer);
console.log('Saved!');
console.log('Revised prompt:', result.revisedPrompt);
console.log('Tokens:', result.usage?.total_tokens);
```

## Example — Get Base64

```typescript
const response = await client.images.generate(
  'A cute cat sitting on a keyboard',
  { aspect_ratio: '1:1' }
);

const b64 = response.data.data[0].b64_json;
const revised = response.data.data[0].revised_prompt;

// Use in HTML img tag
const imgSrc = `data:image/png;base64,${b64}`;
```

## cURL

```bash
curl https://api.lunie.dev/v1/images/generations \
  -H "Authorization: Bearer $LUNABY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A beautiful sunset over the city",
    "aspect_ratio": "16:9",
    "output_format": "png"
  }'
```

## Response

```json
{
  "created": 1742500000,
  "data": [{
    "b64_json": "iVBORw0KGgo...",
    "revised_prompt": "A stunning cinematic sunset over the cityscape..."
  }],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 0,
    "total_tokens": 12
  }
}
```

> **Content Policy:** Prompts that violate safety policies will receive a `400` error with the message *"Request contains disallowed content"*.
