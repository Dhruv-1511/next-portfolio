import Image from "next/image";
import { memo } from "react";

/**
 * Optimized Image component wrapper for Next.js Image
 * Provides automatic optimization, lazy loading, and responsive images
 */
const OptimizedImage = memo(
  ({
    src,
    alt,
    width,
    height,
    fill,
    priority = false,
    quality = 85,
    className = "",
    sizes,
    ...props
  }) => {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={quality}
        className={className}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTBiMGIiLz48L3N2Zz4="
        {...props}
      />
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
