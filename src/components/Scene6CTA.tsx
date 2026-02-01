import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle } from '../styles';

// Scene 6: CTA (Frames 0-30)
// "Get personalized plan" - Big, bold
// Fade in, hold, hard cut to black

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in
  const opacity = interpolate(
    frame,
    [0, 10],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  // Hard cut to black at the end
  const cutToBlack = interpolate(
    frame,
    [26, 30],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div style={containerStyle}>
      <span
        style={{
          color: colors.primaryText,
          fontSize: typography.ctaSize,
          fontWeight: typography.ctaWeight,
          letterSpacing: '-0.02em',
          opacity: opacity * cutToBlack,
        }}
      >
        Get personalized plan
      </span>
    </div>
  );
};
