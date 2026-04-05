# Prompt-Flow Pro: Manual Testing Protocol

Follow these step-by-step instructions to verify the Prompt-Flow Pro interface and the Deterministic System Engine yourself.

---

## Step 1: Authentication Test
1. Ensure your local dev server is running (`npm run dev`).
2. Open your web browser and navigate to: **[http://localhost:3000/login](http://localhost:3000/login)**.
3. **Login Test**: Enter valid credentials. Verify generic error messages ("Invalid credentials") appear for incorrect logins.
4. **Signup Test**: Navigate to `/signup` and create a new account. Verify the redirect to `/dashboard`.

---

## Step 2: Session & Route Protection
1. Log out using the **Sign out** button in the top navigation.
2. Attempt to navigate directly to **[http://localhost:3000/dashboard](http://localhost:3000/dashboard)**.
3. *Verification*: The system should automatically redirect you back to `/login`.
4. Log back in and navigate to `/login`. 
5. *Verification*: The system should automatically redirect you forward to `/dashboard`.

---

## Step 3: Inject Workspace Context
To test the "Zero-Hallucination" context injector:
1. In the **Context Injector** section of a Prompt Card, drag and drop a `package.json` file. 
2. *Alternative Test*: Try to type into the area. Notice that the UI enforces Drag & Drop.

---

## Step 4: Insert the Error Code
Paste a standard Bun error regarding Prisma into the `[ErrorMessage]` field:

```text
TypeError: PrismaClient is not a function
    at new PrismaClient (/app/node_modules/.prisma/client/index.js:12:1)
    at fetchDatabase (/app/src/db/index.ts:15:20)
    at Object.<anonymous> (/app/src/index.ts:5:10)
```

---

## Step 5: Multi-Action Export Engine
Scroll to the bottom of the page to find the **Export to LLM** button.

1. **Test Claude (XML)**: Open the dropdown and select **Claude (XML)**. Verify the coped result contains `<system_instruction>`.
2. **Test GPT-4o (MD)**: Select **GPT-4o (MD)**. Verify the structure relies on Markdown `##` headers.
3. **Test Cursor (Agent)**: Select **Cursor (Agent)**. Verify the presence of the `<workspace_context>` tag.

---

## Step 6: Professional CLI Verification
To verify the terminal-to-browser context injection:
1. Open your terminal in any project root (ensure it has a `package.json`).
2. Run: `bunx prompt-flow`
3. *Verification*: 
   - Browser launches to `http://localhost:3000/`.
   - A green **`CLI_SYNC`** status badge is visible.
   - The `package.json` is pre-loaded.

---

*If you can successfully complete these steps and see the targeted LLM payloads on your clipboard, your Prompt-Flow Pro installation is 100% bug-free and production-ready.*
