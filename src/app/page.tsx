"use client";

import ColorTheme from "@/components/custom/color-theme";
import AboutMe from "@/components/sections/about-me";
import HeroSection from "@/components/sections/hero-section";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Link from "next/link";

const sections = [
  {
    id: "hero-section",
    title: "Hero Section",
    component: <HeroSection />,
  },
  {
    id: "about-me",
    title: "About Me",
    component: <AboutMe />,
  },
  {
    id: "skills",
    title: "Skills",
    component: <Skills />,
  },
  {
    id: "projects",
    title: "Projects",
    component: <Projects />,
  },
];

export default function Home() {
  const scrollToSection = (title: string) => {
    const element = document.getElementById(title);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {sections.map((section, index) => (
        <div key={index}>
          <a onClick={() => scrollToSection(section.title)}>
            {section.component}
          </a>
        </div>
      ))}
    </main>
  );
}
