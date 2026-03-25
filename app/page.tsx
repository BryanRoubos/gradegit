"use client";

import Header from "@/components/Header";
import { signIn } from "next-auth/react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-8 pt-28 pb-16 text-center">
        <span className="inline-block text-xs text-gray-600 border border-gray-300 rounded-full px-3 py-1 mb-8 tracking-widest uppercase">
          Repository Analytics
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-6 text-gray-900">
          See exactly who
          <br />
          <span className="text-emerald-600">built what.</span>
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Paste a GitHub repo URL. GradeGit breaks down every contributor's work
          by type — code, tests, config, UI, docs, flags outliers automatically,
          tracks file ownership, and surfaces issues and PR patterns.
        </p>
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="inline-flex items-center gap-3 bg-gray-900 text-white font-semibold px-8 py-4 rounded text-base hover:bg-gray-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>
      </section>

      {/* Mock preview — contribution matrix with flagging */}
      <section className="max-w-4xl mx-auto px-8 pb-20">
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 mx-4 h-6 rounded bg-gray-100">
              <span className="text-gray-400 text-xs px-3 leading-6 block">
                github.com/your-org/your-repo
              </span>
            </div>
          </div>
          <div className="p-6">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Commits", value: "247" },
                { label: "Contributors", value: "8" },
                { label: "Files Touched", value: "134" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <p className="text-gray-400 text-xs mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Contribution type matrix */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
              <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                Code &amp; Commit Contribution Matrix
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 text-gray-400 font-normal w-36" />
                    {[
                      { name: "b.roubos", flag: null },
                      { name: "alex", flag: "🔵" },
                      { name: "k.lorp", flag: null },
                      { name: "t.s.min", flag: "🔴" },
                    ].map((a) => (
                      <th
                        key={a.name}
                        className="p-3 text-gray-500 font-normal text-center"
                      >
                        <div className="flex flex-col items-center gap-0.5">
                          <span>{a.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Code",
                      values: ["2234", "3891", "1627", "90"],
                      colors: [
                        "",
                        "bg-blue-100 text-blue-800",
                        "",
                        "bg-red-100 text-red-800",
                      ],
                    },
                    {
                      label: "Tests",
                      values: ["1402", "980", "107", "0"],
                      colors: ["", "", "", "bg-red-100 text-red-800"],
                    },
                    {
                      label: "Config",
                      values: ["84", "120", "310", "12"],
                      colors: ["", "", "", "bg-red-100 text-red-800"],
                    },
                    {
                      label: "UI",
                      values: ["430", "205", "88", "14"],
                      colors: ["", "", "", "bg-red-100 text-red-800"],
                    },
                    {
                      label: "Docs",
                      values: ["16", "25", "14", "850"],
                      colors: [
                        "bg-red-100 text-red-800",
                        "",
                        "bg-red-100 text-red-800",
                        "bg-blue-100 text-blue-800",
                      ],
                    },
                  ].map((row) => (
                    <tr key={row.label} className="border-t border-gray-100">
                      <td className="p-3 text-gray-500 font-medium">
                        {row.label}
                      </td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className={`p-3 text-center font-mono ${row.colors[i] || "text-gray-700"}`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Flag legend */}
            <div className="flex gap-5 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                🔵 <span>Above average (&gt;2 std dev)</span>
              </span>
              <span className="flex items-center gap-1.5">
                🔴 <span>Below average (&lt;0.5 std dev)</span>
              </span>
              <span className="flex items-center gap-1.5">
                🟡 <span>Needs attention (no tests, huge commits)</span>
              </span>
            </div>

            {/* File ownership preview */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                File Ownership
              </div>
              <table className="w-full text-xs">
                <tbody>
                  {[
                    {
                      file: "lib/analyze.ts",
                      owners: [
                        { name: "b.roubos", pct: 74 },
                        { name: "alex", pct: 26 },
                      ],
                    },
                    {
                      file: "app/api/repo/analyze/route.ts",
                      owners: [
                        { name: "k.lorp", pct: 58 },
                        { name: "b.roubos", pct: 42 },
                      ],
                    },
                    {
                      file: "README.md",
                      owners: [
                        { name: "t.s.min", pct: 91 },
                        { name: "b.roubos", pct: 9 },
                      ],
                    },
                  ].map((row) => (
                    <tr
                      key={row.file}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-2 font-mono text-gray-600 w-72">
                        📄 {row.file}
                      </td>
                      <td className="p-2">
                        <div className="flex gap-3">
                          {row.owners.map((o) => (
                            <span key={o.name} className="text-gray-600">
                              {o.name}{" "}
                              <span className="text-gray-400">({o.pct}%)</span>
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* What's in the dashboard */}
      <section className="max-w-4xl mx-auto px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Everything in one dashboard
        </h2>
        <p className="text-gray-400 text-sm text-center mb-10">
          Six panels, one URL. No setup beyond signing in.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: "01",
              title: "Contribution Types",
              desc: "Stacked bar chart showing every contributor's lines changed by category — source code, tests, config, UI assets, and docs. See who writes tests and who doesn't at a glance.",
            },
            {
              num: "02",
              title: "Code & Commit Matrix",
              desc: "Two colour-coded tables: one by contribution type (lines changed per category), one by total commits, total lines, and average lines per commit. Cells highlighted against the team mean.",
            },
            {
              num: "03",
              title: "Issues & Pull Request Matrix",
              desc: "Per-author breakdown of issues opened, closed, labelled, and milestoned, plus PR merge rates and self-merges. Only shows users who have at least one issue or PR.",
            },
            {
              num: "04",
              title: "Commit Timeline",
              desc: "Daily commit distribution across the analysed history. Spot bursts of activity, quiet periods, and last-minute crunch patterns across the whole team.",
            },
            {
              num: "05",
              title: "File Ownership",
              desc: "Top 30 files by lines changed with per-author ownership percentages. Find bus-factor risks and see who actually owns each part of the codebase.",
            },
            {
              num: "06",
              title: "Heuristic Flagging",
              desc: "Authors flagged automatically using mean ± std deviation: 🔵 well above average, 🔴 well below, 🟡 no test contributions with 5+ commits or unusually large commit sizes.",
            },
          ].map((f) => (
            <div
              key={f.num}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <p className="text-3xl font-extrabold text-emerald-600 mb-3">
                {f.num}
              </p>
              <p className="text-gray-900 font-semibold mb-2">{f.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Flagging explained */}
      <section className="max-w-4xl mx-auto px-8 pb-24">
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            How flagging works
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Hard thresholds don't work across projects of different sizes.
            GradeGit uses mean and standard deviation across the whole team, so
            the same logic applies whether you have 2 contributors or 20.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                flag: "🔵",
                label: "Above average",
                bg: "bg-blue-50 border-blue-200",
                desc: "Commit count is more than 2 standard deviations above the team mean. This contributor is carrying significantly more than their share of the work.",
              },
              {
                flag: "🔴",
                label: "Below average",
                bg: "bg-red-50 border-red-200",
                desc: "Commit count is more than 0.5 standard deviations below the team mean. This contributor may be less engaged or could need support.",
              },
              {
                flag: "🟡",
                label: "Needs attention",
                bg: "bg-yellow-50 border-yellow-200",
                desc: "No test contributions despite 5+ commits (and above the line mean), or average lines per commit is more than 2 std deviations above the mean, a sign of large, hard-to-review changes.",
              },
            ].map((f) => (
              <div key={f.label} className={`border rounded-lg p-4 ${f.bg}`}>
                <p className="text-2xl mb-2">{f.flag}</p>
                <p className="font-semibold text-gray-800 text-sm mb-1">
                  {f.label}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 text-center">
        <p className="text-gray-400 text-xs tracking-widest uppercase mb-6">
          Free to use · No data stored · GitHub OAuth · Capped at 100 commits
        </p>
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-6 py-3 rounded text-sm hover:bg-gray-700 transition-colors"
        >
          Analyze your first repo →
        </button>
      </footer>
    </main>
  );
}
