import { motion } from "framer-motion";
import OptimizedPicture, { type OptimizedImage } from "../ui/OptimizedPicture";

type PhotoProps = {
  alt: string;
  src: string;
  sources?: Array<{ type?: string; srcSet: string }>;
  sizes?: string;
};

export default function Photo({
  alt,
  src,
  sources = [],
  sizes = "100vw",
}: PhotoProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
        }}
        className="w-65 h-72.5 lg:w-85 lg:h-92.5 2xl:w-125 2xl:h-130 mix-blend-lighten absolute inset-0 m-auto"
      >
        <picture>
          {sources.map((s) => (
            <source
              key={s.type ?? s.srcSet}
              type={s.type}
              srcSet={s.srcSet}
              sizes={sizes}
            />
          ))}
        <OptimizedPicture
          alt={alt} src={src} sources={sources} sizes={sizes}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"        />
        </picture>
      </motion.div>

      {/* Anel animado */}
      <motion.svg
        className="w-77.5 lg:w-102.5 h-77.5 lg:h-102.5 2xl:w-142.5 2xl:h-142.5"
        fill="transparent"
        viewBox="0 0 500 500"
      >
        <motion.circle
          cx="250"
          cy="250"
          r="243"
          stroke="#00ff99"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: "24 10 0 0" }}
          animate={{
            strokeDasharray: ["15 120 25 25", "16 25 92 92", "4 250 22 22"],
            rotate: [120, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.svg>
    </div>
  );
}
