import { CodeBlock } from "@/components/code-block";

export default function QuickstartPage() {
    return (
        <div className="prose">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-2">Getting Started</p>
            <h1>Quick Start</h1>
            <p>Gửi request đầu tiên tới Lunaby API trong vài phút.</p>

            <h2>Bước 1 — Lấy API Key</h2>
            <p>
                Đăng nhập vào{" "}
                <a href="https://api.lunie.dev" target="_blank" className="text-violet-600 underline">
                    Lunaby Dashboard
                </a>{" "}
                → Admin Panel → Tạo API key mới. Key chỉ hiển thị một lần, hãy lưu lại ngay.
            </p>

            <h2>Bước 2 — Cài SDK</h2>
            <CodeBlock code="npm install lunaby-sdk" language="bash" filename="terminal" />

            <h2>Bước 3 — Set API Key</h2>
            <CodeBlock code="LUNABY_API_KEY=your_api_key_here" language="bash" filename=".env" />

            <h2>Bước 4 — Gửi request đầu tiên</h2>
            <CodeBlock
                filename="index.ts"
                language="typescript"
                code={`import Lunaby from 'lunaby-sdk';

const client = new Lunaby({
  apiKey: process.env.LUNABY_API_KEY,
});

const response = await client.chat.create([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Xin chào!' }
]);

console.log(response.data.choices[0].message.content);
console.log('Tokens:', response.data.usage.total_tokens);`}
            />

            <h2>Hoặc dùng cURL</h2>
            <CodeBlock
                language="bash"
                code={`curl https://api.lunie.dev/v1/chat/completions \\
  -H "Authorization: Bearer $LUNABY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "lunaby-pro",
    "messages": [
      { "role": "user", "content": "Xin chào!" }
    ]
  }'`}
            />

            <div className="not-prose mt-6 p-4 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-1">✓ Bạn đã sẵn sàng!</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500">
                    Xem tiếp <a href="/docs/chat" className="underline">Chat API</a> hoặc{" "}
                    <a href="/docs/images" className="underline">Image Generation</a> để khám phá thêm.
                </p>
            </div>
        </div>
    );
}