import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

const SUPPORTED_LANGUAGES = [
  "typescript",
  "javascript",
  "bash",
  "json",
  "http",
  "python",
  "text",
  "shell",
] as const;

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: [...SUPPORTED_LANGUAGES],
    });
  }
  return highlighterPromise as Promise<Highlighter>;
}

export async function highlightCode(
  code: string,
  lang: string,
  theme: "dark" | "light" = "dark",
): Promise<string> {
  const hl = await getHighlighter();
  const validLang = SUPPORTED_LANGUAGES.includes(lang as (typeof SUPPORTED_LANGUAGES)[number])
    ? lang
    : "text";

  return hl.codeToHtml(code, {
    lang: validLang,
    theme: theme === "dark" ? "github-dark" : "github-light",
  });
}
