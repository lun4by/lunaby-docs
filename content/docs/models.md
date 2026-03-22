---
title: "Models"
description: "Available AI models in the Lunaby API."
section: "Core API"
order: 4
---

Lunaby API provides 3 models. Use the `model` parameter to select one.

## Available Models

| Model ID | Type | Description | Use Cases |
| --- | --- | --- | --- |
| `lunaby` | Default | General-purpose chat model. Good balance of speed and quality. | Chatbot, Q&A, summarization, translation |
| `lunaby-pro` | Advanced | Optimized for complex tasks and multi-step reasoning. | Math, coding, logic, step-by-step analysis |
| `lunaby-vision` | Image | Image generation from text prompts. | Image generation, creative visuals |

## List Models

```bash
curl https://api.lunie.dev/v1/chat/models \
  -H "Authorization: Bearer $LUNABY_API_KEY"
```

```json
{
  "object": "list",
  "data": [
    { "id": "lunaby",         "object": "model", "owned_by": "s4ory" },
    { "id": "lunaby-pro",     "object": "model", "owned_by": "s4ory" },
    { "id": "lunaby-vision",  "object": "model", "owned_by": "s4ory" }
  ]
}
```
