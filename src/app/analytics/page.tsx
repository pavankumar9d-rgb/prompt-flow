import Link from 'next/link'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
              Intelligence Analytics
            </h1>
            <p className="text-zinc-400">View real-time engine usage and token statistics.</p>
          </div>
          <Link href="/dashboard" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors border border-zinc-800">
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Analytics Engine Active</h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            Your integration is successfully tracking token usage. Historical charts and detailed breakdowns will appear here once sufficient data is collected.
          </p>
        </div>
      </div>
    </div>
  )
}
