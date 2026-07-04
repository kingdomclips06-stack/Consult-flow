import { ArrowUp, ArrowDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
}

export function StatsCard({ title, value, change, icon: Icon, trend, subtitle }: StatsCardProps) {
  const isPositive = trend === "up";
  const isNegative = trend === "down";

  return (
    <Card className="card-hover">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                {value}
              </span>
              {change !== undefined && (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-xs font-medium",
                    isPositive && "text-emerald-600 dark:text-emerald-400",
                    isNegative && "text-red-600 dark:text-red-400"
                  )}
                >
                  {isPositive ? <ArrowUp className="size-3" /> : isNegative ? <ArrowDown className="size-3" /> : null}
                  {Math.abs(change)}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">{subtitle}</p>
            )}
          </div>
          <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/20">
            <Icon className="size-5 text-brand-600 dark:text-brand-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}