import React from 'react';

interface SteamEffectProps {
  intensity?: 'subtle' | 'medium' | 'hero';
  className?: string;
}

export const SteamEffect: React.FC<SteamEffectProps> = ({
  intensity = 'medium',
  className = '',
}) => {
  const opacityScale =
    intensity === 'hero' ? 'opacity-85' : intensity === 'medium' ? 'opacity-65' : 'opacity-45';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-1/4 top-0 overflow-hidden ${opacityScale} ${className}`}
    >
      {/* Left rising steam plume */}
      <div
        className="steam-wisp-a absolute bottom-2 left-[24%] h-28 w-16 rounded-full blur-xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245, 239, 230, 0.36) 0%, rgba(245, 239, 230, 0.08) 55%, transparent 78%)',
        }}
      />
      {/* Center tall rising steam plume */}
      <div
        className="steam-wisp-b absolute bottom-0 left-[46%] h-36 w-20 -translate-x-1/2 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245, 239, 230, 0.42) 0%, rgba(232, 218, 198, 0.12) 52%, transparent 80%)',
        }}
      />
      {/* Right gentle steam curl */}
      <div
        className="steam-wisp-c absolute bottom-3 right-[24%] h-24 w-14 rounded-full blur-xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245, 239, 230, 0.34) 0%, rgba(245, 239, 230, 0.06) 55%, transparent 78%)',
        }}
      />
      {intensity === 'hero' && (
        <div
          className="steam-wisp-a absolute bottom-8 left-[58%] h-40 w-24 rounded-full blur-2xl"
          style={{
            animationDelay: '1.8s',
            background:
              'radial-gradient(ellipse at center, rgba(245, 239, 230, 0.32) 0%, rgba(200, 161, 90, 0.08) 55%, transparent 80%)',
          }}
        />
      )}
    </div>
  );
};
