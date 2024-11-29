"use client";

import React, { useEffect, useState } from "react";
import { LuGithub, LuLinkedin } from "react-icons/lu";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import { ArrowDownToLine, Code, Menu } from "lucide-react";

import MainMenu from "@/components/custom/main-menu";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const socialMedias = [
    {
        title: "LinkedIn",
        icon: LuLinkedin,
        url: "https://www.linkedin.com/in/russel-aniel-48353820b/",
    },
    {
        title: "Github",
        icon: LuGithub,
        url: "https://github.com/anielrussel",
    },
];

export default function Sidebar({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);
    const [exp, setExp] = useState<number>(0);

    // Determine the active theme
    const currentTheme = theme === "system" ? systemTheme : theme;

    // Calculate the years of experience dynamically
    useEffect(() => {
        const calculateExperience = (date: string) => {
            const currentDate = new Date();
            const hiredDate = new Date(date);

            let yearDiff = currentDate.getFullYear() - hiredDate.getFullYear();
            const monthDff = currentDate.getMonth() - hiredDate.getMonth();
            const dayDiff = currentDate.getDate() - hiredDate.getDate();

            if (monthDff < 0 || (monthDff === 0 && dayDiff < 0)) {
                yearDiff--;
            }

            setExp(yearDiff);
        };
        calculateExperience("08/07/2023");
    }, [exp]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Avoid rendering until hydration
    }

    return (
        <div className="flex lg:gap-10 gap-0">
            {/* MOBILE VIEW */}
            <div className="lg:hidden block absolute">
                <Sheet>
                    <SheetTrigger asChild>
                        <Menu />
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle className="sr-only">Profile</SheetTitle>
                            <SheetDescription className="sr-only">
                                Profile
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col justify-between h-full">
                            <section>
                                <div className="flex gap-3 items-center pb-2">
                                    <Code size={60} />
                                    <h1 className="text-3xl font-semibold">
                                        John Doe
                                    </h1>
                                </div>
                                <div className=" relative h-52 rounded-xl w-full border">
                                    <Image
                                        src={"/profile.webp"}
                                        alt="profile"
                                        fill
                                        objectFit="cover"
                                        objectPosition="center"
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="flex gap-3 justify-center mt-4">
                                    {socialMedias.map((social, index) => (
                                        <section
                                            key={index}
                                            className="border p-2 rounded-full"
                                        >
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link
                                                            href={social.url}
                                                            target="_blank"
                                                            passHref
                                                        >
                                                            {<social.icon />}
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        {social.title}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </section>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <p className="text-sm">Specializes in:</p>
                                <h1 className="text-xl text-balance">
                                    Front-end and API Development
                                </h1>
                            </section>

                            <section>
                                <p className="text-sm">Based in:</p>
                                <h1 className="text-lg text-balance">
                                    Mandaluyong City, Philippines
                                </h1>
                            </section>

                            <section>
                                <Button
                                    variant={"default"}
                                    className="rounded-full w-full"
                                >
                                    Download CV <ArrowDownToLine />
                                </Button>
                            </section>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            {/* MOBILE VIEW */}

            {/* DESKTOP VIEW */}
            <Card className="h-[92vh] w-1/4 px-8 py-6 rounded-3xl fixed hidden lg:block">
                <CardHeader className="p-0">
                    <CardTitle className="sr-only">Card Title</CardTitle>
                    <CardDescription className="sr-only">
                        Card Description
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-full">
                    <div className="flex flex-col justify-between h-full">
                        <section>
                            <div className="flex gap-3 items-center pb-2">
                                {currentTheme === "dark" ? (
                                    <Image
                                        src={"/white_logo.webp"}
                                        alt="logo"
                                        width={60}
                                        height={0}
                                    />
                                ) : (
                                    <Image
                                        src={"/dark_logo.webp"}
                                        alt="logo"
                                        width={60}
                                        height={0}
                                    />
                                )}

                                {/* <Code size={60} /> */}
                                <h1 className="text-3xl font-semibold">
                                    Russel Aniel
                                </h1>
                            </div>
                            <div className=" relative h-52 rounded-xl w-full border">
                                <Image
                                    src={"/profile.webp"}
                                    alt="profile"
                                    fill
                                    objectFit="cover"
                                    objectPosition="center"
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="flex gap-3 justify-center mt-4">
                                {socialMedias.map((social, index) => (
                                    <section
                                        key={index}
                                        className="border p-2 rounded-full"
                                    >
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link
                                                        href={social.url}
                                                        target="_blank"
                                                        passHref
                                                    >
                                                        {<social.icon />}
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {social.title}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </section>
                                ))}
                            </div>
                        </section>

                        <section>
                            <p className="text-sm">Specializes in:</p>
                            <h1 className="text-2xl text-balance">
                                Front-End Development
                            </h1>
                            <h2 className="font-light text-sm">{`${exp}+ year of experience`}</h2>
                        </section>

                        <section>
                            <p className="text-sm">Based in:</p>
                            <h1 className="text-lg text-balance">
                                Mandaluyong City, Philippines
                            </h1>
                        </section>

                        <section>
                            <Link
                                href={"/Russel M. Aniel.pdf"}
                                download
                                target="_blank"
                            >
                                <Button
                                    variant={"default"}
                                    className="rounded-full w-full"
                                >
                                    Download CV <ArrowDownToLine />
                                </Button>
                            </Link>
                        </section>
                    </div>
                </CardContent>
            </Card>
            {/* DESKTOP VIEW */}

            <div className="lg:ml-[30%] ml-0">
                <MainMenu />
                <section className="mt-16">{children}</section>
            </div>
        </div>
    );
}
