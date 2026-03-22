export interface DocNavItem {
  label: string;
  href: string;
}

export interface DocNavGroup {
  group: string;
  items: DocNavItem[];
}

export const DOCS_NAV: DocNavGroup[] = [
  {
    group: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Quick Start", href: "/docs/quickstart" },
      { label: "Authentication", href: "/docs/authentication" },
    ],
  },
  {
    group: "Core API",
    items: [
      { label: "Models", href: "/docs/models" },
      { label: "Chat Completions", href: "/docs/chat" },
      { label: "Streaming", href: "/docs/streaming" },
      { label: "Image Generation", href: "/docs/images" },
    ],
  },
  {
    group: "SDK Reference",
    items: [
      { label: "SDK Overview", href: "/docs/sdk-reference" },
      { label: "Error Handling", href: "/docs/errors" },
    ],
  },
];
