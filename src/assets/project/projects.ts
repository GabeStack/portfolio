import xcon from "../img/projects/x-con.webp";
import literalura from "../img/projects/literalura.png";
import calc from "../img/projects/calculadora.webp";
import corenotes from "../img/projects/corenotes.png";
import ridewise from "../img/projects/ride_wise.png";

export type ProjectItem = {
  name: string
  description: string
  technologies?: string[]
  image?: { url?: string | ImageMetadata; alt?: string }
  repository?: { url?: string; visibility?: "public" | "private" }
  demo?: { url?: string; status?: "online" | "offline" }
}

export type ProjectsData = Record<"backend" | "fullstack" | "frontend", ProjectItem[]>

export const projectsData: ProjectsData = {
  frontend: [
    {
      name: "X-con Contabilidade",
      description: "Este projeto é o site institucional da X-Con Consultoria, criado para apresentar os serviços contábeis da empresa de forma clara, profissional e acessível. Desenvolvi um tema personalizado, adaptado às necessidades do cliente, com foco em responsividade, boa performance e facilidade de manutenção.",
      image: {
        url: xcon,
        alt: "Captura de tela do projeto X-con Contabilidade",
      },
      technologies: ["PHP", "Wordpress", "JavaScript", "Bootstrap",],
      repository: {
        url: "",
        visibility: "private",
      },
      demo: { url: "https://x-conconsultoria.com.br/", status: "online" },
    },
  ],
  backend: [
    {
      name: "Literalura",
      description: "Este projeto é uma aplicação de biblioteca criada durante o desafio Java Back-End da Alura em parceria com a Oracle. Desenvolvi a solução com Spring, JPA e PostgreSQL, consumindo a API Gutendex para buscar e armazenar dados de livros e autores. A aplicação permite consultar títulos, autores, estatísticas e os livros mais baixados, com foco em boas práticas, organização e persistência eficiente dos dados.",
      image: {
        url: literalura,
        alt: "Captura de tela do projeto Literalura",
      },
      technologies: ["Java", "Spring Boot", "PostgreSQL"],
      repository: {
        url: "https://github.com/GabeStack/Literalura",
        visibility: "public",
      },
      demo: { url: "", status: "offline" },
    },
  ],

  fullstack: [
    {
      name: "ride_wise",
      description: "Este é um projeto fullstack de uma aplicação de gerenciamento de viagens, utilizando AdonisJS v5 no backend com PostgreSQL, e React com Vite no frontend. O foco principal é a criação de uma plataforma para estimativa de preços, seleção de motoristas e visualização de rotas e histórico de viagens, com uso de Google Maps Routes API, Zustand para estado global e mapas interativos com React Leaflet.",
      image: {
        url: ridewise,
        alt: "Captura de tela do projeto ride_wise",
      },
      technologies: ["TypeScript", "React", "AdonisJS", "Tailwind CSS", "Docker", "PostgreSQL"],
      repository: {
        url: "https://github.com/GabeStack/ride_wise",
        visibility: "public",
      },
      demo: { url: "", status: "offline" },
    },
        {
      name: "Corenotes",
      description: "Este é um projeto fullstack de uma aplicação de gerenciamento de viagens, utilizando AdonisJS v5 no backend com PostgreSQL, e React com Vite no frontend. O foco principal é a criação de uma plataforma para estimativa de preços, seleção de motoristas e visualização de rotas e histórico de viagens, com uso de Google Maps Routes API, Zustand para estado global e mapas interativos com React Leaflet.",
      image: {
        url: corenotes,
        alt: "Captura de tela do projeto Corenotes",
      },
      technologies: ["TypeScript", "React","Tamstack Query", "AdonisJS", "Tailwind CSS", "Docker", "PostgreSQL"],
      repository: {
        url: "https://github.com/GabeStack/corelab-challenge1",
        visibility: "public",
      },
      demo: { url: "https://corenotes.gabestack.dev", status: "online" },
    },
  ],
}