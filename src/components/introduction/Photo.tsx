import { motion } from "framer-motion";
import OptimizedPicture from "../ui/OptimizedPicture";

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
        className="w-[260px] h-[290px] lg:w-[340px] lg:h-[370px] 2xl:w-[500px] 2xl:h-[520px] mix-blend-lighten absolute inset-0 m-auto"
      >
        <OptimizedPicture
          alt={alt}
          src={src}
          sources={sources}
          sizes={sizes}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      <motion.svg
        className="w-[310px] h-[310px] lg:w-[410px] lg:h-[410px] 2xl:w-[570px] 2xl:h-[570px]"
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
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.svg>
    </div>
  );
}