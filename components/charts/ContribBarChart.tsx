"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AuthorStats } from "@/lib/analyze";

const COLORS = {
  code: "#3b82f6",
  test: "#22c55e",
  config: "#f59e0b",
  ui: "#a855f7",
  docs: "#ec4899",
};

type Props = {
  authors: AuthorStats[];
};

export default function ContribBarChart({ authors }: Props) {
  const data = authors.map((a) => ({
    name: a.author,
    code: a.byType.code,
    test: a.byType.test,
    config: a.byType.config,
    ui: a.byType.ui,
    docs: a.byType.docs,
  }));

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Contribution Types</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.entries(COLORS).map(([key, color]) => (
            <Bar key={key} dataKey={key} stackId="a" fill={color} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
