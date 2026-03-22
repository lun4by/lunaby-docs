import type { MDXComponents } from "mdx/types";
import { highlightCode } from "@/lib/shiki";
import { CodeBlock } from "@/components/docs/code-block";
import { slugify } from "@/lib/utils";

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;

  return function Heading({ children }: { children: React.ReactNode }) {
    const text = typeof children === "string" ? children : "";
    const id = slugify(text);

    return (
      <Tag id={id} className="group">
        {children}
        {level >= 2 && level <= 3 && (
          <a
            href={`#${id}`}
            className="ml-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={`Link to ${text}`}
          >
            #
          </a>
        )}
      </Tag>
    );
  };
}

async function Pre({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) {
  const codeElement = children as React.ReactElement<{
    className?: string;
    children?: string;
  }>;

  if (!codeElement || typeof codeElement !== "object" || !("props" in codeElement)) {
    return <pre {...props}>{children}</pre>;
  }

  const code = (codeElement.props.children ?? "").trim();
  const className = codeElement.props.className ?? "";
  const langMatch = className.match(/language-(\w+)/);
  const language = langMatch ? langMatch[1] : "text";

  let highlightedHtml = "";
  try {
    highlightedHtml = await highlightCode(code, language, "dark");
  } catch {
    // Fallback: render without highlighting
  }

  return (
    <CodeBlock
      code={code}
      language={language}
      highlightedHtml={highlightedHtml}
    />
  );
}

export function createMdxComponents(): MDXComponents {
  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    pre: Pre as unknown as React.ComponentType<React.ComponentPropsWithoutRef<"pre">>,
    a: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
    table: ({ children, ...props }: React.ComponentPropsWithoutRef<"table">) => (
      <div className="not-prose my-6 w-full overflow-hidden rounded-lg border border-border bg-card">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border-spacing-0 text-left text-sm" {...props}>
            {children}
          </table>
        </div>
      </div>
    ),
    thead: ({ children, ...props }: React.ComponentPropsWithoutRef<"thead">) => (
      <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: React.ComponentPropsWithoutRef<"tbody">) => (
      <tbody className="divide-y divide-border" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: React.ComponentPropsWithoutRef<"tr">) => (
      <tr className="transition-colors hover:bg-muted/30" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: React.ComponentPropsWithoutRef<"th">) => (
      <th className="whitespace-nowrap px-4 py-3 text-left font-semibold" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: React.ComponentPropsWithoutRef<"td">) => (
      <td className="px-4 py-3 text-left align-top text-muted-foreground [&_code]:whitespace-nowrap" {...props}>
        {children}
      </td>
    ),
  };
}
