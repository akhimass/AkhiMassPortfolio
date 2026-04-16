import { memo, useState } from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FloatingWidgetDef } from "@/config/floatingWidgetMedia";

export type WidgetStage = "enter" | "float" | "exit";

const easePremium: [number, number, number, number] = [0.22, 1, 0.36, 1];

type MediaWidgetProps = {
  def: FloatingWidgetDef;
  stage: WidgetStage;
  index: number;
  reduceMotion: boolean;
};

function MediaSurface({ def, className }: { def: FloatingWidgetDef; className?: string }) {
  const [imgOk, setImgOk] = useState(true);

  if (def.media.kind === "video") {
    return (
      <video
        className={cn("h-full w-full object-cover", className)}
        src={def.media.src}
        poster={def.media.poster}
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={imgOk ? def.media.src : "/images/STRINGPROLOGO.png"}
      alt=""
      className={cn("h-full w-full object-cover", className)}
      onError={() => setImgOk(false)}
    />
  );
}

export const MediaWidget = memo(function MediaWidget({ def, stage, index, reduceMotion }: MediaWidgetProps) {
  const { placement, enterFrom } = def;
  const isHero = def.size === "hero";
  const stagger = reduceMotion ? 0 : index * 0.07;

  const enterTransition: Transition = {
    duration: reduceMotion ? 0.01 : 0.85,
    delay: stagger,
    ease: easePremium,
  };

  const floatTransition: Transition = {
    duration: reduceMotion ? 0.01 : 3.2,
    repeat: reduceMotion ? 0 : Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  };

  const exitTransition: Transition = {
    duration: reduceMotion ? 0.2 : 0.95,
    delay: reduceMotion ? 0 : index * 0.04,
    ease: easePremium,
  };

  const baseStyle: React.CSSProperties = {
    top: placement.top,
    left: placement.left,
    width: placement.width,
    height: placement.height,
    zIndex: placement.zIndex,
  };

  return (
    <motion.div
      className="pointer-events-none absolute overflow-hidden rounded-xl sm:rounded-2xl"
      style={{
        ...baseStyle,
        transformOrigin: "50% 50%",
        boxShadow: `
          0 0 0 1px rgba(255,255,255,0.08),
          0 0 40px rgba(124,58,237,0.12),
          0 24px 60px rgba(0,0,0,0.55)
        `,
      }}
      initial={
        reduceMotion
          ? { opacity: 0.85, scale: 1, x: 0, y: 0, rotate: placement.rotate, filter: "blur(0px)" }
          : {
              opacity: 0,
              scale: enterFrom.scale,
              x: enterFrom.x,
              y: enterFrom.y,
              rotate: placement.rotate + enterFrom.rotate,
              filter: "blur(10px)",
            }
      }
      animate={
        stage === "enter"
          ? reduceMotion
            ? { opacity: 1, scale: 1, x: 0, y: 0, rotate: placement.rotate, filter: "blur(0px)" }
            : { opacity: 1, scale: 1, x: 0, y: 0, rotate: placement.rotate, filter: "blur(0px)" }
          : stage === "float"
            ? reduceMotion
              ? { opacity: 1, scale: 1, x: 0, y: 0, rotate: placement.rotate, filter: "blur(0px)" }
              : {
                  opacity: 1,
                  scale: 1,
                  x: [0, 4, -3, 0],
                  y: [0, -7, 4, 0],
                  rotate: [placement.rotate, placement.rotate + 0.6, placement.rotate - 0.4, placement.rotate],
                  filter: "blur(0px)",
                }
            : {
                opacity: 0,
                scale: 0.05,
                x: 0,
                y: 0,
                rotate: placement.rotate * 0.15,
                filter: "blur(20px)",
              }
      }
      transition={
        stage === "enter" ? enterTransition : stage === "float" ? floatTransition : exitTransition
      }
    >
      <div className="relative h-full w-full bg-zinc-950">
        <MediaSurface def={def} />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.35), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2 pt-6 sm:px-3 sm:pb-2.5">
          <p
            className={cn(
              "font-semibold tracking-tight text-white drop-shadow-md",
              isHero ? "text-[11px] sm:text-sm" : "text-[9px] sm:text-[11px]",
            )}
          >
            {def.label}
          </p>
          {def.sublabel && (
            <p className="text-[8px] text-white/55 sm:text-[9px] leading-tight">{def.sublabel}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
});
