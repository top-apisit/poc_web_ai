import Hero from "@/components/Hero";
import WorkflowPipeline from "@/components/WorkflowPipeline";
import AgentsSection from "@/components/AgentsSection";
import QualityGates from "@/components/QualityGates";
import MetricsSection from "@/components/MetricsSection";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";

export default function Home() {
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
