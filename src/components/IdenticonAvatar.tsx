import React, { useMemo } from 'react';

export default function IdenticonAvatar({ id, className }: { id: string; className?: string }) {
  const svgData = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    const c1 = `hsl(${Math.abs(hash) % 360}, 70%, 80%)`;
    const c2 = `hsl(${Math.abs(hash * 13) % 360}, 60%, 40%)`;

    const rects = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        const bit = (Math.abs(hash) >> index) & 1;
        if (bit) {
          rects.push(`<rect x="${col * 20}" y="${row * 20}" width="20" height="20" fill="${c2}" />`);
          if (col < 2) {
            rects.push(`<rect x="${(4 - col) * 20}" y="${row * 20}" width="20" height="20" fill="${c2}" />`);
          }
        }
      }
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="${c1}" />
        ${rects.join('')}
      </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg.trim())}`;
  }, [id]);

  return <img src={svgData} alt={`Identicon for ${id}`} className={className} />;
}
