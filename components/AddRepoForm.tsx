"use client"

import { useState } from "react"

export default function AddRepoForm() {
  const [repoUrl, setRepoUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [commitCount, setCommitCount] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setCommitCount(null)

    const trimmed = repoUrl.trim()
    if (!trimmed) {
      setError("Enter a repository URL")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/repo/commits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: trimmed }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Failed to fetch commits")
        return
      }

      setCommitCount(Array.isArray(data) ? data.length : 0)
      setRepoUrl("")
    } catch {
      setError("Failed to fetch commits")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Add Repository</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Repository URL (e.g. owner/repo or https://github.com/owner/repo)"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={loading}
          className="rounded border border-slate-300 px-3 py-2"
          aria-label="Repository URL"
        />
        <button
          type="submit"
          disabled={loading}
          className="ml-2 rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-50"
          aria-label="Add repository"
        >
          {loading ? "Loading..." : "Add"}
        </button>
      </form>
      {error && (
        <p className="mt-2 text-red-600" role="alert">
          {error}
        </p>
      )}
      {commitCount !== null && (
        <p className="mt-2 text-green-600">
          Fetched {commitCount} commits
        </p>
      )}
    </div>
  )
}

