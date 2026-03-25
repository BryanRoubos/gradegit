"use client"

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm text-gray-500 hover:text-gray-900 underline"
    >
      Sign out
    </button>
  )
}