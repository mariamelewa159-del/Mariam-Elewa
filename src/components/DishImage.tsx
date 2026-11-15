import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { SteamEffect } from './SteamEffect';

interface DishImageProps {
  src: string;
  alt: string;
  isHot?: boolean;
  steamIntensity?: 'subtle' | 'medium' | 'hero';
  className?: string;
  imgClassName?: string;
  fallbackTitle?: string;
}

export const DishImage: React.FC<DishImageProps> = ({
  src,
  alt,
  isHot = false,
  steamIntensity = 'medium',
  className = '',
  imgClassName = '',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#1B1917] ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#23201D] via-[#1B1917] to-[#121110] p-6 text-center">
          <UtensilsCrossed className="h-8 w-8 text-[#C8A15A]/70" strokeWidth={1.5} />
          {fallbackTitle && (
            <span className="font-display text-lg text-[#F5EFE6]/80">{fallbackTitle}</span>
          )}
        </div>
      )}

      {isHot && !hasError && <SteamEffect intensity={steamIntensity} />}
    </div>
  );
};
