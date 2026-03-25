import { IssueStats, PRStats } from "@/lib/analyze"

// For activity rows (total, merged, closed): high = good = blue, low = bad = red
// For hygiene rows (without labels, without description, etc): high = bad = red, low = neutral
function flagCell(value: number, values: number[], invertColors = false): string {
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const std = Math.sqrt(
    values.map(v => (v - mean) ** 2).reduce((a, b) => a + b, 0) / values.length
  )

  if (invertColors) {
    // High "without X" count = poor hygiene = red
    if (value > mean + 0.5 * std && value > 0) return "bg-red-200 text-red-900"
    return ""
  }

  if (value > mean + 2 * std) return "bg-blue-200 text-blue-900"
  if (value < mean - 0.5 * std) return "bg-red-200 text-red-900"
  return ""
}

const ISSUE_ROWS: { key: keyof IssueStats; label: string; inverted?: boolean }[] = [
  { key: "totalIssues",        label: "Total issues" },
  { key: "closedIssues",       label: "Total closed issues" },
  { key: "withoutMilestones",  label: "Total issues without milestones",  inverted: true },
  { key: "withoutLabels",      label: "Total issues without labels",      inverted: true },
  { key: "withoutDescription", label: "Total issues without description", inverted: true },
  { key: "withoutAssignee",    label: "Total issues without assignee",    inverted: true },
  { key: "selfAssigned",       label: "Total issues self assigned only" },
]

const PR_ROWS: { key: keyof PRStats; label: string; inverted?: boolean }[] = [
  { key: "totalPRs",           label: "Total merge requests" },
  { key: "merged",             label: "Total merge requests merged" },
  { key: "closed",             label: "Total merge requests closed" },
  { key: "withoutLabels",      label: "Total merge requests without labels",      inverted: true },
  { key: "withoutMilestones",  label: "Total merge requests without milestones",  inverted: true },
  { key: "withoutDescription", label: "Total merge requests without description", inverted: true },
  { key: "mergedBySelf",       label: "Total merge requests merged by self" },
]

type Props = {
  issueStats: IssueStats[]
  prStats: PRStats[]
}

function MatrixSection({
  title,
  rows,
  data,
}: {
  title: string
  rows: { key: string; label: string; inverted?: boolean }[]
  data: Record<string, any>[]
}) {
  if (data.length === 0) return null

  return (
    <div className="overflow-x-auto mb-8">
      <h3 className="text-base font-semibold mb-3 text-gray-700">{title}</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-2 border border-gray-200 w-64" />
            {data.map(d => (
              <th key={d.author} className="p-2 border border-gray-200 text-center font-medium text-gray-700">
                {d.author}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ key, label, inverted }) => {
            const values = data.map(d => d[key] ?? 0)
            return (
              <tr key={key}>
                <td className="p-2 border border-gray-200 text-gray-600 bg-gray-50 text-xs">
                  {label}
                </td>
                {data.map(d => {
                  const val = d[key] ?? 0
                  return (
                    <td
                      key={d.author}
                      className={`p-2 border border-gray-200 text-center ${flagCell(val, values, inverted)}`}
                    >
                      {val}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function IssuesPRMatrix({ issueStats, prStats }: Props) {
  if (issueStats.length === 0 && prStats.length === 0) return null

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">
        Issues & Merge Requests Contribution Comparison Matrices
      </h2>
      <p className="text-xs text-gray-400 mb-6">
        Only lists users that have created issues or merge requests at some point.
      </p>

      <MatrixSection title="Issues" rows={ISSUE_ROWS} data={issueStats} />
      <MatrixSection title="Merge Requests" rows={PR_ROWS} data={prStats} />

      <div className="flex gap-6 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-red-200 inline-block" />
          🔴 Low activity or poor hygiene (missing labels, descriptions)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-blue-200 inline-block" />
          🔵 Well above average
        </span>
      </div>
    </div>
  )
}