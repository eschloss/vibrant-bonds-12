import React, { CSSProperties, useEffect, useRef, useState } from "react";
import clsx from "clsx";

type ProgressiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /**
   * Native image attributes to reduce CLS and improve layout stability
   */
  width?: number;
  height?: number;
  /**
   * Loading and decoding hints
   */
  eager?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  /**
   * Responsive hints (optional). If not provided, the browser still loads `src`.
   */
  sizes?: string;
  srcSet?: string;
  /**
   * How the image should fit its box
   */
  objectFit?: "cover" | "contain";
  /**
   * Fallback source if the main image errors
   */
  fallbackSrc?: string;
};

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  eager = false,
  fetchPriority = "auto",
  decoding = "async",
  sizes,
  srcSet,
  objectFit = "cover",
  fallbackSrc = "/placeholder.svg"
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDev = import.meta.env.DEV;

  // If the image was cached and already complete, ensure we show it
  useEffect(() => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log("[ProgressiveImage] mount", { src, alt, objectFit, eager, fetchPriority, decoding, sizes, srcSet, className, style });
    }
    const img = imgRef.current;
    const container = containerRef.current;
    try {
      if (container) {
        const rect = container.getBoundingClientRect();
        const cs = window.getComputedStyle(container);
        if (isDev) {
          // eslint-disable-next-line no-console
          console.log("[ProgressiveImage] container info", {
            src,
            rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            styles: {
              display: cs.display,
              visibility: cs.visibility,
              opacity: cs.opacity,
              position: cs.position,
              zIndex: cs.zIndex,
              overflow: cs.overflow
            }
          });
        }
      }
      // Apply fetchpriority attribute without React warning
      if (img && fetchPriority && fetchPriority !== "auto") {
        try {
          img.setAttribute("fetchpriority", fetchPriority);
        } catch {}
      }
      if (img) {
        if (isDev) {
          // eslint-disable-next-line no-console
          console.log("[ProgressiveImage] img initial", {
            src,
            currentSrc: img.currentSrc,
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight
          });
        }
        if (img.complete && img.naturalWidth > 0) {
          setLoaded(true);
        }
        // Log image computed style for visibility issues
        const ics = window.getComputedStyle(img);
        if (isDev) {
          // eslint-disable-next-line no-console
          console.log("[ProgressiveImage] img styles", {
            display: ics.display,
            visibility: ics.visibility,
            opacity: ics.opacity,
            position: ics.position,
            zIndex: ics.zIndex,
            objectFit
          });
        }
      }
    } catch {}
    // Late-log after transitions/animations might apply
    const late = setTimeout(() => {
      try {
        const img = imgRef.current;
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          if (isDev) {
            // eslint-disable-next-line no-console
            console.log("[ProgressiveImage] late container rect", { src, rect: { width: rect.width, height: rect.height } });
          }
        }
        if (img) {
          const rect = img.getBoundingClientRect();
          if (isDev) {
            // eslint-disable-next-line no-console
            console.log("[ProgressiveImage] late img rect", { src, rect: { width: rect.width, height: rect.height } });
          }
          // Defensive correction: if container has zero height but its parent has height, force container height
          if (container) {
            const cRect = container.getBoundingClientRect();
            const parent = container.parentElement;
            const pRect = parent?.getBoundingClientRect();
            if (cRect.height === 0 && pRect && pRect.height > 0) {
              container.style.height = `${pRect.height}px`;
              if (isDev) {
                // eslint-disable-next-line no-console
                console.warn("[ProgressiveImage] corrected zero-height container using parent height", {
                  src,
                  forcedHeight: pRect.height
                });
              }
            }
          }
        }
      } catch {}
    }, 300);
    return () => {
      clearTimeout(late);
      if (isDev) {
        // eslint-disable-next-line no-console
        console.log("[ProgressiveImage] unmount", { src });
      }
    };
  }, [src, objectFit, eager, fetchPriority, decoding, sizes, srcSet, className]);

  useEffect(() => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log("[ProgressiveImage] loaded state change", { src, loaded });
    }
  }, [loaded, src]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        // Avoid conflicting position utilities; only add "relative" if caller didn't specify position
        !(className || "").match(/\b(absolute|fixed|relative|sticky)\b/) && "relative",
        "overflow-hidden",
        className
      )}
      style={style}
      ref={(node) => {
        containerRef.current = node as HTMLDivElement | null;
        // When container ref attaches, ensure it inherits height from parent if needed
        try {
          const container = node as HTMLDivElement | null;
          if (container && container.parentElement) {
            const parentRect = container.parentElement.getBoundingClientRect();
            const rect = container.getBoundingClientRect();
            if (rect.height === 0 && parentRect.height > 0) {
              container.style.height = `${parentRect.height}px`;
              // eslint-disable-next-line no-console
              console.warn("[ProgressiveImage] applied parent-height to container", { src, parentHeight: parentRect.height });
            }
          }
        } catch {}
      }}
    >
      {/* CSS-only placeholder */}
      <div
        className={clsx(
          "absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 transition-opacity duration-300 z-[0]",
          loaded ? "opacity-0" : "opacity-100"
        )}
        aria-hidden="true"
      />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => {
          try {
            const img = imgRef.current;
            const container = containerRef.current;
            if (img) {
              if (isDev) {
                // eslint-disable-next-line no-console
                console.log("[ProgressiveImage] onLoad", {
                  src: img.currentSrc || src,
                  naturalWidth: img.naturalWidth,
                  naturalHeight: img.naturalHeight
                });
              }
              if (img.naturalWidth === 0 || img.naturalHeight === 0) {
                if (isDev) {
                  // eslint-disable-next-line no-console
                  console.warn("[ProgressiveImage] onLoad natural size is zero", { src: img.currentSrc || src });
                }
              }
            }
            // Ensure container height inherits from parent if missing
            if (container && container.parentElement) {
              const rect = container.getBoundingClientRect();
              const pRect = container.parentElement.getBoundingClientRect();
              if (rect.height === 0 && pRect.height > 0) {
                container.style.height = `${pRect.height}px`;
                if (isDev) {
                  // eslint-disable-next-line no-console
                  console.warn("[ProgressiveImage] onLoad set container height from parent", { src, forcedHeight: pRect.height });
                }
              }
            }
          } catch {}
          setLoaded(true);
        }}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (target.src !== fallbackSrc) {
            target.src = fallbackSrc;
          }
          if (isDev) {
            // eslint-disable-next-line no-console
            console.warn("[ProgressiveImage] onError - swapped to fallback", { src, fallbackSrc });
          }
          setLoaded(true);
        }}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={fetchPriority}
        decoding={decoding}
        sizes={sizes}
        srcSet={srcSet}
        className={clsx(
          "absolute inset-0 w-full h-full transition-opacity duration-500 z-[1]",
          loaded ? "opacity-100" : "opacity-0"
        )}
        style={{ willChange: "opacity", objectFit }}
        onTransitionEnd={(e) => {
          if (e.propertyName === "opacity") {
            if (isDev) {
              // eslint-disable-next-line no-console
              console.log("[ProgressiveImage] opacity transition end", { src, loaded });
            }
          }
        }}
      />
      {/* Reserve intrinsic space if width/height provided (prevents CLS) */}
      {width && height && (
        <div style={{ paddingTop: `${(height / width) * 100}%` }} />
      )}
    </div>
  );
};

export default ProgressiveImage;


