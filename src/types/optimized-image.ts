export type OptimizedImage = {
  url: string; // fallback
  sizes?: string;
  sources?: Array<{ type?: string; srcSet: string }>;
};