export type OptimizedSource = { type?: string; srcSet: string };

export type OptimizedImage = {
  alt: string;
  src: string; // fallback url
  sources?: OptimizedSource[];
  sizes?: string;
  width?: number;
  height?: number;
};

type Props = OptimizedImage & {
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  fetchPriority?: "high" | "low" | "auto";
};

export default function OptimizedPicture({
  alt,
  src,
  sources = [],
  sizes = "100vw",
  width,
  height,
  className,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
}: Props) {
  return (
    <picture>
      {sources.map((s) => (
        <source
          key={s.type ?? s.srcSet}
          type={s.type}
          srcSet={s.srcSet}
          sizes={sizes}
        />
      ))}

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        decoding={decoding}
        {...(fetchPriority ? { fetchPriority } : {})}
        onError={() => console.error("OptimizedPicture failed:", src)}
      />
    </picture>
  );
}