"use client"

import { signIn } from "next-auth/react"

const SignInButton = () => (
    <div>
        <button
      type="button"
      onClick={() => signIn("github")}
      className="rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
      aria-label="Sign in with GitHub"
    >
        Sign In with GitHub
    </button>
    </div>
)

export default SignInButton;