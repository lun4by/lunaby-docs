import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-violet-950/20 dark:to-background flex flex-col items-center justify-center px-6">
            <div className="max-w-2xl text-center space-y-6">
                <div className="inline-flex size-16 rounded-2xl bg-violet-600 items-center justify-center mx-auto">
                    <span className="text-white text-2xl font-bold">L</span>
                </div>
                <h1 className="text-5xl font-bold tracking-tight">Lunaby API</h1>
                <p className="text-lg text-muted-foreground">
                    Developer documentation — Chat completions, image generation,<br />
                    và SDK TypeScript chính thức.
                </p>
                <div className="flex items-center gap-3 justify-center pt-2">
                    <Link href="/docs/quickstart"
                        className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm">
                        Get Started
                    </Link>
                    <Link href="/docs"
                        className="border hover:bg-muted px-6 py-2.5 rounded-lg font-medium transition-colors text-sm">
                        View Docs
                    </Link>
                </div>
                <div className="pt-4 font-mono text-sm bg-muted rounded-lg px-4 py-3 text-left max-w-sm mx-auto">
                    <span className="text-muted-foreground">$</span>{" "}
                    <span>npm install lunaby-sdk</span>
                </div>
            </div>
        </div>
    );
}