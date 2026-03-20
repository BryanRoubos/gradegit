import { NextRequest, NextResponse } from "next/server"
import { getCommits } from "@/lib/github"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const parseOwnerAndRepo = (repoUrl: string): { owner: string; repo: string } => {
  const trimmed = repoUrl.trim()
  if (trimmed.includes("github.com")) {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`)
    const parts = url.pathname.replace(/^\//, "").split("/")
    return { owner: parts[0], repo: parts[1]?.replace(/\.git$/, "") ?? "" }
  }
  const parts = trimmed.split("/")
  return { owner: parts[0] ?? "", repo: parts[1] ?? "" }
}

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { repoUrl } = await req.json()
  const { owner, repo } = parseOwnerAndRepo(repoUrl)

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Invalid repo URL. Use owner/repo or full GitHub URL" },
      { status: 400 }
    )
  }

  try {
    const commits = await getCommits(owner, repo, session.accessToken)
    return NextResponse.json(commits)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch commits" },
      { status: 500 }
    )
  }
}  