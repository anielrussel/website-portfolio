import { LuGithub, LuLinkedin } from "react-icons/lu";

import { Mail, Smartphone } from "lucide-react";

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
    // {
    //     id: "about-me",
    //     title: "About Me",
    //     url: "#about-me",
    //     component: <AboutMe />,
    // },
    {
        id: "contact-me",
        title: "Contact Me",
        url: "#contact-me",
        component: <ContactMe />,
    },
];

export const projects = [
    {
        developments: [
            {
                title: "Employee Self Service (ESS)",
                description:
                    "This project is a web application designed to streamline employee management. It features secure authentication, tools for managing employee profiles and documents, attendance tracking, scheduling, and functionalities for handling leave entitlements, forms, etc.",
                url: null,
                githubUrl: null,
                stacks: {
                    backend: [
                        "ASP.Net Core",
                        "Entity Framework",
                        "MSSQL Server",
                        "SSMS",
                    ],
                    frontend: [
                        "Next.js",
                        "Redux/Redux Toolkit",
                        "Ant Design",
                        "Axios",
                        "Tailwind",
                    ],
                },
                image: {
                    src: "/projects/ESS.webp",
                    altText: "ESS",
                },
            },
            {
                title: "Company Website",
                description:
                    "A static website project focuses on creating a visually appealing and responsive online presence for the company, showcasing its profile, services, products or solutions.",
                url: "https://www.commerceone.com.ph/",
                githubUrl: null,
                stacks: {
                    backend: [],
                    frontend: [
                        "Next.js",
                        "Shadcn/ui",
                        "Axios",
                        "Tailwind",
                        "Nodemailer",
                    ],
                },
                image: {
                    src: "/projects/Website.webp",
                    altText: "Company Website",
                },
            },
            {
                title: "Ashley Joy's Flower Shop",
                description:
                    "The Ashley Joy's Flowershop website is a simple e-commerce platform built with the MERN stack, offering a wide range of floral products. This is a personal project that helps me further enhance my skills in coding.",
                url: "https://ashley-e-commerce-mern.vercel.app/",
                githubUrl:
                    "https://github.com/anielrussel/Ashley-ECommerce-MERN",
                stacks: {
                    backend: ["Nodejs", "ExpressJs", "MongoDB"],
                    frontend: [
                        "React",
                        "Typescript",
                        "Redux/Redux Toolkit",
                        "Tailwind",
                    ],
                },
                image: {
                    src: "/projects/E-commerce.webp",
                    altText: "E-commerce",
                },
            },
            {
                title: "Mini Inventory App",
                description:
                    "One of my personal projects-The Mini Inventory System is a MERN-based web application for managing inventory. It features functionality for tracking products such as Creating, Displaying, Updating, and Deleting products, with a clean and user-friendly interface",
                url: "https://inventory-system-mernapp.vercel.app/",
                githubUrl:
                    "https://github.com/anielrussel/Inventory-System-MERNAPP",
                stacks: {
                    backend: ["Nodejs", "ExpressJs", "MongoDB", "JWT"],
                    frontend: [
                        "React",
                        "Typescript",
                        "Redux/Redux Toolkit",
                        "Ant Design",
                        "Tailwind",
                    ],
                },
                image: {
                    src: "/projects/Inventory.webp",
                    altText: "Mini Inventory",
                },
            },
        ],
    },
    { designs: [{}] },
];

export const skills = [
    {
        main: [
            {
                title: "Next.js",
                icon: "/skills/nextjs.svg",
            },
            {
                title: "Typescript",
                icon: "/skills/typescript.svg",
            },
            {
                title: "Tailwind",
                icon: "/skills/tailwind.svg",
            },
            {
                title: "Redux",
                icon: "/skills/redux.svg",
            },
            {
                title: "Shadcn",
                icon: "/skills/shadcn.svg",
            },
            {
                title: "Ant Design",
                icon: "/skills/antd.svg",
            },
            {
                title: "Axios",
                icon: "/skills/axios.svg",
            },
        ],
        frontend: [
            {
                title: "Reactjs",
                icon: "/skills/react.svg",
            },
            {
                title: "Framer Motion",
                icon: "/skills/framer.svg",
            },
            {
                title: "Figma",
                icon: "/skills/figma.svg",
            },
        ],
        backend: [
            {
                title: ".Net Core",
                icon: "/skills/net.svg",
            },
            {
                title: "SQL Server",
                icon: "/skills/server.svg",
            },
            {
                title: "Nodejs",
                icon: "/skills/nodejs.svg",
            },
            {
                title: "Mongo DB",
                icon: "/skills/mongodb.svg",
            },
            {
                title: "Pocketbase",
                icon: "/skills/pocketbase.svg",
            },
            {
                title: "Strapi CMS",
                icon: "/skills/strapi.svg",
            },
        ],
        others: [
            {
                title: "Azure",
                icon: "/skills/azure.svg",
            },
            {
                title: "GitHub",
                icon: "/skills/github.svg",
            },
            {
                title: "Git",
                icon: "/skills/git.svg",
            },
            {
                title: "Postman",
                icon: "/skills/postman.svg",
            },
        ],
    },
];

export const contacts = [
    {
        title: "anielrussel13@gmail.com",
        url: null,
        icon: Mail,
    },
    {
        title: "09099131902",
        url: null,
        icon: Smartphone,
    },
    {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/russel-aniel-48353820b/",
        icon: LuLinkedin,
    },
    {
        title: "GitHub",
        url: "https://github.com/anielrussel",
        icon: LuGithub,
    },
];
