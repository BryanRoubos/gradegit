# GradeGit

GitHub repository analytics dashboard — contributor breakdowns, code ownership, and collaboration patterns in one view.

Paste in a repo URL. See exactly who wrote what, where the work is concentrated, and who might need support.

## Why I built this

When working in teams, it's hard to get an honest picture of contribution patterns. Tools like GitHub's built-in insights only show commit counts. I wanted something closer to what engineering leads actually care about: who writes tests, who owns which files, who is carrying the team.

GradeGit is that tool. It was also a project I used to go deep on data aggregation, heuristic scoring, and building a useful UI around raw API data.

## What it does

1. You enter a GitHub repository URL (supports any branch)
2. GradeGit fetches up to 100 commits with full file diff data via the GitHub API
3. Each file change is categorized by type using filename and path heuristics:
   - **Code** — source files (.ts, .py, .js, etc.)
   - **Tests** — files matching test/spec patterns or test directories
   - **Configuration** — JSON, YAML, dotfiles, Dockerfiles
   - **UI** — CSS, SCSS, SVG, component directories
   - **Documentation** — Markdown, RST, docs directories
4. Per-author stats are aggregated across all contribution types
5. Each author is flagged against the team mean and standard deviation:
   - **Above average** — more than 2 standard deviations above the mean
   - **Below average** — more than 0.5 standard deviations below the mean
   - **Needs attention** — no test contributions with 5+ commits, or unusually large commit sizes
6. Issues and pull request activity is fetched and broken down per contributor
7. File ownership percentages are computed for every file touched
8. Results are displayed as interactive charts and color-coded comparison matrices

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

**Why analyze file diffs instead of just commit counts?**

Commit counts are a vanity metric. A single commit can change 1 line or 1000. By fetching the full diff for each commit and categorizing every file touched, GradeGit builds a picture of *what kind* of work each contributor actually does, not just how often they commit.

**Why use standard deviation for flagging?**

Hard thresholds like "fewer than 5 commits = below average" don't work across projects of different sizes and team compositions. Flagging based on mean ± standard deviation means the same logic works on a 2-person project and a 10-person project without manual tuning.

**Why cap at 100 commits?**

The GitHub API requires one request per commit to get file diff data. 100 commits at 10 parallel requests per batch keeps analysis time under 20 seconds and stays well within GitHub's rate limits.

**Why prioritize GitHub login over git config name?**

The same person can commit under different git config names on different machines. The GitHub login is the stable identifier, using it as the dedup key merges commits from the same account regardless of how their local git is configured.

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

[gradegit.up.railway.app](https://gradegit.up.railway.app)

> Sign in with GitHub to analyze any public repository.

## Limitations

- Capped at 100 commits per analysis to stay within GitHub API rate limits
- Comment contribution type is not yet implemented (requires diff line parsing)
- GitLab support is planned but not yet implemented
- Large repositories may take 15–20 seconds to analyze

## License

MIT
