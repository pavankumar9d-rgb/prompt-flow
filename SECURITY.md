# 🛡️ Prompt-Flow Pro: Security & Privacy Disclosure

Prompt-Flow Pro is architected as an **offline-first engineering intelligence layer**. We prioritize the security of your proprietary project code above all else.

## 1. Local-Only Context Processing
All file content and project manifests (e.g., `package.json`, `tsconfig.json`) provided to the **Context Injector** are processed entirely within your local browser's memory. 

- **No Remote Transmission**: Your project files never leave your machine.
- **No Data Persistence**: Injected context is volatile. Once you refresh or close the tab, the context is permanently purged from system memory.
- **No Telemetry**: We do not collect metrics on which dependencies you use, what your file structures look like, or what specific errors you are debugging.

## 2. Technical Proof of Runtime Isolation
The **System Engine** is a pure functional TypeScript layer that runs within the browser's sandbox. 

- **Volatile Memory Handling**: We utilize standard JS variables and React state to hold project context. Unlike `localStorage` or `IndexedDB`, this data is held in **volatile RAM**. When the browser tab is closed, the memory is reclaimed by the OS and the data is lost forever.
- **Zero-External fetch() Audit**: You can verify our zero-telemetry claim by opening the Browser DevTools (Network Tab). You will observe that `fetch` calls are only ever made to `localhost` (for dashboard health checks) and never to external analytics or LLM proxy servers. 

## 3. CLI Loop Security
When using the `bunx prompt-flow` CLI, data is transmitted to your local dashboard via a standard Base64URL query parameter. This remains entirely within your local network loop (`127.0.0.1`). 

- **No Intermediate Servers**: There is no "Prompt-Flow" backend. The CLI talks directly to the Next.js dev server running on your machine.
- **Header-Only Injection**: We do not write to your project files; we only read the manifests and pipe them to the browser.

## 4. Why Use Point-In-Time Context?
Prompt-Flow Pro is designed for **Surgical Engineering**. Instead of granting an AI agent full "read/write" access to your entire repository, you selectively inject only the critical constraints needed for a specific task. This "Least Privilege" approach to context is our primary security advantage.

---
*Architected for Zero Hallucination. Built for Zero Breach.*
