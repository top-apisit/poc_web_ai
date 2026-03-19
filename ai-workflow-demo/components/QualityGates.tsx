interface GateItem {
  text: string;
}

interface Gate {
  number: string;
  phase: string;
  timing: string;
  timingColor: string;
  borderColor: string;
  headerBg: string;
  phaseColor: string;
  items: GateItem[];
}

const gates: Gate[] = [
  {
    number: "01",
    phase: "PRE-CHECK",
    timing: "Before Implementation",
    timingColor: "bg-amber-900/40 text-amber-300",
    borderColor: "border-amber-500/30 hover:border-amber-500/60",
    headerBg: "bg-amber-500/10",
    phaseColor: "text-amber-400",
    items: [
      { text: "Spec completeness validation" },
      { text: "Existing code audit" },
      { text: "Cross-source analysis (Figma \u2194 User Stories \u2194 API)" },
      { text: "Spec gap detection" },
    ],
  },
  {
    number: "02",
    phase: "POST-CHECK",
    timing: "After Implementation",
    timingColor: "bg-green-900/40 text-green-300",
    borderColor: "border-green-500/30 hover:border-green-500/60",
    headerBg: "bg-green-500/10",
    phaseColor: "text-green-400",
    items: [
      { text: "TypeScript compilation check" },
      { text: "Zone boundary compliance" },
      { text: "Design fidelity verification" },
      { text: "Auto-fix issues" },
    ],
  },
];

export default function QualityGates() {
  return (
    <section
      id="quality"
      className="py-24 px-4"
      style={{
        background:
          "linear-gradient(180deg, #131318 0%, #0f0f0f 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
            Assurance
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Two-Stage Quality Assurance
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Automated validation gates catch issues before and after
            implementation — not in code review.
          </p>
        </div>

        {/* Gate cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gates.map((gate) => (
            <div
              key={gate.number}
              className={`rounded-2xl border bg-[#1a1a1a] overflow-hidden transition-colors duration-200 ${gate.borderColor}`}
            >
              {/* Card header */}
              <div className={`${gate.headerBg} px-6 py-5 border-b border-[#2e2e2e]`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${gate.phaseColor}`}>
                      Gate {gate.number}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">
                      {gate.phase}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${gate.timingColor}`}
                  >
                    {gate.timing}
                  </span>
                </div>
              </div>

              {/* Checklist */}
              <ul className="px-6 py-5 space-y-3">
                {gate.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5"
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#4ade80"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gate flow diagram */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
          {[
            { label: "Spec Analysis", icon: "📋", color: "bg-gray-800 border-gray-700 text-gray-300" },
            { label: "PRE-CHECK", icon: "🔍", color: "bg-amber-950/50 border-amber-700/50 text-amber-300", gate: true },
            { label: "Implementation", icon: "⚡", color: "bg-indigo-950/50 border-indigo-700/50 text-indigo-300" },
            { label: "POST-CHECK", icon: "✅", color: "bg-amber-950/50 border-amber-700/50 text-amber-300", gate: true },
            { label: "Delivery", icon: "🚀", color: "bg-green-950/50 border-green-700/50 text-green-300" },
          ].map((node, idx, arr) => (
            <div key={node.label} className="flex items-center gap-0 sm:gap-0">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold whitespace-nowrap ${node.color}`}
              >
                <span>{node.icon}</span>
                <span>{node.label}</span>
              </div>
              {idx < arr.length - 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="12"
                  viewBox="0 0 24 12"
                  fill="none"
                  className="hidden sm:block text-gray-600 mx-1 flex-shrink-0"
                >
                  <path
                    d="M0 6h18M13 1l6 5-6 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {idx < arr.length - 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="24"
                  viewBox="0 0 12 24"
                  fill="none"
                  className="block sm:hidden text-gray-600 my-1 flex-shrink-0"
                >
                  <path
                    d="M6 0v18M1 13l5 6 5-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
