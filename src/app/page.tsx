import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";

const links = [
  { label: "GitHub", href: "https://github.com/Kooperlol" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kooperpropp/" },
  {
    label: "Resume",
    href: "https://www.linkedin.com/in/kooperpropp/overlay/1765226637795/single-media-viewer/?profileId=ACoAAEUZCCgBhrHsFBkox_5GAfDSveox06LGlL0",
  },
  { label: "Email", href: "mailto:koopercodes@gmail.com" },
];

const experience = [
  {
    role: "Website Developer",
    company: "Kosh Creative",
    href: "https://koshcreative.com/",
    period: "Aug 2025 - Present",
    summary: [
      "Kosh Creative is a freelance web development studio crafting clean, high-performance digital experiences for small businesses.",
      "With a focus on both technical excellence and real business results, every project — from websites and landing pages to web applications — is built to be fast, scalable, and conversion-ready.",
    ],
    clients: [
      { name: "Kosh Rocks", href: "https://www.koshrocks.com/" },
      {
        name: "Pettit's Lakeview Campground and Bar",
        href: "https://www.lakeviewcampgroundandbar.com/",
      },
      { name: "The 59er Sip and Swing", href: "https://59ersipandswing.com/" },
      { name: "The Harbor at Newville", href: "https://www.theharboratnewville.com/" },
      {
        name: "The Painted Turtle Boutique and Gifts",
        href: "https://www.thepaintedturtleboutique.com/",
      },
    ],
  },
];

const projects = [
  {
    title: "MHS Laude System",
    href: "https://github.com/Kooperlol/mhslaude",
    stack: "Next.js · TypeScript · Python",
    summary:
      "Transcript processing and academic distinction tracking, deployed at Milton High School.",
  },
  {
    title: "Nexa Database",
    href: "https://github.com/Kooperlol/nexadb",
    stack: "Next.js · Prisma · MongoDB",
    summary:
      "Full-stack careers platform. 1st in Wisconsin, 4th nationally — FBLA Website Coding.",
  },
  {
    title: "Milton Relay",
    href: "https://github.com/Kooperlol/milton_relay",
    stack: "Flutter · Firebase",
    summary:
      "Real-time school communication app. 1st in Wisconsin, 4th nationally — FBLA Mobile App.",
  },
];

const skills = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "React",
  "Next.js",
  "Flutter",
  "MongoDB",
  "SQL",
  "Firebase",
  "Git"
];

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-sm font-medium uppercase tracking-widest text-neutral-500">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />

      <main className="mx-auto max-w-2xl px-6 pt-28 pb-20">
        {/* Hero */}
        <section className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-4">
            <p className="text-neutral-400">Kooper Propp</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Computer Science student building fast, useful software.
            </h1>
            <p className="text-neutral-400 leading-relaxed">
              University of Wisconsin - La Crosse · BS Computer Science · Information Systems Minor · Expected Fall 2027
            </p>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-neutral-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <Image
            src="/images/kooper.webp"
            alt="Kooper Propp"
            width={120}
            height={120}
            priority
            className="rounded-2xl object-cover grayscale transition-[filter] hover:grayscale-0"
          />
        </section>

        {/* Experience */}
        <section className="mt-20 space-y-8 border-t border-neutral-800 pt-12">
          <SectionHeading id="work">Work</SectionHeading>
          <ul className="space-y-8">
            {experience.map((job) => (
              <li key={job.company} className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-medium">
                    {job.href ? (
                      <a
                        href={job.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4"
                      >
                        {job.role}
                      </a>
                    ) : (
                      job.role
                    )}
                    <span className="font-normal text-neutral-500"> · {job.company}</span>
                  </p>
                  <span className="text-sm text-neutral-500">{job.period}</span>
                </div>
                <div className="space-y-3 text-sm text-neutral-400 leading-relaxed">
                  {job.summary.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {job.clients && job.clients.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                        Selected clients
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {job.clients.map((client) => (
                          <li key={client.name}>
                            <a
                              href={client.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
                            >
                              {client.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section className="mt-20 space-y-8 border-t border-neutral-800 pt-12">
          <SectionHeading id="projects">Projects</SectionHeading>
          <ul className="space-y-6">
            {projects.map((project) => (
              <li key={project.title}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block space-y-1"
                >
                  <p className="font-medium group-hover:underline underline-offset-4">
                    {project.title}
                  </p>
                  <p className="text-xs text-neutral-500">{project.stack}</p>
                  <p className="text-sm text-neutral-400 leading-relaxed">{project.summary}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section className="mt-20 space-y-6 border-t border-neutral-800 pt-12">
          <SectionHeading id="skills">Skills</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-20 border-t border-neutral-800 pt-12">
          <p className="text-neutral-400">
            Open to new projects and collaborations.{" "}
            <Link
              href="/contact"
              className="text-neutral-200 underline-offset-4 hover:underline"
            >
              Get in touch
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
