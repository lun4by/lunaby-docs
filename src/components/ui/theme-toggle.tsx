"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon, PaletteIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { cn } from "@/lib/utils";

const THEME_COLORS = [
  { name: "neutral", label: "Neutral", color: "#737373", darkColor: "#a1a1aa" },
  { name: "blue", label: "Blue", color: "#2563eb", darkColor: "#3b82f6" },
  { name: "cyan", label: "Cyan", color: "#0891b2", darkColor: "#22d3ee" },
  { name: "green", label: "Green", color: "#16a34a", darkColor: "#22c55e" },
  { name: "orange", label: "Orange", color: "#ea580c", darkColor: "#f97316" },
  { name: "red", label: "Red", color: "#dc2626", darkColor: "#ef4444" },
  { name: "rose", label: "Rose", color: "#e11d48", darkColor: "#f43f5e" },
  { name: "violet", label: "Violet", color: "#7c3aed", darkColor: "#8b5cf6" },
  { name: "yellow", label: "Yellow", color: "#ca8a04", darkColor: "#eab308" },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [themeColor, setThemeColor] = useState("neutral");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lunaby-theme-color") ?? "neutral";
    setThemeColor(saved);
  }, []);

  function applyThemeColor(color: string) {
    const html = document.documentElement;
    if (color === "neutral") {
      html.removeAttribute("data-theme-color");
    } else {
      html.setAttribute("data-theme-color", color);
    }
    localStorage.setItem("lunaby-theme-color", color);
    setThemeColor(color);
  }

  if (!mounted) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Button size="sm" isIconOnly variant="ghost" aria-label="Choose theme color" className="text-muted-foreground">
          <PaletteIcon className="size-4" />
        </Button>
        <Button size="sm" isIconOnly variant="ghost" aria-label="Toggle theme" className="text-muted-foreground">
          <SunIcon className="size-4" />
        </Button>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Theme Color Picker */}
      <Popover>
        <PopoverTrigger>
          <Button
            size="sm"
            isIconOnly
            variant="ghost"
            aria-label="Choose theme color"
            className="text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <PaletteIcon className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" placement="bottom end">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Theme Color</p>
            <div className="grid grid-cols-5 gap-1.5">
              {THEME_COLORS.map((tc) => (
                <button
                  key={tc.name}
                  type="button"
                  onClick={() => applyThemeColor(tc.name)}
                  title={tc.label}
                  className={cn(
                    "size-6 cursor-pointer rounded-full border-2 transition-transform hover:scale-110",
                    themeColor === tc.name
                      ? "scale-110 border-foreground"
                      : "border-transparent block", // block fixes some rendering bugs
                  )}
                  style={{
                    backgroundColor: isDark ? tc.darkColor : tc.color,
                  }}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Dark/Light Toggle */}
      <Button
        size="sm"
        isIconOnly
        variant="ghost"
        aria-label="Toggle dark mode"
        className="text-muted-foreground hover:bg-muted hover:text-foreground"
        onPress={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
      </Button>
    </div>
  );
}