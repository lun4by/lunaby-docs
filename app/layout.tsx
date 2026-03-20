import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Lunaby API Docs",
    description: "Official developer documentation for Lunaby API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <head>
                <ThemeScript />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}