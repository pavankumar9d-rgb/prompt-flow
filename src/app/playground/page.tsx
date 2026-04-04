"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PlaygroundEditor } from "@/components/playground/PlaygroundEditor";
import { PlaygroundOutput } from "@/components/playground/PlaygroundOutput";
import { VariableInput } from "@/components/prompt/VariableInput";
import { ContextInjector } from "@/components/prompt/ContextInjector";
import { formatPrompt } from "@/lib/formatPrompt";

const INITIAL_PROMPT = `You are a senior TypeScript developer.
Write a [Target] implementation that uses the following schema:

\`\`\`typescript
[Schema]
\`\`\`

Ensure it is fully typed and uses best practices.`;

export default function PlaygroundPage() {
  const [editorContent, setEditorContent] = useState(INITIAL_PROMPT);
  const [variables, setVariables] = useState<Record<string, string>>({});

  // Extremely naive variable parser for the playground demo
  // Looks for [Word] patterns
  const extractVariables = (text: string) => {
    const regex = /\[([a-zA-Z0-9]+)\]/g;
    const matches = Array.from(text.matchAll(regex));
    // Unique keys
    const keys = Array.from(new Set(matches.map(m => m[1])));
    return keys.map(k => ({
      key: k,
      label: k,
      placeholder: `Value for ${k}...`,
      required: true,
    }));
  };

  const dynamicVariables = extractVariables(editorContent);

  const handleVariableChange = (key: string, val: string) => {
    setVariables(prev => ({ ...prev, [key]: val }));
  };

  const handleContextInject = (content: string, _filename: string) => {
    if (!content) return;
    if (dynamicVariables.length > 0) {
      handleVariableChange(dynamicVariables[0].key, content);
    }
  };

  const finalOutput = formatPrompt("Playground Prompt", editorContent, variables, "claude");

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        
        <main className="flex-1 overflow-hidden p-6">
          <div className="h-full flex flex-col mx-auto max-w-7xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-1">Prompt Playground</h1>
              <p className="text-white/40 text-sm">Build, test, and inject context into prompts in real-time.</p>
            </div>
            
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
              
              {/* Left Column: Editor & Inputs */}
              <div className="lg:col-span-6 flex flex-col gap-6 h-full min-h-0">
                <div className="flex-1 flex flex-col h-1/2 min-h-[300px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-medium text-white/40 uppercase tracking-widest">Base Template</span>
                  </div>
                  <div className="flex-1 min-h-0 rounded-xl overflow-hidden glass">
                    <PlaygroundEditor 
                      value={editorContent} 
                      onChange={setEditorContent} 
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col h-1/2 min-h-0 bg-[#111113] border border-white/[0.06] rounded-2xl glass p-5 overflow-y-auto custom-scrollbar">
                  {dynamicVariables.length > 0 ? (
                    <>
                      <VariableInput 
                        variables={dynamicVariables} 
                        values={variables} 
                        onChange={handleVariableChange} 
                      />
                      <ContextInjector onInject={handleContextInject} />
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <p className="text-white/40 text-sm mb-2">No variables detected.</p>
                      <p className="text-white/20 text-xs">Type <code className="text-violet-400 bg-violet-400/10 px-1 rounded">[Variable]</code> in the editor to add parameters.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Final Output state */}
              <div className="lg:col-span-6 flex flex-col h-full min-h-0">
                <PlaygroundOutput 
                  label="Generated Context (Claude Format)"
                  content={finalOutput}
                  className="flex-1 min-h-0 shadow-2xl shadow-black/50"
                />
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
