import React from "react";

import Image from "next/image";

import { ArrowDownToLine, Code } from "lucide-react";
import { LuLinkedin, LuGithub } from "react-icons/lu";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MainMenu from "./main-menu";
import { Button } from "../ui/button";

const socialMedias = [
  {
    title: "LinkedIn",
    icon: LuLinkedin,
    url: "",
  },
  {
    title: "Github",
    icon: LuGithub,
    url: "",
  },
];

export default function Sidebar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex gap-10">
      <Card className="h-[92vh] w-1/4 px-8 py-6 rounded-3xl fixed">
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
                <Code size={60} />
                <h1 className="text-3xl font-semibold">John Doe</h1>
              </div>
              <div className=" relative h-52 rounded-xl w-full border">
                <Image
                  src={"/joyboy.jpg"}
                  alt="profile"
                  fill
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-xl"
                />
              </div>
              <div className="flex gap-3 justify-center mt-4">
                {socialMedias.map((social, index) => (
                  <section key={index} className="border p-2 rounded-full">
                    {<social.icon />}
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
              <Button variant={"default"} className="rounded-full w-full">
                Download CV <ArrowDownToLine />
              </Button>
            </section>
          </div>
        </CardContent>
      </Card>

      <div className="ml-[30%]">
        <MainMenu />
        <section className="mt-16">{children}</section>
      </div>
    </div>
  );
}
