import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type HeroBackgroundImageProps = {
  src: string;
  alt: string;
  /**
   * Final opacity of the image layer (0..1), to match existing design overlays
   */
  opacity?: number;
  /**
   * Apply a slight blur to match current hero background styling
   */
  blur?: boolean;
  /**
   * Load strategy: eager for LCP hero, lazy otherwise
   */
  eager?: boolean;
  /**
   * Fetch priority hint for the browser
   */
  fetchPriority?: "high" | "low" | "auto";
};

const HeroBackgroundImage: React.FC<HeroBackgroundImageProps> = ({
  src,
  alt,
  opacity = 0.5,
  blur = true,
  eager = true,
  fetchPriority = "high",
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  /** Fade only after bytes are loaded *and* the bitmap is decoded (avoids fading in while still painting). */
  const revealWhenDecoded = useCallback((img: HTMLImageElement) => {
    const done = () => setLoaded(true);
    const p =
      typeof img.decode === "function" ? img.decode() : Promise.resolve();
    p.then(done).catch(done);
  }, []);

  useLayoutEffect(() => {
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      revealWhenDecoded(img);
    }
  }, [src, revealWhenDecoded]);

  return (
    <div className="absolute inset-0 z-0">
      {/* Pleasant CSS-only placeholder while image decodes */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          loaded ? "opacity-0" : "opacity-100"
        } bg-gradient-to-br from-gray-200 to-gray-300`}
        aria-hidden="true"
      />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={(e) => revealWhenDecoded(e.currentTarget)}
        loading={eager ? "eager" : "lazy"}
        fetchpriority={fetchPriority === "auto" ? undefined : fetchPriority}
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          blur ? "blur-sm" : ""
        }`}
        style={{ opacity: loaded ? opacity : 0 }}
      />
    </div>
  );
};

export default HeroBackgroundImage;


