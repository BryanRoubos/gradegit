import { AuthorStats } from "@/lib/analyze"

type Flag = "above" | "below" | "attention" | "normal"

const cellColor = (flag: Flag) => ({
  above: "bg-blue-200 text-blue-900",
  below: "bg-red-200 text-red-900",
  attention: "bg-yellow-200 text-yellow-900",
  normal: "bg-white",
}[flag])

// compute per-cell flag based on value vs mean
function flagValue(value: number, values: number[]): Flag {
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const variance = values.map(v => (v - mean) ** 2).reduce((a, b) => a + b, 0) / values.length
  const std = Math.sqrt(variance)
  if (value > mean + 2 * std) return "above"
  if (value < mean - 0.5 * std) return "below"
  return "normal"
}

type Props = { authors: AuthorStats[] }

const TYPES = [
  { key: "code", label: "Code" },
  { key: "test", label: "Tests" },
  { key: "config", label: "Configuration" },
  { key: "ui", label: "User interface" },
  { key: "docs", label: "Documentation" },
] as const

const METRICS = [
  { key: "commitCount", label: "Total commits" },
  { key: "linesPerCommit", label: "Average lines per commit" },
  { key: "totalLines", label: "Total lines changed" },
] as const

export default function MatrixTable({ authors }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-lg font-semibold mb-1">
          Code & Commit Contribution Comparison Matrices
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Contributions are based off all branches.
        </p>

        {/* Type matrix */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-2 border border-gray-200 w-40" />
                {authors.map(a => (
                  <th
                    key={a.author}
                    className="p-2 border border-gray-200 text-center font-medium text-gray-700"
                  >
                    <div className="flex flex-col items-center gap-1">
                      {a.avatar && (
                        <img
                          src={a.avatar}
                          alt={a.author}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span>{a.author}</span>
                      {a.flag === "attention"}
                      {a.flag === "above" }
                      {a.flag === "below"
                      }
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TYPES.map(({ key, label }) => {
                const values = authors.map(a => a.byType[key])
                return (
                  <tr key={key}>
                    <td className="p-2 border border-gray-200 font-medium text-gray-600 bg-gray-50">
                      {label}
                    </td>
                    {authors.map(a => {
                      const val = a.byType[key]
                      const flag = flagValue(val, values)
                      return (
                        <td
                          key={a.author}
                          className={`p-2 border border-gray-200 text-center ${cellColor(flag)}`}
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

      {/* Metrics matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-2 border border-gray-200 w-40" />
              {authors.map(a => (
                <th
                  key={a.author}
                  className="p-2 border border-gray-200 text-center font-medium text-gray-700"
                >
                  <div className="flex flex-col items-center gap-1">
                    {a.avatar && (
                      <img src={a.avatar} alt={a.author} className="w-6 h-6 rounded-full" />
                    )}
                    <span>{a.author}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
            <tbody>
            {METRICS.map(({ key, label }) => {
                const values = authors.map(a => a[key])
                return (
                  <tr key={key}>
                    <td className="p-2 border border-gray-200 font-medium text-gray-600 bg-gray-50">
                      {label}
                    </td>
                    {authors.map(a => {
                      const val = a[key]
                      const flag = a.flag !== "normal" ? a.flag : flagValue(val, values)
                      console.log(a.author, "flag:", a.flag, "→", flag) 
                      return (
                        <td
                          key={a.author}
                          className={`p-2 border border-gray-200 text-center ${cellColor(flag)}`}
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

        {/* Legend */}
        <div className="flex gap-6 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-red-200 inline-block" />
            Below average (&lt;50%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-blue-200 inline-block" />
            Above average (&gt;200%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-yellow-200 inline-block" />
            Needs attention
          </span>
        </div>
      </div>
    </div>
  )
}