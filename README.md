# GradeGit

**GitHub repository analytics dashboard — paste a repo URL, get a full breakdown of every contributor's work by type (code, tests, config, UI, docs), colour-coded contribution matrices, heuristic flagging, file ownership percentages, and commit timeline.**

Paste in a repo URL. See exactly who wrote what, where the work is concentrated, and who might need support.

## Demo
<img width="1920" height="4120" alt="screencapture-gradegit-production-up-railway-app-dashboard-2026-03-25-17_40_59" src="https://github.com/user-attachments/assets/9680ce8f-35ba-4933-b76a-e1665c659f65" />

## Why I built this

When working in teams, it's hard to get an honest picture of contribution patterns. Tools like GitHub's built-in insights only show commit counts. I wanted something closer to what teachers and team leads actually care about: who writes tests, who owns which files, who is carrying the team.

GradeGit is that tool. It was also a project I used to go deep on data aggregation, heuristic scoring, and building a useful UI around raw API data.

## What it does

1. You enter a GitHub repository URL (supports any branch)
2. GradeGit fetches up to 100 commits with full file diff data via the GitHub API
3. Each file change is categorised by type using filename and path heuristics:
   - **Code** — source files (`.ts`, `.py`, `.js`, etc.)
   - **Tests** — files matching test/spec patterns or test directories
   - **Configuration** — JSON, YAML, dotfiles, Dockerfiles
   - **UI** — CSS, SCSS, SVG, component directories
   - **Documentation** — Markdown, RST, docs directories
4. Per-author stats are aggregated across all contribution types
5. Each author is flagged against the team mean and standard deviation (see [Flagging](#flagging) below)
6. Issues and pull request activity is fetched and broken down per contributor
7. File ownership percentages are computed for every file touched
8. Results are displayed across six interactive panels

## Dashboard panels

### 01 · Contribution Types (stacked bar chart)
Lines changed per contributor broken down by category — code, tests, config, UI, docs. The quickest way to see who writes tests and who only touches source files.

### 02 · Code & Commit Comparison Matrices
Two colour-coded tables side by side:
- **By type** — lines changed per contribution category per author
- **By metrics** — total commits, total lines changed, and average lines per commit

Cells are highlighted blue (above mean) or red (below mean) relative to the rest of the team.

### 03 · Issues & Pull Request Matrix
Per-author breakdown of:
- Issues: total opened, closed, without labels, without milestones, without description, without assignee, self-assigned
- PRs: total opened, merged, closed, without labels, without milestones, without description, self-merged

Only shows users who have created at least one issue or PR.

### 04 · Commit Timeline
Daily commit distribution across the full analysed history. Useful for spotting bursts of activity, long quiet periods, or last-minute cramming before a deadline.

### 05 · File & Folder Ownership
Top 30 files by total lines changed, with per-author ownership percentages. Find bus-factor risks and see who actually owns each part of the codebase.

### 06 · Heuristic Flagging

Hard thresholds like "fewer than 5 commits = below average" don't work across projects of different sizes and team compositions. GradeGit flags based on mean ± standard deviation across the whole team so the same logic applies whether you have 2 contributors or 20.

| Flag | Meaning | Threshold |
|------|---------|-----------|
| 🔵 Above average | This contributor is carrying significantly more than their share | Commit count > mean + 2 std dev |
| 🔴 Below average | This contributor may need support or is less engaged | Commit count < mean − 0.5 std dev |
| 🟡 Needs attention | No test contributions with 5+ commits and above-mean lines, or unusually large commits | Avg lines per commit > mean + 2 std dev |

Flags appear on contributor columns in the Code & Commit matrix and on individual cells where that contributor's value is notably high or low.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth.js (GitHub OAuth) |
| Charts | Recharts |
| Data source | GitHub REST API |
| Language | TypeScript |

## Architecture decisions

**Why analyse file diffs instead of just commit counts?**

Commit counts are a vanity metric. A single commit can change 1 line or 1000. By fetching the full diff for each commit and categorising every file touched, GradeGit builds a picture of *what kind* of work each contributor actually does, not just how often they commit.

**Why use standard deviation for flagging?**

Hard thresholds don't work across projects of different sizes and team compositions. Flagging based on mean ± standard deviation means the same logic works on a 2-person project and a 10-person project without manual tuning.

**Why cap at 100 commits?**

The GitHub API requires one request per commit to get file diff data. 100 commits at 10 parallel requests per batch keeps analysis time under 20 seconds and stays well within GitHub's rate limits.

**Why prioritise GitHub login over git config name?**

The same person can commit under different git config names on different machines. The GitHub login is the stable identifier — using it as the dedup key merges commits from the same account regardless of how their local git is configured.

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

> Sign in with GitHub to analyze any public repository.

## Limitations

- Capped at 100 commits per analysis to stay within GitHub API rate limits
- Only analyses the default branch unless a branch is specified in the URL (e.g. `github.com/owner/repo/tree/my-branch`)
- Comment-level contribution tracking is not yet implemented (requires diff line parsing)
- GitLab support is planned but not yet implemented
- Large repositories may take 15–20 seconds to analyse

## License

MIT
