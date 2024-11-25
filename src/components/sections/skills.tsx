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
    return (
        <div id="skills" className="flex justify-end flex-col gap-10">
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
                <div className="flex gap-5">
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
                                        // fill
                                        // objectFit="contain"
                                        // objectPosition="center"
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

            <section className="grid lg:grid-cols-2 gap-5">
                <div className="">
                    <h1>Backend:</h1>
                    <div className="flex justify-between">
                        {backendStack?.map((back, index) => (
                            <Card key={index}>
                                <CardHeader className="sr-only">
                                    <CardTitle></CardTitle>
                                    <CardDescription></CardDescription>
                                </CardHeader>
                                <CardContent className="p-2 flex flex-col items-center">
                                    <div className="relative">
                                        <Image
                                            src={back.icon}
                                            alt={back.title}
                                            // fill
                                            // objectFit="contain"
                                            // objectPosition="center"
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <h1 className="text-xs">{back.title}</h1>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="">
                    <h1>Backend:</h1>
                    <div className="flex justify-between">
                        {backendStack?.map((back, index) => (
                            <Card key={index}>
                                <CardHeader className="sr-only">
                                    <CardTitle></CardTitle>
                                    <CardDescription></CardDescription>
                                </CardHeader>
                                <CardContent className="p-2 flex flex-col items-center">
                                    <div className="relative">
                                        <Image
                                            src={back.icon}
                                            alt={back.title}
                                            // fill
                                            // objectFit="contain"
                                            // objectPosition="center"
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <h1 className="text-xs">{back.title}</h1>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
