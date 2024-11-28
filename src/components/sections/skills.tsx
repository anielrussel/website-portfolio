import React from "react";

import Image from "next/image";

import { Code } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { skills } from "@/lib/constants";

export default function Skills() {
    const mainStack = skills.find((skill) => skill.main)?.main;
    const backendStack = skills.find((skill) => skill.backend)?.backend;
    const frontendStack = skills.find((skill) => skill.frontend)?.frontend;
    const others = skills.find((skill) => skill.others)?.others;

    return (
        <div id="skills" className="flex justify-end flex-col gap-20">
            <section className="space-y-2">
                <span className="flex gap-1 items-center w-[10%] rounded-full border p-2 text-xs">
                    <Code size={15} /> <p>Skills</p>
                </span>
                <h1 className="lg:text-6xl text-3xl w-[80%] font-medium text-pretty">
                    Tech stack and some tools that I use
                </h1>
            </section>

            <section className="space-y-2">
                <h1>Main stack:</h1>
                <div className="flex gap-5 flex-wrap">
                    {mainStack?.map((main, index) => (
                        <Card key={index}>
                            <CardHeader className="sr-only">
                                <CardTitle></CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 flex flex-col items-center">
                                <div className="relative">
                                    <Image
                                        src={main.icon}
                                        alt={main.title}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <h1 className="text-sm">{main.title}</h1>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="grid lg:grid-cols-3 gap-10">
                <div>
                    <h1 className="text-xs">Frontend:</h1>
                    <div className="flex gap-3">
                        {frontendStack?.map((front, index) => (
                            <Card key={index} className="w-20 h-20">
                                <CardHeader className="sr-only">
                                    <CardTitle></CardTitle>
                                    <CardDescription></CardDescription>
                                </CardHeader>
                                <CardContent className="p-2 flex flex-col items-center h-full justify-center gap-1 text-center">
                                    <div className="relative">
                                        <Image
                                            src={front.icon}
                                            alt={front.title}
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <h1 className="text-[10px] font-light">
                                        {front.title}
                                    </h1>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="text-xs">Backend:</h1>
                    <div className="flex gap-3 flex-wrap">
                        {backendStack?.map((back, index) => (
                            <Card key={index} className="w-20 h-20">
                                <CardHeader className="sr-only">
                                    <CardTitle></CardTitle>
                                    <CardDescription></CardDescription>
                                </CardHeader>
                                <CardContent className="p-2 flex flex-col items-center h-full justify-center gap-1 text-center">
                                    <div className="relative">
                                        <Image
                                            src={back.icon}
                                            alt={back.title}
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <h1 className="text-[10px] font-light">
                                        {back.title}
                                    </h1>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="text-xs">Others:</h1>
                    <div className="flex gap-3 flex-wrap">
                        {others?.map((other, index) => (
                            <Card key={index} className="w-20 h-20">
                                <CardHeader className="sr-only">
                                    <CardTitle></CardTitle>
                                    <CardDescription></CardDescription>
                                </CardHeader>
                                <CardContent className="p-2 flex flex-col items-center h-full justify-center gap-1 text-center">
                                    <div className="relative">
                                        <Image
                                            src={other.icon}
                                            alt={other.title}
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <h1 className="text-[10px] font-light">
                                        {other.title}
                                    </h1>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <p className="text-base font-light">
                    I have a solid understanding of best coding practices,
                    design patterns, and project methodologies like Agile Scrum.
                    I focus on writing clean, maintainable code using principles
                    like <strong className="text-red-500">SOLID and DRY</strong>
                    , and I apply design patterns like{" "}
                    <strong className="text-red-500">Singleton</strong> to
                    create reusable and scalable solutions.
                    <br />
                    <br />
                    I’m experienced in{" "}
                    <strong className="text-red-500">Agile Scrum</strong>,
                    working in sprints, collaborating with teams during
                    stand-ups, and delivering projects in small, manageable
                    steps. This approach helps me build reliable software that
                    meets project goals efficiently.
                </p>
            </section>
        </div>
    );
}
