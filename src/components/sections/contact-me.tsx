import React from "react";

import { Code } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { contacts } from "@/lib/constants";

export default function ContactMe() {
    return (
        <div id="contact-me" className="flex justify-end flex-col gap-20">
            <section className="space-y-2">
                <span className="flex gap-1 items-center w-[12%] rounded-full border p-2 text-xs">
                    <Code size={15} /> <p>Contact Me</p>
                </span>
                <h1 className="lg:text-6xl text-3xl w-[80%] font-medium text-pretty">
                    Let's make an awesome project together test
                </h1>
            </section>

            <section className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-2">
                {contacts.map((contact, index) => (
                    <Card key={index}>
                        <CardHeader className="sr-only">
                            <CardTitle></CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div>
                                {!contact.url ? (
                                    <div className="flex items-center justify-center gap-2">
                                        {<contact.icon size={20} />}
                                        <p>{contact.title}</p>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        {
                                            <contact.icon
                                                size={20}
                                                href={contact.url}
                                                target="_blank"
                                            />
                                        }
                                        <p>{contact.title}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
}
