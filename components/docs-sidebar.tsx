"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
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

export function DocsSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-60 shrink-0 hidden lg:block">
            <div className="sticky top-16 pt-6 pb-10 pr-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
                {/* Logo */}
                <div className="mb-8 flex items-center gap-2 px-2">
                    <div className="size-7 rounded-lg bg-violet-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">L</span>
                    </div>
                    <span className="font-semibold text-sm">Lunaby Docs</span>
                </div>

                <nav className="space-y-6">
                    {NAV.map((section) => (
                        <div key={section.group}>
                            <p className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                {section.group}
                            </p>
                            <ul className="space-y-0.5">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block px-2 py-1.5 rounded-md text-sm transition-colors",
                                                pathname === item.href
                                                    ? "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 font-medium"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}