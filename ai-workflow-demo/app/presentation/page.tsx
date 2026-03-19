import Hero from "./_components/Hero";
import WorkflowPipeline from "./_components/WorkflowPipeline";
import AgentsSection from "./_components/AgentsSection";
import QualityGates from "./_components/QualityGates";
import MetricsSection from "./_components/MetricsSection";
import TechStack from "./_components/TechStack";
import Footer from "./_components/Footer";

export const metadata = {
  title: "Presentation — AI Workflow Demo",
};

export default function PresentationPage() {
  return (
    <main className="flex flex-col flex-1">
      <Hero />
      <WorkflowPipeline />
      <AgentsSection />
      <QualityGates />
      <MetricsSection />
      <TechStack />
      <Footer />
    </main>
  );
}
