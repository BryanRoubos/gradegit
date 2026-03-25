export type ContribType = "code" | "test" | "config" | "ui" | "docs";

export function categorizeFile(filename: string): ContribType {
  const lower = filename.toLowerCase();

  // Test
  if (
    /\.(test|spec)\.[jt]sx?$/.test(lower) ||
    lower.includes("__tests__") ||
    lower.includes("/test/") ||
    lower.includes("/tests/")
  )
    return "test";

  // Docs
  if (
    /\.(md|txt|rst|mdx)$/.test(lower) ||
    lower.startsWith("docs/") ||
    lower.includes("/docs/") ||
    lower === "license" ||
    lower === "readme"
  )
    return "docs";

  // UI
  if (
    /\.(css|scss|sass|less)$/.test(lower) ||
    /\.(svg|png|jpg|jpeg|gif|ico|webp)$/.test(lower) ||
    lower.includes("/ui/") ||
    lower.includes("/components/") ||
    lower.includes("/styles/") ||
    lower.includes("/public/")
  )
    return "ui";

  // Config
  if (
    /\.(json|ya?ml|toml|env|ini|lock)$/.test(lower) ||
    /\.(config|rc)\.[jt]s$/.test(lower) ||
    lower.includes("dockerfile") ||
    lower.includes(".github/") ||
    lower.startsWith(".") // dotfiles
  )
    return "config";

  // Everything else is code
  return "code";
}
