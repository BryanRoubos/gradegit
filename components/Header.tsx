"use client"

import { useSession } from "next-auth/react"
import SignOutButton from "@/components/SignOutButton"

export default function Header() {
  const { data: session } = useSession()
  if (!session) return null
  return (
    <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <span className="font-semibold text-gray-900">GradeGit</span>
      <div className="flex items-center gap-3 text-sm text-gray-600">
        Logged in as <span className="font-medium text-gray-900">{session.user?.name}</span>
        <SignOutButton />
      </div>
    </div>
  )
}