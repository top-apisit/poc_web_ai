interface Agent {
  emoji: string;
  name: string;
  role: string;
  roleColor: string;
  input: string;
  output: string;
  accentBorder: string;
  accentBg: string;
}

const agents: Agent[] = [
  {
    emoji: "🎯",
    name: "orchestrator",
    role: "Master Coordinator",
    roleColor: "bg-indigo-900/60 text-indigo-300",
    input: "Jira ticket number",
    output: "Orchestrates entire workflow",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/70",
    accentBg: "bg-indigo-600/10",
  },
  {
    emoji: "🎨",
    name: "ui-builder",
    role: "UI Implementation",
    roleColor: "bg-violet-900/60 text-violet-300",
    input: "Figma designs",
    output: "React components + Tailwind",
    accentBorder: "border-violet-500/30 hover:border-violet-500/70",
    accentBg: "bg-violet-600/10",
  },
  {
    emoji: "🔧",
    name: "service-builder",
    role: "Backend Services",
    roleColor: "bg-blue-900/60 text-blue-300",
    input: "API specs",
    output: "Next.js API routes + types",
    accentBorder: "border-blue-500/30 hover:border-blue-500/70",
    accentBg: "bg-blue-600/10",
  },
  {
    emoji: "🧠",
    name: "logic-builder",
    role: "Business Logic",
    roleColor: "bg-purple-900/60 text-purple-300",
    input: "User stories",
    output: "Hooks + state management",
    accentBorder: "border-purple-500/30 hover:border-purple-500/70",
    accentBg: "bg-purple-600/10",
  },
  {
    emoji: "✅",
    name: "impl-verifier",
    role: "Quality Assurance",
    roleColor: "bg-green-900/60 text-green-300",
    input: "Code + specs",
    output: "Validation + auto-fixes",
    accentBorder: "border-green-500/30 hover:border-green-500/70",
    accentBg: "bg-green-600/10",
  },
];

export default function AgentsSection() {
  return (
    <section id="agents" className="py-24 px-4 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
            The Team
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Specialized AI Agents
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Each agent is an expert in its domain, working in parallel to deliver
            complete features.
          </p>
        </div>

        {/* Agent cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((agent) => (
            <article
              key={agent.name}
              className={`group relative flex flex-col rounded-2xl border bg-[#1a1a1a] p-6 transition-all duration-200 cursor-default ${agent.accentBorder}`}
            >
              {/* Emoji icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${agent.accentBg} flex items-center justify-center text-3xl mb-4 transition-transform duration-200 group-hover:scale-110`}
                aria-hidden="true"
              >
                {agent.emoji}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-white font-mono mb-2">
                {agent.name}
              </h3>

              {/* Role badge */}
              <span
                className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${agent.roleColor}`}
              >
                {agent.role}
              </span>

              {/* Divider */}
              <div className="border-t border-[#2e2e2e] mb-4" />

              {/* Input / Output */}
              <div className="space-y-2 mt-auto">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-12 flex-shrink-0 pt-0.5">
                    Input
                  </span>
                  <span className="text-sm text-gray-300">{agent.input}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-12 flex-shrink-0 pt-0.5">
                    Output
                  </span>
                  <span className="text-sm text-gray-300">{agent.output}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
