import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "docs");

export interface DocMeta {
  title: string;
  description: string;
  section: string;
  order: number;
  slug: string;
}

export interface Doc {
  meta: DocMeta;
  content: string;
}

export function getDocBySlug(slug: string): Doc | null {
  const filename = slug === "" ? "introduction" : slug;
  const filePath = path.join(CONTENT_DIR, `${filename}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      title: data.title ?? "",
      description: data.description ?? "",
      section: data.section ?? "",
      order: data.order ?? 0,
      slug: filename,
    },
    content,
  };
}

export function getAllDocs(): DocMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data } = matter(raw);

      return {
        title: data.title ?? "",
        description: data.description ?? "",
        section: data.section ?? "",
        order: data.order ?? 0,
        slug,
      };
    })
    .sort((a, b) => a.order - b.order);
}
