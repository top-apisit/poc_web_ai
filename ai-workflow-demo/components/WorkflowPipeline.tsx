const steps = [
  {
    number: 1,
    icon: "🎫",
    title: "Input",
    description:
      "Developer types a Jira ticket number (e.g. AUTH-001) into the terminal. No manual spec gathering required.",
    tag: "Trigger",
    tagColor: "bg-gray-700 text-gray-300",
  },
  {
    number: 2,
    icon: "🎯",
    title: "Orchestrator",
    description:
      "Reads ticket from Jira + Confluence, fetches Figma designs, and dispatches specialized agents with full context.",
    tag: "Coordination",
    tagColor: "bg-indigo-900/60 text-indigo-300",
  },
  {
    number: 3,
    icon: "🔍",
    title: "PRE-CHECK Gate",
    description:
      "impl-verifier validates spec completeness, audits existing code, and checks cross-source consistency before any code is written.",
    tag: "Quality Gate",
    tagColor: "bg-amber-900/60 text-amber-300",
    isGate: true,
  },
  {
    number: 4,
    icon: "⚡",
    title: "Parallel Implementation",
    description: "Three agents run simultaneously:",
    tag: "Implementation",
    tagColor: "bg-violet-900/60 text-violet-300",
    parallel: [
      {
        icon: "🎨",
        name: "ui-builder",
        desc: "Figma → React components + Tailwind CSS",
      },
      {
        icon: "🔧",
        name: "service-builder",
        desc: "API specs → Next.js API routes + TypeScript",
      },
      {
        icon: "🧠",
        name: "logic-builder",
        desc: "User stories → Hooks + state management",
      },
    ],
  },
  {
    number: 5,
    icon: "✅",
    title: "POST-CHECK Gate",
    description:
      "impl-verifier verifies generated code, auto-fixes issues, and validates design fidelity against the original Figma spec.",
    tag: "Quality Gate",
    tagColor: "bg-amber-900/60 text-amber-300",
    isGate: true,
  },
  {
    number: 6,
    icon: "🚀",
    title: "Delivery",
    description:
      "Production-ready Next.js code is committed, Jira worklog is updated, and a completion report is generated.",
    tag: "Output",
    tagColor: "bg-green-900/60 text-green-300",
  },
];

export default function WorkflowPipeline() {
  return (
    <section
      id="workflow"
      className="py-24 px-4"
      style={{ background: "linear-gradient(180deg, #0f0f0f 0%, #131318 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
            The Process
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            How It Works
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Six automated steps from ticket to production, powered by
            coordinated AI agents.
          </p>
        </div>

        {/* Pipeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <div
            aria-hidden="true"
            className="absolute left-6 sm:left-8 top-8 bottom-8 w-px bg-gradient-to-b from-indigo-600/60 via-indigo-500/30 to-transparent hidden sm:block"
          />

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.number}>
                <div
                  className={`relative flex gap-4 sm:gap-6 group ${
                    step.isGate
                      ? "bg-amber-950/20 border border-amber-500/20"
                      : "bg-[#1a1a1a] border border-[#2e2e2e]"
                  } rounded-2xl p-5 sm:p-6 transition-colors duration-200 hover:border-indigo-500/40`}
                >
                  {/* Step circle */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold ${
                        step.isGate
                          ? "bg-amber-500/20 border border-amber-500/40 text-amber-400"
                          : "bg-indigo-600/20 border border-indigo-500/40 text-indigo-400"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        step.isGate ? "text-amber-600" : "text-indigo-700"
                      }`}
                    >
                      {step.number.toString().padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${step.tagColor}`}
                      >
                        {step.tag}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>

                    {/* Parallel agents */}
                    {step.parallel && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {step.parallel.map((agent) => (
                          <div
                            key={agent.name}
                            className="flex items-start gap-3 bg-[#0f0f0f] border border-[#2e2e2e] rounded-xl p-3 hover:border-violet-500/40 transition-colors duration-200"
                          >
                            <span className="text-lg flex-shrink-0">
                              {agent.icon}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-white font-mono">
                                {agent.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {agent.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Arrow connector between steps */}
                {index < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="flex justify-center my-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      className="text-indigo-600/50"
                    >
                      <path
                        d="M8 0v14M2 9l6 8 6-8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
