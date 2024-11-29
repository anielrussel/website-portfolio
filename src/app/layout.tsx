import type { Metadata } from "next";
import { Mulish } from "next/font/google";

import "./globals.css";

import Sidebar from "@/components/custom/sidebar";
import { ThemeProvider } from "@/components/custom/theme-provider";

const mulish = Mulish({
    subsets: ["latin"],
    variable: "--font-mulish",
    weight: ["200", "300", "500", "800", "900"],
});

export const metadata: Metadata = {
    title: "Russel Aniel",
    description: "Russel Aniel's Portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={`${mulish.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div>
                        <Sidebar>{children}</Sidebar>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
