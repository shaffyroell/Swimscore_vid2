import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { colors, typography, containerStyle, layout } from '../styles';

// Scene 2: Tension (Frames 0-30)
// "Only one gets checked." - Hard cut, no movement
// This line should feel slightly uncomfortable

export const Scene2Tension: React.FC = () => {
  const frame = useCurrentFrame();

  // Very fast fade (almost instant)
  const opacity = interpolate(
    frame,
    [0, 4],
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
            display: 'block',
          }}
        >
          Only one gets checked.
        </span>
      </div>
    </div>
  );
};
