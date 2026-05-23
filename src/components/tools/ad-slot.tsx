import { cn } from "@/lib/utils";

export function AdSlot({
  id,
  className,
  format = "auto",
}: {
  id: string;
  className?: string;
  format?: "auto" | "rectangle" | "horizontal";
}) {
  // In production, set NEXT_PUBLIC_ADSENSE_CLIENT and replace this with
  // <ins className="adsbygoogle" /> + the gtag init script.
  return (
    <div
      id={`ad-${id}`}
      data-ad-format={format}
      className={cn(
        "min-h-24 rounded-2xl border border-dashed border-border/60 bg-muted/30 grid place-items-center text-xs text-muted-foreground",
        className
      )}
    >
      <span>Sponsored · Ad slot ({id})</span>
    </div>
  );
}
