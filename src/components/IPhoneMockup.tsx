import { cn } from "@/lib/utils";

type IPhoneMockupProps = {
  src: string;
  alt: string;
  className?: string;
  onImageError?: () => void;
};

/** Stylized phone frame (SVG bezel + rounded screen) — visual reference aligned with premium product mockups. */
export const IPhoneMockup = ({ src, alt, className, onImageError }: IPhoneMockupProps) => {
  return (
    <div className={cn("relative mx-auto", className)} style={{ aspectRatio: "9 / 19.5", maxHeight: "100%" }}>
      <svg viewBox="0 0 200 420" className="absolute inset-0 h-full w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]" aria-hidden>
        <defs>
          <linearGradient id="phoneBezel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a32" />
            <stop offset="100%" stopColor="#0c0c10" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="192" height="412" rx="36" fill="url(#phoneBezel)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <rect x="18" y="18" width="164" height="384" rx="28" fill="#000" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <rect x="78" y="22" width="44" height="5" rx="2.5" fill="rgba(255,255,255,0.12)" />
      </svg>
      <div className="absolute left-[9%] right-[9%] top-[7.5%] bottom-[7.5%] overflow-hidden rounded-[1.6rem] bg-black">
        <img src={src} alt={alt} className="h-full w-full object-cover object-top" onError={onImageError} />
      </div>
    </div>
  );
};
