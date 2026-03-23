"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Kbd, ModalBackdrop, ModalContainer, ModalDialog, ModalBody } from "@heroui/react";
import { Command } from "cmdk";
import "@/styles/cmdk.css";

// This would normally come from a real search index
const searchNodes = [
  { id: "quickstart", title: "Quick Start", section: "Getting Started", href: "/docs/quickstart" },
  { id: "auth", title: "Authentication", section: "Getting Started", href: "/docs/authentication" },
  { id: "models", title: "Models", section: "Core API", href: "/docs/models" },
  { id: "chat", title: "Chat Completions", section: "Core API", href: "/docs/chat" },
  { id: "streaming", title: "Streaming", section: "Core API", href: "/docs/streaming" },
  { id: "images", title: "Image Generation", section: "Core API", href: "/docs/images" },
  { id: "sdk", title: "SDK Configuration", section: "Reference", href: "/docs/sdk-reference" },
  { id: "errors", title: "Error Handling", section: "Reference", href: "/docs/errors" },
];

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-border bg-muted/50 px-3 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <SearchIcon className="size-4 shrink-0" />
          <span className="truncate">
            <span className="hidden sm:inline">Search documentation...</span>
            <span className="sm:hidden">Search...</span>
          </span>
        </span>
        <Kbd className="hidden shrink-0 lg:inline-block">
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </button>

      <ModalBackdrop
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      >
        <ModalContainer
          size="lg"
          placement="top"
          className="bg-card border border-border shadow-md max-w-[600px] overflow-hidden !m-4 sm:!mx-auto sm:!mt-[10vh] h-max max-h-[80vh]"
        >
          <ModalDialog aria-label="Search documentation">
            <ModalBody>
              <Command className="cmdk-theme" label="Search documentation">
                <Command.Input placeholder="Type a command or search..." autoFocus />
                <Command.List>
                  <Command.Empty>No results found.</Command.Empty>

                  <Command.Group heading="Documentation">
                    {searchNodes.map((node) => (
                      <Command.Item
                        key={node.id}
                        value={node.title + " " + node.section}
                        onSelect={() => handleSelect(node.href)}
                      >
                        {node.title}
                        <span className="ml-auto text-xs text-muted-foreground">{node.section}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
              </Command>
            </ModalBody>
          </ModalDialog>
        </ModalContainer>
      </ModalBackdrop>
    </>
  );
}