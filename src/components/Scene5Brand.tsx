import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle } from '../styles';

// Scene 5: Brand Moment (Frames 0-45)
// SwimScore™ in accent color - the Apple moment
// Clean. Confident. Memorable.

export const Scene5Brand: React.FC = () => {
  const frame = useCurrentFrame();

  // Calm fade in - no movement
  const brandOpacity = interpolate(
    frame,
    [0, 18],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  // Subtitle slightly delayed
  const subtitleOpacity = interpolate(
    frame,
    [12, 28],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <span
          style={{
            color: colors.accent,
            fontSize: typography.brandSize,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            opacity: brandOpacity,
          }}
        >
          SwimScore™
        </span>
        <span
          style={{
            color: colors.mutedText,
            fontSize: typography.brandSubtitleSize,
            fontWeight: 400,
            letterSpacing: '-0.01em',
            opacity: subtitleOpacity,
          }}
        >
          Male fertility health — one score
        </span>
      </div>
    </div>
  );
};
