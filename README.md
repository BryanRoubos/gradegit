# GradeGit

**GitHub repository analytics — paste a repo URL, get a full breakdown of every contributor's work, automatic risk flags, file ownership, and commit patterns.**

Answers the questions your team lead actually cares about: who writes tests, who owns critical files, who's carrying the work, and who needs a closer look.

## Demo
<img width="1920" height="4601" alt="screencapture-gradegit-production-up-railway-app-dashboard-2026-03-26-00_32_52" src="https://github.com/user-attachments/assets/26b13dc0-5f74-4a6a-8606-db9c0f9ccdee" />



## Why I built this

GitHub's built-in insights only show commit counts. I wanted something that actually surfaces risk: who's merging huge PRs with no tests, who owns 90% of a critical file, who's been quiet for weeks.

GradeGit is that tool.

## What it does

Paste in a GitHub repo URL. GradeGit fetches up to 100 commits, categorises every file touched by type (code, tests, config, UI, docs), and builds a per-author breakdown across six panels.

Contributors are automatically flagged:

| Flag | What it means |
|------|--------------|
| 🔵 | Carrying the team — commit count well above the team average |
| 🔴 | Low contribution — notably fewer commits than the rest |
| 🟡 | Needs review — unusually large commits (hard to review) or significant code with zero test coverage |

A contributor can carry **multiple flags** — someone can be both 🔴 low-commit and 🟡 writing 500-line changesets at the same time.

## Dashboard panels

**01 · Contribution Types** — Stacked bar showing each contributor's lines by category. Quickest way to see who writes tests and who doesn't.

**02 · Code & Commit Matrix** — Two colour-coded tables: lines changed per category, and commit count / total lines / average lines per commit. Cells highlighted against the team.

**03 · Issues & Pull Requests** — Per-author breakdown of PRs opened, merged, closed, labelled, described. Only shows users with at least one issue or PR.

**04 · Commit Timeline** — Daily commit activity across the full history. Spot crunch periods, long gaps, or last-minute pushes.

**05 · File Ownership** — Top 30 files by lines changed with per-author percentages. Find bus-factor risks — files where one person owns 90%+.

**06 · Risk Flags** — Automatic flagging based on the team's own distribution. The same logic works on a 2-person project and a 20-person project.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth.js (GitHub OAuth) |
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

## Live demo

[gradegit-production.up.railway.app](https://gradegit-production.up.railway.app/)

## Limitations

- Capped at 100 commits per analysis to stay within GitHub API rate limits
- Analyses the default branch unless a branch is specified in the URL (e.g. `github.com/owner/repo/tree/my-branch`)
- GitLab support is planned but not yet implemented
- Large repositories may take 15–20 seconds to analyse

## License

MIT
