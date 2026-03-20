"use client"

import { useSession } from "next-auth/react"
import SignOutButton from "@/components/SignOutButton"


export default function Header() {
    const { data: session } = useSession()  
    if (!session) {
        return <div>Not logged in</div>
    }
    return <div>Logged in as {session.user?.name} <SignOutButton /></div>
}