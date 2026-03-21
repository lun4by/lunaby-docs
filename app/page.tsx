import Link from "next/link";
import { HeroCodeBlock } from "@/components/hero-code-block";
import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white dark:from-cyan-950/20 dark:to-background flex flex-col items-center justify-center px-6">
            <div className="max-w-2xl text-center space-y-6">
                <Image
                    src="https://cdn.lunie.dev/Lunaby/avatar.png"
                    alt="Lunaby Logo"
                    width={64}
                    height={64}
                    className="size-16 mx-auto rounded-2xl object-cover shadow-sm"
                />
                <h1 className="text-5xl font-bold tracking-tight">Lunaby API</h1>
                <p className="text-lg text-muted-foreground">
                    Developer documentation - Chat completions, image generation,<br />
                    và SDK TypeScript chính thức.
                </p>
                <div className="flex items-center gap-3 justify-center pt-2">
                    <Link href="/docs/quickstart"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm">
                        Get Started
                    </Link>
                    <Link href="/docs"
                        className="border hover:bg-muted px-6 py-2.5 rounded-lg font-medium transition-colors text-sm">
                        View Docs
                    </Link>
                </div>
                <HeroCodeBlock />
            </div>
        </div>
    );
}