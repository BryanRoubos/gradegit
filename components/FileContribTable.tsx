import { isLockFile } from "@/lib/categorize"

// Binary and generated files that add noise to the ownership table
const SKIP_EXTENSIONS = [".pyc", ".png", ".jpg", ".svg", ".ico", ".webp"]

function shouldSkip(file: string): boolean {
  if (SKIP_EXTENSIONS.some(ext => file.endsWith(ext))) return true
  if (isLockFile(file)) return true
  return false
}

function FileIcon({ name }: { name: string }) {
  const isFolder = !name.includes(".")
  return (
    <span className="mr-1 text-gray-400">
      {isFolder ? "📁" : "📄"}
    </span>
  )
}

type Props = {
  fileContributions: Record<string, Record<string, number>>
}

export default function FileContribTable({ fileContributions }: Props) {
  const sorted = Object.entries(fileContributions)
    .filter(([file]) => !shouldSkip(file))
    .sort(([, a], [, b]) => {
      const totalA = Object.values(a).reduce((x, y) => x + y, 0)
      const totalB = Object.values(b).reduce((x, y) => x + y, 0)
      return totalB - totalA
    })
    .slice(0, 30)

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-lg font-semibold mb-1">Files & Folder Contribution</h2>
      <p className="text-xs text-gray-400 mb-4">
        Top 30 files by lines changed
      </p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-2 border border-gray-200 font-medium text-gray-600">
              Name
            </th>
            <th className="text-left p-2 border border-gray-200 font-medium text-gray-600">
              Contributions
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(([file, authors]) => {
            const total = Object.values(authors).reduce((a, b) => a + b, 0)
            const sortedAuthors = Object.entries(authors).sort(([, a], [, b]) => b - a)
            const filename = file.split("/").pop() ?? file

            return (
              <tr key={file} className="hover:bg-gray-50 border-b border-gray-100">
                <td className="p-2 border border-gray-200 font-mono text-xs text-gray-700">
                  <FileIcon name={filename} />
                  {file}
                </td>
                <td className="p-2 border border-gray-200">
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {sortedAuthors.map(([author, lines]) => {
                      const pct = total > 0 ? Math.round((lines / total) * 100) : 0
                      return (
                        <span key={author} className="text-xs text-gray-600">
                          {author}{" "}
                          <span className="text-gray-400">({pct}%)</span>
                        </span>
                      )
                    })}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}