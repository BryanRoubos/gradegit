import { categorizeFile, ContribType } from "./categorize";



export type IssueStats = {
  author: string
  totalIssues: number
  closedIssues: number
  totalNotes: number
  withoutMilestones: number
  withoutLabels: number
  withoutDescription: number
  withoutAssignee: number
  selfAssigned: number
  timesAssigned: number
}

export type PRStats = {
  author: string
  totalPRs: number
  merged: number
  closed: number
  totalNotes: number
  withoutLabels: number
  withoutMilestones: number
  withoutDescription: number
  mergedBySelf: number
  timesMerged: number
}

export type RepoAnalysis = {
  authors: AuthorStats[]
  fileContributions: Record<string, Record<string, number>>
  commitTimeline: Record<string, number>
  totalCommits: number
  issueStats: IssueStats[]  
  prStats: PRStats[]        
};

export type AuthorStats = {
  author: string;
  avatar?: string;
  commitCount: number;
  linesPerCommit: number;
  totalLines: number;
  byType: Record<ContribType, number>;
  flag: "above" | "below" | "attention" | "normal";
};


// ---- helpers ----

function stddev(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.map((v) => (v - mean) ** 2).reduce((a, b) => a + b, 0) /
    values.length;
  return Math.sqrt(variance);
}

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

// ---- main ----

export function analyzeRepo(
  commits: any[],
  commitDetails: any[],
  issues: any[],
  prs: any[],
): RepoAnalysis {
  const authorMap: Record<string, AuthorStats> = {};
  const fileContributions: Record<string, Record<string, number>> = {};
  const commitTimeline: Record<string, number> = {};

  for (const detail of commitDetails) {
    const email = detail.commit?.author?.email ?? ""
    const login = detail.author?.login
    const name = detail.commit?.author?.name ?? "Unknown"
    const authorKey = login ?? name

    const avatar = detail.author?.avatar_url;

    const date = detail.commit?.author?.date?.slice(0, 10); // "YYYY-MM-DD"
    if (date) {
      commitTimeline[date] = (commitTimeline[date] ?? 0) + 1;
    }

    if (!authorMap[authorKey]) {
      authorMap[authorKey] = {
        author: login ?? name,
        avatar,
        commitCount: 0,
        linesPerCommit: 0,
        totalLines: 0,
        byType: { code: 0, test: 0, config: 0, ui: 0, docs: 0 },
        flag: "normal",
      };
    }

    authorMap[authorKey].commitCount += 1;

    const files: any[] = detail.files ?? [];
    for (const file of files) {
      const type = categorizeFile(file.filename);
      const lines = (file.additions ?? 0) + (file.deletions ?? 0);

      authorMap[authorKey].byType[type] += lines;
      authorMap[authorKey].totalLines += lines;

      // file contribution tracking
      if (!fileContributions[file.filename]) {
        fileContributions[file.filename] = {};
      }
      fileContributions[file.filename][authorKey] =
        (fileContributions[file.filename][authorKey] ?? 0) + lines;
    }
  }

  // linesPerCommit
  for (const stats of Object.values(authorMap)) {
    stats.linesPerCommit =
      stats.commitCount > 0
        ? Math.round(stats.totalLines / stats.commitCount)
        : 0;
  }

  // ---- heuristics / flagging ----
  const authors = Object.values(authorMap);

  const commitCounts = authors.map((a) => a.commitCount)
  const lineCounts = authors.map((a) => a.totalLines)
  const linesPerCommitValues = authors.map((a) => a.linesPerCommit)

  const commitMean = mean(commitCounts)
  const commitStd = stddev(commitCounts)
  const lineMean = mean(lineCounts)
  const lpcMean = mean(linesPerCommitValues)
  const lpcStd = stddev(linesPerCommitValues)


  for (const stats of authors) {
    const hasNoTests = stats.byType.test === 0
    const hugeCommits = stats.linesPerCommit > lpcMean + 2 * lpcStd  // ← use lpcMean/lpcStd
  
    if (hugeCommits && stats.commitCount > 2) {
      stats.flag = "attention"
    } else if (hasNoTests && stats.commitCount > 5 && stats.totalLines > lineMean) {
      stats.flag = "attention"
    } else if (stats.commitCount > commitMean + 2 * commitStd) {
      stats.flag = "above"
    } else if (stats.commitCount < commitMean - 0.5 * commitStd) {
      stats.flag = "below"
    } else {
      stats.flag = "normal"
    }
  }

  // ---- issues ----
const issueMap: Record<string, IssueStats> = {}

const realIssues = issues.filter(i => !i.pull_request)

for (const issue of realIssues) {
  const author = issue.user?.login ?? "Unknown"
  if (!issueMap[author]) {
    issueMap[author] = {
      author,
      totalIssues: 0,
      closedIssues: 0,
      totalNotes: 0,
      withoutMilestones: 0,
      withoutLabels: 0,
      withoutDescription: 0,
      withoutAssignee: 0,
      selfAssigned: 0,
      timesAssigned: 0,
    }
  }
  const s = issueMap[author]
  s.totalIssues += 1
  if (issue.state === "closed") s.closedIssues += 1
  if (!issue.milestone) s.withoutMilestones += 1
  if (issue.labels?.length === 0) s.withoutLabels += 1
  if (!issue.body || issue.body.trim() === "") s.withoutDescription += 1
  if (!issue.assignee) s.withoutAssignee += 1
}

// ---- PRs ----
const prMap: Record<string, PRStats> = {}

for (const pr of prs) {
  const author = pr.user?.login ?? "Unknown"
  if (!prMap[author]) {
    prMap[author] = {
      author,
      totalPRs: 0,
      merged: 0,
      closed: 0,
      totalNotes: 0,
      withoutLabels: 0,
      withoutMilestones: 0,
      withoutDescription: 0,
      mergedBySelf: 0,
      timesMerged: 0,
    }
  }
  const s = prMap[author]
  s.totalPRs += 1
  if (pr.merged_at) s.merged += 1
  if (pr.state === "closed" && !pr.merged_at) s.closed += 1
  if (pr.labels?.length === 0) s.withoutLabels += 1
  if (!pr.milestone) s.withoutMilestones += 1
  if (!pr.body || pr.body.trim() === "") s.withoutDescription += 1
  if (pr.merged_by?.login === author) s.mergedBySelf += 1
}

return {
  authors,
  fileContributions,
  commitTimeline,
  totalCommits: commits.length,
  issueStats: Object.values(issueMap),
  prStats: Object.values(prMap),
}

}

