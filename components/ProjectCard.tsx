import type { Project } from "@/content/projects";
import type { Dict, Locale } from "@/lib/i18n";
import { ProjectIframe } from "./ProjectIframe";

export function ProjectCard({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: Dict;
}) {
  return (
    <article className="brut-border brut-shadow brut-shadow-hover flex flex-col bg-white odd:-rotate-1 even:rotate-1">
      <div className="aspect-[4/3] min-h-[280px] overflow-hidden border-b-[6px] border-[var(--color-ink)] bg-[var(--color-blue)] md:min-h-[340px]">
        {project.preview.type === "iframe" ? (
          <ProjectIframe
            url={project.preview.url}
            blockedLabel={dict.work.previewBlocked}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.preview.src}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-black uppercase leading-tight">{project.title}</h3>
          <span className="border-[3px] border-[var(--color-ink)] bg-[var(--color-yellow)] px-2 py-1 font-mono text-xs font-black">
            {project.year}
          </span>
        </div>
        <p className="border-l-[6px] border-[var(--color-accent)] pl-3 text-sm font-bold leading-relaxed">
          {project.blurb[locale]}
        </p>
        <ul className="mt-auto flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <li
              key={t}
              className="border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] px-1.5 py-0.5 font-mono text-[10px] font-black uppercase"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="flex gap-2 pt-2">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="border-[4px] border-[var(--color-ink)] bg-[var(--color-ink)] px-3 py-1.5 font-mono text-xs font-black text-[var(--color-paper)] shadow-[4px_4px_0_var(--color-accent)] hover:bg-[var(--color-accent)]"
            >
              {dict.work.live} ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="border-[4px] border-[var(--color-ink)] bg-white px-3 py-1.5 font-mono text-xs font-black shadow-[4px_4px_0_var(--color-blue)] hover:bg-[var(--color-accent)] hover:text-white"
            >
              {dict.work.code} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
