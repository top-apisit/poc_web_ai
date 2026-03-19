const stats = [
  {
    value: "45–105",
    unit: "min",
    label: "Ticket to production",
    sub: "vs 4–8 hours manually",
    color: "text-indigo-400",
  },
  {
    value: "70–80",
    unit: "%",
    label: "Development time reduction",
    sub: "across all task types",
    color: "text-violet-400",
  },
  {
    value: "95+",
    unit: "%",
    label: "Figma design fidelity",
    sub: "pixel-accurate components",
    color: "text-indigo-400",
  },
  {
    value: "100",
    unit: "%",
    label: "TypeScript type safety",
    sub: "zero any, zero runtime errors",
    color: "text-violet-400",
  },
];

const comparisons = [
  {
    task: "Simple Component",
    manual: "2–4 hours",
    ai: "10–15 min",
    saved: "~85%",
  },
  {
    task: "Complete Page",
    manual: "4–8 hours",
    ai: "30–45 min",
    saved: "~80%",
  },
  {
    task: "API Integration",
    manual: "2–6 hours",
    ai: "15–30 min",
    saved: "~80%",
  },
  {
    task: "Full Feature",
    manual: "6–12 hours",
    ai: "45–90 min",
    saved: "~75%",
  },
];

export default function MetricsSection() {
  return (
    <section id="metrics" className="py-24 px-4 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
            Performance
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Results
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Measurable improvements in development speed and quality.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl p-6 hover:border-indigo-500/40 transition-colors duration-200"
            >
              <div className="flex items-end gap-1 mb-2">
                <span className={`text-4xl sm:text-5xl font-extrabold ${stat.color}`}>
                  {stat.value}
                </span>
                <span className={`text-2xl font-bold mb-1 ${stat.color}`}>
                  {stat.unit}
                </span>
              </div>
              <p className="text-gray-200 font-semibold text-sm leading-snug mb-1">
                {stat.label}
              </p>
              <p className="text-gray-500 text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#2e2e2e]">
            <h3 className="text-lg font-semibold text-white">
              Time Comparison: Manual vs AI-Assisted
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Time comparison table">
              <thead>
                <tr className="border-b border-[#2e2e2e]">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Task
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Manual
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    With AI
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Time Saved
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, idx) => (
                  <tr
                    key={row.task}
                    className={`${
                      idx < comparisons.length - 1
                        ? "border-b border-[#2e2e2e]"
                        : ""
                    } hover:bg-white/[0.02] transition-colors duration-150`}
                  >
                    <td className="px-6 py-4 text-gray-200 font-medium text-sm">
                      {row.task}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {row.manual}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-indigo-400 font-semibold">
                        {row.ai}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2.5 py-1 rounded-full bg-green-900/40 text-green-400 font-semibold text-xs">
                        {row.saved}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
