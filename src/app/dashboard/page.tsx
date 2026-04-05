import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getUserProfile } from '@/lib/db'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await getUserProfile()
  const isStarter = profile?.plan === 'starter'

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      {/* Premium Upgrade Banner */}
      {isStarter && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 px-4 text-center text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
            <span>You're currently on the <strong>Starter Plan</strong>. Unlock full engineering intelligence today.</span>
            <Link 
              href="/pricing" 
              className="bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm"
            >
              UPGRADE NOW
            </Link>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 text-xl">
                P
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight block leading-none">Prompt-Flow Pro</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 block">Engineering Intelligence</span>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-zinc-400 text-xs font-medium">Logged in as</span>
                <span className="text-white text-sm font-semibold">{user.email}</span>
              </div>

              <div className="h-8 w-px bg-zinc-800 hidden md:block" />

              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border ${
                  isStarter 
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-400' 
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-emerald-500/5'
                }`}>
                  {profile?.plan || 'starter'} plan
                </div>

                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-500 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300"
                  >
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            V1.0 PRODUCTION READY
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-6 text-white leading-tight">
            Welcome back, <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">{user.email?.split('@')[0]}</span>
          </h2>
          <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed font-medium">
            Your centralized intelligence layer for deterministic software generation.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900/40 border border-zinc-800 p-10 rounded-[2rem] hover:border-blue-500/40 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all pointer-events-none" />
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Prompt Engines</h3>
            <p className="text-zinc-500 leading-relaxed mb-8 font-medium">
              Configure deterministic prompt layers with zero-flicker state hydration for engineering teams.
            </p>
            <Link href="/prompts" className="text-white bg-zinc-800 px-6 py-3 rounded-xl font-bold hover:bg-zinc-700 transition-all inline-flex items-center gap-2 group-hover:gap-3">
              Configure 
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-10 rounded-[2rem] hover:border-purple-500/40 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-purple-500/10 transition-all pointer-events-none" />
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Intelligence Analytics</h3>
            <p className="text-zinc-500 leading-relaxed mb-8 font-medium">
              Track token usage, response quality, and engine efficiency in real-time across your stack.
            </p>
            <Link href="/analytics" className="text-white bg-zinc-800 px-6 py-3 rounded-xl font-bold hover:bg-zinc-700 transition-all inline-flex items-center gap-2 group-hover:gap-3">
              View stats
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-10 rounded-[2rem] hover:border-zinc-600 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-500/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-zinc-500/10 transition-all pointer-events-none" />
            <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">System Settings</h3>
            <p className="text-zinc-500 leading-relaxed mb-8 font-medium">
              Manage API keys, team access levels, and secure integration webhooks for enterprise deployments.
            </p>
            <Link href="/settings" className="text-white bg-zinc-800 px-6 py-3 rounded-xl font-bold hover:bg-zinc-700 transition-all inline-flex items-center gap-2 group-hover:gap-3">
              Manage
              <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
