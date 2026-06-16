'use client';

import React from 'react';
import { getCharacterData } from '@/data/characters';

interface PixelSpriteProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PixelSprite({ name, size = 'md' }: PixelSpriteProps) {
  const character = getCharacterData(name);

  const sizeMap = {
    sm: 48,
    md: 64,
    lg: 128,
  };

  const pixelSize = sizeMap[size];
  const gridSize = pixelSize / 8; // 8x8 grid

  // Generate a unique sprite pattern based on character color and name hash
  const getPixelPattern = (baseColor: string) => {
    const hash = name
      .split('')
      .reduce((h, c) => ((h << 5) - h) + c.charCodeAt(0), 0);

    // Create a 8x8 sprite pattern (head with body/dress indicator)
    // Head (top 4 rows, center 4 columns)
    const head = [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
    ];

    const pixels: React.ReactElement[] = [];

    head.forEach((row, y) => {
      row.forEach((isSet, x) => {
        if (isSet) {
          // Vary shade based on position hash
          const shadeHash = ((x * 7 + y * 11 + hash) % 3);
          const opacity = [0.7, 0.85, 1][shadeHash];

          pixels.push(
            <rect
              key={`${x}-${y}`}
              x={x * gridSize}
              y={y * gridSize}
              width={gridSize}
              height={gridSize}
              fill={baseColor}
              opacity={opacity}
            />
          );
        }
      });
    });

    return pixels;
  };

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox={`0 0 ${pixelSize} ${pixelSize}`}
      className="pixel-border"
      style={{
        imageRendering: 'pixelated',
        border: `2px solid ${character.spriteColor}`,
      } as React.CSSProperties}
    >
      {/* Background */}
      <rect
        width={pixelSize}
        height={pixelSize}
        fill={character.spriteColor}
        opacity={0.1}
      />

      {/* Sprite pattern */}
      {getPixelPattern(character.spriteColor)}
    </svg>
  );
}
