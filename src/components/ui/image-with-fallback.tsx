import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface ImageWithFallbackProps {
  src: string | number;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  containerClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  priority = false,
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  let imageSrc = typeof src === 'string' && (src.startsWith('http') || src.startsWith('/')) ? 
    src : '/vinhan.gif';

  if (hasError) {
    return (
      <div className={`relative flex items-center justify-center ${containerClassName}`}>
        <div className="w-[150px] h-[150px] relative">
          <Image
            src="/vinhan.gif"
            alt="Placeholder"
            fill
            className="object-contain"
            priority={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${containerClassName}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className={`${isLoading ? 'animate-pulse' : ''} ${className}`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        priority={priority}
      />
      {isLoading && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full bg-[#FFEB3B]/20" />
        </div>
      )}
    </div>
  );
}