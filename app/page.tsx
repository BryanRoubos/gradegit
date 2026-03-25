"use client";

import Header from "@/components/Header";
import { signIn } from "next-auth/react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      {/* Hero */}
      <section className="max-w-2xl mx-auto px-8 pt-24 pb-14 text-center">
        <span className="inline-block text-xs text-gray-500 border border-gray-300 rounded-full px-3 py-1 mb-7 tracking-widest uppercase">
          Repository Analytics
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-5 text-gray-900">
          See exactly who
          <br />
          <span className="text-emerald-600">built what.</span>
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg mx-auto">
          Paste a GitHub repo URL and get an instant breakdown of every
          contributor — who writes tests, who owns which files, who's
          carrying the team, and who needs a closer look.
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

      {/* Mock preview */}
      <section className="max-w-4xl mx-auto px-8 pb-20">
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
          {/* Browser chrome */}
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
                { label: "Contributors", value: "5" },
                { label: "Files Touched", value: "134" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-emerald-600">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Contribution matrix */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
              <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                Code &amp; Commit Contribution Matrix
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 text-gray-400 font-normal w-36" />
                    {[
                      { name: "sarah", dot: "bg-blue-400" },
                      { name: "marco", dot: "" },
                      { name: "devon", dot: "bg-yellow-400" },
                      { name: "priya", dot: "" },
                      { name: "lee", dot: "bg-red-400" },
                    ].map((a) => (
                      <th key={a.name} className="p-3 text-gray-500 font-normal text-center">
                        <div className="flex flex-col items-center gap-1">
                          {a.dot && <span className={`w-2.5 h-2.5 rounded-full inline-block ${a.dot}`} />}
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
                      values: ["4821", "1203", "890", "654", "42"],
                      colors: ["bg-blue-100 text-blue-800", "", "", "", "bg-red-100 text-red-800"],
                    },
                    {
                      label: "Tests",
                      values: ["1840", "420", "0", "280", "0"],
                      colors: ["bg-blue-100 text-blue-800", "", "bg-red-100 text-red-800", "", "bg-red-100 text-red-800"],
                    },
                    {
                      label: "Config",
                      values: ["210", "88", "0", "44", "0"],
                      colors: ["", "", "bg-red-100 text-red-800", "", "bg-red-100 text-red-800"],
                    },
                    {
                      label: "Avg lines/commit",
                      values: ["61", "74", "530", "58", "42"],
                      colors: ["", "", "bg-yellow-100 text-yellow-800", "", ""],
                    },
                  ].map((row) => (
                    <tr key={row.label} className="border-t border-gray-100">
                      <td className="p-3 text-gray-500 font-medium">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className={`p-3 text-center font-mono ${row.colors[i] || "text-gray-700"}`}>
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
                <span className="w-3 h-3 rounded-sm bg-blue-200 inline-block" />
                Carrying the team
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-red-200 inline-block" />
                Low contribution
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-yellow-300 inline-block" />
                Needs review
              </span>
            </div>

            {/* File ownership */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                File Ownership
              </div>
              <table className="w-full text-xs">
                <tbody>
                  {[
                    {
                      file: "lib/analyze.ts",
                      owners: [{ name: "sarah", pct: 74 }, { name: "marco", pct: 26 }],
                    },
                    {
                      file: "app/api/route.ts",
                      owners: [{ name: "devon", pct: 91 }, { name: "sarah", pct: 9 }],
                    },
                    {
                      file: "README.md",
                      owners: [{ name: "priya", pct: 88 }, { name: "lee", pct: 12 }],
                    },
                  ].map((row) => (
                    <tr key={row.file} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-2 font-mono text-gray-600 w-72">📄 {row.file}</td>
                      <td className="p-2">
                        <div className="flex gap-3">
                          {row.owners.map((o) => (
                            <span key={o.name} className="text-gray-600">
                              {o.name} <span className="text-gray-400">({o.pct}%)</span>
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

      {/* What's in the dashboard — tighter, less jargon */}
      <section className="max-w-4xl mx-auto px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Everything in one dashboard
        </h2>
        <p className="text-gray-400 text-sm text-center mb-10">
          Paste a URL. No setup, no tokens, no config.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: "01",
              title: "Who writes what",
              desc: "Stacked bars show each contributor's lines by category — code, tests, config, UI, docs. Instantly see who writes tests and who doesn't.",
            },
            {
              num: "02",
              title: "Contribution matrix",
              desc: "Color-coded tables break down every author by lines changed, commit count, and average commit size. Outliers are highlighted automatically.",
            },
            {
              num: "03",
              title: "Issues & pull requests",
              desc: "Per-author breakdown of PRs opened, merged, and closed — plus how often they add labels, descriptions, and reviewers.",
            },
            {
              num: "04",
              title: "Commit timeline",
              desc: "Daily commit activity across the full history. Spot crunch periods, long quiet stretches, or a last-minute push before a deadline.",
            },
            {
              num: "05",
              title: "File ownership",
              desc: "Top 30 files by lines changed, with per-author percentages. Find files where one person owns 90%+ — your bus-factor risks.",
            },
            {
              num: "06",
              title: "Automatic risk flags",
              desc: "Color-coded highlighting: blue for carrying the team, red for low contribution, yellow for needs review (huge commits, zero test coverage). Scaled to your team size.",
            },
          ].map((f) => (
            <div key={f.num} className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-extrabold text-emerald-600 mb-3">{f.num}</p>
              <p className="text-gray-900 font-semibold mb-2">{f.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Flagging explained — simpler */}
      <section className="max-w-4xl mx-auto px-8 pb-24">
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            How flags work
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            A contributor can carry multiple flags — someone can be both low-commit and
            writing huge hard-to-review changes at the same time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                color: "bg-blue-200",
                label: "Carrying the team",
                bg: "bg-blue-50 border-blue-200",
                desc: "Commit count is well above the team average. This person is doing a disproportionate share of the work.",
              },
              {
                color: "bg-red-200",
                label: "Low contribution",
                bg: "bg-red-50 border-red-200",
                desc: "Notably fewer commits than the rest of the team. Could mean they're blocked, less engaged, or working in a different branch.",
              },
              {
                color: "bg-yellow-300",
                label: "Needs review",
                bg: "bg-yellow-50 border-yellow-200",
                desc: "Commits are unusually large (hard to review), or this contributor has written significant code with zero test coverage.",
              },
            ].map((f) => (
              <div key={f.label} className={`border rounded-lg p-4 ${f.bg}`}>
                <span className={`inline-block w-4 h-4 rounded-sm mb-2 ${f.color}`} />
                <p className="font-semibold text-gray-800 text-sm mb-1">{f.label}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
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