import Link from 'next/link'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-400 to-white bg-clip-text text-transparent mb-2">
              System Settings
            </h1>
            <p className="text-zinc-400">Manage your workspace preferences and API keys.</p>
          </div>
          <Link href="/dashboard" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors border border-zinc-800">
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
            <p className="text-sm text-zinc-400 mb-6">Manage the keys used to interact with the Prompt-Flow engines.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">OpenAI API Key (Optional)</label>
                <div className="flex gap-3">
                  <input type="password" value="sk-xxxxxxxxxxxxxxxxxxxx" disabled className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 w-full max-w-md text-zinc-500 font-mono" />
                  <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors border border-zinc-700">Update</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-4">Profile & Billing</h2>
            <p className="text-sm text-zinc-400 mb-6">Your current plan governs your usage limits and available engines.</p>
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="font-medium text-blue-100">Enterprise deployment active</span>
              </div>
              <Link href="/pricing" className="text-sm text-blue-400 hover:text-blue-300 font-medium">Manage Plan →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
