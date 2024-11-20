import AboutMe from "@/components/sections/about-me";
import ContactMe from "@/components/sections/contact-me";
import HeroSection from "@/components/sections/hero-section";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";

export const pages = [
    {
        id: "home",
        title: "Home",
        url: "#home",
        component: <HeroSection />,
    },
    {
        id: "projects",
        title: "Projects",
        url: "#projects",
        component: <Projects />,
    },
    {
        id: "skills",
        title: "Skills",
        url: "#skills",
        component: <Skills />,
    },
    {
        id: "about-me",
        title: "About Me",
        url: "#about-me",
        component: <AboutMe />,
    },
    {
        id: "contact-me",
        title: "Contact Me",
        url: "#contact-me",
        component: <ContactMe />,
    },
];
