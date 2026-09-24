'use client';

import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export default function BrandLogo({
  variant = 'full',
  size = 'md',
  className = '',
  showText = true
}: BrandLogoProps) {
  // Height map for proportions
  const sizeConfig = {
    sm: { height: 42, width: 160, iconSize: 36 },
    md: { height: 56, width: 220, iconSize: 48 },
    lg: { height: 72, width: 280, iconSize: 64 },
    xl: { height: 90, width: 350, iconSize: 80 }
  };

  const { height, width, iconSize } = sizeConfig[size] || sizeConfig.md;

  if (variant === 'icon' || !showText) {
    return (
      <div
        className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/spinwheel-favicon.webp"
          alt="SpinWheelGames"
          width={iconSize}
          height={iconSize}
          className="w-full h-full object-contain dark:drop-shadow-[0_0_12px_rgba(133,135,255,0.45)] dark:brightness-110"
          priority
          unoptimized
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center flex-shrink-0 select-none ${className}`}
      style={{ height }}
    >
      <Image
        src="/spinwheel-logo-v2.webp"
        alt="SpinWheelGames"
        width={width}
        height={height}
        className="h-full w-auto object-contain dark:drop-shadow-[0_0_16px_rgba(133,135,255,0.45)] dark:brightness-110"
        priority
        unoptimized
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
