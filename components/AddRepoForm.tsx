"use client";

import { useState } from "react";
import { RepoAnalysis } from "@/lib/analyze";
import ContribBarChart from "@/components/charts/ContribBarChart";
import CommitTimeline from "@/components/charts/CommitTimeline";
import MatrixTable from "@/components/MatrixTable";
import FileContribTable from "@/components/FileContribTable";
import IssuesPRMatrix from "@/components/IssuesPRMatrix";

const PLACEHOLDER: RepoAnalysis = {
  totalCommits: 0,
  authors: [],
  fileContributions: {},
  commitTimeline: {},
  issueStats: [],
  prStats: [],
}

export default function AddRepoForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<RepoAnalysis>(PLACEHOLDER);
  const [hasData, setHasData] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

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
      setHasData(true);
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
          className="flex-1 rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-400 px-3 py-2 focus:outline-none focus:border-gray-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-400 mb-4">Fetching commit details, this may take a moment...</p>}

      {/* always rendered, blurred when no data yet */}
      <div className={`flex flex-col gap-8 transition-all duration-300 ${!hasData ? "opacity-40 pointer-events-none select-none" : ""}`}>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Commits", value: hasData ? analysis.totalCommits : "—" },
            { label: "Contributors", value: hasData ? analysis.authors.length : "—" },
            { label: "Files Touched", value: hasData ? Object.keys(analysis.fileContributions).length : "—" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <ContribBarChart authors={analysis.authors} />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <MatrixTable authors={analysis.authors} />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <IssuesPRMatrix issueStats={analysis.issueStats} prStats={analysis.prStats} />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <CommitTimeline timeline={analysis.commitTimeline} />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <FileContribTable fileContributions={analysis.fileContributions} />
        </div>
      </div>

      {!hasData && !loading && (
        <p className="text-center text-gray-400 text-sm -mt-6">
          Enter a repository URL above to see the analysis
        </p>
      )}
    </div>
  );
}