"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRightIcon, MenuIcon, XIcon } from "lucide-react";
import { Button } from "@heroui/react";
import { SITE_CONFIG, NAV_LINKS } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

import { SearchDialog } from "@/components/docs/search-dialog";

interface DocsHeaderProps {
  apiVersion?: string;
}

export function DocsHeader({ apiVersion = "1.0" }: DocsHeaderProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 md:px-6">
          {/* Left: Logo + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="lg:hidden"
              aria-label="Toggle menu"
              onPress={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
            </Button>
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <Image
                src={SITE_CONFIG.logoUrl}
                alt={SITE_CONFIG.logoAlt}
                width={24}
                height={24}
                className="size-6 rounded-md object-cover"
              />
              <span className="text-sm font-semibold tracking-tight">
                {SITE_CONFIG.name} <span className="text-muted-foreground font-normal">Developer</span>
              </span>
            </Link>
          </div>

          {/* Center: Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => {
              const isExternal = "external" in link && link.external;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={cn(
                    "text-sm transition-colors",
                    pathname.startsWith("/docs") && link.href === "/docs"
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex flex-1 items-center justify-end gap-2 md:flex-none">
            <div className="w-full max-w-[200px] sm:max-w-xs md:w-64">
              <SearchDialog />
            </div>
            <span className="hidden rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground xl:block">
              v{apiVersion}
            </span>
            <Button
              as={Link}
              href={SITE_CONFIG.apiUrl}
              target="_blank"
              size="sm"
              color="primary"
              variant="flat"
              className="hidden text-xs font-medium lg:flex"
              endContent={<ArrowUpRightIcon className="size-3" />}
            >
              Dashboard
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileNav isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
