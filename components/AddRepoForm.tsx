"use client";

import { useState } from "react";
import { RepoAnalysis } from "@/lib/analyze";
import ContribBarChart from "@/components/charts/ContribBarChart";
import CommitTimeline from "@/components/charts/CommitTimeline";
import MatrixTable from "@/components/MatrixTable";
import FileContribTable from "@/components/FileContribTable";
import IssuesPRMatrix from "@/components/IssuesPRMatrix"


export default function AddRepoForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<RepoAnalysis | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setAnalysis(null);

    const trimmed = repoUrl.trim();
    if (!trimmed) {
      setError("Enter a repository URL");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/repo/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Analysis failed");
        return;
      }

      setAnalysis(data);
      setRepoUrl("");
    } catch {
      setError("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="owner/repo or https://github.com/owner/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={loading}
          className="flex-1 rounded border border-slate-300 px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {error && (
        <p className="text-red-600 mb-4" role="alert">
          {error}
        </p>
      )}

      {loading && (
        <p className="text-gray-500">
          Fetching commit details, this may take a moment...
        </p>
      )}

      {analysis && (
        <div className="flex flex-col gap-8">
          {/* summary bar */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border p-4">
              <p className="text-sm text-gray-500">Total Commits</p>
              <p className="text-2xl font-bold">{analysis.totalCommits}</p>
            </div>
            <div className="bg-white rounded-lg border p-4">
              <p className="text-sm text-gray-500">Contributors</p>
              <p className="text-2xl font-bold">{analysis.authors.length}</p>
            </div>
            <div className="bg-white rounded-lg border p-4">
              <p className="text-sm text-gray-500">Files Touched</p>
              <p className="text-2xl font-bold">
                {Object.keys(analysis.fileContributions).length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <ContribBarChart authors={analysis.authors} />
          </div>

          <div className="bg-white rounded-lg border p-6">
            <MatrixTable authors={analysis.authors} />
          </div>

          <div className="bg-white rounded-lg border p-6">
            <IssuesPRMatrix
              issueStats={analysis.issueStats}
              prStats={analysis.prStats}
            />
          </div>

          <div className="bg-white rounded-lg border p-6">
            <CommitTimeline timeline={analysis.commitTimeline} />
          </div>

          <div className="bg-white rounded-lg border p-6">
            <FileContribTable fileContributions={analysis.fileContributions} />
          </div>
        </div>
      )}
    </div>
  );
}
