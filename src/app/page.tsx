"use client";

import { pages } from "@/lib/constants";

export default function Home() {
    const scrollToSection = (title: string) => {
        const element = document.getElementById(title);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main>
            {pages.map((section, index) => (
                <div key={index}>
                    <a onClick={() => scrollToSection(section.title)}>
                        {section.component}
                    </a>
                </div>
            ))}
        </main>
    );
}
