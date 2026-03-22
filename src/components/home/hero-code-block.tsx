"use client";

import { useState, useCallback } from "react";
import { CheckIcon, CopyIcon, TerminalIcon, CodeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---- Syntax-colored code as JSX ---- */

function InstallCode() {
  return (
    <span className="text-[#e6edf3]">
      <span className="text-[#8b949e]">$ </span>
      npm install lunaby-sdk
    </span>
  );
}

function UsageCode() {
  return (
    <span className="text-[#e6edf3]">
      <span className="text-[#ff7b72]">import</span> Lunaby <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">&quot;lunaby-sdk&quot;</span>;{"\n"}
      {"\n"}
      <span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">client</span> = <span className="text-[#ff7b72]">new</span> <span className="text-[#ffa657]">Lunaby</span>();{"\n"}
      {"\n"}
      <span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">response</span> = <span className="text-[#ff7b72]">await</span> client.responses.<span className="text-[#d2a8ff]">create</span>(&#123;{"\n"}
      {"  "}<span className="text-[#79c0ff]">model</span>: <span className="text-[#a5d6ff]">&quot;lunaby&quot;</span>,{"\n"}
      {"  "}<span className="text-[#79c0ff]">input</span>: <span className="text-[#a5d6ff]">&quot;Write a bedtime story about a unicorn.&quot;</span>,{"\n"}
      &#125;);{"\n"}
      {"\n"}
      console.<span className="text-[#d2a8ff]">log</span>(response.output_text);
    </span>
  );
}

const INSTALL_TEXT = "npm install lunaby-sdk";
const USAGE_TEXT = `import Lunaby from "lunaby-sdk";

const client = new Lunaby();

const response = await client.responses.create({
  model: "lunaby",
  input: "Write a bedtime story about a unicorn.",
});

console.log(response.output_text);`;

export function HeroCodeBlock() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"install" | "usage">("install");

  const handleCopy = useCallback(() => {
    const text = activeTab === "install" ? INSTALL_TEXT : USAGE_TEXT;
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
        return;
      }
    } catch {
      // Fallback below
    }
    // execCommand fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeTab]);

  return (
    <div className="mx-auto mt-8 w-full max-w-2xl overflow-hidden rounded-xl border border-border text-left shadow-sm">
      {/* Header with tabs */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("install")}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium",
              activeTab === "install"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <TerminalIcon className="size-3" />
            Install
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("usage")}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium",
              activeTab === "usage"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <CodeIcon className="size-3" />
            Usage
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            {activeTab === "install" ? "bash" : "typescript"}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="cursor-pointer rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Copy code"
          >
            {copied ? (
              <CheckIcon className="size-3.5 text-emerald-500" />
            ) : (
              <CopyIcon className="size-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto bg-[#0d1117] px-5 py-4">
        <pre className="m-0 leading-relaxed">
          <code className="font-mono text-sm">
            {activeTab === "install" ? <InstallCode /> : <UsageCode />}
          </code>
        </pre>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 border-t border-border bg-muted/20 px-4 py-1.5">
        <div className="size-2 rounded-full bg-emerald-500" />
        <span className="text-[11px] text-muted-foreground">Ready to run</span>
      </div>
    </div>
  );
}
