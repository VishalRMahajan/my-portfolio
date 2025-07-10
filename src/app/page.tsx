import { Text } from "@/components/retroui/Text";
import Hero from "@/components/hero";
import SkillsGrid from "@/components/skills-grid";
import WorkExperience from "@/components/work-experience";
import Projects from "@/components/projects";
import NowPlayingCard from "@/components/NowPlayingCard";

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16 p-6">
        <Hero />

        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-6">
            <Text as="h3" className="font-bold mb-6 text-white">
              Stuff I Built With
            </Text>
            <SkillsGrid />
          </div>
        </section>

        <section id="work">
          <Text as="h3" className="font-bold mb-6 text-white">
            Where I&apos;ve Worked
          </Text>
          <div className="space-y-6">
            <WorkExperience />
          </div>
        </section>

        <section id="projects">
          <Text as="h3" className="font-bold mb-6 text-white">
            Stuff I&apos;ve Built
          </Text>
          <Projects />
        </section>

        <section id="now-playing">
          <Text as="h3" className="font-bold mb-6 text-white">
            What I&apos;m Listening To
          </Text>
          <NowPlayingCard />
        </section>
      </div>
    </main>
  );
}
