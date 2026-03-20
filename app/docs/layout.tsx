import { DocsSidebar } from "@/components/docs-sidebar";
import Link from "next/link";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top nav */}
            <header className="sticky top-0 z-50 h-16 border-b bg-background/95 backdrop-blur">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="size-8 rounded-lg bg-violet-600 flex items-center justify-center">
                                <span className="text-white text-sm font-bold">L</span>
                            </div>
                            <span className="font-semibold">Lunaby</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                            <Link href="/docs" className="hover:text-foreground transition-colors font-medium text-foreground">Docs</Link>
                            <Link href="https://api.lunie.dev" className="hover:text-foreground transition-colors" target="_blank">API</Link>
                            <Link href="https://github.com/lun4by/lunaby-sdk" className="hover:text-foreground transition-colors" target="_blank">GitHub</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:block text-xs bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 px-2 py-1 rounded-full font-medium">
                            v1.0
                        </span>
                        <Link
                            href="https://api.lunie.dev"
                            target="_blank"
                            className="text-xs bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-md transition-colors font-medium"
                        >
                            Dashboard →
                        </Link>
                    </div>
                </div>
            </header>

            {/* Body */}
            <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex gap-10 py-2">
                <DocsSidebar />
                <main className="flex-1 min-w-0 py-8 max-w-3xl">
                    {children}
                </main>
            </div>
        </div>
    );
}