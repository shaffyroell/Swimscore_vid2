import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle } from '../styles';

// Scene 5: CTA - Get Personalized Plan (Frames 0-30)
// Text only, no button, no animation beyond fade in
// Feels like a system prompt, not a sales button

const FADE_DURATION = 12;

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();

  // Simple fade in only
  const opacity = interpolate(
    frame,
    [0, FADE_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  return (
    <div style={containerStyle}>
      <span
        style={{
          color: colors.primaryText,
          fontSize: typography.ctaSize,
          fontWeight: 500,
          letterSpacing: '-0.01em',
          opacity,
          textAlign: 'center',
        }}
      >
        Get personalized plan
      </span>
    </div>
  );
};
