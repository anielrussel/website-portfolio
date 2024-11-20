"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import { EllipsisVertical } from "lucide-react";

import ColorTheme from "@/components/custom/color-theme";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { pages } from "@/lib/constants";

export default function MainMenu() {
    const [activeLink, setActiveLink] = useState(pages[0].url);

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                console.log(entry);
                if (entry.isIntersecting) {
                    setActiveLink(`#${entry.target.id}`); // Update active tab to the intersecting section
                }
            });
        };

        const timeout = setTimeout(() => {
            const observer = new IntersectionObserver(handleIntersection, {
                root: null,
                threshold: 0.5,
            });

            pages.forEach((link) => {
                const section = document.querySelector(link.url);
                if (section) observer.observe(section);
            });

            return () => observer.disconnect();
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div>
            <div className="flex justify-end lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <EllipsisVertical />
                    </SheetTrigger>
                    <SheetContent side={"right"}>
                        <SheetHeader>
                            <SheetTitle className="sr-only">
                                Main Menu
                            </SheetTitle>
                            <SheetDescription className="sr-only">
                                Main Menu
                            </SheetDescription>
                        </SheetHeader>

                        <div className="flex h-full flex-col justify-between">
                            <section className="flex flex-col gap-5">
                                {pages.map((menu, index) => (
                                    <Link key={index} href={menu.url} passHref>
                                        <Button
                                            variant={
                                                activeLink === menu.url
                                                    ? "outline"
                                                    : "ghost"
                                            }
                                            className="rounded-full backdrop-blur-sm"
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
                    </SheetContent>
                </Sheet>
            </div>

            <div className="relative hidden w-[50%] lg:block">
                <div className="fixed flex min-w-[64.5%] items-center justify-between z-50">
                    <section className="space-x-5">
                        {pages.map((menu, index) => (
                            <Link key={index} href={menu.url} passHref>
                                <Button
                                    variant={
                                        activeLink === menu.url
                                            ? "outline"
                                            : "ghost"
                                    }
                                    className="rounded-full backdrop-blur-sm"
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
        </div>
    );
}
