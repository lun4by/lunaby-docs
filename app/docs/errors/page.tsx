import { CodeBlock } from "@/components/code-block";

const ERRORS = [
    { name: "AuthenticationError", code: 401, desc: "API key không hợp lệ hoặc thiếu header Authorization." },
    { name: "RateLimitError", code: 429, desc: "Vượt quá rate limit. SDK tự retry, có thể đọc error.retryAfter (giây)." },
    { name: "TimeoutError", code: null, desc: "Request vượt quá timeout (mặc định 120s). SDK throw TimeoutError." },
    { name: "AbortError", code: null, desc: "Request bị hủy thủ công qua AbortController." },
    { name: "ContentFilterError", code: 400, desc: "Nội dung bị hệ thống blacklist lọc. Xem error.categories." },
    { name: "ConnectionError", code: 503, desc: "Không kết nối được server. SDK tự retry 2 lần." },
    { name: "ValidationError", code: null, desc: "Input không hợp lệ, được throw ở client trước khi gửi request." },
    { name: "StreamError", code: null, desc: "Lỗi xảy ra trong quá trình đọc SSE stream." },
    { name: "APIError", code: null, desc: "Các lỗi HTTP khác (400, 403, 404, 500...)." },
];

export default function ErrorsPage() {
    return (
        <div className="prose">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-2">SDK Reference</p>
            <h1>Error Handling</h1>
            <p>
                SDK export đầy đủ error classes. Dùng <code>instanceof</code> để xử lý từng loại lỗi.
                SDK tự động retry với exponential backoff cho các lỗi <code>408, 429, 500–504</code>.
            </p>

            <h2>Error Classes</h2>
            <div className="not-prose rounded-lg border overflow-hidden my-4">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-muted border-b">
                            <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase w-52">Class</th>
                            <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase w-16">HTTP</th>
                            <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase">Mô tả</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {ERRORS.map((e) => (
                            <tr key={e.name} className="hover:bg-muted/40">
                                <td className="px-4 py-3 font-mono text-xs font-semibold text-violet-600 dark:text-violet-400">{e.name}</td>
                                <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{e.code ?? "—"}</td>
                                <td className="px-4 py-3 text-xs text-muted-foreground">{e.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2>Ví dụ đầy đủ</h2>
            <CodeBlock
                filename="error-handling.ts"
                language="typescript"
                code={`import Lunaby, {
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
    console.error('❌ API key không hợp lệ');
    // Kiểm tra lại LUNABY_API_KEY

  } else if (error instanceof RateLimitError) {
    console.error(\`⏳ Rate limited. Thử lại sau \${error.retryAfter}s\`);

  } else if (error instanceof TimeoutError) {
    console.error('⌛ Request timeout — tăng timeout nếu cần');

  } else if (error instanceof ContentFilterError) {
    console.error('🚫 Nội dung bị lọc:', error.categories);

  } else if (error instanceof AbortError) {
    console.log('✋ Request đã bị hủy');

  } else if (error instanceof ConnectionError) {
    console.error('🔌 Không kết nối được server');

  } else if (error instanceof ValidationError) {
    console.error('⚠️  Input không hợp lệ:', error.message);

  } else if (error instanceof APIError) {
    console.error(\`🔴 API Error \${error.status}: \${error.message}\`);
  }
}`}
            />

            <h2>HTTP Error Reference</h2>
            <div className="not-prose rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-muted border-b">
                            <th className="text-left px-4 py-2 text-xs text-muted-foreground font-semibold">Code</th>
                            <th className="text-left px-4 py-2 text-xs text-muted-foreground font-semibold">Mô tả</th>
                            <th className="text-left px-4 py-2 text-xs text-muted-foreground font-semibold">Retry?</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-xs">
                        {[
                            ["400", "Bad Request — thiếu field hoặc sai format", "Không"],
                            ["401", "Unauthorized — API key sai hoặc thiếu", "Không"],
                            ["403", "Forbidden — Key bị deactivate", "Không"],
                            ["404", "Not Found — Endpoint không tồn tại", "Không"],
                            ["408", "Request Timeout", "✓ Auto"],
                            ["429", "Rate Limit Exceeded", "✓ Auto"],
                            ["500", "Internal Server Error", "✓ Auto"],
                            ["502/503/504", "Service Unavailable", "✓ Auto"],
                        ].map(([code, desc, retry]) => (
                            <tr key={code} className="hover:bg-muted/40">
                                <td className={`px-4 py-2.5 font-mono font-semibold ${code.startsWith("4") ? "text-red-500" : "text-orange-500"
                                    }`}>{code}</td>
                                <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                                <td className="px-4 py-2.5 text-muted-foreground">{retry}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}