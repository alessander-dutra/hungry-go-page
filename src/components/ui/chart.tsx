import * as React from "react";
import { cn } from "@/lib/utils";

// Minimal chart components for the application
export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, any>;
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full h-full", className)}
        {...props}
      />
    );
  }
);
ChartContainer.displayName = "ChartContainer";

export interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  className?: string;
}

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ active, payload, label, className }, ref) => {
    if (!active || !payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-background p-2 shadow-sm",
          className
        )}
      >
        {label && (
          <div className="mb-1 font-medium">
            {label}
          </div>
        )}
        <div className="space-y-1">
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}:</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

export const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const ChartLegendContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap gap-2 text-sm", className)}
        {...props}
      />
    );
  }
);
ChartLegendContent.displayName = "ChartLegendContent";

export const ChartStyle = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};