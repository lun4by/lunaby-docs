import { cn } from "@/lib/utils";

interface Param {
  name: string;
  type: string;
  required?: boolean;
  description: string;
  default?: string;
}

interface ParamTableProps {
  params: Param[];
  className?: string;
}

export function ParamTable({ params, className }: ParamTableProps) {
  return (
    <div className={cn("not-prose my-4 overflow-hidden rounded-lg border border-border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted">
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Parameter
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Type
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {params.map((param) => (
            <tr key={param.name} className="transition-colors hover:bg-muted/40">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <code className="font-mono text-xs font-semibold text-primary">
                    {param.name}
                  </code>
                  {param.required && (
                    <span className="rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
                      required
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-xs text-muted-foreground">{param.type}</code>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">
                {param.description}
                {param.default && (
                  <span className="ml-1 text-muted-foreground/70">
                    Default: <code className="font-mono text-[11px]">{param.default}</code>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
