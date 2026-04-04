# 🛡️ Prompt-Flow Pro: Security & Privacy Disclosure

Prompt-Flow Pro is architected as an **offline-first engineering intelligence layer**. We prioritize the security of your proprietary project code above all else.

## 1. Local-Only Context Processing
All file content and project manifests (e.g., `package.json`, `tsconfig.json`) provided to the **Context Injector** are processed entirely within your local browser's memory. 

- **No Remote Transmission**: Your project files never leave your machine.
- **No Data Persistence**: Injected context is volatile. Once you refresh or close the tab, the context is permanently purged from system memory.
- **No Telemetry**: We do not collect metrics on which dependencies you use, what your file structures look like, or what specific errors you are debugging.

## 2. Deterministic Isolation
The **System Engine** operates as a pure TypeScript compiler that runs locally. It does not use any cloud-based "re-ranking" or "vector search" providers to manage your context. The prompt compilation happens on your CPU, for your eyes only.

## 3. CLI Transmissions
When using the `bunx prompt-flow` CLI, data is transmitted to your local dashboard via a standard URL query parameter (`cli_context`). This remains entirely within your local loop (`localhost`).

## 4. Why Use Point-In-Time Context?
Prompt-Flow Pro is designed for **Surgical Engineering**. Instead of granting an AI agent full "read/write" access to your entire repository, you selectively inject only the critical constraints needed for a specific task. This "Least Privilege" approach to context is our primary security advantage.

---
*Architected for Zero Hallucination. Built for Zero Breach.*
