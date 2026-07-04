import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const Table = forwardRef<ElementRef<"table">, ComponentPropsWithoutRef<"table">>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  )
);
Table.displayName = "Table";

const TableHeader = forwardRef<ElementRef<"thead">, ComponentPropsWithoutRef<"thead">>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<ElementRef<"tbody">, ComponentPropsWithoutRef<"tbody">>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

const TableRow = forwardRef<ElementRef<"tr">, ComponentPropsWithoutRef<"tr">>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-border dark:border-dark-border transition-colors hover:bg-surface-secondary dark:hover:bg-dark-surface-tertiary/50",
        "data-[state=selected]:bg-surface-secondary dark:data-[state=selected]:bg-dark-surface-tertiary",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

const TableHead = forwardRef<ElementRef<"th">, ComponentPropsWithoutRef<"th">>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-4 text-left align-middle font-medium text-text-secondary dark:text-dark-text-secondary text-xs uppercase tracking-wider",
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

const TableCell = forwardRef<ElementRef<"td">, ComponentPropsWithoutRef<"td">>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle text-text-primary dark:text-dark-text-primary", className)} {...props} />
  )
);
TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };