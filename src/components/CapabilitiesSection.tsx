import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capabilities } from "@/config/projects";
import { ChevronDown } from "lucide-react";

const terminalSnippets: Record<string, { cmd: string; output: string }[]> = {
  "Frontend Systems": [
    { cmd: "npx create-next-app@latest --typescript --tailwind", output: "✓ Installing dependencies..." },
    { cmd: "npx shadcn-ui@latest init", output: "✓ Components installed to ./src/components/ui" },
    { cmd: "npm run dev", output: "Local: http://localhost:3000" },
  ],
  "Backend APIs": [
    { cmd: "uvicorn main:app --reload --port 8000", output: "INFO: Application startup complete." },
    { cmd: "curl -X POST /api/ingest -d '{\"source\":\"s3\"}'", output: '{"status":"queued","job_id":"ax-8821"}' },
    { cmd: "supabase db push", output: "✓ Migrations applied successfully" },
  ],
  "Data Pipelines": [
    { cmd: "airflow dags trigger etl_pipeline --conf '{}'", output: "Triggered DAG: etl_pipeline (run_id: manual_2024)" },
    { cmd: "python ingest.py --source nfl_tracking --batch 10000", output: "✓ 1,245,832 records processed in 4.2s" },
    { cmd: "aws s3 sync ./output s3://data-lake/processed/", output: "✓ 847 files uploaded" },
  ],
  "AI / LLM Workflows": [
    { cmd: "python train.py --model pytorch --epochs 50", output: "Epoch 50/50 — loss: 0.0412 — acc: 0.9721" },
    { cmd: "langchain run pipeline --chain research_agent", output: "✓ Agent completed 12 tool calls in 8.3s" },
    { cmd: "openai.Completion.create(model='gpt-4')", output: '{"choices":[{"text":"Analysis: ..."}]}' },
  ],
  "Cloud & Deployment": [
    { cmd: "terraform apply -auto-approve", output: "Apply complete! Resources: 14 added, 0 changed." },
    { cmd: "docker build -t api:v2.1 . && docker push ecr/api:v2.1", output: "✓ Image pushed — digest: sha256:af3c..." },
    { cmd: "aws lambda update-function-code --zip fileb://fn.zip", output: "✓ Function updated — cold start: 180ms" },
  ],
  "Analytics & Modeling": [
    { cmd: "python model.py --algo xgboost --cv 5 --target win_prob", output: "CV Accuracy: 0.724 ± 0.031 | AUC: 0.81" },
    { cmd: "Rscript analysis.R --dataset hornets_prospects", output: "✓ 847 prospects ranked — report exported" },
    { cmd: "tableau-cli publish dashboard.twb --site analytics", output: "✓ Dashboard live at analytics.internal/sb" },
  ],
};

const categoryIcons: Record<string, string> = {
  "Frontend Systems": "⬡",
  "Backend APIs": "⚙",
  "Data Pipelines": "⊕",
  "AI / LLM Workflows": "◈",
  "Cloud & Deployment": "△",
  "Analytics & Modeling": "◎",
};

export const CapabilitiesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="capabilities" className="py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">Engineering</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Technical Capabilities
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs sm:text-right leading-relaxed">
              Production-tested expertise across the full stack.
            </p>
          </div>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-2">
          {capabilities.map((cap, i) => {
            const isOpen = openIndex === i;
            const snippets = terminalSnippets[cap.category] ?? [];

            return (
              <motion.div
                key={cap.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-violet-500/25 bg-violet-500/[0.03]"
                      : "border-white/[0.07] bg-card/40 hover:border-white/[0.12]"
                  }`}
                >
                  {/* Trigger */}
                  <button
                    className="w-full flex items-center gap-4 p-5 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    <span
                      className={`text-base font-mono leading-none transition-colors ${
                        isOpen ? "text-violet-400" : "text-muted-foreground/35"
                      }`}
                    >
                      {categoryIcons[cap.category] ?? "·"}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-0.5">
                        <h3 className="font-semibold text-sm tracking-tight">{cap.category}</h3>
                        {isOpen && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[10px] px-2 py-0.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 font-medium"
                          >
                            open
                          </motion.span>
                        )}
                      </div>
                      {!isOpen && (
                        <p className="text-muted-foreground text-xs truncate">
                          {cap.description}
                        </p>
                      )}
                    </div>

                    {/* Tool pills — collapsed */}
                    <div className="hidden sm:flex items-center gap-1 mr-3 flex-shrink-0">
                      {cap.tools.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-1.5 py-0.5 rounded border border-white/[0.07] text-muted-foreground/50 bg-white/[0.03]"
                        >
                          {t}
                        </span>
                      ))}
                      {cap.tools.length > 3 && (
                        <span className="text-[10px] text-muted-foreground/35">
                          +{cap.tools.length - 3}
                        </span>
                      )}
                    </div>

                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground/40 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Expanded */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {cap.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5">
                            {cap.tools.map((tool) => (
                              <span
                                key={tool}
                                className="text-xs px-2.5 py-1 rounded-md border border-violet-500/15 bg-violet-500/5 text-violet-300/80 font-medium"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>

                          {snippets.length > 0 && (
                            <div className="terminal">
                              <div className="terminal-header">
                                <div className="terminal-dot" style={{ background: "rgba(239,68,68,0.6)" }} />
                                <div className="terminal-dot" style={{ background: "rgba(234,179,8,0.6)" }} />
                                <div className="terminal-dot" style={{ background: "rgba(34,197,94,0.6)" }} />
                                <span className="ml-2 text-[10px] text-muted-foreground/35 font-mono">
                                  {cap.category.toLowerCase().replace(/[\s/]+/g, "_")}.sh
                                </span>
                              </div>
                              {snippets.map((s, si) => (
                                <div key={si} className="mb-2 last:mb-0">
                                  <div className="terminal-line">
                                    <span className="terminal-prompt">$</span>
                                    <span className="terminal-cmd">{s.cmd}</span>
                                  </div>
                                  <div className="terminal-output">{s.output}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
