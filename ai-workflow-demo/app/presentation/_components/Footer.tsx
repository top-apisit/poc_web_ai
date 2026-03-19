export default function Footer() {
  return (
    <footer className="border-t border-[#2e2e2e] bg-[#0f0f0f] py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span className="w-6 h-6 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
            AI
          </span>
          <span>AI Workflow Demo</span>
          <span className="text-gray-700">·</span>
          <span>POC</span>
        </div>

        {/* Center */}
        <p className="text-gray-500 text-sm text-center">
          Built with{" "}
          <span className="text-orange-400 font-medium">Claude Code</span>
          {" · "}
          AI Development System POC
        </p>

        {/* Right */}
        <p className="text-gray-700 text-xs">
          {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  );
}
