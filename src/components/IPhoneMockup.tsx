import { cn } from "@/lib/utils";

type IPhoneMockupProps = {
  src: string;
  alt: string;
  className?: string;
  onImageError?: () => void;
};

/**
 * Figma-style iOS device frame: predictable CSS shell + screen mask (no SVG / %-offset mismatch).
 * Parent sets width (e.g. max-w-[260px] w-full); height follows 9 / 19.5.
 */
export const IPhoneMockup = ({ src, alt, className, onImageError }: IPhoneMockupProps) => {
  return (
    <figure
      className={cn(
        "relative mx-auto w-full overflow-visible",
        "rounded-[2.75rem] border border-white/[0.14] bg-gradient-to-b from-zinc-600/40 via-zinc-900 to-zinc-950 p-[10px]",
        "shadow-[0_28px_56px_-14px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.07)]",
        className,
      )}
      style={{ aspectRatio: "9 / 19.5" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[18%] top-[5px] h-7 rounded-full bg-gradient-to-b from-white/[0.12] to-transparent opacity-40"
      />

      <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-black ring-1 ring-white/[0.06]">
        <div
          aria-hidden
          className="absolute left-1/2 top-[9px] z-20 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/[0.1] shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]"
        />
        <img
          src={src}
          alt={alt}
          className="relative z-0 h-full w-full object-cover object-top"
          onError={onImageError}
        />
      </div>
    </figure>
  );
};
