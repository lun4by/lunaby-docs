import { CodeBlock } from "@/components/code-block";
import { ParamTable } from "@/components/param-table";
import { EndpointBadge } from "@/components/endpoint-badge";

const IMAGE_PARAMS = [
    { name: "prompt", type: "string", required: true, description: "Mô tả ảnh cần tạo. Prompt được tự động enhance trước khi gửi đến model." },
    { name: "model", type: "string", description: "Model sinh ảnh.", default: "lunaby-vision" },
    { name: "aspect_ratio", type: "string", description: "Tỉ lệ khung hình: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '21:9'.", default: "1:1" },
    { name: "output_format", type: "string", description: "Định dạng ảnh: 'png' | 'jpeg' | 'webp'.", default: "png" },
    { name: "seed", type: "integer", description: "Seed cho kết quả reproducible." },
    { name: "negative_prompt", type: "string", description: "Mô tả những gì KHÔNG muốn xuất hiện trong ảnh." },
];

export default function ImagesPage() {
    return (
        <div className="prose">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-2">Core API</p>
            <h1>Image Generation</h1>
            <p>
                Sinh ảnh từ text prompt. Lunaby API tự động <strong>enhance prompt</strong> trước khi
                gửi tới model để cho kết quả tốt nhất. Content bị blacklist sẽ bị từ chối.
            </p>

            <EndpointBadge method="POST" path="/v1/images/generations" />

            <h2>Request Parameters</h2>
            <ParamTable params={IMAGE_PARAMS} />

            <h2>Ví dụ — Lưu file (Node.js)</h2>
            <CodeBlock
                filename="generate-image.ts"
                language="typescript"
                code={`import Lunaby from 'lunaby-sdk';
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
console.log('Tokens:', result.usage?.total_tokens);`}
            />

            <h2>Ví dụ — Lấy Base64</h2>
            <CodeBlock
                language="typescript"
                code={`const response = await client.images.generate(
  'A cute cat sitting on a keyboard',
  { aspect_ratio: '1:1' }
);

const b64 = response.data.data[0].b64_json;
const revised = response.data.data[0].revised_prompt;

// Dùng trong HTML img tag
const imgSrc = \`data:image/png;base64,\${b64}\`;`}
            />

            <h2>cURL</h2>
            <CodeBlock
                language="bash"
                code={`curl https://api.lunie.dev/v1/images/generations \\
  -H "Authorization: Bearer $LUNABY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A beautiful sunset over Hà Nội",
    "aspect_ratio": "16:9",
    "output_format": "png"
  }'`}
            />

            <h2>Response</h2>
            <CodeBlock
                language="json"
                code={`{
  "created": 1742500000,
  "data": [{
    "b64_json": "iVBORw0KGgo...",
    "revised_prompt": "A stunning cinematic sunset over the Old Quarter of Hà Nội..."
  }],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 0,
    "total_tokens": 12
  }
}`}
            />

            <div className="not-prose p-4 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">⚠️ Content Policy</p>
                <p className="text-xs text-amber-600 dark:text-amber-500">
                    Prompt vi phạm chính sách an toàn sẽ nhận lỗi <code>400</code> với message{" "}
                    <em>"Yêu cầu chứa nội dung không được phép"</em>.
                </p>
            </div>
        </div>
    );
}