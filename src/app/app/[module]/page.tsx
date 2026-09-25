import { notFound } from "next/navigation";
import { PREVIEW_MODULES } from "@/components/workspace/navigation";
import { ModulePreview } from "@/components/preview/module-preview";

export function resolvePreviewModule(slug: string) { return PREVIEW_MODULES[slug]; }
export function generateStaticParams() { return Object.keys(PREVIEW_MODULES).map((module) => ({ module })); }
export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const title = resolvePreviewModule(module);
  if (!title) notFound();
  return <ModulePreview title={title}/>;
}
