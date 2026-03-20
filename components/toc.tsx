"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function TableOfContents() {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const pathname = usePathname();

    useEffect(() => {
        let handleScroll: () => void;
        
        // Wait for Next.js to render the new page content
        const timeoutId = setTimeout(() => {
            const elements = Array.from(document.querySelectorAll("main h2, main h3"));
            
            elements.forEach((el) => {
                if (!el.id) {
                    el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || "";
                }
            });

            const headingData = elements.map((el) => ({
                id: el.id,
                text: el.textContent || "",
                level: Number(el.tagName.substring(1)),
            }));
            
            setHeadings(headingData);

            handleScroll = () => {
                let currentId = "";
                elements.forEach((el) => {
                    if (el.getBoundingClientRect().top <= 140) {
                        currentId = el.id;
                    }
                });
                if (!currentId && elements.length > 0 && elements[0].getBoundingClientRect().top > 0) {
                    currentId = elements[0].id;
                }
                if (currentId) {
                    setActiveId(currentId);
                }
            };

            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll();
        }, 150);

        return () => {
            clearTimeout(timeoutId);
            if (handleScroll) window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

    if (headings.length === 0) return null;

    return (
        <nav className="space-y-3">
            <p className="font-semibold text-sm">On this page</p>
            <ul className="space-y-2.5 text-[13px] text-muted-foreground border-l-2 border-border/50">
                {headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-5" : "pl-3"}>
                        <a
                            href={`#${h.id}`}
                            className={cn(
                                "block hover:text-foreground transition-colors",
                                activeId === h.id ? "text-foreground font-medium border-l-2 border-foreground -ml-[14px] pl-[14px]" : ""
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                                setActiveId(h.id);
                                window.history.pushState(null, "", `#${h.id}`);
                            }}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}