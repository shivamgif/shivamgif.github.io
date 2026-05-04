import { notFound } from "next/navigation";
import { getDict, hasLocale, locales } from "@/lib/i18n";
import { projects } from "@/content/projects";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { CVTimeline } from "@/components/CVTimeline";
import { Contact } from "@/components/Contact";
import { Marquee } from "@/components/Marquee";


export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDict(locale);
  const chronologicalProjects = [...projects].sort((a, b) => b.year - a.year);

  return (
    <>
      <Hero dict={dict} />

      <div className="relative z-20 -mt-16 rotate-2 transform hover:rotate-0 transition-transform">
        <Marquee text="DESIGN IS DEAD • I WILL SURVIVE • NO RULES • " speed={15} />
      </div>

      <section className="brut-section relative z-10 px-6 py-20 pb-32 -mt-12" id="about">
        <div className="mx-auto max-w-6xl">
          <SectionHeading num="01 /" label={dict.about.heading} />
          <p className="max-w-4xl border-[6px] border-[var(--color-ink)] bg-white p-6 text-2xl font-black leading-tight shadow-[12px_12px_0_var(--color-blue)] md:text-3xl -ml-4 md:-ml-10 relative z-20 transform -rotate-1 hover:rotate-1 transition-transform">
            {dict.about.body}
          </p>
        </div>
      </section>

      <div className="relative z-20 -mt-20 -rotate-3 transform hover:rotate-0 transition-transform">
        <Marquee text="AI IS TAKING OVER • DESIGN IS DEAD • NEED WORK • " speed={12} />
      </div>

      <section className="brut-section relative z-10 px-6 py-20 pt-32 -mt-16 bg-[var(--color-neon-pink)]" id="work">
        <div className="mx-auto max-w-6xl">
          <SectionHeading num="02 /" label={dict.work.heading} />
          <div className="grid gap-10 lg:grid-cols-2">
            {chronologicalProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                locale={locale}
                dict={dict}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="brut-section px-6 py-20" id="cv">
        <div className="mx-auto max-w-6xl">
          <SectionHeading num="03 /" label={dict.cv.heading} />
          <CVTimeline locale={locale} />
        </div>
      </section>

      <section className="brut-section px-6 py-20" id="contact">
        <div className="mx-auto max-w-6xl">
          <SectionHeading num="04 /" label={dict.contact.heading} />
          <Contact dict={dict} />
        </div>
      </section>
    </>
  );
}
