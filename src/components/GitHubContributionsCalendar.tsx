import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

const GITHUB_USER = "akhimass";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;

type ContributionDay = { date: string; count: number; level: number };

type ApiResponse = {
  total?: { lastYear?: number };
  contributions?: ContributionDay[];
};

function parseLocalDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function formatLocalDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfWeekSunday(d: Date): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - x.getDay());
  return x;
}

function endOfWeekSaturday(d: Date): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() + (6 - x.getDay()));
  return x;
}

/** Feb–Apr (inclusive): average total commits per week over the calendar span covered by those days in the dataset. */
function febThroughAprAvgCommitsPerWeek(days: ContributionDay[]): number | null {
  const subset = days.filter((d) => {
    const m = parseLocalDate(d.date).getMonth();
    return m >= 1 && m <= 3;
  });
  if (subset.length === 0) return null;
  const total = subset.reduce((s, d) => s + d.count, 0);
  subset.sort((a, b) => a.date.localeCompare(b.date));
  const t0 = parseLocalDate(subset[0].date).getTime();
  const t1 = parseLocalDate(subset[subset.length - 1].date).getTime();
  const inclusiveDays = Math.floor((t1 - t0) / 86400000) + 1;
  const weeks = Math.max(1, inclusiveDays / 7);
  return total / weeks;
}

/** Columns = weeks (Sun top → Sat bottom), matching GitHub profile layout. */
function buildWeekColumns(days: ContributionDay[]): ContributionDay[][] {
  if (!days.length) return [];
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const byDate = new Map(sorted.map((d) => [d.date, d]));

  const first = parseLocalDate(sorted[0].date);
  const last = parseLocalDate(sorted[sorted.length - 1].date);
  const start = startOfWeekSunday(first);
  const end = endOfWeekSaturday(last);

  const flat: ContributionDay[] = [];
  for (let cur = new Date(start); cur <= end; cur.setDate(cur.getDate() + 1)) {
    const key = formatLocalDate(cur);
    flat.push(byDate.get(key) ?? { date: key, count: 0, level: 0 });
  }

  const columns: ContributionDay[][] = [];
  for (let i = 0; i < flat.length; i += 7) {
    columns.push(flat.slice(i, i + 7));
  }
  return columns;
}

const levelClass: Record<number, string> = {
  0: "bg-white/[0.06] border border-white/[0.04]",
  1: "bg-sky-900/55 border border-sky-500/15",
  2: "bg-sky-700/50 border border-sky-400/20",
  3: "bg-sky-500/45 border border-sky-300/25",
  4: "bg-sky-400/55 border border-sky-200/30",
};

export const GitHubContributionsCalendar = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(CONTRIBUTIONS_API)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((json: ApiResponse) => {
        if (cancelled) return;
        setData(json);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setData(null);
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const columns = useMemo(() => buildWeekColumns(data?.contributions ?? []), [data?.contributions]);
  const total = data?.total?.lastYear;
  const febAprAvg = useMemo(
    () => febThroughAprAvgCommitsPerWeek(data?.contributions ?? []),
    [data?.contributions],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="rounded-xl border border-white/10 bg-[#0c0c0f] p-5 sm:p-6"
    >
      <div className="mb-5 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400/90">Shipping cadence</p>
        <h4 className="mt-1 font-display text-lg font-bold tracking-tight text-white">GitHub activity</h4>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Public commits over the last rolling year — same shipping habit behind the capability stacks above.
        </p>
      </div>

      {status === "loading" && (
        <div className="flex min-h-[8rem] items-center justify-center text-sm text-muted-foreground">Loading contributions…</div>
      )}

      {status === "error" && (
        <p className="text-sm text-muted-foreground">
          Could not load the contribution grid.{" "}
          <a
            className="text-sky-400 underline-offset-2 hover:underline"
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer"
          >
            View profile on GitHub
          </a>
        </p>
      )}

      {status === "ready" && columns.length === 0 && (
        <p className="text-sm text-muted-foreground">No contribution data available right now.</p>
      )}

      {status === "ready" && columns.length > 0 && (
        <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-stretch">
          <div className="grid shrink-0 grid-cols-2 gap-3 sm:max-w-md sm:grid-cols-2 lg:w-[13.5rem] lg:max-w-none lg:grid-cols-1">
            {typeof total === "number" && (
              <div className="flex flex-col justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <div className="font-display text-2xl font-bold tabular-nums tracking-tight text-sky-300 sm:text-3xl">
                  {total.toLocaleString()}
                </div>
                <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">Public contributions in the last year</p>
              </div>
            )}
            {febAprAvg != null && (
              <div className="flex flex-col justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <div className="font-display text-2xl font-bold tabular-nums tracking-tight text-sky-300 sm:text-3xl">
                  {febAprAvg.toFixed(1)}
                </div>
                <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
                  Avg public commits / week (Feb–Apr days in this window)
                </p>
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max gap-[3px] sm:gap-1">
                {columns.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px] sm:gap-1">
                    {week.map((day) => {
                      const lv = Math.min(4, Math.max(0, day.level));
                      return (
                        <div
                          key={day.date}
                          title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                          className={`h-[10px] w-[10px] rounded-[2px] sm:h-3 sm:w-3 ${levelClass[lv]}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((lv) => (
                    <div key={lv} className={`h-3 w-3 rounded-[2px] ${levelClass[lv]}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sky-400 transition-colors hover:text-sky-300"
              >
                @{GITHUB_USER}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
