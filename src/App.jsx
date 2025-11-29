import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const sectionTransition = {
  duration: 0.6,
  ease: "easeOut",
};

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      setShowFab(scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "services", label: "Services" },
    { id: "systems", label: "Systems" },
    { id: "apps", label: "Apps" },
    { id: "portfolio", label: "Portfolio" },
    { id: "process", label: "Process" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="bg-dark text-slate-100 min-h-screen">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-50 h-0.5 w-full bg-slate-900">
        <div
          className="h-0.5 bg-gradient-to-r from-primary via-accent to-primary"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 mt-0.5 bg-dark/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("top")}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-primary/40 blur-md opacity-0 group-hover:opacity-100 transition" />
              <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xl font-bold shadow-lg shadow-primary/30">
                CT
              </div>
            </div>
            <div className="leading-tight text-left">
              <div className="font-semibold text-sm sm:text-base">
                Cristian D Toussaint
              </div>
              <div className="text-xs text-slate-400">
                Web Dev • SEO • Systems • Apps
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-primary transition relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollToSection("contact")}
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium bg-primary hover:bg-primaryDark px-4 py-2 rounded-full transition shadow-lg shadow-primary/30"
          >
            Get a free strategy call
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-700"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="sr-only">Open menu</span>
            <div className="space-y-1.5">
              <span className="block w-4 h-[2px] bg-slate-100"></span>
              <span className="block w-4 h-[2px] bg-slate-100"></span>
              <span className="block w-4 h-[2px] bg-slate-100"></span>
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-800 bg-dark/95 backdrop-blur">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileOpen(false);
                  }}
                  className="text-left hover:text-primary transition"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        <Hero />
        <Services />
        <Systems />
        <Apps /> {/* NEW apps section */}
        <Portfolio />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      {/* Floating CTA button */}
      <AnimatePresence>
        {showFab && (
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            onClick={() => scrollToSection("contact")}
            className="fixed bottom-6 right-4 md:right-8 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium shadow-xl shadow-primary/40 hover:bg-primaryDark transition"
          >
            Book a call
          </motion.button>
        )}
      </AnimatePresence>

      {/* Intro overlay */}
      <AnimatePresence>
        {!introDone && (
          <IntroOverlay onDone={() => setIntroDone(true)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Intro Overlay ---------- */

function IntroOverlay({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 7000); // auto-enter after 7s
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <motion.div
          className="absolute inset-0 opacity-40"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: "100% 100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 0 0, rgba(56,189,248,0.2), transparent 50%), radial-gradient(circle at 100% 100%, rgba(59,130,246,0.2), transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      <motion.div
        className="relative max-w-xl px-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
          Cristian D Toussaint • Web Dev • SEO • Systems • Apps
        </p>
        <motion.h1
          className="text-3xl sm:text-4xl font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Building{" "}
          <span className="text-primary">websites, systems</span> &{" "}
          <span className="text-accent">apps</span> that feel{" "}
          <span className="text-primary">modern</span> and{" "}
          <span className="text-accent">perform</span>.
        </motion.h1>
        <motion.p
          className="text-sm text-slate-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A single partner for web, SEO, cloud, and cross-platform apps.
          Crafted to load fast, convert visitors, and scale with your business.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {[
            "React & Next.js",
            "Node / APIs",
            "Postgres / MongoDB",
            "Vercel / AWS / GCP",
            "iOS & Android apps",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-[11px] text-slate-200"
            >
              {chip}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <button
            onClick={onDone}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-medium hover:bg-primaryDark transition shadow-lg shadow-primary/40"
          >
            Enter experience
          </button>
          <button
            onClick={onDone}
            className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-xs font-medium text-slate-200 hover:border-primary hover:text-primary transition"
          >
            Skip intro
          </button>
        </motion.div>
        <p className="mt-4 text-[11px] text-slate-500">
          Auto-continues in a few seconds.
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/20 via-dark to-dark" />
      <div className="pointer-events-none absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={sectionTransition}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
              <span>
                Web Development • SEO • Systems • Cloud • iOS & Android
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Modern websites,{" "}
              <span className="text-primary">apps</span> &{" "}
              <span className="text-accent">systems</span> that perform and
              rank.
            </h1>

            <p className="mb-6 max-w-xl text-sm text-slate-300 sm:text-base">
              I build fast, conversion-focused websites, cross-platform apps,
              SEO strategies that actually move the needle, and full systems
              with databases and cloud infrastructure. One partner for your
              whole digital stack.
            </p>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium hover:bg-primaryDark transition shadow-lg shadow-primary/40"
              >
                Book a free 20-min call
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition"
              >
                View recent projects
              </button>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-slate-400">
              <Stat label="+3 yrs" sub="Building and optimizing experiences" />
              <Stat label="Core Web Vitals" sub="Performance-focused builds" />
              <Stat label="Web • Apps • Cloud" sub="End-to-end systems" />
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-slate-300">
              {[
                "React & Next.js",
                "React Native / Expo",
                "Node & APIs",
                "Postgres / MongoDB",
                "Vercel / AWS / GCP",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...sectionTransition, delay: 0.1 }}
          >
            <HeroCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, sub }) {
  return (
    <div>
      <div className="text-base font-semibold text-slate-100">{label}</div>
      <div>{sub}</div>
    </div>
  );
}

function HeroCard() {
  return (
    <div className="relative">
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-8 -left-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900 to-slate-950 rounded-3xl p-[1px] shadow-2xl shadow-black/60">
        <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Current focus</div>
              <div className="text-sm font-semibold">
                Small business, creators & product teams
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Taking new projects
            </span>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <HoverCard
              title="Frontend"
              value="React, Next.js, Tailwind"
              sub="Clean UI, SEO-friendly markup."
            />
            <HoverCard
              title="Apps & Systems"
              value="React Native, Node"
              sub="Cross-platform and cloud-ready."
            />
          </div>

          <div className="mb-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
              <span>Example project health</span>
              <span>Score</span>
            </div>
            <div className="space-y-2 text-xs">
              <Bar label="Performance" value={92} />
              <Bar label="SEO" value={95} color="primary" />
              <Bar label="Best practices" value={98} color="neutral" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>
              Built for humans first. Optimized for search, apps, and systems
              second.
            </span>
            <span>→ Let’s talk</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HoverCard({ title, value, sub }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:-translate-y-1 hover:border-primary/60 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-primary/20">
      <div className="mb-1 text-xs text-slate-400">{title}</div>
      <div className="text-sm font-medium">{value}</div>
      <div className="mt-1 text-[11px] text-slate-500">{sub}</div>
    </div>
  );
}

function Bar({ label, value, color = "accent" }) {
  const colorClass =
    color === "primary"
      ? "bg-primary"
      : color === "neutral"
      ? "bg-slate-200"
      : "bg-accent";

  return (
    <div className="flex items-center gap-2">
      <span className="w-20 text-slate-300">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-2 rounded-full ${colorClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-10 text-right text-slate-300">{value}</span>
    </div>
  );
}

/* ----- Shared Section Wrapper ----- */

function SectionWrapper({ id, title, subtitle, right, children }) {
  return (
    <motion.section
      id={id}
      className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-900"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={sectionTransition}
    >
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-semibold sm:text-3xl">{title}</h2>
          {subtitle && (
            <p className="max-w-xl text-sm text-slate-300">{subtitle}</p>
          )}
        </div>
        {right && (
          <p className="max-w-sm text-xs text-slate-400">{right}</p>
        )}
      </div>
      {children}
    </motion.section>
  );
}

/* ----- Services ----- */

function Services() {
  return (
    <SectionWrapper
      id="services"
      title="Web & SEO Services"
      subtitle="End-to-end web and SEO services so you don’t need to coordinate between different agencies."
      right="Every project includes on-page SEO, performance optimization, responsive design, and analytics setup by default."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <ServiceCard
          title="Custom Websites & Web Apps"
          body="Fast, modern front-ends with clean, maintainable code. Perfect for small businesses, creators, and personal brands."
          bullets={[
            "Responsive React or static sites",
            "Conversion-focused landing pages",
            "Blog & content sections",
            "Contact forms & integrations",
          ]}
        />
        <ServiceCard
          title="SEO Strategy & Implementation"
          body="From keyword research to on-page optimization and structure, I build sites that search engines understand."
          bullets={[
            "Keyword & competitor analysis",
            "On-page optimization (titles, meta, headings)",
            "Schema / structured data",
            "Internal linking strategy",
          ]}
        />
        <ServiceCard
          title="Technical SEO & Performance"
          body="Fix the things that quietly hurt your rankings and user experience behind the scenes."
          bullets={[
            "Site speed & Core Web Vitals",
            "Clean, semantic HTML",
            "URL structure & sitemaps",
            "Basic analytics & tracking",
          ]}
        />
      </div>
    </SectionWrapper>
  );
}

function ServiceCard({ title, body, bullets }) {
  return (
    <motion.div
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:-translate-y-2 hover:border-primary/60 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-primary/20"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="mb-1 text-sm font-semibold">{title}</div>
      <p className="mb-3 text-xs text-slate-400">{body}</p>
      <ul className="space-y-1.5 text-xs text-slate-300">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ----- Systems / Cloud / Databases ----- */

function Systems() {
  return (
    <SectionWrapper
      id="systems"
      title="End-to-End Systems & Cloud"
      subtitle="Beyond marketing sites, I can help you design and build the systems that run behind them: databases, APIs, dashboards, and automations."
      right="From simple client portals to custom dashboards and internal tools, I offer full-stack support so you don’t need separate dev teams."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 text-xs text-slate-300">
          <p>
            Your website is just one part of the system. I can help you connect
            it to real data and workflows: lead pipelines, booking systems,
            membership areas, analytics layers, and more.
          </p>
          <p>
            Depending on your needs, we can use proven tools like Node, Express,
            serverless functions, PostgreSQL, MongoDB, Supabase, Firebase, or
            fully managed cloud providers like Vercel, AWS, or GCP.
          </p>
          <ul className="space-y-2">
            {[
              "Design data models that match your business (not the other way around).",
              "Build secure REST or GraphQL APIs for your frontend or mobile app.",
              "Create internal dashboards for sales, content, or operations teams.",
              "Set up authentication, roles, and permissions for your users.",
              "Automate repetitive tasks with webhooks and integrations.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 text-xs">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="mb-2 text-[11px] uppercase tracking-[0.15em] text-slate-400">
              Typical system components
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Admin dashboards",
                "Client portals",
                "Authentication & roles",
                "Payments & billing",
                "Email & SMS automation",
                "Reporting & analytics",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-primary/50 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
              <span>Typical stack</span>
              <span className="text-[10px] rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-primary">
                Full-stack ready
              </span>
            </div>
            <dl className="space-y-2 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <dt>Frontend</dt>
                <dd className="text-slate-400">React, Next.js, Tailwind</dd>
              </div>
              <div className="flex justify-between">
                <dt>Backend</dt>
                <dd className="text-slate-400">Node, serverless APIs</dd>
              </div>
              <div className="flex justify-between">
                <dt>Database</dt>
                <dd className="text-slate-400">Postgres, Mongo, Supabase</dd>
              </div>
              <div className="flex justify-between">
                <dt>Cloud</dt>
                <dd className="text-slate-400">Vercel, AWS, GCP</dd>
              </div>
            </dl>
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-3 inline-flex w-full justify-center rounded-full border border-primary/60 bg-primary/10 px-4 py-2 text-[11px] font-medium text-primary hover:bg-primary/20 transition"
            >
              Ask about a full system build
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ----- Apps: iOS & Android ----- */

function Apps() {
  return (
    <SectionWrapper
      id="apps"
      title="iOS & Android App Development"
      subtitle="Cross-platform apps that share logic with your website and backend, so you don’t manage three separate codebases."
      right="I focus on React Native / Expo and modern APIs, so your web, mobile, and backend stay in sync and easy to evolve."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 text-xs text-slate-300">
          <p>
            Whether you need a lightweight companion app for your website, a
            client portal, or a full product experience, I can help you ship
            polished apps for both iOS and Android.
          </p>
          <p>
            We’ll design the UX, map the features, connect to your backend or
            third-party APIs, and make sure performance feels native.
          </p>
          <ul className="space-y-2">
            {[
              "React Native / Expo builds for iOS & Android.",
              "Shared components and logic with your existing React stack.",
              "Push notifications, deep links, and basic offline support.",
              "Authentication, user profiles, and secure API calls.",
              "App Store & Google Play submission guidance.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 text-xs">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="mb-2 text-[11px] uppercase tracking-[0.15em] text-slate-400">
              App experience highlights
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Onboarding flows",
                "In-app messaging",
                "Light / dark theme",
                "Analytics events",
                "Feature flags",
                "Store-ready builds",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-accent/50 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
              <span>Preferred mobile stack</span>
              <span className="text-[10px] rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-accent">
                iOS + Android
              </span>
            </div>
            <dl className="space-y-2 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <dt>Framework</dt>
                <dd className="text-slate-400">React Native, Expo</dd>
              </div>
              <div className="flex justify-between">
                <dt>Backend</dt>
                <dd className="text-slate-400">Node / serverless APIs</dd>
              </div>
              <div className="flex justify-between">
                <dt>State & data</dt>
                <dd className="text-slate-400">React Query, context, REST</dd>
              </div>
              <div className="flex justify-between">
                <dt>Deploy</dt>
                <dd className="text-slate-400">
                  EAS builds, App Store, Play Store
                </dd>
              </div>
            </dl>
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-3 inline-flex w-full justify-center rounded-full border border-accent/60 bg-accent/10 px-4 py-2 text-[11px] font-medium text-accent hover:bg-accent/20 transition"
            >
              Talk about a mobile app
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ----- Portfolio ----- */

function Portfolio() {
  return (
    <SectionWrapper
      id="portfolio"
      title="Selected Work"
      subtitle="Recent projects combining modern UI, SEO foundations, and system thinking. Replace these with your real case studies."
      right="Want to see more? Ask for additional examples relevant to your industry during our call."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <ProjectCard
          tag="Local Business"
          tagColor="text-primary"
          title="Service Business Website"
          body="Conversion-focused site for a local service business with SEO targeting city + niche keywords."
          bullets={[
            "+45% increase in organic traffic in 3 months*",
            "Optimized for local search & Google Business Profile",
            "Clear calls-to-action and lead forms",
          ]}
          stack="React, Tailwind, Vercel"
          cta="View live →"
        />
        <ProjectCard
          tag="Personal Brand"
          tagColor="text-accent"
          title="Creator / Coach Landing Page"
          body="Landing page with clean information architecture, email capture, and blog section for content marketing."
          bullets={[
            "Blog structure ready for SEO content",
            "Lightweight, fast-loading front-end",
            "Integrated newsletter signup",
          ]}
          stack="Static HTML, Tailwind"
          cta="View live →"
        />
        <ProjectCard
          tag="Apps & Systems"
          tagColor="text-primary"
          title="Client Portal + Mobile Companion"
          body="Web dashboard plus React Native app for clients to view bookings, invoices, and messages in one place."
          bullets={[
            "Shared backend for web and mobile",
            "Authentication, roles, and secure data access",
            "Push notifications for important events",
          ]}
          stack="React, React Native, Node, Postgres"
          cta="View case study →"
        />
      </div>
    </SectionWrapper>
  );
}

function ProjectCard({ tag, tagColor, title, body, bullets, stack, cta }) {
  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-primary/60 transition hover:shadow-xl hover:shadow-primary/20"
      whileHover={{ translateY: -8 }}
    >
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-primary/25 via-slate-900 to-slate-900">
        <span className="text-xs text-slate-200 opacity-80">
          Screenshot / mockup here
        </span>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-primary/30 via-transparent to-accent/30" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div
          className={`mb-1 text-[11px] uppercase tracking-[0.15em] ${tagColor}`}
        >
          {tag}
        </div>
        <h3 className="mb-1 text-sm font-semibold">{title}</h3>
        <p className="mb-3 text-xs text-slate-400">{body}</p>
        <ul className="mb-4 space-y-1 text-[11px] text-slate-400">
          {bullets.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between text-[11px] text-slate-500">
          <span>Stack: {stack}</span>
          <span className="transition group-hover:text-primary">{cta}</span>
        </div>
      </div>
    </motion.article>
  );
}

/* ----- Process ----- */

function Process() {
  const steps = [
    {
      title: "Discovery & Strategy",
      body: "We clarify your goals, audience, and main offer. We look at competitors and define the sitemap, features, and system requirements.",
    },
    {
      title: "Content, UX & Architecture",
      body: "Structure, messaging, on-page SEO plan, and data flows. We outline copy sections, CTAs, and how data should move between web, apps, and backend.",
    },
    {
      title: "Design, Development & Systems",
      body: "I build the site, apps, APIs, and integrations, then integrate SEO basics and analytics. You see a live preview and give feedback.",
    },
    {
      title: "Launch, SEO & Support",
      body: "We launch on your domain and app stores, submit to search engines, and optionally keep working on SEO, systems, and new features.",
    },
  ];
  return (
    <SectionWrapper
      id="process"
      title="How We’ll Work Together"
      subtitle="Clear, simple steps. No mystery. You always know what’s happening with your project."
    >
      <div className="grid gap-6 text-xs md:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
            whileHover={{ translateY: -6 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
              {i + 1}
            </div>
            <h3 className="text-sm font-semibold">{s.title}</h3>
            <p className="text-slate-400">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ----- Pricing ----- */

function Pricing() {
  return (
    <SectionWrapper
      id="pricing"
      title="Packages"
      subtitle="Transparent starting points. Every project is scoped based on your goals, content, and timeline."
      right="Prices are examples. Replace with your real numbers and currencies. Custom quotes available."
    >
      <div className="grid gap-6 text-xs md:grid-cols-3">
        <PricingCard
          badge=""
          badgeColor=""
          tier="Starter"
          name="Launch Page"
          price="$1,200+"
          description="Perfect for a new offer, product, or simple personal brand presence."
          bullets={[
            "Single landing page",
            "Basic on-page SEO",
            "Mobile responsive design",
            "Contact form & thank-you page",
          ]}
          primary={false}
        />
        <PricingCard
          badge="Most popular"
          badgeColor="bg-primary/20 text-primary border border-primary/60"
          tier="Growth"
          name="Business Website + SEO"
          price="$2,500–$4,500"
          description="For small businesses that want a solid site and real SEO foundations."
          bullets={[
            "Up to 5 pages (Home, About, Services, Blog, Contact)",
            "Keyword-based structure & meta",
            "Blog setup for content marketing",
            "Basic technical SEO & Core Web Vitals focus",
            "Google Analytics / Search Console setup",
          ]}
          primary
        />
        <PricingCard
          badge=""
          badgeColor=""
          tier="Ongoing"
          name="SEO, Systems & App Support"
          price="$600–$1,500 / month"
          description="Monthly support to keep your site, systems, and apps fast, updated, and climbing in search."
          bullets={[
            "Monthly SEO improvements & reporting",
            "New pages/sections as needed",
            "Ongoing performance & uptime tuning",
            "Priority support for bug fixes & small features",
          ]}
          primary={false}
        />
      </div>
    </SectionWrapper>
  );
}

function PricingCard({
  badge,
  badgeColor,
  tier,
  name,
  price,
  description,
  bullets,
  primary,
}) {
  return (
    <motion.div
      className={`relative flex flex-col rounded-2xl border p-5 ${
        primary
          ? "border-primary/60 bg-slate-900"
          : "border-slate-800 bg-slate-900/60"
      }`}
      whileHover={{ translateY: -6, scale: primary ? 1.02 : 1.01 }}
      transition={{ type: "spring", stiffness: 230, damping: 22 }}
    >
      {badge && (
        <div
          className={`absolute right-3 top-3 text-[10px] px-2 py-1 rounded-full ${badgeColor}`}
        >
          {badge}
        </div>
      )}
      <div className="mb-1 text-[11px] uppercase tracking-[0.15em] text-slate-400">
        {tier}
      </div>
      <h3 className="mb-1 text-sm font-semibold">{name}</h3>
      <p className="mb-4 text-slate-400">{description}</p>
      <div className="mb-2 text-lg font-semibold">{price}</div>
      <ul className="mb-5 space-y-1 text-slate-300">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
      <button
        onClick={() => scrollToSection("contact")}
        className={`mt-auto inline-flex w-full justify-center rounded-full py-2 ${
          primary
            ? "bg-primary hover:bg-primaryDark"
            : "border border-slate-700 hover:border-primary"
        } transition`}
      >
        {primary ? "Talk about this package" : "Start with this"}
      </button>
    </motion.div>
  );
}

/* ----- Testimonials ----- */

function Testimonials() {
  return (
    <SectionWrapper
      id="testimonials"
      title="What Clients Say"
      subtitle="Replace these with real testimonials once you have them. Social proof helps conversions and SEO."
    >
      <div className="grid gap-6 text-xs md:grid-cols-3">
        <TestimonialCard
          text="Cristian took us from a slow, outdated website to a modern one that actually brings in leads. He explained every step."
          author="Client Name, Local Business"
        />
        <TestimonialCard
          text="The SEO improvements were huge. Within a few months, we started getting more organic traffic and inquiries."
          author="Client Name, Online Service"
        />
        <TestimonialCard
          text="Communication was clear, deadlines were respected, and the site is easy for us to manage and update."
          author="Client Name, Personal Brand"
        />
      </div>
    </SectionWrapper>
  );
}

function TestimonialCard({ text, author }) {
  return (
    <motion.div
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
      whileHover={{ translateY: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <p className="mb-3 text-slate-300">“{text}”</p>
      <div className="text-slate-400">— {author}</div>
    </motion.div>
  );
}

/* ----- FAQ ----- */

function FAQ() {
  const faqs = [
    {
      q: "How long does a project take?",
      a: "Simple landing pages can be ready in 1–2 weeks. Full multi-page sites, systems, or apps usually take 3–8 weeks depending on content, features, and integrations.",
    },
    {
      q: "Do you write the content and copy?",
      a: "I can guide structure and on-page SEO, and help refine your copy for clarity and conversions. If you need full copywriting, we can scope that separately.",
    },
    {
      q: "What do you need from me to start?",
      a: "Your goals, brand basics (logo, colors if you have them), any existing content or site, and a rough idea of your budget and deadline.",
    },
  ];
  return (
    <SectionWrapper
      id="faq"
      title="FAQ"
      subtitle="A few questions people usually ask before starting a project."
    >
      <div className="space-y-4 text-xs">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
          >
            <summary className="cursor-pointer text-slate-100 flex items-center justify-between">
              <span>{item.q}</span>
              <span className="ml-2 text-slate-500 group-open:rotate-90 transition-transform">
                ▸
              </span>
            </summary>
            <p className="mt-2 text-slate-400">{item.a}</p>
          </details>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ----- Contact ----- */

function Contact() {
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    // TODO: connect to your real backend / SMTP / Formspree / Resend etc.
    setTimeout(() => {
      setStatus(
        "Thanks for your message! I’ll get back to you within 1–2 business days."
      );
      e.target.reset();
    }, 800);
  }

  return (
    <SectionWrapper
      id="contact"
      title="Let’s talk about your project"
      subtitle="Tell me about your business, your current site or app (if you have one), and what you’d like your website, SEO, systems, and apps to achieve."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-3 text-xs text-slate-400">
          <p>
            Prefer email? Reach me at{" "}
            <a
              href="mailto:info@your-domain.com"
              className="text-primary hover:underline"
            >
              info@your-domain.com
            </a>
          </p>
          <p>We can work together remotely, wherever you are.</p>
          <p>
            During our first call, we’ll go over your goals, timeline, and
            budget, and I’ll recommend the best starting point.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-xs shadow-lg shadow-black/40"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-slate-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="budget" className="mb-1 block text-slate-300">
              Estimated budget
            </label>
            <select
              id="budget"
              name="budget"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-primary"
            >
              <option value="">Select a range</option>
              <option value="under-2000">Under $2,000</option>
              <option value="2000-5000">$2,000 – $5,000</option>
              <option value="5000-10000">$5,000 – $10,000</option>
              <option value="10000-plus">$10,000+</option>
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className="mb-1 block text-slate-300">
              Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-primary"
            >
              <option value="">How soon?</option>
              <option value="asap">ASAP</option>
              <option value="1-2-months">1–2 months</option>
              <option value="3-plus-months">3+ months</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-slate-300">
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-primary"
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-xs font-medium hover:bg-primaryDark transition shadow-md shadow-primary/40"
          >
            Send message
          </button>

          <p className="text-[11px] text-slate-400 min-h-[1.25rem]">
            {status}
          </p>
        </form>
      </div>
    </SectionWrapper>
  );
}

/* ----- Footer ----- */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-900 py-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-3 px-4 text-[11px] text-slate-500 sm:flex-row">
        <div>© {year} Cristian D Toussaint. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition"
          >
            LinkedIn
          </a>
          <button
            onClick={() => scrollToSection("top")}
            className="hover:text-primary transition"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
