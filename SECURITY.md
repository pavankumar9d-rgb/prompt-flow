# 🛡️ Prompt-Flow Pro: Security & Privacy Disclosure

Prompt-Flow Pro is architected as an **enterprise-grade engineering intelligence layer**. We prioritize the security of your proprietary project code and user data through production-ready authentication and local context processing.

## 1. Secure Authentication & Session Management
We leverage **Supabase Auth** and **Next.js 15 Middleware** for robust security:
- **HttpOnly Cookies**: Sessions are stored in secure, HttpOnly cookies to prevent XSS-based token theft.
- **Server-Side Verification**: Every protected route (`/dashboard`, `/settings`) is verified server-side using `supabase.auth.getUser()`.
- **CSRF Protection**: Native Next.js and Supabase cookie handling ensures protection against cross-site request forgery.
- **Generic Error Messaging**: System responses are limited to generic "Invalid credentials" to prevent user enumeration.

## 2. Local-Only Context Processing
All file content and project manifests (e.g., `package.json`, `tsconfig.json`) provided to the **Context Injector** are processed entirely within the browser. 

- **No Remote Transmission**: Your project files never leave your machine.
- **No Data Persistence**: Injected context is volatile. Once you close the tab, the context is permanently purged.
- **No Telemetry**: We do not collect metrics on which dependencies you use or what your file structures look like.

## 3. Technical Proof of Runtime Isolation
The **System Engine** is a pure functional TypeScript layer that runs within the browser's sandbox. 

- **Volatile Memory Handling**: We utilize standard JS variables and React state to hold project context. 
- **Zero-External fetch() Audit**: You can verify our zero-telemetry claim by opening the Browser DevTools (Network Tab). 

## 4. CLI Loop Security
When using the `bunx prompt-flow` CLI, data is transmitted to your local dashboard via a standard Base64URL query parameter. This remains entirely within your local network loop (`127.0.0.1`). 

- **No Intermediate Servers**: The CLI talks directly to the Next.js dev server running on your machine.
- **Header-Only Injection**: We do not write to your project files; we only read the manifests and pipe them to the browser.

## 5. Why Use Point-In-Time Context?
Prompt-Flow Pro is designed for **Surgical Engineering**. Instead of granting an AI agent full "read/write" access to your entire repository, you selectively inject only the critical constraints needed for a specific task. 

---
*Architected for Zero Hallucination. Built for Zero Breach.*
