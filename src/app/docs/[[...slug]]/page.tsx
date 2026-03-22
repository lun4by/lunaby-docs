import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import { getDocBySlug, getAllDocs } from "@/lib/mdx";
import { extractHeadings } from "@/lib/toc";
import { createMdxComponents } from "@/components/docs/mdx-components";
import { TableOfContents } from "@/components/layout/table-of-contents";

interface DocsPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  const params = docs
    .filter((doc) => doc.slug !== "introduction")
    .map((doc) => ({
      slug: [doc.slug],
    }));

  // Add the root docs page (introduction)
  params.push({ slug: [] as unknown as string[] });

  return params;
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugStr = slug?.join("/") ?? "";
  const doc = getDocBySlug(slugStr);

  if (!doc) {
    return { title: "Not Found" };
  }

  return {
    title: doc.meta.title,
    description: doc.meta.description,
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const slugStr = slug?.join("/") ?? "";
  const doc = getDocBySlug(slugStr);

  if (!doc) {
    notFound();
  }

  const headings = extractHeadings(doc.content);
  const components = createMdxComponents();

  return (
    <div className="flex gap-8">
      {/* Main content */}
      <article className="prose min-w-0 max-w-3xl flex-1">
        {/* Section label */}
        <p className="mb-1! text-xs font-medium uppercase tracking-widest text-primary">
          {doc.meta.section}
        </p>

        {/* Title */}
        <h1>{doc.meta.title}</h1>

        {/* Description */}
        {doc.meta.description && (
          <p className="mt-2! text-base text-muted-foreground">{doc.meta.description}</p>
        )}

        {/* Markdown content */}
        <MDXRemote
          source={doc.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>

      {/* Right ToC */}
      {headings.length > 0 && (
        <aside className="hidden w-52 shrink-0 xl:block">
          <div className="sticky top-20 pt-8">
            <TableOfContents items={headings} />
          </div>
        </aside>
      )}
    </div>
  );
}
