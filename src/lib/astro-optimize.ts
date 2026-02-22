import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { OptimizedImage } from "@/components/ui/OptimizedPicture";

type Options = {
  alt: string;
  widths: number[];
  sizes: string;
  formats?: ("avif" | "webp")[];
  // se sua versão do Astro tem srcSet como string, use false
  // se tem { attribute }, use true (no seu caso: true)
  useAttributeSrcSet?: boolean;
};

export async function buildOptimizedImage(
  img: ImageMetadata,
  opts: Options
): Promise<OptimizedImage> {
  const formats = opts.formats ?? ["avif", "webp"];
  const useAttribute = opts.useAttributeSrcSet ?? true;

  // fallback URL 100% válida pra passar pro React
  const fallbackUrl = (await import(`${img.src}?url`)).default as string;

  const sources = [];

  for (const format of formats) {
    const out = await getImage({ src: img, widths: opts.widths, format });

    const srcSet =
      typeof out.srcSet === "string"
        ? out.srcSet
        : useAttribute
        ? out.srcSet.attribute
        : // fallback caso mude
          (out as any).srcSet?.attribute;

    sources.push({
      type: format === "avif" ? "image/avif" : format === "webp" ? "image/webp" : undefined,
      srcSet,
    });
  }

  return {
    alt: opts.alt,
    src: fallbackUrl,
    sizes: opts.sizes,
    sources,
    width: img.width,
    height: img.height,
  };
}