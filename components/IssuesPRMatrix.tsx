import { IssueStats, PRStats } from "@/lib/analyze"

const FLAG_COLORS = {
  above: "bg-blue-200 text-blue-900",
  below: "bg-red-200 text-red-900",
  normal: "bg-white",
}

function flagCell(value: number, values: number[]) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const std = Math.sqrt(
    values.map(v => (v - mean) ** 2).reduce((a, b) => a + b, 0) / values.length
  )
  if (value > mean + 2 * std) return FLAG_COLORS.above
  if (value < mean - 0.5 * std) return FLAG_COLORS.below
  return FLAG_COLORS.normal
}

const ISSUE_ROWS = [
  { key: "totalIssues", label: "Total issues" },
  { key: "closedIssues", label: "Total closed issues" },
  { key: "withoutMilestones", label: "Total issues without milestones" },
  { key: "withoutLabels", label: "Total issues without labels" },
  { key: "withoutDescription", label: "Total issues without description" },
  { key: "withoutAssignee", label: "Total issues without assignee" },
  { key: "selfAssigned", label: "Total issues self assigned only" },
] as const

const PR_ROWS = [
  { key: "totalPRs", label: "Total merge requests" },
  { key: "merged", label: "Total merge requests merged" },
  { key: "closed", label: "Total merge requests closed" },
  { key: "withoutLabels", label: "Total merge requests without labels" },
  { key: "withoutMilestones", label: "Total merge requests without milestones" },
  { key: "withoutDescription", label: "Total merge requests without description" },
  { key: "mergedBySelf", label: "Total merge requests merged by self" },
] as const

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
  rows: readonly { key: string; label: string }[]
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
              <th
                key={d.author}
                className="p-2 border border-gray-200 text-center font-medium text-gray-700"
              >
                {d.author}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ key, label }) => {
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
                      className={`p-2 border border-gray-200 text-center ${flagCell(val, values)}`}
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

      <MatrixSection
        title="Issues"
        rows={ISSUE_ROWS}
        data={issueStats}
      />

      <MatrixSection
        title="Merge Requests"
        rows={PR_ROWS}
        data={prStats}
      />

      <div className="flex gap-6 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-red-200 inline-block" />
          Below average (&lt;50%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-blue-200 inline-block" />
          Above average (&gt;200%)
        </span>
      </div>
    </div>
  )
}