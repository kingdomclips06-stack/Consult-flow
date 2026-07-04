import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary px-3 py-2 text-sm text-text-primary dark:text-dark-text-primary placeholder:text-text-tertiary dark:placeholder:text-dark-text-tertiary",
            "transition-all duration-200",
            "focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };