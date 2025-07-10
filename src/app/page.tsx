import { Text } from "@/components/retroui/Text";
import Hero from "@/components/hero";

export default function Page() {
  return (
    <main className="flex flex-col md:flex-row h-screen">
      <div
        className="md:sticky md:top-0 md:h-screen md:flex md:flex-col md:justify-between 
                  md:w-[320px] lg:w-[380px] p-6 pb-8 md:pb-6"
      >
        <Hero />
      </div>

      <div className="md:flex-1 md:overflow-y-auto space-y-16 p-6 md:p-8 lg:p-10">
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-6">
            <Text as="h3" className="font-bold mb-6 text-white">
              Stuff I Built With
            </Text>
          </div>
        </section>

        <section id="work">
          <Text as="h3" className="font-bold mb-6 text-white">
            Where I&apos;ve Worked
          </Text>
          <div className="space-y-6"></div>
        </section>

        <section id="Projects">
          <Text as="h3" className="font-bold mb-6 text-white">
            Stuff I&apos;ve Built
          </Text>
          <div></div>
        </section>
      </div>
    </main>
  );
}
