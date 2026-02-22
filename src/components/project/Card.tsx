import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import OptimizedPicture from "../ui/OptimizedPicture";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

import { Github, SquareArrowOutUpRight } from "lucide-react";

interface Banner {
  url: string; // fallback
  sizes?: string;
  sources?: Array<{ type?: string; srcSet: string }>;
  width?: number;
  height?: number;
}
interface Project {
  id: number | string;
  titulo: string;
  descricao: string;
  tecnologias?: string[];
  banner?: Banner[];
  link_site?: string;
  link_github?: string;
}

interface CardProps {
  projects: Project[];
  title: string;
  style?: string;
}

interface ProjectSlideBtnProps {
  swiper: any;
}

const ProjectSlideBtn: React.FC<ProjectSlideBtnProps> = ({ swiper }) => (
  <div className="absolute inset-0 flex justify-between items-center px-4 z-20">
    <button
      className="bg-accent hover:bg-accent-hover transition-colors duration-300 p-2"
      onClick={() => swiper?.slidePrev()}
      type="button"
      aria-label="Slide anterior"
    >
      ◀
    </button>
    <button
      className="bg-accent hover:bg-accent-hover transition-colors duration-300 p-2"
      onClick={() => swiper?.slideNext()}
      type="button"
      aria-label="Próximo slide"
    >
      ▶
    </button>
  </div>
);

const Card: React.FC<CardProps> = ({ projects, title, style }) => {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    setActiveProject(projects[0]);
  }, [projects]);

  const handleSlideChange = (swiper: any) => {
    setActiveProject(projects[swiper.activeIndex]);
  };

  const extractImageUrl = (banner?: Banner[]) => {
    const u = banner?.[0]?.url?.trim();

    if (!u) return "/placeholder.jpg";
    if (u.startsWith("http://") || u.startsWith("https://")) return u;
    if (u.startsWith("/")) return u;
    return `/${u}`;
  };

  return (
    <div className="flex flex-col justify-center container px-10">
      <div className={`flex flex-col ${style} justify-between`}>
        {/* Texto */}
        <div className="w-full xl:w-[50%] xl:h-115 flex flex-col xl:justify-between order-2 xl:order-0">
          <div className="flex flex-col gap-4 h-[50%]">
            <h3 className="text-3xl font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
              {title}
            </h3>

            <h4>{activeProject.titulo}</h4>

            <p className="text-white/60 text-balance">
              {activeProject.descricao}
            </p>

            {activeProject.tecnologias &&
            activeProject.tecnologias.length > 0 ? (
              <ul className="flex flex-wrap gap-2 text-sm text-white/70">
                {activeProject.tecnologias.map((t, i) => (
                  <li key={i}>
                    {t}
                    {i !== activeProject.tecnologias!.length - 1 && ","}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma tecnologia listada.</p>
            )}

            <div className="border border-white/20"></div>

            {/* Links */}
            <div className="flex items-center gap-4">
              {activeProject.link_site && activeProject.link_site !== "" && (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger
                      className="w-17.5 h-17.5 rounded-full bg-white/5 flex justify-center items-center group"
                      aria-label="Botão do Site"
                      asChild
                    >
                      <a
                        href={activeProject.link_site.trim()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SquareArrowOutUpRight className="text-white group-hover:text-accent" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live Project</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {activeProject.link_github &&
                activeProject.link_github !== "" && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger
                        className="w-17.5 h-17.5 rounded-full bg-white/5 flex justify-center items-center group"
                        aria-label="Abrir projeto no Github"
                        asChild
                      >
                        <a
                          href={activeProject.link_github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="text-white group-hover:text-accent" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="w-full relative lg:w-[40%]">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            className="mb-12"
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            pagination={{ dynamicBullets: true }}
            modules={[Pagination, EffectFade]}
          >
            {projects.map((proj) => {
              const b = proj.banner?.[0];
              return (
                <SwiperSlide
                  key={proj.id}
                  className="rounded-xl overflow-hidden"
                >
                  <div className="w-full aspect-4/3 relative group flex justify-center items-center">
                    <div className="relative w-full bg-linear-to-t from-neutral-950/80 h-full overflow-hidden">
                      <div className="object-cover -z-10 w-full h-full">
                        <OptimizedPicture
                          alt={proj.titulo || "Projeto sem título"}
                          src={extractImageUrl(proj.banner)} // fallback seguro
                          sources={b?.sources}
                          sizes={b?.sizes}
                          width={b?.width ?? 800}
                          height={b?.height ?? 600}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}

            {swiperInstance && <ProjectSlideBtn swiper={swiperInstance} />}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default Card;
