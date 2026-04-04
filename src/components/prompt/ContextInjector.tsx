"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen, FileCode2, Check, X, AlertTriangle,
  Package, Settings, TerminalSquare, Loader2, ChevronDown, ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { parsePackageJson, parseTsConfig, type InjectedContext } from "@/lib/system-engine";

// ─── Types ────────────────────────────────────────────────────────────────────

interface InjectedFileState {
  name: string;
  type: "package" | "tsconfig" | "error-stack" | "unknown";
  sizeBytes: number;
}

interface ContextInjectorProps {
  onContextChange: (ctx: InjectedContext) => void;
  className?: string;
}

// ─── Priority file classifier ─────────────────────────────────────────────────

type FileType = "package" | "tsconfig" | "error-stack" | "unknown";

function classifyFile(name: string): FileType {
  if (name === "package.json") return "package";
  if (name === "tsconfig.json" || name === "tsconfig.base.json") return "tsconfig";
  if (name.endsWith(".log") || name.toLowerCase().includes("error") || name.toLowerCase().includes("stack")) return "error-stack";
  return "unknown";
}

const FILE_META: Record<
  FileType,
  { label: string; icon: typeof FileCode2; color: string; bg: string }
> = {
  package:     { label: "package.json",  icon: Package,         color: "#34D399", bg: "rgba(52,211,153,0.08)" },
  tsconfig:    { label: "tsconfig.json", icon: Settings,        color: "#60A5FA", bg: "rgba(96,165,250,0.08)" },
  "error-stack": { label: "Error Stack",  icon: TerminalSquare,  color: "#F87171", bg: "rgba(248,113,113,0.08)" },
  unknown:     { label: "Context File",  icon: FileCode2,        color: "#A78BFA", bg: "rgba(167,139,250,0.08)" },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function ContextInjector({ onContextChange, className }: ContextInjectorProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [files, setFiles] = useState<InjectedFileState[]>([]);
  const [context, setContext] = useState<InjectedContext>({});
  const [errorStack, setErrorStack] = useState("");
  const [showErrorInput, setShowErrorInput] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Process a set of File objects ─────────────────────────────────────────

  const processFiles = useCallback(
    async (fileList: FileList | File[]) => {
      setIsProcessing(true);
      const newCtx: InjectedContext = { ...context };
      const newFiles: InjectedFileState[] = [...files];

      const arr = Array.from(fileList);

      // Priority order: package.json → tsconfig → error logs → others
      const sorted = arr.sort((a, b) => {
        const order = (f: File) => {
          if (f.name === "package.json") return 0;
          if (f.name.includes("tsconfig")) return 1;
          if (classifyFile(f.name) === "error-stack") return 2;
          return 3;
        };
        return order(a) - order(b);
      });

      for (const file of sorted) {
        if (file.size > 1024 * 200) continue; // skip files > 200KB
        const type = classifyFile(file.name);
        const raw = await file.text();

        switch (type) {
          case "package":
            newCtx.packageJson = parsePackageJson(raw) ?? undefined;
            break;
          case "tsconfig":
            newCtx.tsConfig = parseTsConfig(raw) ?? undefined;
            break;
          case "error-stack":
            newCtx.errorStack = raw.slice(0, 4000); // cap at 4k chars
            break;
          default:
            newCtx.rawFiles = [
              ...(newCtx.rawFiles ?? []),
              { name: file.name, content: raw.slice(0, 2000) },
            ];
        }

        // Avoid duplicates
        if (!newFiles.some((f) => f.name === file.name)) {
          newFiles.push({ name: file.name, type, sizeBytes: file.size });
        }
      }

      setContext(newCtx);
      setFiles(newFiles);
      onContextChange(newCtx);
      setIsProcessing(false);
      setExpanded(true);
    },
    [context, files, onContextChange]
  );

  // ── Drag handlers ─────────────────────────────────────────────────────────

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        void processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        void processFiles(e.target.files);
      }
    },
    [processFiles]
  );

  // ── Error stack inline input ──────────────────────────────────────────────

  const handleErrorStackSave = useCallback(() => {
    if (!errorStack.trim()) return;
    const newCtx = { ...context, errorStack: errorStack.trim() };
    setContext(newCtx);
    onContextChange(newCtx);
    setFiles((prev) => {
      const exists = prev.some((f) => f.name === "Error Stack Trace");
      if (exists) return prev;
      return [...prev, { name: "Error Stack Trace", type: "error-stack", sizeBytes: errorStack.length }];
    });
    setShowErrorInput(false);
  }, [context, errorStack, onContextChange]);

  // ── Remove a single file ──────────────────────────────────────────────────

  const removeFile = useCallback(
    (name: string) => {
      const file = files.find((f) => f.name === name);
      if (!file) return;

      const newCtx = { ...context };
      if (file.type === "package") delete newCtx.packageJson;
      if (file.type === "tsconfig") delete newCtx.tsConfig;
      if (file.type === "error-stack") delete newCtx.errorStack;
      if (file.type === "unknown") {
        newCtx.rawFiles = (newCtx.rawFiles ?? []).filter((f) => f.name !== name);
      }

      const newFiles = files.filter((f) => f.name !== name);
      setFiles(newFiles);
      setContext(newCtx);
      onContextChange(newCtx);
    },
    [files, context, onContextChange]
  );

  const hasFiles = files.length > 0;

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={cn("space-y-2", className)}>
      {/* Drop Zone */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragging ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.08)",
          backgroundColor: isDragging ? "rgba(124,58,237,0.06)" : "rgba(255,255,255,0.02)",
        }}
        transition={{ duration: 0.15 }}
        className="relative flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-xl cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          className="sr-only"
          accept=".json,.ts,.tsx,.log,.txt,.md"
        />

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 py-2"
            >
              <Loader2 size={20} className="text-violet-400 animate-spin" />
              <p className="text-xs text-white/40">Parsing workspace files…</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 py-1"
            >
              <div className="w-9 h-9 rounded-full bg-white/[0.05] flex items-center justify-center text-white/40">
                <FolderOpen size={17} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-white/70">
                  Drop <span className="text-violet-400">package.json</span> ·{" "}
                  <span className="text-blue-400">tsconfig.json</span> · or folder
                </p>
                <p className="text-[11px] text-white/30 mt-0.5">
                  Auto-prioritised for zero-hallucination context injection
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Injected Files List */}
      <AnimatePresence>
        {hasFiles && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white/70 transition-colors text-[11px] font-mono"
            >
              <span className="flex items-center gap-2">
                <Check size={11} className="text-emerald-400" />
                {files.length} file{files.length > 1 ? "s" : ""} injected
              </span>
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 space-y-1"
                >
                  {files.map((file) => {
                    const meta = FILE_META[file.type];
                    const Icon = meta.icon;
                    return (
                      <motion.div
                        key={file.name}
                        layout
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="flex items-center justify-between px-3 py-2 rounded-lg border border-white/[0.05]"
                        style={{ background: meta.bg }}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={13} style={{ color: meta.color }} />
                          <span
                            className="text-[11px] font-mono"
                            style={{ color: meta.color }}
                          >
                            {file.name}
                          </span>
                          <span className="text-[10px] text-white/20 font-mono">
                            {(file.sizeBytes / 1024).toFixed(1)}KB
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(file.name)}
                          className="text-white/20 hover:text-white/50 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Stack Injector */}
      <div>
        <button
          onClick={() => setShowErrorInput((v) => !v)}
          className="flex items-center gap-2 text-[11px] text-white/30 hover:text-red-400 transition-colors font-mono"
        >
          <AlertTriangle size={11} />
          {showErrorInput ? "Cancel error stack" : "+ Paste error stack trace (highest priority)"}
        </button>

        <AnimatePresence>
          {showErrorInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-2"
            >
              <textarea
                value={errorStack}
                onChange={(e) => setErrorStack(e.target.value)}
                placeholder={`Error: Cannot find module 'bun:sqlite'\n  at Object.<anonymous> (src/db/index.ts:1:1)\n  ...`}
                rows={5}
                className="w-full bg-[#0D0D10] border border-red-500/20 rounded-lg p-3 text-[11px] font-mono text-red-300/70 placeholder:text-white/15 outline-none resize-none focus:border-red-500/40 transition-colors"
              />
              <button
                onClick={handleErrorStackSave}
                disabled={!errorStack.trim()}
                className="mt-1.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-medium hover:bg-red-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <TerminalSquare size={11} />
                Inject Error Stack (Priority Override)
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
