# GradeGit

**GitHub repository analytics — paste a repo URL, get a full breakdown of every contributor's work, automatic risk flags, file ownership, and commit patterns.**

Answers the questions your team lead actually cares about: who writes tests, who owns critical files, who's carrying the work, and who needs a closer look.

## Demo
<img width="1920" height="4601" alt="screencapture-gradegit-production-up-railway-app-dashboard-2026-03-26-00_31_11" src="https://github.com/user-attachments/assets/f7dcd99c-4398-4ad6-baf5-8cde2416eb47" />

## Why I built this

GitHub's built-in insights only show commit counts. I wanted something that actually surfaces risk: who's merging huge PRs with no tests, who owns 90% of a critical file, who's been quiet for weeks.

GradeGit is that tool.

## What it does

Paste in a GitHub repo URL. GradeGit fetches up to 100 commits, categorises every file touched by type (code, tests, config, UI, docs), and builds a per-author breakdown across six panels.

You can also analyse a specific branch by including it in the URL (e.g. `github.com/owner/repo/tree/my-branch`).

Contributors are automatically flagged with 🔵 🔴 🟡 based on how their activity compares to the rest of the team. A contributor can carry multiple flags at once. See [Flagging logic](#flagging-logic) below for the exact thresholds.

## Dashboard panels

**01 · Contribution Types** — Stacked bar showing each contributor's lines by category. Quickest way to see who writes tests and who doesn't.

**02 · Code & Commit Matrix** — Two colour-coded tables: lines changed per category (code, tests, config, UI, docs), and commit count / total lines / average lines per commit. Cells highlighted against the team distribution.

**03 · Issues & Pull Requests** — Per-author breakdown of PRs opened, merged, and closed, plus hygiene signals like missing labels, descriptions, and milestones. Only shows users with at least one issue or PR.

**04 · Commit Timeline** — Daily commit activity across the full history. Spot crunch periods, long gaps, or last-minute pushes.

**05 · File Ownership** — Top 30 files by lines changed with per-author percentages. Lock files and binary assets are filtered out automatically. Find bus-factor risks — files where one person owns 90%+.

**06 · Risk Flags** — Automatic flagging based on the team's own distribution. The same logic works on a 2-person project and a 20-person project.

## Flagging logic

Each check is independent, an author can carry multiple flags at once. Thresholds are relative to the team's own distribution, so the same logic works on a 2-person project and a 20-person project.

| Flag | Meaning | Condition |
|------|---------|-----------|
| 🔵 | Carrying the team | Commits > mean + 2σ |
| 🔴 | Low contribution | Commits < mean − 0.5σ |
| 🟡 | Needs review | Avg lines/commit > mean + 2σ, **or** > 500 absolute |
| 🟡 | Needs review | 5+ commits with zero test lines written |

Lock files (e.g. `package-lock.json`, `yarn.lock`, `Cargo.lock`) are excluded entirely from line counts so they don't inflate commit sizes or config totals.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth.js v4 (GitHub OAuth) |
| Charts | Recharts |
| Data source | GitHub REST API |
| Language | TypeScript |

## Getting started

### Prerequisites

- Node.js 20+
- A GitHub OAuth App ([create one here](https://github.com/settings/developers))

### Setup

```bash
git clone https://github.com/BryanRoubos/gradegit.git
cd gradegit
npm install
```

Create `.env.local`:

```env
GITHUB_ID=your_github_oauth_app_client_id
GITHUB_SECRET=your_github_oauth_app_client_secret
NEXTAUTH_SECRET=any_random_string
NEXTAUTH_URL=http://localhost:3000
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with GitHub. Authenticated users are redirected straight to the dashboard; unauthenticated visits to `/dashboard` are redirected to the landing page.

## Live demo

[gradegit-production.up.railway.app](https://gradegit-production.up.railway.app/)

## File categorisation

Every file touched in a commit is assigned one of five types:

| Type | Matched by |
|------|-----------|
| **Test** | `*.test.*`, `*.spec.*`, `__tests__/`, `/test/`, `/tests/` |
| **Docs** | `*.md`, `*.txt`, `*.rst`, `*.mdx`, `docs/` |
| **UI** | `*.css`, `*.scss`, `*.sass`, `*.less`, images, `/components/`, `/styles/`, `/public/` |
| **Config** | `*.json`, `*.yaml`, `*.toml`, `*.env`, Dockerfiles, `.github/`, dotfiles |
| **Code** | Everything else |

## Limitations

- Capped at 100 commits per analysis to stay within GitHub API rate limits
- Analyses the default branch unless a branch is specified in the URL
- Issues and PRs are also capped at 100 items each
- GitLab support is planned but not yet implemented
- Large repositories may take 15–20 seconds to analyse

## License

MIT
