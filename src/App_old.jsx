import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import logoImage from "../logo.png";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

const TECH_STACK = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
];

const SERVICES = [
  {
    title: "Product Strategy",
    desc: "Roadmaps, UX architecture, and launch plans for SaaS products that need speed and clarity.",
  },
  {
    title: "Design Systems",
    desc: "Premium visual systems, scalable component libraries, and interaction design built for growth.",
  },
  {
    title: "Web Engineering",
    desc: "High-performance React frontends, robust APIs, and seamless deployments with modern tooling.",
  },
  {
    title: "Growth Optimization",
    desc: "CRO-focused experiments, analytics tracking, and performance tuning to increase conversion.",
  },
];

const EXPERIENCE_ITEMS = [
  {
    period: "2024 — Present",
    role: "Lead Product Engineer",
    company: "Conexus Studio",
    summary: "Built and scaled premium SaaS websites and platforms for startups and enterprise teams.",
  },
  {
    period: "2022 — 2024",
    role: "Senior Frontend Developer",
    company: "Nova Digital",
    summary: "Delivered component-driven design systems and mission-critical dashboards with React and TypeScript.",
  },
  {
    period: "2020 — 2022",
    role: "UI Engineer",
    company: "Pixel Forge",
    summary: "Specialized in high-fidelity web experiences, performance optimization, and conversion-focused interfaces.",
  },
];

const PROJECTS = [
  {
    name: "PulseBoard",
    type: "Analytics SaaS",
    detail: "Real-time KPI dashboard for growth teams with custom reports and team workspaces.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    location: "Remote • Global Teams",
    statA: "React + Node",
    statB: "37% faster reporting",
    link: "https://example.com/pulseboard",
    featured: true,
  },
  {
    name: "Orbit Commerce",
    type: "E-commerce Platform",
    detail: "Headless commerce frontend with premium UX, faster checkout, and personalized product flows.",
    image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=1200&q=80",
    location: "London, UK",
    statA: "Next.js + Stripe",
    statB: "22% higher conversion",
    link: "https://example.com/orbit-commerce",
  },
  {
    name: "Helio CRM",
    type: "B2B Product",
    detail: "Sales pipeline platform with automation workflows, lead scoring, and team collaboration.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    location: "New York, USA",
    statA: "React + PostgreSQL",
    statB: "48% workflow automation",
    link: "https://example.com/helio-crm",
  },
  {
    name: "Vertex Care",
    type: "HealthTech Dashboard",
    detail: "Secure patient operations portal with role-based flows, reporting, and compliance-first UX.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    location: "Toronto, Canada",
    statA: "TypeScript + API",
    statB: "99.95% uptime",
    link: "https://example.com/vertex-care",
  },
  {
    name: "Nova Spaces",
    type: "PropTech Platform",
    detail: "Property management experience with booking tools, analytics, and real-time owner insights.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    location: "Singapore",
    statA: "React + AWS",
    statB: "31% faster onboarding",
    link: "https://example.com/nova-spaces",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const projectsPrevRef = useRef(null);
  const projectsNextRef = useRef(null);
  const projectsPaginationRef = useRef(null);
  const [heroRef, heroIn] = useInView(0.1);
  const [aboutRef, aboutIn] = useInView(0.1);
  const [servicesRef, servicesIn] = useInView(0.1);
  const [experienceRef, experienceIn] = useInView(0.1);
  const [projectsRef, projectsIn] = useInView(0.1);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", background: "#0e1a0e", color: "#f0f0e8", minHeight: "100vh", overflowX: "hidden" }}>
      {showLoader && (
        <div className={`loader-overlay${showLoader ? "" : " fade-out"}`}>
          <div className="loader-container">
            <div className="code-loader">
              <span className="bracket">{'{'}</span>
              <span className="bracket">{'}'}</span>
            </div>
            <p className="loader-text">Coding</p>
          </div>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --lime: #b8ff57;
          --dark: #0e1a0e;
          --card: #141f14;
          --border: #1e2e1e;
        }

        body { background: var(--dark); }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          height: 72px;
          padding: 0 48px;
          transition: background 0.3s, backdrop-filter 0.3s;
        }
        .nav.scrolled {
          background: rgba(14,26,14,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .logo {
          position: relative;
          width: 72px;
          height: 72px;
          flex: 0 0 72px;
          overflow: visible;
        }
        .logo-mark {
          position: absolute;
          left: 0;
          top: 50%;
          width: 128px;
          height: 128px;
          transform: translateY(-50%);
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(184,255,87,0.45));
        }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a { font-size: 14px; font-weight: 500; color: rgba(240,240,232,0.7); text-decoration: none; transition: color 0.2s; }
        .nav-links a:hover { color: var(--lime); }
        .btn-primary {
          background: var(--lime); color: #0e1a0e; border: none; cursor: pointer;
          padding: 10px 22px; border-radius: 8px; font-family: inherit;
          font-size: 14px; font-weight: 700; transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(184,255,87,0.35); }
        .btn-outline {
          background: transparent; color: var(--lime); border: 1.5px solid var(--lime);
          cursor: pointer; padding: 10px 26px; border-radius: 8px; font-family: inherit;
          font-size: 14px; font-weight: 700; transition: background 0.15s, color 0.15s;
        }
        .btn-outline:hover { background: var(--lime); color: #0e1a0e; }

        /* HERO */
        .hero {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          padding: 120px 24px 80px; position: relative; overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 50% at 50% 30%, rgba(184,255,87,0.07) 0%, transparent 70%);
        }
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(184,255,87,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(184,255,87,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-title {
          font-size: clamp(44px, 8vw, 88px); font-weight: 800; line-height: 1.05;
          letter-spacing: -2px; max-width: 780px; position: relative;
        }
        .hero-title .accent { color: var(--lime); font-style: italic; }
        .star { color: var(--lime); display: inline-block; margin-left: 12px; font-size: 0.6em; animation: spin 8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .hero-sub { font-family: 'DM Sans', sans-serif; font-size: 16px; color: rgba(240,240,232,0.6); max-width: 420px; line-height: 1.65; margin-top: 20px; }
        .hero-cta { margin-top: 36px; display: flex; gap: 12px; }
        .trusted { margin-top: 64px; width: 100%; position: relative; }
        .trusted-label { font-size: 11px; letter-spacing: 3px; color: rgba(240,240,232,0.35); text-transform: uppercase; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .trusted-label::before, .trusted-label::after { content: ''; flex: 1; max-width: 60px; height: 1px; background: rgba(240,240,232,0.15); }
        /* TECH TICKER */
        .ticker-wrapper {
          width: 100%; overflow: hidden; position: relative; margin-top: 64px;
        }
        .ticker-wrapper::before, .ticker-wrapper::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 120px; z-index: 2; pointer-events: none;
        }
        .ticker-wrapper::before { left: 0; background: linear-gradient(90deg, #0e1a0e, transparent); }
        .ticker-wrapper::after { right: 0; background: linear-gradient(-90deg, #0e1a0e, transparent); }
        .ticker-track {
          display: flex; gap: 0; width: max-content;
          animation: ticker 28s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-item {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 0 36px; min-width: 100px;
          border-right: 1px solid var(--border);
        }
        .ticker-item:last-child { border-right: none; }
        .ticker-item img { width: 36px; height: 36px; filter: grayscale(1) brightness(0.7); transition: filter 0.2s; }
        .ticker-track:hover .ticker-item img { filter: grayscale(0) brightness(1); }
        .ticker-item span { font-family: 'DM Sans', sans-serif; font-size: 11px; color: rgba(240,240,232,0.35); letter-spacing: 0.5px; }
        .ticker-label { font-size: 11px; letter-spacing: 3px; color: rgba(240,240,232,0.35); text-transform: uppercase; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .ticker-label::before, .ticker-label::after { content: ''; flex: 1; max-width: 60px; height: 1px; background: rgba(240,240,232,0.15); }

        /* CONTENT SECTIONS */
        .content-wrap { max-width: 1120px; margin: 0 auto; padding: 0 48px 110px; }
        
        /* ===== ABOUT SECTION ===== */
        .about-section {
          margin-top: 44px;
          padding: 0;
          border: none;
          background: none;
          box-shadow: none;
        }
        .about-section .section-head {
          background: linear-gradient(135deg, rgba(184,255,87,0.16) 0%, rgba(184,255,87,0.06) 100%);
          border: 1px solid rgba(184,255,87,0.2);
          border-radius: 20px;
          padding: 48px 36px;
          margin-bottom: 32px;
          display: block;
        }
        .about-section .section-tag {
          margin-bottom: 12px;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 28px;
          align-items: stretch;
        }
        .about-grid > * {
          background: linear-gradient(180deg, rgba(20,31,20,0.7) 0%, rgba(13,22,13,0.95) 100%);
          border: 1px solid rgba(184,255,87,0.12);
          border-radius: 18px;
          padding: 28px;
        }
        
        /* ===== SERVICES SECTION ===== */
        .services-section {
          margin-top: 68px;
          padding: 0;
          border: none;
          background: none;
        }
        .services-section .section-head {
          margin-bottom: 38px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr 1fr;
          gap: 12px;
          align-items: stretch;
        }
        .service-card {
          border: 1px solid rgba(184,255,87,0.16);
          background: rgba(13,22,13,0.78);
          border-radius: 16px;
          padding: 20px;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .services-grid .service-card:nth-child(2) {
          grid-row: 1 / 3;
          transform: scale(1.02);
          padding: 24px;
        }
        .services-grid .service-card:nth-child(2) .service-title {
          font-size: 20px;
        }
        .service-card:hover {
          transform: translateY(-4px);
          border-color: rgba(184,255,87,0.36);
          box-shadow: 0 10px 28px rgba(184,255,87,0.12);
        }
        .services-grid .service-card:nth-child(2):hover {
          transform: scale(1.02) translateY(-4px);
        }
        
        /* ===== EXPERIENCE SECTION ===== */
        .experience-section {
          margin-top: 68px;
          padding: 48px 36px;
          background: linear-gradient(90deg, rgba(13,22,13,0.8) 0%, rgba(20,31,20,0.5) 50%, rgba(13,22,13,0.8) 100%);
          border: 1px solid rgba(184,255,87,0.1);
          border-radius: 20px;
          position: relative;
        }
        .experience-section::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, var(--lime) 0%, rgba(184,255,87,0.2) 100%);
          border-radius: 20px 0 0 20px;
        }
        .experience-section .section-head {
          margin-bottom: 32px;
        }
        .experience-list {
          display: grid;
          gap: 14px;
          padding-left: 20px;
        }
        .exp-item {
          border: none;
          background: rgba(13,22,13,0.65);
          border-radius: 12px;
          padding: 16px 18px;
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 16px;
          border-left: 3px solid rgba(184,255,87,0.3);
          transition: border-left-color 0.2s, box-shadow 0.2s;
        }
        .exp-item:hover {
          border-left-color: var(--lime);
          box-shadow: inset 0 0 20px rgba(184,255,87,0.08);
        }
        
        /* ===== PROJECTS SECTION ===== */
        .projects-section {
          margin-top: 68px;
          padding: 0;
          background: none;
          border: none;
        }
        .projects-section .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 38px;
        }
        .projects-slider-shell {
          position: relative;
          padding: 0 64px;
        }
        .projects-swiper {
          overflow: hidden;
          user-select: none;
          padding: 6px 4px 10px;
        }
        .projects-swiper .swiper-wrapper {
          align-items: stretch;
        }
        .projects-slide {
          height: auto;
          display: flex;
          opacity: 0.58;
          transform: scale(0.94);
          transition: transform 0.45s ease, opacity 0.45s ease;
          transform-origin: center center;
        }
        .projects-slide.swiper-slide-prev,
        .projects-slide.swiper-slide-next {
          opacity: 0.82;
          transform: scale(0.97);
        }
        .projects-slide.swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
        .project-card {
          border: 1px solid rgba(184,255,87,0.16);
          background: radial-gradient(circle at top right, rgba(184,255,87,0.12), rgba(13,22,13,0.9) 48%);
          border-radius: 18px;
          overflow: hidden;
          width: 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .projects-slide.swiper-slide-active .project-card {
          border-color: rgba(184,255,87,0.42);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(184,255,87,0.14) inset;
        }
        .project-image {
          position: relative;
          height: 220px;
          border-bottom: 1px solid rgba(184,255,87,0.14);
        }
        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.85) brightness(0.68);
          transition: transform 0.45s ease, filter 0.45s ease;
          will-change: transform;
        }
        .projects-slide.swiper-slide-active .project-image img {
          animation: project-parallax-drift 8.5s ease-in-out infinite alternate;
          filter: saturate(0.96) brightness(0.76);
        }
        .project-card:hover .project-image img {
          transform: scale(1.04);
          filter: saturate(1) brightness(0.78);
        }
        .projects-slide.swiper-slide-active .project-card:hover .project-image img {
          animation-play-state: paused;
          transform: scale(1.06) translate3d(0, -1.5%, 0);
          filter: saturate(1) brightness(0.82);
        }
        @keyframes project-parallax-drift {
          0% {
            transform: scale(1.03) translate3d(-1.4%, -1.2%, 0);
          }
          50% {
            transform: scale(1.05) translate3d(0.8%, -2.1%, 0);
          }
          100% {
            transform: scale(1.03) translate3d(1.6%, -0.8%, 0);
          }
        }
        .project-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(12, 19, 12, 0.78);
          color: var(--lime);
          border: 1px solid rgba(184,255,87,0.45);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 5px 10px;
          border-radius: 999px;
        }
        .project-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .project-location {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(240,240,232,0.56);
          letter-spacing: 0.3px;
        }
        .project-meta {
          margin-top: auto;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 6px;
        }
        .project-chip {
          border: 1px solid rgba(184,255,87,0.22);
          color: rgba(240,240,232,0.8);
          background: rgba(184,255,87,0.08);
          border-radius: 999px;
          padding: 5px 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2px;
        }
        .project-action {
          margin-top: 14px;
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(184,255,87,0.38);
          color: var(--lime);
          background: rgba(184,255,87,0.08);
          border-radius: 10px;
          padding: 8px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.3px;
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }
        .project-action:hover {
          transform: translateY(-1px);
          background: rgba(184,255,87,0.16);
          box-shadow: 0 8px 20px rgba(184,255,87,0.16);
        }
        .projects-slider-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .projects-nav-btn {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(184,255,87,0.35);
          color: var(--lime);
          background: rgba(14,26,14,0.92);
          display: grid;
          place-items: center;
          cursor: pointer;
          pointer-events: auto;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }
        .projects-nav-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 0 0 5px rgba(184,255,87,0.12);
        }
        .projects-nav-btn.swiper-button-disabled {
          opacity: 0.45;
          cursor: default;
          box-shadow: none;
          transform: none;
        }
        .projects-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }
        .projects-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(240,240,232,0.35);
          opacity: 1;
          transition: all 0.25s ease;
        }
        .projects-pagination .swiper-pagination-bullet-active {
          width: 28px;
          background: var(--lime);
        }
        
        .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 26px;
        }
        .section-tag {
          font-size: 11px;
          letter-spacing: 3px;
          color: var(--lime);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .section-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1px;
        }
        .section-kicker {
          font-family: 'DM Sans', sans-serif;
          color: rgba(240,240,232,0.62);
          max-width: 460px;
          line-height: 1.7;
          font-size: 15px;
        }

        .about-text {
          font-family: 'DM Sans', sans-serif;
          color: rgba(240,240,232,0.7);
          line-height: 1.75;
          font-size: 16px;
        }
        .about-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .about-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .stat-card {
          background: rgba(13,22,13,0.8);
          border: 1px solid rgba(184,255,87,0.16);
          border-radius: 14px;
          padding: 16px;
          text-align: center;
        }
        .stat-value {
          color: var(--lime);
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .stat-label {
          margin-top: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(240,240,232,0.55);
          letter-spacing: 0.3px;
        }


        .service-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #f0f0e8;
        }
        .service-desc {
          font-family: 'DM Sans', sans-serif;
          color: rgba(240,240,232,0.62);
          line-height: 1.65;
          font-size: 14px;
        }


        .exp-period {
          color: var(--lime);
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .exp-role {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .exp-company {
          font-family: 'DM Sans', sans-serif;
          color: rgba(240,240,232,0.72);
          margin-bottom: 8px;
        }
        .exp-summary {
          font-family: 'DM Sans', sans-serif;
          color: rgba(240,240,232,0.56);
          line-height: 1.65;
          font-size: 14px;
        }


        .project-type {
          display: inline-flex;
          padding: 5px 9px;
          border-radius: 999px;
          border: 1px solid rgba(184,255,87,0.36);
          color: var(--lime);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
        }
        .project-name {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .project-detail {
          font-family: 'DM Sans', sans-serif;
          color: rgba(240,240,232,0.6);
          line-height: 1.7;
          font-size: 14px;
        }

        /* LOADER */
        .loader-overlay {
          position: fixed;
          inset: 0;
          background: #0e1a0e;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 1;
          transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          pointer-events: auto;
          transform: scale(1);
        }
        .loader-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
          transform: scale(1.08);
        }
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .code-loader {
          font-family: 'Courier New', monospace;
          font-size: 64px;
          font-weight: 700;
          color: #b8ff57;
          letter-spacing: 4px;
          text-shadow: 0 0 30px rgba(184,255,87,0.6);
          display: flex;
          gap: 2px;
          align-items: center;
          transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .loader-overlay.fade-out .code-loader {
          transform: scale(0.7);
        }
        .loader-text {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          color: rgba(184,255,87,0.8);
          text-transform: uppercase;
          margin: 0;
          transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .loader-overlay.fade-out .loader-text {
          opacity: 0;
          transform: translateY(8px);
        }
        .code-loader .bracket {
          animation: bracket-bounce 0.8s ease-in-out infinite;
        }
        .code-loader .bracket:nth-child(1) {
          animation-delay: 0s;
        }
        .code-loader .bracket:nth-child(2) {
          animation-delay: 0.4s;
        }
        @keyframes bracket-bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-12px);
            opacity: 0.7;
          }
        }

        @keyframes page-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .nav {
          animation: page-fade-in 0.8s ease-out 0.3s both;
        }

        .hero {
          animation: page-fade-in 1s ease-out 0.4s both;
        }

        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up.d1 { transition-delay: 0.1s; }
        .fade-up.d2 { transition-delay: 0.2s; }
        .fade-up.d3 { transition-delay: 0.3s; }
        .fade-up.d4 { transition-delay: 0.45s; }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border); padding: 32px 48px;
          display: flex; align-items: center; justify-content: space-between;
          font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(240,240,232,0.35);
        }

        @media (max-width: 768px) {
          .nav { height: 64px; padding: 0 20px; }
          .logo { width: 64px; height: 64px; flex-basis: 64px; }
          .logo-mark { width: 102px; height: 102px; }
          .nav-links { display: none; }
          .content-wrap { padding: 0 20px 72px; }
          .about-section .section-head,
          .services-section,
          .experience-section,
          .projects-section { padding: 26px 18px; border-radius: 18px; }
          .section-head { flex-direction: column; align-items: flex-start; }
          .about-grid,
          .services-grid { grid-template-columns: 1fr; }
          .projects-slider-shell { padding: 0 10px; }
          .projects-swiper { padding: 4px 2px 8px; }
          .project-image { height: 200px; }
          .projects-slider-nav { display: none; }
          .projects-slide,
          .projects-slide.swiper-slide-prev,
          .projects-slide.swiper-slide-next,
          .projects-slide.swiper-slide-active {
            opacity: 1;
            transform: none;
          }
          .services-grid .service-card:nth-child(2) { grid-row: auto; transform: scale(1); }
          .exp-item { grid-template-columns: 1fr; }
          .experience-list { padding-left: 0; }
          .experience-section::before { display: none; }
          footer { flex-direction: column; gap: 8px; text-align: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .projects-slide {
            transition: none;
          }
          .project-image img {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <span className="logo">
          <img className="logo-mark" src={logoImage} alt="Kronix logo" />
        </span>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>
        <button className="btn-primary">Contact Us</button>
      </nav>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg" />
        <div className="hero-grid" />
        <h1 className={`hero-title fade-up${heroIn ? " visible" : ""}`}>
          Bringing Your<br />
          Ideas Into <span className="accent">Reality</span>
          <span className="star">✦</span>
        </h1>
        <p className={`hero-sub fade-up d1${heroIn ? " visible" : ""}`}>
          CONEXUS builds smart, scalable, and secure digital solutions that connect people, systems, and technology into one seamless experience.
        </p>
        <div className={`hero-cta fade-up d2${heroIn ? " visible" : ""}`}>
          <button className="btn-primary">Book A Meeting</button>
        </div>
        <div className={`ticker-wrapper fade-up d3${heroIn ? " visible" : ""}`} style={{ marginTop: "64px" }}>
          <p className="ticker-label">Tech Stack</p>
          <div className="ticker-track">
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <div className="ticker-item" key={i}>
                <img src={tech.icon} alt={tech.name} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="content-wrap">
        {/* ABOUT */}
        <section id="about" className="about-section" ref={aboutRef}>
          <div className={`section-head fade-up${aboutIn ? " visible" : ""}`}>
            <div>
              <p className="section-tag">About Us</p>
              <h2 className="section-title">We design and engineer digital products that feel premium.</h2>
            </div>
            <p className="section-kicker">
              Conexus is a product-focused studio helping ambitious teams launch elegant, high-performing web platforms.
            </p>
          </div>
          <div className="about-grid">
            <p className={`about-text fade-up d1${aboutIn ? " visible" : ""}`}>
              We blend strategic thinking, visual craft, and engineering discipline to create experiences that are fast, intuitive,
              and conversion-driven. Every engagement is built around outcomes: stronger brand trust, smoother user flows, and measurable business growth.
            </p>
            <div className={`about-stats fade-up d2${aboutIn ? " visible" : ""}`}>
              <div className="stat-card"><p className="stat-value">65+</p><p className="stat-label">Projects Delivered</p></div>
              <div className="stat-card"><p className="stat-value">24h</p><p className="stat-label">Avg. Response Time</p></div>
              <div className="stat-card"><p className="stat-value">12</p><p className="stat-label">Product Specialists</p></div>
              <div className="stat-card"><p className="stat-value">98%</p><p className="stat-label">Client Satisfaction</p></div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="services-section" ref={servicesRef}>
          <div className={`section-head fade-up${servicesIn ? " visible" : ""}`}>
            <div>
              <p className="section-tag">Services</p>
              <h2 className="section-title">End-to-end capabilities for modern SaaS brands.</h2>
            </div>
          </div>
          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <article key={service.title} className={`service-card fade-up d${(index % 4) + 1}${servicesIn ? " visible" : ""}`}>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="experience-section" ref={experienceRef}>
          <div className={`section-head fade-up${experienceIn ? " visible" : ""}`}>
            <div>
              <p className="section-tag">Experience</p>
              <h2 className="section-title">A track record of building products that scale.</h2>
            </div>
          </div>
          <div className="experience-list">
            {EXPERIENCE_ITEMS.map((item, index) => (
              <article key={`${item.company}-${item.period}`} className={`exp-item fade-up d${(index % 3) + 1}${experienceIn ? " visible" : ""}`}>
                <p className="exp-period">{item.period}</p>
                <div>
                  <h3 className="exp-role">{item.role}</h3>
                  <p className="exp-company">{item.company}</p>
                  <p className="exp-summary">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="projects-section" ref={projectsRef}>
          <div className={`section-head fade-up${projectsIn ? " visible" : ""}`}>
            <div>
              <p className="section-tag">Projects</p>
              <h2 className="section-title">Selected work crafted for performance and impact.</h2>
            </div>
          </div>
          <div className={`projects-slider-shell fade-up d1${projectsIn ? " visible" : ""}`}>
            <div className="projects-slider-nav" aria-hidden="true">
              <button className="projects-nav-btn projects-swiper-prev" ref={projectsPrevRef} aria-label="Previous projects">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.75 3.5L5.25 7L8.75 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="projects-nav-btn projects-swiper-next" ref={projectsNextRef} aria-label="Next projects">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <Swiper
              className="projects-swiper"
              modules={[Navigation, Pagination, Autoplay]}
              speed={650}
              spaceBetween={18}
              slidesPerView={1.1}
              centeredSlides={true}
              slideToClickedSlide={true}
              autoplay={{ delay: 3800, disableOnInteraction: false }}
              navigation={{
                prevEl: projectsPrevRef.current,
                nextEl: projectsNextRef.current,
              }}
              pagination={{
                el: projectsPaginationRef.current,
                clickable: true,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = projectsPrevRef.current;
                swiper.params.navigation.nextEl = projectsNextRef.current;
                swiper.params.pagination.el = projectsPaginationRef.current;
              }}
              breakpoints={{
                576: { slidesPerView: 1.4, spaceBetween: 16, centeredSlides: true },
                992: { slidesPerView: 2, spaceBetween: 18, centeredSlides: true },
                1366: { slidesPerView: 3, spaceBetween: 22, centeredSlides: true },
              }}
            >
              {PROJECTS.map((project) => (
                <SwiperSlide key={project.name} className="projects-slide">
                  <article className="project-card">
                    <div className="project-image">
                      <img src={project.image} alt={project.name} loading="lazy" />
                      {project.featured && <span className="project-badge">Featured</span>}
                    </div>
                    <div className="project-content">
                      <span className="project-type">{project.type}</span>
                      <h3 className="project-name">{project.name}</h3>
                      <p className="project-location">{project.location}</p>
                      <p className="project-detail">{project.detail}</p>
                      <div className="project-meta">
                        <span className="project-chip">{project.statA}</span>
                        <span className="project-chip">{project.statB}</span>
                      </div>
                      <a className="project-action" href={project.link} target="_blank" rel="noreferrer">
                        View Project
                      </a>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="projects-pagination" ref={projectsPaginationRef} />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <span>© 2026 Conexus. All rights reserved.</span>
        <span>Built with ♥ for your projects</span>
      </footer>
    </div>
  );
}
