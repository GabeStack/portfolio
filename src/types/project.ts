export interface ProjectImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string; // caminho relativo ou absoluto da imagem
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  created_at: string;
  updated_at: string;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

export interface Project {
  id: number;
  titulo: string;
  descricao: string;
  tecnologias: string[];
  link_github: string | null;
  link_site: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  tipo: number;
  banner: ProjectImage[];
}

export interface ProjectCategory {
  id: number;
  nome: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  projetos: Project[];
}

export type OptimizedBanner = {
  url: string; // fallback
  sizes?: string;
  sources?: Array<{ type?: string; srcSet: string }>;
  width?: number;
  height?: number;
};

export type PortfolioProject = {
  id: string;
  titulo: string;
  descricao: string;
  tecnologias: string[];
  banner: OptimizedBanner[];
  link_github?: string;
  link_site?: string;
};

export type PortfolioProjectCategory = {
  nome: string;
  projetos: PortfolioProject[];
};