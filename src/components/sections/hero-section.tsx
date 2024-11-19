import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useTheme } from "next-themes";

import { FileCode2, ArrowDownToLine, ArrowDown, Code } from "lucide-react";

import { Button } from "../ui/button";
import CircularText from "../custom/circular-text";

export default function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering until hydration
  }

  return (
    <div
      id="home"
      className="flex justify-start lg:justify-end h-[83vh] flex-col gap-10 relative"
    >
      {/* BACKGROUNDS */}
      <Image
        src={"/bg_2.png"}
        alt="bg_1"
        className="-z-10 fixed -top-[300px] -right-[200px] opacity-30 blur-xl"
        width={800}
        height={800}
      />
      <Image
        src={"/bg_2.png"}
        alt="bg_1"
        className="-z-10 fixed bottom-0 -left-10 opacity-20 blur-xl"
        width={500}
        height={500}
      />
      {/* BACKGROUNDS */}

      <div className="space-y-10 lg:mt-0 mt-[20%]">
        <h1 className="lg:text-7xl text-4xl text-balance font-black leading-none lg:leading-tight">
          I'm Russel Aniel, Web Developer
        </h1>
        <section className="space-x-5">
          <Button variant={"outline"} className="rounded-full text-sm">
            My Works <FileCode2 />
          </Button>
          <Button variant={"ghost"} className="rounded-full">
            Download CV <ArrowDownToLine />
          </Button>
        </section>
      </div>

      <section className="absolute lg:right-0 bottom-0 lg:m-0 m-[25%]">
        <section className="relative">
          <div className="animate-spin-slow">
            <CircularText
              text="SCROLL FOR MORE * SCROLL FOR MORE * SCROLL FOR MORE *"
              radius={70}
              padding={10}
              color={theme === "dark" ? "white" : "black"}
            />
          </div>
          <ArrowDown className="absolute top-[40%] right-[40%]" />
        </section>
      </section>
    </div>
  );
}
