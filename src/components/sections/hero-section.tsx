import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import Image from "next/image";

import { ArrowDown, ArrowDownToLine, FileCode2 } from "lucide-react";

import CircularText from "@/components/custom/circular-text";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    // Determine the active theme
    const currentTheme = theme === "system" ? systemTheme : theme;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Avoid rendering until hydration
    }

    return (
        <div
            id="home"
            className="relative flex h-screen -mt-[13%] flex-col justify-start gap-10 lg:justify-end"
        >
            {/* BACKGROUNDS */}
            <Image
                src={"/bg_2.png"}
                alt="bg_1"
                className="fixed -right-[200px] -top-[300px] -z-10 opacity-30 blur-xl"
                width={800}
                height={800}
            />
            <Image
                src={"/bg_2.png"}
                alt="bg_1"
                className="fixed -left-10 bottom-0 -z-10 opacity-20 blur-xl"
                width={500}
                height={500}
            />
            {/* BACKGROUNDS */}

            <div className="mt-[20%] space-y-10 lg:mt-0">
                <h1 className="text-balance text-4xl font-black leading-none lg:text-7xl lg:leading-tight">
                    I'm Russel Aniel, Web Developer
                </h1>
                <section className="space-x-5">
                    <Button
                        variant={"outline"}
                        className="rounded-full text-sm"
                    >
                        My Works <FileCode2 />
                    </Button>
                    <Button variant={"ghost"} className="rounded-full">
                        Download CV <ArrowDownToLine />
                    </Button>
                </section>
            </div>

            <section className="absolute bottom-0 m-[25%] lg:right-0 lg:m-0">
                <section className="relative">
                    <div className="animate-spin-slow">
                        <CircularText
                            text="SCROLL FOR MORE * SCROLL FOR MORE * SCROLL FOR MORE *"
                            radius={70}
                            padding={10}
                            color={currentTheme === "dark" ? "white" : "black"} // Set color based on theme
                        />
                    </div>
                    <ArrowDown className="absolute right-[40%] top-[40%]" />
                </section>
            </section>
        </div>
    );
}
