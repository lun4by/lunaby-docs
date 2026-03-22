export const SITE_CONFIG = {
  name: "LUNABY",
  title: "LUNABY API Docs",
  description: "Official developer documentation for LUNABY API — Chat completions, image generation, and TypeScript SDK.",
  url: "https://docs.lunie.dev",
  apiUrl: "https://api.lunie.dev",
  githubUrl: "https://github.com/lun4by/lunaby-sdk",
  logoUrl: "https://cdn.lunie.dev/Lunaby/avatar.png",
  logoAlt: "LUNABY Logo",
} as const;

export const NAV_LINKS = [
  { label: "Docs", href: "/docs" },
  { label: "API", href: "https://api.lunie.dev", external: true },
  { label: "GitHub", href: "https://github.com/lun4by/lunaby-sdk", external: true },
] as const;
