import { SITE_CONFIG } from "@/config/site";
import { DocsHeader } from "@/components/layout/docs-header";
import { DocsSidebar } from "@/components/layout/docs-sidebar";

async function fetchApiVersion(): Promise<string> {
  try {
    const res = await fetch(SITE_CONFIG.apiUrl, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.version) {
        return data.version.split(".")[0] + ".0";
      }
    }
  } catch {
    // Fallback silently
  }
  return "1.0";
}

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const apiVersion = await fetchApiVersion();

  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader apiVersion={apiVersion} />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-8 px-4 py-2 md:px-6">
        <DocsSidebar />

        <main className="min-w-0 flex-1 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
