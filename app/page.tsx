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
          See exactly who<br />
          <span className="text-emerald-600">built what.</span>
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Paste a GitHub repo URL. GradeGit breaks down every contributor's work by type — code, tests, config, UI, docs and flags who's carrying the team.
        </p>
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="inline-flex items-center gap-3 bg-gray-900 text-white font-semibold px-8 py-4 rounded text-base hover:bg-gray-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Continue with GitHub
        </button>
      </section>

      {/* Mock preview */}
      <section className="max-w-4xl mx-auto px-8 pb-20">
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 mx-4 h-6 rounded bg-gray-100">
              <span className="text-gray-400 text-xs px-3 leading-6 block">github.com/your-org/your-repo</span>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Commits", value: "247" },
                { label: "Contributors", value: "8" },
                { label: "Files Touched", value: "134" },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-emerald-600">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                Contribution Matrix
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 text-gray-400 font-normal w-32" />
                    {["b.roubos", "alex", "k.lorp", "t.s.min"].map(a => (
                      <th key={a} className="p-3 text-gray-500 font-normal text-center">{a}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Code", values: ["2234", "2089", "1627", "90"], colors: ["text-blue-700 bg-blue-100", "text-blue-700 bg-blue-100", "text-gray-600", "text-red-700 bg-red-100"] },
                    { label: "Tests", values: ["1402", "174", "107", "22"], colors: ["text-blue-700 bg-blue-100", "text-gray-600", "text-gray-600", "text-gray-600"] },
                    { label: "Docs", values: ["16", "25", "14", "850"], colors: ["text-red-700 bg-red-100", "text-gray-600", "text-red-700 bg-red-100", "text-blue-700 bg-blue-100"] },
                  ].map(row => (
                    <tr key={row.label} className="border-t border-gray-100">
                      <td className="p-3 text-gray-500">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className={`p-3 text-center font-mono ${row.colors[i]}`}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

     {/* Features */}
      <section className="max-w-4xl mx-auto px-8 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { num: "01", title: "Contribution by type", desc: "Every commit broken down by file pattern — code, tests, config, UI, and docs. No more commit count theater." },
          { num: "02", title: "Heuristic flagging", desc: "Authors flagged above/below average using mean and standard deviation across the whole team." },
          { num: "03", title: "File ownership", desc: "See which files each contributor owns, ranked by lines changed. Find your bus factor instantly." },
        ].map(f => (
          <div key={f.num} className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-4xl font-extrabold text-emerald-600 mb-3">{f.num}</p>
            <p className="text-gray-900 font-semibold mb-2">{f.title}</p>
            <p className="text-gray-600 text-xs leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 text-center">
        <p className="text-gray-400 text-xs tracking-widest uppercase mb-6">
          Free to use · No data stored · GitHub OAuth
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