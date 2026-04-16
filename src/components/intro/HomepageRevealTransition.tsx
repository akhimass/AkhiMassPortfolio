import { motion } from "framer-motion";

type HomepageRevealTransitionProps = {
  active: boolean;
  reduceMotion: boolean;
};

/**
 * Full-screen veil used during the converge phase so the cut to the homepage
 * feels like one system resolving instead of tiles vanishing into void.
 */
export function HomepageRevealTransition({ active, reduceMotion }: HomepageRevealTransitionProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[80]"
      aria-hidden
      initial={false}
      animate={
        active
          ? reduceMotion
            ? { opacity: 0.55 }
            : {
                opacity: [0, 0.25, 0.92],
                backdropFilter: ["blur(0px)", "blur(4px)", "blur(22px)"],
              }
          : { opacity: 0, backdropFilter: "blur(0px)" }
      }
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : { duration: 0.85, ease: [0.22, 1, 0.36, 1], times: [0, 0.35, 1] }
      }
      style={{
        background:
          "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(124,58,237,0.22), rgba(0,0,0,0.88) 70%, #000 100%)",
      }}
    />
  );
}
