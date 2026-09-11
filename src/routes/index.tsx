import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  User,
  FileText,
  Pencil,
  Mail,
  Github,
  Linkedin,
  Phone,
  MapPin,
  Languages,
  Coins,
} from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { content, type Lang } from "@/lib/cv-content";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ---------- helpers ---------- */

function Mark() {
  return (
    <span className="grid h-7 w-7 shrink-0 select-none place-items-center rounded-full bg-ink text-[11px] font-black text-ink-foreground">
      A
    </span>
  );
}

function Circle({ children, filled = false }: { children: ReactNode; filled?: boolean }) {
  return (
    <span
      className={`grid h-7 w-7 shrink-0 select-none place-items-center rounded-full border border-ink/25 ${
        filled ? "bg-ink text-ink-foreground" : "text-ink"
      }`}
    >
      {children}
    </span>
  );
}

function Heading({ children, no }: { children: ReactNode; no?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        {no ? (
          <span className="font-mono text-xs font-semibold text-primary">{no}</span>
        ) : null}
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{children}</h2>
      </div>
      <Circle>
        <ChevronDown className="h-3.5 w-3.5" />
      </Circle>
    </div>
  );
}

function Chip({ children, solid = false }: { children: ReactNode; solid?: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[11.5px] leading-none ${
        solid ? "bg-primary text-primary-foreground" : "border border-ink/25 text-ink"
      }`}
    >
      {children}
    </span>
  );
}

const btnBase =
  "inline-flex cursor-pointer select-none items-center justify-center gap-2 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-ink/25 p-0.5">
      <Languages className="ml-1.5 h-3.5 w-3.5 text-muted-foreground" />
      {(["id", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          aria-pressed={lang === l}
          className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase transition-all duration-200 active:scale-95 ${
            lang === l ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function SectionNav({
  active,
  t,
}: {
  active: "about" | "resume" | "work";
  t: (typeof content)["id"];
}) {
  const items = [
    { id: "about", label: t.nav.about },
    { id: "resume", label: t.nav.resume },
    { id: "work", label: t.nav.work },
  ] as const;
  return (
    <div className="border-y border-ink/15 bg-background/80 backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-8">
        <div className="flex min-w-0 items-center gap-4 sm:gap-7">
          <Mark />
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`whitespace-nowrap pb-0.5 text-[13px] transition-colors duration-150 sm:text-sm ${
                active === it.id
                  ? "border-b-2 border-ink font-medium text-ink"
                  : "text-muted-foreground hover:text-ink"
              }`}
            >
              {it.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Circle>
            <User className="h-3.5 w-3.5" />
          </Circle>
          <Circle filled>
            <FileText className="h-3.5 w-3.5" />
          </Circle>
          <Circle>
            <Pencil className="h-3.5 w-3.5" />
          </Circle>
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-4 py-12 sm:px-8 sm:py-16 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/* ---------- page ---------- */

function Index() {
  const [lang, setLang] = useState<Lang>("id");
  const t = content[lang] as unknown as (typeof content)["id"];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-ink/15 bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <Mark />
            <span className="truncate text-base font-bold tracking-tight sm:text-lg">
              Angger Aji P.
            </span>
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] font-medium text-muted-foreground md:inline">
              {t.role}
            </span>
            <LangToggle lang={lang} onChange={setLang} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="mx-auto w-full max-w-6xl px-4 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16"
      >
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
              {t.heroKicker}
            </p>
            <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.05] tracking-tight">
              Angger Aji Prayogo
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.heroLine}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/20 px-3 py-1.5 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="#about"
              className={`${btnBase} mt-9 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground hover:-translate-y-0.5 hover:shadow-lg`}
            >
              {t.seeMore}
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>

          <div className="relative h-[220px] overflow-hidden rounded-2xl bg-primary sm:h-[300px] md:h-auto md:min-h-[320px]">
            <div className="absolute inset-0 flex select-none flex-col justify-center pl-[12%] text-primary-foreground">
              <span className="-rotate-6 text-[clamp(2.4rem,7.5vw,4.8rem)] font-black leading-[0.8] tracking-tighter">
                PORT
              </span>
              <span className="-rotate-6 pl-[10%] text-[clamp(2.4rem,7.5vw,4.8rem)] font-black leading-[0.8] tracking-tighter">
                FOLIO
              </span>
            </div>
            <div className="absolute bottom-4 left-5 flex select-none items-end gap-3">
              <span className="text-[clamp(1.2rem,3vw,2rem)] font-black italic leading-none tracking-tighter text-primary-foreground">
                2026
              </span>
              <span className="mb-1 h-2.5 w-14 bg-primary-foreground/90" />
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 border-t border-ink/15 pt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {t.heroStats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-3">
              <span className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
                {s.value}
              </span>
              <span className="text-[12px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[13px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <SectionNav active="about" t={t} />
      <Section id="about">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.4fr] lg:gap-12">
          <div className="relative overflow-hidden rounded-2xl bg-ink">
            <img
              src={portrait}
              alt="Angger Aji Prayogo"
              width={700}
              height={900}
              loading="lazy"
              className="h-full min-h-[320px] w-full object-cover opacity-75"
            />
            <div className="absolute inset-0 flex select-none flex-col justify-between p-5 text-ink-foreground">
              <div>
                <p className="text-sm">{t.hello}</p>
                <p className="mt-2 text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-[1.05] tracking-tight">
                  {t.myName[0]}
                  <br />
                  {t.myName[1]}
                </p>
              </div>
              <p className="text-[11px] leading-relaxed text-ink-foreground/85">
                {t.photoCaption}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <Heading no="01">{t.introduction}</Heading>
              <div className="mt-4 rounded-2xl border border-ink/25 p-5 sm:p-6">
                <h3 className="text-lg font-bold tracking-tight sm:text-xl">{t.introTitle}</h3>
                {t.introBody.map((p) => (
                  <p
                    key={p}
                    className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <Heading no="02">{t.getInTouch}</Heading>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {t.getInTouchBody}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <a
                  href={`mailto:${t.contact.email}`}
                  className="group relative col-span-full flex items-center gap-3 overflow-hidden rounded-2xl bg-ink p-4 text-ink-foreground transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] sm:col-span-2"
                >
                  <span className="grid h-10 w-10 shrink-0 select-none place-items-center rounded-xl bg-white/10">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-wider opacity-60">
                      {t.contact.emailLabel}
                    </span>
                    <span className="block truncate text-[13px] font-semibold">
                      {t.contact.email}
                    </span>
                  </span>
                  <span className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full border border-ink-foreground/30 px-3 py-1.5 text-[11px] font-semibold sm:flex">
                    {t.contactEmailCta}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
                <a
                  href={t.contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl bg-primary p-4 text-primary-foreground transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
                >
                  <span className="grid h-10 w-10 shrink-0 select-none place-items-center rounded-xl bg-white/10">
                    <Linkedin className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-wider opacity-60">
                      {t.contact.linkedinLabel}
                    </span>
                    <span className="block truncate text-[13px] font-semibold">
                      {t.contact.linkedin}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 opacity-50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={t.contact.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-ink/25 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-ink hover:shadow-lg active:scale-[0.98]"
                >
                  <span className="grid h-10 w-10 shrink-0 select-none place-items-center rounded-xl bg-muted">
                    <Github className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {t.contact.githubLabel}
                    </span>
                    <span className="block truncate text-[13px] font-semibold text-ink">
                      {t.contact.github}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={t.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative col-span-full flex items-center gap-3 overflow-hidden rounded-2xl border border-ink/25 bg-background p-4 text-ink transition-all duration-200 hover:-translate-y-1 hover:border-ink hover:shadow-lg active:scale-[0.98] sm:col-span-2"
                >
                  <span className="grid h-10 w-10 shrink-0 select-none place-items-center rounded-xl bg-muted">
                    <Phone className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {t.contact.whatsappLabel}
                    </span>
                    <span className="block truncate text-[13px] font-semibold">
                      {t.contact.whatsapp}
                    </span>
                  </span>
                  <span className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold text-ink-foreground sm:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    {t.contactWhatsappCta}
                  </span>
                </a>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-muted-foreground">
                <span className="inline-flex select-none items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {t.contact.city}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Resume */}
      <SectionNav active="resume" t={t} />
      <Section id="resume" className="border-t border-ink/15">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div>
            <Heading no="03">{t.experience}</Heading>
            <ol className="mt-8 space-y-10 border-l border-ink/20 pl-6">
              {t.jobs.map((job, i) => (
                <li key={job.role} className="relative">
                  <span
                    className={`absolute -left-[31px] top-1.5 grid h-3.5 w-3.5 select-none place-items-center rounded-full ring-4 ring-background ${
                      i === 0 ? "bg-primary" : "bg-ink/40"
                    }`}
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-medium leading-none ${
                        i === 0
                          ? "bg-primary text-primary-foreground"
                          : "border border-ink/25 text-muted-foreground"
                      }`}
                    >
                      {job.period}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {job.company}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold tracking-tight sm:text-xl">
                    {job.role}
                  </h3>
                  <ul className="mt-3 grid gap-x-6 gap-y-2 text-[13px] leading-relaxed text-muted-foreground sm:grid-cols-2 sm:text-sm">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[8px] h-1 w-1 shrink-0 select-none rounded-full bg-ink/50" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink">
                      {job.footerLabel}
                    </span>
                    {job.footerItems.map((f) => (
                      <Chip key={f}>{f}</Chip>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-8 lg:border-l lg:border-ink/15 lg:pl-10">
            <div>
              <Heading no="04">{t.expertise}</Heading>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {t.expertiseBody}
              </p>
            </div>

            <div>
              <Heading>{t.hardskill}</Heading>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.hardskills.map((s, i) => (
                  <Chip key={s} solid={i % 3 === 0}>
                    {s}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <Heading>{t.marketing}</Heading>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.marketingSkills.map((s, i) => (
                  <Chip key={s} solid={i % 4 === 1}>
                    {s}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <Heading>{t.softskill}</Heading>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.softskills.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>

            <div>
              <Heading>{t.education}</Heading>
              <div className="mt-4 rounded-2xl bg-ink p-5 text-ink-foreground">
                <span className="rounded-full bg-ink-foreground px-3 py-1 text-[11px] font-medium text-ink">
                  {t.graduated}
                </span>
                <p className="mt-4 text-[11px] opacity-70">{t.schoolCity}</p>
                <p className="text-base font-bold">{t.school}</p>
              </div>
            </div>

            <div>
              <Heading>{t.extra}</Heading>
              <div className="mt-4 rounded-2xl border border-ink/25 p-5 text-sm leading-relaxed text-muted-foreground">
                <p>
                  <span className="font-semibold text-ink">{t.languagesLabel}:</span>{" "}
                  {t.languagesValue}
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-ink">{t.focusLabel}:</span>{" "}
                  {t.focusValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Work */}
      <SectionNav active="work" t={t} />
      <Section id="work" className="border-t border-ink/15">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.workTitle}</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {t.workSubtitle}
            </p>
          </div>
          <span className="select-none text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {String(t.projects.length).padStart(2, "0")} / {t.nav.work}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.projects.map((p, i) => {
            const spanClass = [
              "sm:col-span-2 lg:col-span-2", // 01 CRM Leads - besar (baris 1)
              "sm:col-span-1 lg:col-span-1", // 02 Inventaris (baris 1)
              "sm:col-span-1 lg:col-span-1", // 03 Konten (baris 2)
              "sm:col-span-2 lg:col-span-2", // 04 Landing Page - besar (baris 2)
              "sm:col-span-1 lg:col-span-1", // 05 TernoAE (baris 3)
              "sm:col-span-1 lg:col-span-1", // 06 QRIS API (baris 3)
              "sm:col-span-2 lg:col-span-1", // 07 Analitik Konten (baris 3)
            ][i] ?? "";
            const large = i === 0 || i === 3;
            return (
              <ProjectCard
                key={p.title}
                project={p}
                featured={i === 0}
                dark={i === 3}
                spanClass={spanClass}
                large={large}
              />
            );
          })}
        </div>
      </Section>

      <footer className="border-t border-ink/15 bg-background/80 backdrop-blur">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-6 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Mark />
            <span className="truncate text-sm font-medium">Angger Aji Prayogo — 2026</span>
          </div>
          <span className="hidden select-none text-[12px] text-muted-foreground sm:inline">
            <Coins className="mr-1 inline h-3.5 w-3.5" />
            Web Dev · Digital Marketing
          </span>
        </div>
      </footer>
    </main>
  );
}

/* ---------- project card ---------- */

function ProjectCard({
  project,
  featured = false,
  dark = false,
  spanClass = "",
  large = false,
}: {
  project: (typeof content)["id"]["projects"][number];
  featured?: boolean;
  dark?: boolean;
  spanClass?: string;
  large?: boolean;
}) {
  const url = "url" in project ? project.url : undefined;
  const internal = "internal" in project && project.internal === true;
  const cta = "cta" in project ? project.cta : undefined;
  const sourceUrl = "sourceUrl" in project ? project.sourceUrl : undefined;
  const sourceLabel = "sourceLabel" in project ? project.sourceLabel : undefined;
  const tone = featured
    ? "bg-primary text-primary-foreground"
    : dark
      ? "bg-ink text-ink-foreground"
      : "border border-ink/25 hover:border-ink";
  const interactive =
    "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.99]";
  const inner = (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="select-none text-[11px] font-semibold tracking-widest opacity-70">
          {project.index}
        </span>
        {url ? (
          <ArrowUpRight
            className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
              internal ? "rotate-90" : ""
            }`}
          />
        ) : null}
      </div>
      <div className={`flex flex-1 flex-col ${large ? "mt-4" : "mt-3"}`}>
        <h3
          className={`font-bold leading-tight tracking-tight ${
            featured ? "text-2xl sm:text-3xl" : large ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-1.5 leading-relaxed opacity-80 ${
            large ? "text-sm sm:text-[15px]" : "text-[13px] sm:text-sm"
          }`}
        >
          {project.summary}
        </p>
        <ul
          className={`mt-2.5 space-y-1 leading-relaxed opacity-75 ${
            large ? "text-[13.5px] sm:text-sm" : "text-[12.5px]"
          }`}
        >
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-[7px] h-1 w-1 shrink-0 select-none rounded-full bg-current opacity-70" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="select-none rounded-full border border-current/30 px-2.5 py-0.5 text-[11px] opacity-80"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {url && cta ? (
            <>
              {internal ? (
                <Link
                  to={url as "/" | "/api-docs"}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12px] font-bold text-ink-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                >
                  {cta}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12px] font-bold text-ink-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                >
                  {cta}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </>
          ) : null}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-current/40 px-4 py-2 text-[12px] font-semibold opacity-90 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-100 hover:shadow-md active:scale-95"
            >
              <Github className="h-3.5 w-3.5" />
              {sourceLabel ?? "Source"}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <article className={`group flex h-full flex-col rounded-2xl p-4 ${tone} ${interactive} ${spanClass}`}>
      {inner}
    </article>
  );
}