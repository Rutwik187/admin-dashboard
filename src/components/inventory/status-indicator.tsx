import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

export type StatusType = "action-needed" | "completed" | "critical" | "pending";

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  className?: string;
  pulse?: boolean;
}

export function StatusIndicator({ status, label, className, pulse = false }: StatusIndicatorProps) {
  const statusConfig = {
    "action-needed": {
      bg: "bg-blue-500/10 border-blue-500/50 text-blue-600 dark:text-blue-400",
      icon: Clock,
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    completed: {
      bg: "bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400",
      icon: CheckCircle2,
      iconColor: "text-green-600 dark:text-green-400",
    },
    critical: {
      bg: "bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400",
      icon: AlertCircle,
      iconColor: "text-red-600 dark:text-red-400",
    },
    pending: {
      bg: "bg-yellow-500/10 border-yellow-500/50 text-yellow-600 dark:text-yellow-400",
      icon: Clock,
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium",
        config.bg,
        pulse && status === "critical" && "animate-pulse",
        className
      )}
    >
      <Icon className={cn("size-4", config.iconColor)} />
      {label && <span>{label}</span>}
    </div>
  );
}

