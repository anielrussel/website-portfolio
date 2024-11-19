import React from "react";

import { FileCode2, ArrowDownToLine } from "lucide-react";

import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <div id="home" className="flex justify-end h-[83vh] flex-col gap-10">
      <h1 className="text-7xl text-balance font-black">
        I'm Juan Dela Cruz, Web Developer
      </h1>
      <section className="space-x-5">
        <Button variant={"outline"} className="rounded-full">
          My Works <FileCode2 />
        </Button>
        <Button variant={"ghost"} className="rounded-full">
          Download CV <ArrowDownToLine />
        </Button>
      </section>
    </div>
  );
}
