import React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useScrollContainer } from "@/contexts/ScrollContainerContext";

type PictureLike = {
  sources: { type: string; srcset: string }[];
  img: { src: string; w?: number; h?: number };
};

type CollageItem = { id: string; img: string | PictureLike; alt: string };

type SizeProp = number | { base: number; md: number };

interface FloatingActivityCollageProps {
  items: CollageItem[];
  size?: SizeProp;
  density?: number; // how many items to render
  floatRange?: number; // px range for y floating
  stagger?: number; // seconds
  parallax?: boolean;
  className?: string;
}

// Fixed slot positions to avoid layout shift. Tweaked for visual balance.
const SLOTS = [
  { x: 6, y: 6, r: -3, z: 2 },
  { x: 68, y: 10, r: 2, z: 1 },
  { x: 36, y: 4, r: -2, z: 3 },
  { x: 16, y: 56, r: 3, z: 1 },
  { x: 74, y: 58, r: -2, z: 2 },
  { x: 44, y: 64, r: 1, z: 3 },
  { x: 4, y: 34, r: 5, z: 0 },
  { x: 86, y: 34, r: -5, z: 0 },
];

function resolveSize(size?: SizeProp) {
  if (!size) return { base: 120, md: 160 };
  if (typeof size === "number") return { base: size, md: size };
  return size;
}

export const FloatingActivityCollage: React.FC<FloatingActivityCollageProps> = ({
  items,
  size,
  density = 6,
  floatRange = 12,
  stagger = 0.08,
  parallax = true,
  className,
}) => {
  const shouldReduce = useReducedMotion();
  const { base, md } = resolveSize(size);

  const scrollContainer = useScrollContainer();
  const { scrollYProgress } = useScroll(scrollContainer ? { container: scrollContainer } : undefined);
  const drift = useTransform(scrollYProgress, [0, 1], [0, parallax ? -8 : 0]);

  const renderItems = items.slice(0, Math.min(density, SLOTS.length));

  return (
    <motion.div
      aria-hidden
      style={{ y: drift }}
      className={
        "relative w-full h-[360px] sm:h-[460px] md:h-[580px] lg:h-[640px] " +
        (className || "")
      }
    >
      {/* soft glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-6 top-4 w-48 h-48 rounded-full bg-pulse-pink/15 blur-3xl" />
        <div className="absolute right-8 bottom-6 w-56 h-56 rounded-full bg-accent/15 blur-3xl" />
      </div>

      {renderItems.map((it, idx) => {
        const slot = SLOTS[idx];
        const delay = idx * stagger;

        return (
          <motion.div
            key={it.id}
            initial={shouldReduce ? undefined : { opacity: 0, scale: 0.98, y: 6 }}
            animate={shouldReduce ? undefined : { opacity: 1, scale: 1, y: [0, -floatRange, 0] }}
            transition={shouldReduce ? undefined : { duration: 8 + idx * 0.2, delay, repeat: Infinity, ease: "easeInOut" }}
            className="absolute"
            style={{
              left: `${slot.x}%`,
              top: `${slot.y}%`,
              zIndex: 10 + slot.z,
            }}
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-gray-700 bg-gray-900/40 shadow-2xl"
              style={{
                width: `clamp(${base}px, ${base + 24}px, ${md + 40}px)`,
                height: `clamp(${base}px, ${base + 24}px, ${md + 40}px)`,
                transform: `rotate(${slot.r}deg)`,
                willChange: "transform",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10" />
              {typeof it.img === "string" ? (
                <img
                  src={it.img}
                  alt={it.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              ) : (
                <picture>
                  {Array.isArray((it.img as any).sources)
                    ? ((it.img as any).sources as { type: string; srcset: string }[]).map((src, i) => (
                        <source key={i} type={src.type} srcSet={src.srcset} sizes="(min-width: 1024px) 200px, 120px" />
                      ))
                    : null}
                  <img
                    src={it.img.img.src}
                    width={it.img.img.w}
                    height={it.img.img.h}
                    alt={it.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </picture>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FloatingActivityCollage;


