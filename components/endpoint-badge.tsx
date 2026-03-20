import { cn } from "@/lib/utils";

const METHOD_STYLES: Record<string, string> = {
    GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    PATCH: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function EndpointBadge({
    method,
    path,
}: {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    path: string;
}) {
    return (
        <div className="flex items-center gap-2 my-4 p-3 rounded-lg bg-muted border font-mono text-sm">
            <span className={cn("px-2 py-0.5 rounded text-xs font-bold uppercase", METHOD_STYLES[method])}>
                {method}
            </span>
            <span className="text-foreground/80">{path}</span>
        </div>
    );
}