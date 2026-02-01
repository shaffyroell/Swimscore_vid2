import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, layout } from '../styles';

// Scene 1: Hook (Frames 0-30)
// "It takes two." - Scroll stopper
// Snap in from bottom with tiny overshoot

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Snap in from bottom with overshoot
  const translateY = interpolate(
    frame,
    [0, 8, 12],
    [60, -2, 0], // Overshoot by 2px then settle
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  const opacity = interpolate(
    frame,
    [0, 6],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div style={containerStyle}>
      <div
        style={{
          position: 'relative',
          left: layout.hookOffsetX,
          top: layout.hookOffsetY,
        }}
      >
        <span
          style={{
            color: colors.primaryText,
            fontSize: typography.hookSize,
            fontWeight: typography.hookWeight,
            letterSpacing: '-0.03em',
            opacity,
            transform: `translateY(${translateY}px)`,
            display: 'block',
          }}
        >
          It takes two.
        </span>
      </div>
    </div>
  );
};
