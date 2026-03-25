import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getCommits,
  getCommitDetail,
  getIssues,
  getPullRequests,
} from "@/lib/github";
import { analyzeRepo } from "@/lib/analyze";

const parseOwnerAndRepo = (repoUrl: string): { owner: string; repo: string; branch?: string } => {
  const trimmed = repoUrl.trim()
  if (trimmed.includes("github.com")) {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`)
    const parts = url.pathname.replace(/^\//, "").split("/")
    // /owner/repo/tree/branchname
    const branch = parts[2] === "tree" ? parts[3] : undefined
    return {
      owner: parts[0],
      repo: parts[1]?.replace(/\.git$/, "") ?? "",
      branch,
    }
  }
  const parts = trimmed.split("/")
  return { owner: parts[0] ?? "", repo: parts[1] ?? "" }
}

// fetch commit details in batches to avoid rate limits
async function batchCommitDetails(
  owner: string,
  repo: string,
  shas: string[],
  token: string,
  batchSize = 10,
) {
  const results = [];
  for (let i = 0; i < shas.length; i += batchSize) {
    const batch = shas.slice(i, i + batchSize);
    const details = await Promise.all(
      batch.map((sha) => getCommitDetail(owner, repo, sha, token)),
    );
    results.push(...details);
  }
  return results;
}

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { repoUrl } = await req.json();
  const { owner, repo } = parseOwnerAndRepo(repoUrl);

  if (!owner || !repo) {
    return NextResponse.json({ error: "Invalid repo URL" }, { status: 400 });
  }

  try {
    // fetch everything in parallel where possible
    const { owner, repo, branch } = parseOwnerAndRepo(repoUrl)
    const [commits, issues, prs] = await Promise.all([
      getCommits(owner, repo, session.accessToken, branch),
      getIssues(owner, repo, session.accessToken),
      getPullRequests(owner, repo, session.accessToken),
    ]);

    // cap at 100 commits to stay within rate limits
    const capped = commits.slice(0, 100);
    const shas = capped.map((c: any) => c.sha);

    const commitDetails = await batchCommitDetails(
      owner,
      repo,
      shas,
      session.accessToken,
    );

    const analysis = analyzeRepo(capped, commitDetails, issues, prs);

    return NextResponse.json(analysis);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Analysis failed" },
      { status: 500 },
    );
  }
};
