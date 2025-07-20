"use client";

import { motion } from "framer-motion";
import { Text } from "@/components/retroui/Text";
import Hero from "@/components/hero";
import SkillsGrid from "@/components/skills-grid";
import WorkExperience from "@/components/work-experience";
import Projects from "@/components/projects";
import NowPlayingCard from "@/components/NowPlayingCard";
import GitHubStatsCard from "@/components/GithubStatusCard";
import BlogCard from "@/components/BlogCard";

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.section
    id={id}
    className="scroll-mt-24"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <Text as="h3" className="font-bold mb-6 text-white text-shadow-pixel">
      {title}
    </Text>
    <div className="w-full max-w-3xl mx-auto">{children}</div>
  </motion.section>
);

export default function Page() {
  return (
    <main className="min-h-screen scroll-smooth">
      <div className="max-w-4xl mx-auto space-y-24 p-6 pt-6 lg:pt-12">
        {" "}
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.2,
            filter: "blur(4px) contrast(0.5)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px) contrast(1)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <Hero />
        </motion.div>
        <Section id="skills" title="Stuff I Built With">
          <div className="flex min-h-0 flex-col gap-y-6">
            <SkillsGrid />
          </div>
        </Section>
        <Section id="work" title="Where I've Worked">
          <div className="space-y-6">
            <WorkExperience />
          </div>
        </Section>
        <Section id="projects" title="Stuff I've Built">
          <Projects />
        </Section>
        <Section id="blog" title="Stuff I Wrote">
          <BlogCard />
        </Section>
        <Section id="now-playing" title="The GitHub Log">
          <GitHubStatsCard />
        </Section>
        <Section id="now-playing" title="What I'm Listening To">
          <NowPlayingCard />
        </Section>
      </div>
    </main>
  );
}
