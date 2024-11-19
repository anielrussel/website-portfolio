"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ColorTheme() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [rotating, setRotating] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering until hydration
  }

  // Determine the active theme
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Handle theme toggle with rotation
  const handleToggleTheme = (newTheme: string) => {
    setRotating(true); // Start rotation animation
    setTimeout(() => {
      setTheme(newTheme); // Change theme after rotation
      setRotating(false); // Stop rotation animation
    }, 100); // Match the rotation animation duration
  };

  return (
    <div className="flex lg:justify-center justify-start gap-4">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        onClick={() =>
          handleToggleTheme(currentTheme === "dark" ? "light" : "dark")
        }
        className="relative"
      >
        <div
          className={`transition-transform duration-300 ${
            rotating ? "animate-spin" : ""
          }`}
        >
          {currentTheme === "dark" ? (
            <Sun className="h-[1.5rem] w-[1.5rem]" />
          ) : (
            <Moon className="h-[1.5rem] w-[1.5rem]" />
          )}
        </div>
      </Button>
    </div>
  );
}
