"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const isDark = document.documentElement.classList.contains("dark") || 
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
        setTheme(isDark ? "dark" : "light");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    if (!mounted) return <div className="w-8 h-8 ml-2" />;

    return (
        <button
            onClick={toggleTheme}
            className="p-1.5 ml-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Toggle theme"
        >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    );
}

export const ThemeScript = () => (
    <script
        dangerouslySetInnerHTML={{
            __html: `
                try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark')
                } else {
                    document.documentElement.classList.remove('dark')
                }
                } catch (_) {}
            `,
        }}
    />
);
