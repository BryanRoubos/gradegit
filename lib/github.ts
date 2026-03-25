export const getCommits = async (
  owner: string,
  repo: string,
  accessToken: string,
  branch?: string
) => {
  const params = new URLSearchParams({
    per_page: "100",
    ...(branch ? { sha: branch } : {}),
  })

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?${params}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  )
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`)
  return response.json()
}
export const getContributors = async (
  owner: string,
  repo: string,
  accessToken: string,
) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  return response.json();
};

export const getCommitDetail = async (
  owner: string,
  repo: string,
  sha: string,
  accessToken: string,
) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  return response.json();
};

export const getIssues = async (
  owner: string,
  repo: string,
  accessToken: string,
) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  return response.json();
};

export const getPullRequests = async (
  owner: string,
  repo: string,
  accessToken: string,
) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  return response.json();
};
