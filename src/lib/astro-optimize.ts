import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { OptimizedImage } from "@/components/ui/OptimizedPicture";

type Options = {
  alt: string;
  widths: number[];
  sizes: string;
  formats?: ("avif" | "webp")[];
};

export async function buildOptimizedImage(
  img: ImageMetadata,
  opts: Options
): Promise<OptimizedImage> {
  const formats = opts.formats ?? ["avif", "webp"];

  // ✅ fallback simples e correto (URL pública gerada pelo Astro)
  const fallbackUrl = img.src;

  const sources = [];

  for (const format of formats) {
    const out = await getImage({ src: img, widths: opts.widths, format });

    // na sua versão: srcSet.attribute é string
    const srcSet = typeof out.srcSet === "string" ? out.srcSet : out.srcSet.attribute;

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