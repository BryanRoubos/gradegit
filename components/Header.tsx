"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white">
      <span className="text-lg font-bold tracking-tight text-gray-900">GradeGit</span>
      {session ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{session.user?.name}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors underline"
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Sign in with GitHub
        </button>
      )}
    </header>
  )
}