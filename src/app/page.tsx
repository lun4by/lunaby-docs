import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, BookOpenIcon, ZapIcon, CodeIcon, ShieldIcon } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { HeroCodeBlock } from "@/components/home/hero-code-block";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const FEATURES = [
  {
    icon: ZapIcon,
    title: "Quick Start",
    description: "Send your first request in 2 minutes with our TypeScript SDK.",
    href: "/docs/quickstart",
  },
  {
    icon: BookOpenIcon,
    title: "Chat API",
    description: "Create chat completions with AI models — streaming and non-streaming.",
    href: "/docs/chat",
  },
  {
    icon: CodeIcon,
    title: "Image Generation",
    description: "Generate images from text prompts with automatic enhancement.",
    href: "/docs/images",
  },
  {
    icon: ShieldIcon,
    title: "SDK Reference",
    description: "Full TypeScript SDK docs with comprehensive error handling.",
    href: "/docs/sdk-reference",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={SITE_CONFIG.logoUrl}
            alt={SITE_CONFIG.logoAlt}
            width={24}
            height={24}
            className="size-6 rounded-md object-cover"
            priority
          />
          <span className="text-sm font-semibold">{SITE_CONFIG.name}</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero — centered in remaining space */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl space-y-6 text-center">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src={SITE_CONFIG.logoUrl}
              alt={SITE_CONFIG.logoAlt}
              width={64}
              height={64}
              className="size-16 rounded-2xl object-cover"
              priority
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Lunaby API
            </h1>
            <p className="mx-auto max-w-md text-sm text-muted-foreground sm:text-base">
              Developer documentation for chat completions, image generation,
              and the official TypeScript SDK.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started
              <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              href="/docs"
              className="rounded-lg border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Read Docs
            </Link>
          </div>

          {/* Code Block */}
          <HeroCodeBlock />

          {/* Feature Cards */}
          <div className="grid gap-3 pt-4 sm:grid-cols-2">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group rounded-lg border border-border p-4 text-left transition-colors hover:border-primary/30 hover:bg-muted/50"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <Icon className="size-4 text-primary" />
                    <span className="text-sm font-semibold">{feature.title}</span>
                    <ArrowRightIcon className="ml-auto size-3 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer — always visible */}
      <footer className="shrink-0 border-t border-border py-4 text-center">
        <p className="text-xs text-muted-foreground">
          Built by{" "}
          <Link href={SITE_CONFIG.githubUrl} target="_blank" className="font-medium text-foreground hover:underline">
            Lunaby
          </Link>
          . Source available on{" "}
          <Link href={SITE_CONFIG.githubUrl} target="_blank" className="font-medium text-foreground hover:underline">
            GitHub
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
