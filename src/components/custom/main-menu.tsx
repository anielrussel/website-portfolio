"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ColorTheme from "./color-theme";

const menuLinks = [
  {
    title: "Home",
    url: "#home",
  },
  {
    title: "About Me",
    url: "#about-me",
  },
  {
    title: "Skills",
    url: "#skills",
  },
  {
    title: "Projects",
    url: "#projects",
  },
  {
    title: "Contact Me",
    url: "#contact-me",
  },
];

export default function MainMenu() {
  const [activeLink, setActiveLink] = useState(menuLinks[0].url);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`); // Update active tab to the intersecting section
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      threshold: 0.5, // Trigger when 50% of the element is visible
    });

    // Observe all sections by their `id`
    menuLinks.forEach((link) => {
      const section = document.querySelector(link.url);
      if (section) {
        observer.observe(section);
      }
    });

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-[50%]">
      <div className="fixed flex items-center min-w-[64.5%] justify-between">
        <section className="space-x-5">
          {menuLinks.map((menu, index) => (
            <Link key={index} href={menu.url} passHref>
              <Button
                variant={activeLink === menu.url ? "outline" : "ghost"}
                className=" rounded-full"
              >
                {menu.title}
              </Button>
            </Link>
          ))}
        </section>
        <section>
          <ColorTheme />
        </section>
      </div>
    </div>
  );
}
