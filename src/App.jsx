import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import logoImage from "../logo.png";
import elaineImage from "../elaine.png";
import allenImage from "../allen.jpeg";
import alvinImage from "../alvin.jpg";
import gilImage from "../gil.jpg";
import mcneilImage from "../mcneil.png";
import sirJoshImage from "../sir josh.jpeg";
import nagaImage from "../naga.jpg";
import picImage from "../pic.jpg";
import gulwayImage from "../gulway.jpeg";
import nagacareImage from "../nagacare.jpg";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
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
    title: "Web & App Development",
    desc: "Modern, responsive websites and powerful mobile applications built to scale your business and engage users seamlessly.",
    icon: "browser",
  },
  {
    title: "UI/UX Design",
    desc: "Clean, intuitive, and user-centered interfaces that deliver seamless digital experiences.",
    icon: "design",
  },
  {
    title: "API & Cloud Solutions",
    desc: "API & system integration, secure cloud hosting, and scalable infrastructure for your business.",
    icon: "server",
  },
  {
    title: "IT Consultation",
    desc: "Strategic technical guidance to help businesses make smarter digital decisions and optimize their tech stack.",
    icon: "strategy",
  },
];

const PROJECTS = [
  {
    name: "NagaCare",
    type: "Analytics SaaS",
    detail: "Real-time KPI dashboard for growth teams with custom reports and team workspaces.",
    image: nagacareImage,
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

const ACHIEVEMENTS = [
  {
    title: "1st Naga City Mayoral Hackathon",
    description: "Top 5 Finalist in Health Category held at Naga, City",
    image: nagaImage,
  },
  {
    title: "Philippine Innovation Conference 2025",
    description: "Participant in PIC 2025 held at University of Batangas",
    image: picImage,
  },
  {
    title: "SUCCESS Program 2024",
    description: "FIRST PLACE in the Start up Pitching Competition entitled “SUCCESS Program” during the Technovation Summit held at Steer Hub, BatStateU Alangilan",
    image: gulwayImage,
  },
];

const TEAM = [
    {
    name: "Joshua Abella",
    role: "Mentor & Strategy Advisor",
    avatar: sirJoshImage,
    linkedin: "https://linkedin.com/in/sirjosh",
    facebook: "https://facebook.com/sirjosh",
  },
  {
    name: "Elaine Domaycos",
    role: "Project Manager/ UI-UX Designer/ Front-end Developer",
    avatar: elaineImage,
    linkedin: "https://www.linkedin.com/in/ma-kassandra-elaine-domaycos/",
    facebook: "https://www.facebook.com/elaine.domaycos.1",
  },
  {
    name: "Alvin Aloya",
    role: "Full Stack Developer/Cloud Engineer",
    avatar: alvinImage,
    linkedin: "https://www.linkedin.com/in/alvin-aloya-45248b340/",
    facebook: "https://www.facebook.com/alvin.sucke/",
  },
  {
    name: "Francis Gil Aloya",
    role: "Full Stack Developer/ Database Administrator",
    avatar: gilImage,
    linkedin: "https://linkedin.com/in/gil",
    facebook: "https://facebook.com/gil",
  },
  {
    name: "Mcneil Magtibay",
    role: "Full Stack Developer",
    avatar: mcneilImage,
    linkedin: "https://linkedin.com/in/mcneil",
    facebook: "https://facebook.com/mcneil",
  },
  {
    name: "Allen Martillan",
    role: "Full Stack Developer",
    avatar: allenImage,
    linkedin: "https://linkedin.com/in/allen",
    facebook: "https://facebook.com/allen",
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

function ServiceIcon({ type }) {
  const icons = {
    browser: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="32" height="26" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 14h32M10 10h4M18 10h4M26 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 20h20M10 25h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    server: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="28" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="6" y="18" width="28" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="11" r="1.5" fill="currentColor"/>
        <circle cx="18" cy="11" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="23" r="1.5" fill="currentColor"/>
        <circle cx="18" cy="23" r="1.5" fill="currentColor"/>
        <path d="M32 8v2M32 20v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    design: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="28" height="24" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 14h28M14 32v3M26 32v3M14 35h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="20" r="3" fill="currentColor"/>
      </svg>
    ),
    strategy: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12h24M8 20h24M8 28h16M12 6v28M28 6v28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  };
  return <div className="service-icon-svg">{icons[type]}</div>;
}

function ContactIcon({ type }) {
  const icons = {
    email: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8l9 6 9-6M3 8v12c0 1 .5 2 2 2h14c1.5 0 2-1 2-2V8M3 8h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    chat: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 10c1 0 2 1 2 2v8c0 1-1 2-2 2h-2l-4 3v-3H6c-1 0-2-1-2-2v-8c0-1 1-2 2-2h14zM4 5h10c1 0 2 1 2 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    location: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2c3.314 0 6 2.686 6 6 0 2.9-4 10-6 10s-6-7.1-6-10c0-3.314 2.686-6 6-6zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  };
  return <div className="contact-icon-svg">{icons[type]}</div>;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const projectsPrevRef = useRef(null);
  const projectsNextRef = useRef(null);
  const projectsPaginationRef = useRef(null);
  const achievementsPrevRef = useRef(null);
  const achievementsNextRef = useRef(null);
  const achievementsPaginationRef = useRef(null);
  
  const [heroRef, heroIn] = useInView(0.1);
  const [servicesRef, servicesIn] = useInView(0.1);
  const [projectsRef, projectsIn] = useInView(0.1);
  const [achievementsRef, achievementsIn] = useInView(0.1);
  const [teamRef, teamIn] = useInView(0.1);
  const [contactRef, contactIn] = useInView(0.1);

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
          background: 
            radial-gradient(ellipse 700px 400px at 50% 35%, rgba(184,255,87,0.15) 0%, rgba(184,255,87,0.08) 40%, transparent 80%),
            radial-gradient(ellipse 600px 300px at 50% 45%, rgba(184,255,87,0.1) 0%, transparent 70%);
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
        
        /* ===== SERVICES SECTION ===== */
        .services-section {
          margin-top: 88px;
          padding: 0;
        }
        .services-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .services-header .section-tag {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          color: var(--lime);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .services-header .section-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1px;
          margin-bottom: 20px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .service-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 32px 24px;
          background: linear-gradient(135deg, rgba(184,255,87,0.08) 0%, rgba(184,255,87,0.02) 100%);
          border: 1px solid rgba(184,255,87,0.14);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .service-card:hover {
          border-color: rgba(184,255,87,0.35);
          background: linear-gradient(135deg, rgba(184,255,87,0.14) 0%, rgba(184,255,87,0.06) 100%);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
        }
        .service-icon {
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 76px;
          height: 76px;
          border-radius: 999px;
          background: rgba(184,255,87,0.12);
          transition: all 0.3s ease;
        }
        .service-icon-svg {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--lime);
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .service-card:hover .service-icon {
          background: rgba(184,255,87,0.2);
          transform: scale(1.12);
        }
        .service-card:hover .service-icon-svg {
          transform: rotate(6deg) scale(1.1);
          color: var(--lime);
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

        /* ===== PROJECTS SECTION ===== */
        .projects-section {
          margin-top: 88px;
          padding: 0;
          background: none;
          border: none;
        }
        .projects-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .projects-header .section-tag {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          color: var(--lime);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .projects-header .section-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1px;
          margin-bottom: 20px;
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
        .project-type {
          display: inline-flex;
          padding: 5px 9px;
          border-radius: 999px;
          border: 1px solid rgba(184,255,87,0.36);
          color: var(--lime);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
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

        /* ===== ACHIEVEMENTS SECTION ===== */
        .achievements-section {
          margin-top: 88px;
          padding: 0;
        }
        .achievements-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .achievements-header .section-tag {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          color: var(--lime);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .achievements-header .section-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1px;
        }
        .achievements-slider-shell {
          position: relative;
          padding: 0 64px;
        }
        .achievements-swiper {
          overflow: hidden;
          user-select: none;
          padding: 6px 4px 10px;
        }
        .achievements-slide {
          height: auto;
          display: flex;
        }
        .achievement-card {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(184,255,87,0.14);
        }
        .achievement-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .achievement-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6) saturate(0.8);
          transition: filter 0.4s ease;
        }
        .achievement-card:hover .achievement-image img {
          filter: brightness(0.7) saturate(0.95);
        }
        .achievement-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 28px;
          z-index: 2;
        }
        .achievement-title {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 8px;
          color: #f0f0e8;
        }
        .achievement-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(240,240,232,0.8);
          line-height: 1.5;
        }
        .achievements-nav-btn {
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
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }
        .achievements-nav-btn:hover {
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 0 0 5px rgba(184,255,87,0.12);
        }
        .projects-nav-btn {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1.5px solid var(--lime);
          color: var(--lime);
          background: rgba(14,26,14,0.92);
          display: grid;
          place-items: center;
          cursor: pointer;
          pointer-events: auto;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }
        .projects-nav-btn:hover {
          transform: translateY(-50%) scale(1.1);
          background: rgba(184,255,87,0.08);
          box-shadow: 0 0 0 6px rgba(184,255,87,0.14);
        }
        .projects-slider-nav { position: absolute; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none; }
        .projects-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
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
        .achievements-slider-nav { position: absolute; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none; }
        .achievements-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }
        .achievements-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(240,240,232,0.35);
          opacity: 1;
          transition: all 0.25s ease;
        }
        .achievements-pagination .swiper-pagination-bullet-active {
          width: 28px;
          background: var(--lime);
        }

        /* ===== TEAM SECTION ===== */
        .team-section {
          margin-top: 88px;
          padding: 0;
        }
        .team-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .team-header .section-tag {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          color: var(--lime);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .team-header .section-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1px;
          margin-bottom: 16px;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .team-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .team-avatar {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          margin-bottom: 20px;
          border: 2px solid rgba(184,255,87,0.28);
          object-fit: cover;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .team-card:hover .team-avatar {
          transform: scale(1.05);
          border-color: rgba(184,255,87,0.6);
        }
        .team-name {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 6px;
          color: #f0f0e8;
        }
        .team-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: var(--lime);
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
        .team-socials {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(184, 255, 87, 0.1);
          color: var(--lime);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .social-link:hover {
          background-color: var(--lime);
          color: #1a1a1a;
          transform: translateY(-2px);
        }
        .social-link svg {
          width: 18px;
          height: 18px;
        }

        /* ===== CONTACT SECTION ===== */
        .contact-section {
          margin-top: 88px;
          padding: 0;
        }
        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 64px;
          align-items: start;
        }
        .contact-content {
          position: sticky;
          top: 120px;
        }
        .contact-header .section-tag {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          color: var(--lime);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .contact-header .section-title {
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1.2px;
          margin-bottom: 20px;
        }
        .contact-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.7;
          color: rgba(240,240,232,0.65);
          margin-bottom: 32px;
        }
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .contact-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .contact-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(184,255,87,0.12);
          border: 1px solid rgba(184,255,87,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .contact-icon-svg {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--lime);
        }
        .contact-detail-item:hover .contact-icon {
          background: rgba(184,255,87,0.18);
          border-color: rgba(184,255,87,0.4);
          transform: translateY(-2px);
        }
        .contact-detail-text h4 {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #f0f0e8;
          margin-bottom: 4px;
        }
        .contact-detail-text p {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(240,240,232,0.6);
        }
        .contact-detail-text a {
          color: var(--lime);
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .contact-detail-text a:hover {
          opacity: 0.8;
        }
        .contact-container {
          background: linear-gradient(135deg, rgba(184,255,87,0.08) 0%, rgba(184,255,87,0.02) 100%);
          border: 1px solid rgba(184,255,87,0.18);
          border-radius: 20px;
          padding: 48px;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--lime);
          letter-spacing: 0.3px;
        }
        .form-input,
        .form-textarea {
          padding: 14px 18px;
          background: rgba(14,26,14,0.6);
          border: 1px solid rgba(184,255,87,0.22);
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #f0f0e8;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--lime);
          box-shadow: 0 0 0 3px rgba(184,255,87,0.12);
        }
        .form-textarea {
          resize: vertical;
          min-height: 140px;
        }
        .form-submit {
          padding: 16px 32px;
          background: var(--lime);
          color: var(--dark);
          border: none;
          border-radius: 10px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .form-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(184,255,87,0.35);
        }
        .contact-info {
          margin-top: 32px;
          padding-top: 32px;
          border-top: 1px solid rgba(184,255,87,0.14);
          text-align: center;
        }
        .contact-info p {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(240,240,232,0.6);
          margin-bottom: 12px;
        }
        .contact-email {
          color: var(--lime);
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .contact-email:hover {
          opacity: 0.8;
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

        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
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

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .projects-slider-shell,
          .achievements-slider-shell { padding: 0 28px; }
          .contact-wrapper { grid-template-columns: 1fr; gap: 40px; }
          .contact-content { position: static; }
        }

        @media (max-width: 768px) {
          .nav { height: 64px; padding: 0 16px; }
          .logo { width: 58px; height: 58px; flex-basis: 58px; }
          .logo-mark { width: 92px; height: 92px; }
          .nav-links { display: none; }
          .nav .btn-primary { padding: 8px 14px; font-size: 13px; }

          .hero {
            min-height: auto;
            padding: 108px 16px 56px;
          }
          .hero-title {
            font-size: clamp(34px, 10vw, 48px);
            letter-spacing: -1px;
            line-height: 1.08;
            max-width: 100%;
          }
          .hero-sub {
            font-size: 14px;
            max-width: 100%;
            line-height: 1.6;
          }
          .hero-cta {
            width: 100%;
            justify-content: center;
          }
          .hero-cta .btn-primary {
            width: 100%;
            max-width: 280px;
            text-align: center;
          }
          .ticker-wrapper { margin-top: 40px !important; }
          .ticker-item { padding: 0 20px; min-width: 84px; }
          .ticker-item img { width: 28px; height: 28px; }

          .content-wrap { padding: 0 16px 64px; }

          .services-header,
          .projects-header,
          .achievements-header,
          .team-header { margin-bottom: 36px; }

          .services-grid { grid-template-columns: 1fr; gap: 14px; }
          .service-card { padding: 24px 18px; }

          .projects-slider-shell,
          .achievements-slider-shell { padding: 0 4px; }
          .projects-swiper,
          .achievements-swiper { padding: 4px 2px 8px; }
          .project-image { height: 190px; }
          .project-content { padding: 16px; }
          .project-name { font-size: 20px; }
          .projects-nav-btn,
          .achievements-nav-btn { display: none; }

          .achievement-card { height: 270px; }
          .achievement-overlay { padding: 16px; }
          .achievement-title { font-size: 16px; }
          .achievement-desc { font-size: 12px; }

          .team-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .team-avatar { width: 88px; height: 88px; margin-bottom: 12px; }
          .team-name { font-size: 15px; }
          .team-role { font-size: 12px; }
          .social-link { width: 32px; height: 32px; }

          .contact-header .section-title { font-size: 30px; }
          .contact-container { padding: 22px 16px; border-radius: 14px; }
          .contact-form { gap: 16px; }
          .form-row { grid-template-columns: 1fr; gap: 16px; }
          .form-input,
          .form-textarea { font-size: 14px; padding: 12px 14px; }

          footer {
            flex-direction: column;
            gap: 8px;
            text-align: center;
            padding: 24px 16px;
          }
        }

        @media (max-width: 480px) {
          .nav .btn-primary {
            padding: 7px 12px;
            font-size: 12px;
          }
          .hero-title { font-size: clamp(30px, 10.5vw, 40px); }
          .hero-sub { font-size: 13px; }
          .team-grid { grid-template-columns: 1fr; }
          .contact-header .section-title { font-size: 26px; }
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
          <img className="logo-mark" src={logoImage} alt="Conexus logo" />
        </span>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>
        <a href="#contact" className="btn-primary" style={{ textDecoration: 'none' }}>Contact Us</a>
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
          <a href="https://calendar.app.google/WAiQaj992K8wnbhp9" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>Book A Meeting</a>
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
        {/* SERVICES */}
        <section id="services" className="services-section" ref={servicesRef}>
          <div className={`services-header fade-up${servicesIn ? " visible" : ""}`}>
            <p className="section-tag">Services</p>
            <h2 className="section-title">End-to-end capabilities for modern SaaS brands</h2>
          </div>
          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <article key={service.title} className={`service-card fade-up d${(index % 4) + 1}${servicesIn ? " visible" : ""}`}>
                <ServiceIcon type={service.icon} />
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="projects-section" ref={projectsRef}>
          <div className={`projects-header fade-up${projectsIn ? " visible" : ""}`}>
            <p className="section-tag">Projects</p>
            <h2 className="section-title">Selected work crafted for performance and impact</h2>
          </div>
          <div className={`projects-slider-shell fade-up d1${projectsIn ? " visible" : ""}`}>
            <div className="projects-slider-nav" aria-hidden="true">
              <button className="projects-nav-btn projects-swiper-prev" ref={projectsPrevRef} aria-label="Previous projects" style={{ left: "12px" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.75 3.5L5.25 7L8.75 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="projects-nav-btn projects-swiper-next" ref={projectsNextRef} aria-label="Next projects" style={{ right: "12px" }}>
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

        {/* ACHIEVEMENTS */}
        <section id="achievements" className="achievements-section" ref={achievementsRef}>
          <div className={`achievements-header fade-up${achievementsIn ? " visible" : ""}`}>
            <p className="section-tag">Achievements</p>
            <h2 className="section-title">Proof of our excellence and impact</h2>
          </div>
          <div className={`achievements-slider-shell fade-up d1${achievementsIn ? " visible" : ""}`}>
            <div className="achievements-slider-nav" aria-hidden="true">
              <button className="achievements-nav-btn achievements-swiper-prev" ref={achievementsPrevRef} aria-label="Previous achievements" style={{ left: "12px" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.75 3.5L5.25 7L8.75 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="achievements-nav-btn achievements-swiper-next" ref={achievementsNextRef} aria-label="Next achievements" style={{ right: "12px" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <Swiper
              className="achievements-swiper"
              modules={[Navigation, Pagination, Autoplay]}
              speed={700}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              navigation={{
                prevEl: achievementsPrevRef.current,
                nextEl: achievementsNextRef.current,
              }}
              pagination={{
                el: achievementsPaginationRef.current,
                clickable: true,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = achievementsPrevRef.current;
                swiper.params.navigation.nextEl = achievementsNextRef.current;
                swiper.params.pagination.el = achievementsPaginationRef.current;
              }}
              breakpoints={{
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.3 },
              }}
            >
              {ACHIEVEMENTS.map((achievement) => (
                <SwiperSlide key={achievement.title} className="achievements-slide">
                  <article className="achievement-card">
                    <div className="achievement-image">
                      <img src={achievement.image} alt={achievement.title} loading="lazy" />
                    </div>
                    <div className="achievement-overlay">
                      <h3 className="achievement-title">{achievement.title}</h3>
                      <p className="achievement-desc">{achievement.description}</p>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="achievements-pagination" ref={achievementsPaginationRef} />
          </div>
        </section>

        {/* TEAM */}
        <section id="team" className="team-section" ref={teamRef}>
          <div className={`team-header fade-up${teamIn ? " visible" : ""}`}>
            <p className="section-tag">Our Team</p>
            <h2 className="section-title">Meet the brilliant minds behind Conexus</h2>
          </div>
          <div className="team-grid">
            {TEAM.map((member, index) => (
              <div key={member.name} className={`team-card fade-up d${(index % 4) + 1}${teamIn ? " visible" : ""}`}>
                <img className="team-avatar" src={member.avatar} alt={member.name} loading="lazy" />
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <div className="team-socials">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin-link" title="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.384 3.704 4.362v5.586zM5.337 8.855c-1.144 0-1.915-.757-1.915-1.704 0-.951.77-1.704 1.956-1.704 1.185 0 1.916.753 1.936 1.704 0 .947-.751 1.704-1.977 1.704zm1.946 11.597H3.392V9.724h3.891v10.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                  </a>
                  <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook-link" title="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section" ref={contactRef}>
          <div className="contact-wrapper">
            <div className={`contact-content fade-up${contactIn ? " visible" : ""}`}>
              <div className="contact-header">
                <p className="section-tag">Contact Us</p>
                <h2 className="section-title">Let's build something amazing together</h2>
              </div>
              <p className="contact-description">
                Ready to transform your ideas into reality? We're here to help you create exceptional digital experiences that drive results.
              </p>
              <div className="contact-details">
                <div className="contact-detail-item">
                  <ContactIcon type="email" />
                  <div className="contact-detail-text">
                    <h4>Email Us</h4>
                    <p><a href="mailto:conexus.cnx@gmail.com">conexus.cnx@gmail.com</a></p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <ContactIcon type="chat" />
                  <div className="contact-detail-text">
                    <h4>Chat With Us</h4>
                    <p>Available Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <ContactIcon type="location" />
                  <div className="contact-detail-text">
                    <h4>Location</h4>
                    <p>Remote-first • Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`contact-container fade-up d1${contactIn ? " visible" : ""}`}>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your Name</label>
                    <input className="form-input" type="text" id="name" placeholder="Juan Dela Cruz" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input className="form-input" type="email" id="email" placeholder="juan@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input className="form-input" type="text" id="subject" placeholder="Project Inquiry" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea className="form-textarea" id="message" placeholder="Tell us about your project..." required />
                </div>
                <button className="form-submit" type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <span>© 2026 Conexus. All rights reserved.</span>
      </footer>
    </div>
  );
}
