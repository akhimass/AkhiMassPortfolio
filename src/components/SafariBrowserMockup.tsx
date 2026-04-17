import { cn } from "@/lib/utils";

type SafariBrowserMockupProps = {
  url?: string;
  tabs?: string[];
  activeTabIndex?: number;
  children: React.ReactNode;
  className?: string;
};

/** Safari-style window chrome (traffic lights, tabs, unified toolbar) for product screenshots. */
export function SafariBrowserMockup({
  url = "https://racquethub.app",
  tabs = ["RacquetHub", "Pricing"],
  activeTabIndex = 0,
  children,
  className,
}: SafariBrowserMockupProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/[0.12] bg-[#1b1b1f] shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-black/40 bg-[#2d2d31] px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 gap-1 pl-1">
          {tabs.map((label, i) => (
            <div
              key={`${label}-${i}`}
              className={cn(
                "max-w-[46%] truncate rounded-t-md px-2.5 py-1 text-[10px] font-medium transition-colors",
                i === activeTabIndex
                  ? "bg-[#3a3a42] text-white shadow-sm"
                  : "bg-white/[0.04] text-white/45",
              )}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-black/50 bg-[#353538] px-2.5 py-1.5">
        <div className="flex gap-1 text-white/25" aria-hidden>
          <span className="text-[11px]">◀</span>
          <span className="text-[11px]">▶</span>
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/[0.06] bg-[#1e1e22] px-2.5 py-1">
          <svg className="h-2.5 w-2.5 shrink-0 text-emerald-400/85" viewBox="0 0 12 12" aria-hidden>
            <path
              fill="currentColor"
              d="M6 1a3 3 0 0 0-3 3v1H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H9V4a3 3 0 0 0-3-3Zm0 2a1 1 0 0 1 1 1v1H5V4a1 1 0 0 1 1-1Z"
            />
          </svg>
          <p className="truncate font-mono text-[10px] text-blue-100/85">{url}</p>
        </div>
        <div className="hidden shrink-0 gap-1.5 sm:flex" aria-hidden>
          <span className="h-1.5 w-3 rounded-sm bg-white/10" />
          <span className="h-1.5 w-3 rounded-sm bg-white/10" />
        </div>
      </div>

      <div className="relative bg-black">{children}</div>
    </div>
  );
}
