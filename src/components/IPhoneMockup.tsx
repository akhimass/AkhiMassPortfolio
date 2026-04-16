import { cn } from "@/lib/utils";

type IPhoneMockupProps = {
  src: string;
  alt: string;
  className?: string;
  onImageError?: () => void;
};

/** iPhone-style frame with Dynamic Island, titanium bezel, and soft device shadow. */
export const IPhoneMockup = ({ src, alt, className, onImageError }: IPhoneMockupProps) => {
  return (
    <div
      className={cn("relative mx-auto h-full w-full", className)}
      style={{ aspectRatio: "9 / 19.5", maxHeight: "100%" }}
    >
      <svg
        viewBox="0 0 220 460"
        className="absolute inset-0 h-full w-full drop-shadow-[0_28px_70px_rgba(0,0,0,0.6)]"
        aria-hidden
      >
        <defs>
          <linearGradient id="iphoneBezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="35%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>
          <linearGradient id="iphoneHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="18%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Side buttons */}
        <rect x="2" y="120" width="3" height="44" rx="1.5" fill="#2a2a30" />
        <rect x="2" y="178" width="3" height="72" rx="1.5" fill="#2a2a30" />
        <rect x="215" y="150" width="3" height="96" rx="1.5" fill="#2a2a30" />

        <rect
          x="8"
          y="8"
          width="204"
          height="444"
          rx="42"
          fill="url(#iphoneBezelGrad)"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1.2"
        />
        <rect x="10" y="10" width="200" height="440" rx="40" fill="none" stroke="url(#iphoneHighlight)" strokeWidth="1" />

        <rect x="22" y="22" width="176" height="416" rx="34" fill="#000" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Dynamic Island */}
        <rect x="78" y="30" width="64" height="22" rx="11" fill="#0a0a0a" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
        <rect x="92" y="36" width="36" height="10" rx="5" fill="rgba(255,255,255,0.04)" />
      </svg>

      <div className="absolute bottom-[6.5%] left-[8.5%] right-[8.5%] top-[13%] overflow-hidden rounded-[1.75rem] bg-black">
        <img src={src} alt={alt} className="h-full w-full object-cover object-top" onError={onImageError} />
      </div>
    </div>
  );
};
