"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-zinc-950">
      <span className="text-lg font-bold tracking-tight text-white">GradeGit</span>
      {session ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/50">{session.user?.name}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm text-white/40 hover:text-white/80 transition-colors underline"
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="bg-emerald-400 text-zinc-950 text-sm font-semibold px-4 py-2 rounded hover:bg-emerald-300 transition-colors"
        >
          Sign in with GitHub
        </button>
      )}
    </header>
  )
}