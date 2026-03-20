"use client"

import { signIn, signOut } from "next-auth/react"

const SignOutButton = () => (
    <div>
        <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
      aria-label="Sign out"
    >
        Sign Out
    </button>
    </div>
)

export default SignOutButton;