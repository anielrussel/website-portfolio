import React from "react";
import { LuGithub, LuGlobe } from "react-icons/lu";

import Image from "next/image";

import { Code } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { projects } from "@/lib/constants";

export default function Projects() {
    const developments = projects.find(
        (proj) => proj.developments
    )?.developments;
    const designs = projects.find((proj) => proj.designs)?.designs;

    return (
        <div id="projects" className="mt-[13%] gap-10 my-32 space-y-16">
            <section className="space-y-2">
                <span className="flex gap-1 items-center w-[10%] rounded-full border p-2 text-xs">
                    <Code size={15} /> <p>Projects</p>
                </span>
                <h1 className="lg:text-6xl text-3xl w-[80%] font-medium text-pretty">
                    Check out some of my featured projects
                </h1>
            </section>

            <section>
                {/* <h1 className="text-2xl">Developments</h1> */}
                <div className="grid md:grid-cols-2 gap-5">
                    {developments?.map((proj, index) => (
                        <Card key={index}>
                            <CardHeader className="sr-only">
                                <CardTitle className="sr-only">
                                    Projects
                                </CardTitle>
                                <CardDescription className="sr-only">
                                    Projects Description
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 h-full">
                                <div className="flex flex-col justify-between h-full">
                                    <section className="space-y-2">
                                        <span className="flex justify-between items-center">
                                            <h1 className="text-xl font-semibold">
                                                {proj.title}
                                            </h1>
                                            <div className="flex text-lg">
                                                {proj.githubUrl && (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant={
                                                                        "ghost"
                                                                    }
                                                                    className="p-2"
                                                                    onClick={() =>
                                                                        window.open(
                                                                            proj.githubUrl,
                                                                            "_blank"
                                                                        )
                                                                    }
                                                                >
                                                                    <LuGithub />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Code</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                )}

                                                {proj.url && (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant={
                                                                        "ghost"
                                                                    }
                                                                    className="p-2"
                                                                    onClick={() =>
                                                                        window.open(
                                                                            proj.url,
                                                                            "_blank"
                                                                        )
                                                                    }
                                                                >
                                                                    <LuGlobe />
                                                                </Button>
                                                            </TooltipTrigger>

                                                            <TooltipContent>
                                                                <p>Preview</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                )}
                                            </div>
                                        </span>
                                        <h2 className="text-base pb-5">
                                            {proj.description}
                                        </h2>
                                        <div className="space-y-2">
                                            {proj.stacks.backend.length > 0 && (
                                                <>
                                                    <p className="text-sm">
                                                        Backend:
                                                    </p>
                                                    <ul className="text-xs flex gap-1 flex-wrap">
                                                        {proj.stacks.backend.map(
                                                            (back, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="border py-1 px-2 rounded-full"
                                                                >
                                                                    {back}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </>
                                            )}

                                            {proj.stacks.frontend.length >
                                                0 && (
                                                <>
                                                    <p className="text-sm">
                                                        Frontend:
                                                    </p>
                                                    <ul className="text-xs flex gap-1 flex-wrap">
                                                        {proj.stacks.frontend.map(
                                                            (front, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="border py-1 px-2 rounded-full"
                                                                >
                                                                    {front}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                    </section>

                                    <section className="relative w-full h-[350px] hover:scale-95 duration-300">
                                        <Image
                                            src={proj.image.src}
                                            alt={proj.image.altText}
                                            fill
                                            objectFit="contain"
                                            objectPosition="center"
                                        />
                                    </section>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
