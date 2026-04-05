# 🛡️ Prompt-Flow Pro: Privacy Policy

**Effective Date: April 5, 2026**

Prompt-Flow Pro is architected with a **Security-First, Local-First** philosophy. We recognize that your source code is your most valuable asset, and we have designed our platform to ensure it remains exclusively under your control.

## 1. Local Runtime Processing
**Your code never leaves your local runtime.**

Unlike traditional cloud-based AI tools, Prompt-Flow Pro does not transmit your source code, project manifests (`package.json`, `tsconfig.json`), or sensitive project metadata to any remote server for processing. 

- **Memory-Only Execution**: All project context is processed entirely in your machine's volatile memory (RAM). 
- **Zero-Persistence**: Once your local session is closed (e.g., closing the browser tab or stopping the dev server), all processed context is permanently purged from memory.

## 2. Telemetry & Transparency
We believe in full transparency for our users.

- **Optional Telemetry**: If we collect any basic usage metrics (e.g., "application started"), we provide an explicit `--no-telemetry` flag in our CLI to disable all external communication.
- **Auditable Runtime**: Senior engineers are encouraged to audit our network traffic. You will observe that zero bytes of your code are sent to external endpoints.

## 3. Dedicated Authentication
While we use Supabase for authentication and profile management (e.g., your plan type), this is strictly for access control and does not grant us or any third party access to your local project files.

---
*Built for engineers who value privacy as much as performance.*
