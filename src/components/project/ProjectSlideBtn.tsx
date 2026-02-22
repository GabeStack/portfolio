"use client";

import { useSwiper } from "swiper/react";

interface Props {
  containerStyles?: string;
  btnStyles?: string;
  iconStyles?: string;
}

export default function ProjectSlideBtn({
  containerStyles,
  btnStyles,
  iconStyles,
}: Props) {
  const swiper = useSwiper();

  return (
    <div className={containerStyles}>
      <button
        className={btnStyles}
        aria-label="Projeto anterior"
        onClick={() => swiper.slidePrev()}
      >
        {/* SVG seta esquerda */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={iconStyles}
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      <button
        className={btnStyles}
        aria-label="Próximo projeto"
        onClick={() => swiper.slideNext()}
      >
        {/* SVG seta direita */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={iconStyles}
        >
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        </svg>
      </button>
    </div>
  );
}
