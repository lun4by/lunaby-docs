import { InfoIcon, AlertTriangleIcon, AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "warning" | "error" | "success";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_CONFIG: Record<
  CalloutVariant,
  { icon: React.ElementType; border: string; bg: string; title: string; text: string }
> = {
  info: {
    icon: InfoIcon,
    border: "border-l-info",
    bg: "bg-info/5",
    title: "text-info",
    text: "text-info/80",
  },
  warning: {
    icon: AlertTriangleIcon,
    border: "border-l-warning",
    bg: "bg-warning/5",
    title: "text-warning",
    text: "text-warning/80",
  },
  error: {
    icon: AlertCircleIcon,
    border: "border-l-destructive",
    bg: "bg-destructive/5",
    title: "text-destructive",
    text: "text-destructive/80",
  },
  success: {
    icon: CheckCircleIcon,
    border: "border-l-success",
    bg: "bg-success/5",
    title: "text-success",
    text: "text-success/80",
  },
};

export function Callout({ variant = "info", title, children, className }: CalloutProps) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "not-prose my-4 rounded-r-lg border-l-3 p-4",
        config.border,
        config.bg,
        className,
      )}
    >
      {title && (
        <div className={cn("mb-1 flex items-center gap-2 text-sm font-semibold", config.title)}>
          <Icon className="size-4" />
          {title}
        </div>
      )}
      <div className={cn("text-xs leading-relaxed", config.text)}>{children}</div>
    </div>
  );
}
