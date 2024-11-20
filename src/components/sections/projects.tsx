import React from "react";

import { Code } from "lucide-react";

export default function Projects() {
    return (
        <div id="projects" className="h-screen mt-[13%] gap-10 my-32">
            <section className="space-y-2">
                <span className="flex gap-1 items-center w-[10%] rounded-full border p-2 text-xs">
                    <Code size={15} /> <p>Projects</p>
                </span>
                <h1 className="lg:text-5xl text-3xl w-[80%] font-medium text-pretty">
                    Check out my featured projects
                </h1>
            </section>
        </div>
    );
}
