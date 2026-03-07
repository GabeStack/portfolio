// src/components/DownloadButton.tsx
import { Button } from "@/components/ui/button";

export default function DownloadButton(href?: string) {
  return (
    <Button
      variant="outline"
      size="lg"
      className="uppercase flex items-center gap-2"
      asChild
    >
      <a href={href || "/CV.GabrielFigueiredo.pdf"} download>
        <span>Download CV</span>

        {/* SVG inline – perfeito para performance */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </a>
    </Button>
  );
}
