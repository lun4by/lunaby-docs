import { cn } from "@/lib/utils";

interface EndpointBadgeProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  className?: string;
}

const METHOD_STYLES: Record<string, string> = {
  GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  PUT: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  PATCH: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
};

export function EndpointBadge({ method, path, className }: EndpointBadgeProps) {
  return (
    <div
      className={cn(
        "not-prose my-4 flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-2.5",
        className,
      )}
    >
      <span
        className={cn(
          "rounded-md px-2 py-0.5 text-xs font-bold",
          METHOD_STYLES[method],
        )}
      >
        {method}
      </span>
      <code className="font-mono text-sm text-foreground">{path}</code>
    </div>
  );
}
