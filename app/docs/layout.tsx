import { DocsSidebar } from "@/components/docs-sidebar";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { TableOfContents } from "@/components/toc";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top nav */}
            <header className="sticky top-0 z-50 h-16 border-b bg-background/95 backdrop-blur">
                <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center relative">
                    {/* Left: Logo */}
                    <Link href="/" className="flex items-center gap-2 absolute left-6">
                        <span className="font-semibold text-lg tracking-tight">Lunaby Developers</span>
                    </Link>

                    {/* Center: Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground w-full justify-center">
                        <Link href="/docs" className="hover:text-foreground transition-colors font-medium text-foreground">Docs</Link>
                        <Link href="https://api.lunie.dev" className="hover:text-foreground transition-colors" target="_blank">API</Link>
                        <Link href="https://github.com/lun4by/lunaby-sdk" className="hover:text-foreground transition-colors" target="_blank">GitHub</Link>
                    </nav>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 absolute right-6">
                        <span className="hidden sm:block text-xs border border-border text-foreground px-2 py-1 rounded-full font-medium">
                            v1.0
                        </span>
                        <Link
                            href="https://api.lunie.dev"
                            target="_blank"
                            className="flex items-center gap-1.5 text-xs bg-zinc-950 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 px-4 py-1.5 rounded-full transition-colors font-medium shadow-sm"
                        >
                            Dashboard <ArrowUpRight className="size-3.5" />
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Body */}
            <div className="max-w-[1400px] mx-auto px-6 w-full flex-1 flex gap-12 py-2 relative">
                <DocsSidebar />
                <main className="flex-1 min-w-0 py-10 max-w-4xl">
                    {children}
                </main>

                {/* Right ToC Sidebar */}
                <aside className="w-56 shrink-0 hidden xl:block ml-auto xl:pl-4">
                    <div className="sticky top-28 pt-8">
                        <TableOfContents />
                    </div>
                </aside>
            </div>
        </div>
    );
}