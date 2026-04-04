# Prompt-Flow Pro: Manual Testing Protocol

Follow these step-by-step instructions to verify the Prompt-Flow Pro interface and the Deterministic System Engine yourself.

---

## Step 1: Open the Application
1. Ensure your local dev server is running (`npm run dev`).
2. Open your web browser and navigate to: **[http://localhost:3000/](http://localhost:3000/)**
3. On the main dashboard, locate the Prompt Card titled **"Bun Runtime Error Diagnostics"** and click **Open**.

---

## Step 2: Inject Workspace Context
To test the "Zero-Hallucination" context injector:
1. In the **Context Injector** section, drag and drop a `package.json` file from any project. 
2. *Alternative Test*: Try to type into the area. Notice that the UI explicitly prevents typing and enforces Drag & Drop to ensure clean JSON parsing.

---

## Step 3: Insert the Error Code
Scroll down to the **Variables** section. You will see a text area for `[ErrorMessage]`. 
Copy and paste the exact error block below into that field. This is a common, real-world Bun error regarding Prisma:

```text
TypeError: PrismaClient is not a function
    at new PrismaClient (/app/node_modules/.prisma/client/index.js:12:1)
    at fetchDatabase (/app/src/db/index.ts:15:20)
    at Object.<anonymous> (/app/src/index.ts:5:10)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
```

---

## Step 4: Test the Multi-Action Export Engine
Scroll to the bottom of the page to find the **Export to LLM** button.

1. **Test Claude (XML)**
   - Click **Export to LLM** to open the dropdown menu.
   - Select **Claude (XML)**.
   - *Verification*: The button should briefly turn into a green "Copied!" checkmark.
   - Paste the result into a scratchpad (like Notepad or VS Code). Verify that the structure contains `<system_instruction>` and the specific `<chain_of_thought_protocol>` enforcing Bun native APIs.

2. **Test GPT-4o (MD)**
   - Click **Export to LLM** again.
   - Select **GPT-4o (MD)**.
   - *Verification*: The button confirms it copied.
   - Paste the result. Verify that the structure relies on Markdown `##` headers rather than XML tags, specifically tailored for OpenAi's system role.

3. **Test Cursor (Agent)**
   - Click **Export to LLM** one last time.
   - Select **Cursor (Agent)**.
   - *Verification*: The button confirms it copied.
   - Paste the result. Verify the presence of the `<workspace_context>` tag with the explicit directive: *"Read @package.json and @tsconfig.json before writing code."*

---

## Step 6: Professional CLI Verification
To verify the terminal-to-browser context injection:
1. Open your terminal in any project root (ensure it has a `package.json`).
2. Run the command:
   ```bash
   bunx prompt-flow
   ```
3. *Verification*: 
   - Your default browser should automatically launch to `http://localhost:3000/`.
   - A green **`CLI_SYNC`** status badge should be visible on the Context Injector.
   - The `package.json` should be pre-loaded into the workspace without manual dragging.

---

*If you can successfully complete these steps and see the targeted LLM payloads on your clipboard, your Prompt-Flow Pro installation is 100% bug-free and production-ready.*

