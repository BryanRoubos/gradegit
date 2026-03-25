"use client";

import Header from "@/components/Header";
import { signIn } from "next-auth/react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-8 pt-28 pb-16 text-center">
        <span className="inline-block text-xs text-white/40 border border-white/10 rounded-full px-3 py-1 mb-8 tracking-widest uppercase">
          Repository Analytics
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-6">
          See exactly who<br />
          <span className="text-emerald-400">built what.</span>
        </h1>
        <p className="text-white/50 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Paste a GitHub repo URL. GradeGit breaks down every contributor's work by type — code, tests, config, UI, docs and flags who's carrying the team.
        </p>
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="inline-flex items-center gap-3 bg-emerald-400 text-zinc-950 font-semibold px-8 py-4 rounded text-base hover:bg-emerald-300 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-400/20"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Continue with GitHub
        </button>
      </section>

      {/* Mock preview */}
      <section className="max-w-4xl mx-auto px-8 pb-20">
        <div className="rounded-xl border border-white/8 overflow-hidden bg-white/2">
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/3">
            <div className="w-3 h-3 rounded-full bg-red-500/40" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
            <div className="w-3 h-3 rounded-full bg-green-500/40" />
            <div className="flex-1 mx-4 h-6 rounded bg-white/5">
              <span className="text-white/20 text-xs px-3 leading-6 block">github.com/your-org/your-repo</span>
            </div>
          </div>
          {/* Stats */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Commits", value: "247" },
                { label: "Contributors", value: "8" },
                { label: "Files Touched", value: "134" },
              ].map(s => (
                <div key={s.label} className="bg-white/3 border border-white/8 rounded-lg p-4">
                  <p className="text-white/30 text-xs mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-emerald-400">{s.value}</p>
                </div>
              ))}
            </div>
            {/* Mini matrix */}
            <div className="bg-white/3 border border-white/8 rounded-lg overflow-hidden">
              <div className="px-4 py-2 border-b border-white/5 text-xs text-white/30 uppercase tracking-wider">
                Contribution Matrix
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/3">
                    <th className="text-left p-3 text-white/30 font-normal w-32" />
                    {["b.roubos", "alex", "k.lorp", "t.s.min"].map(a => (
                      <th key={a} className="p-3 text-white/40 font-normal text-center">{a}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Code", values: ["2234", "2089", "1627", "90"], colors: ["text-blue-300 bg-blue-500/10", "text-blue-300 bg-blue-500/10", "text-white/60", "text-red-300 bg-red-500/10"] },
                    { label: "Tests", values: ["1402", "174", "107", "22"], colors: ["text-blue-300 bg-blue-500/10", "text-white/60", "text-white/60", "text-white/60"] },
                    { label: "Docs", values: ["16", "25", "14", "850"], colors: ["text-red-300 bg-red-500/10", "text-white/60", "text-red-300 bg-red-500/10", "text-blue-300 bg-blue-500/10"] },
                  ].map(row => (
                    <tr key={row.label} className="border-t border-white/5">
                      <td className="p-3 text-white/40">{row.label}</td>
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
          <div key={f.num} className="bg-white/3 border border-white/8 rounded-xl p-6">
            <p className="text-4xl font-extrabold text-emerald-400/20 mb-3">{f.num}</p>
            <p className="text-white/90 font-semibold mb-2">{f.title}</p>
            <p className="text-white/35 text-xs leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-white/20 text-xs tracking-widest uppercase mb-6">
          Free to use · No data stored · GitHub OAuth
        </p>
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="inline-flex items-center gap-2 bg-emerald-400 text-zinc-950 font-semibold px-6 py-3 rounded text-sm hover:bg-emerald-300 transition-colors"
        >
          Analyze your first repo →
        </button>
      </footer>

    </main>
  );
}