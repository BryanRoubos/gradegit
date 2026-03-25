import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Header from "@/components/Header"
import AddRepoForm from "@/components/AddRepoForm"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AddRepoForm />
    </div>
  )
}