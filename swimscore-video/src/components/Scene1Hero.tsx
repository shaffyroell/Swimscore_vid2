import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle } from '../styles';

// Scene 1: Hero Statement (Frames 0-45)
// "Know your SwimScore™" with subtitle

export const Scene1Hero: React.FC = () => {
  const frame = useCurrentFrame();

  // Animation: Fade in with slight upward motion over ~20 frames
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const translateY = interpolate(frame, [0, 20], [8, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <div style={containerStyle}>
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: colors.primaryText,
            fontSize: typography.heroSize,
            fontWeight: 700,
            margin: 0,
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}
        >
          Know your SwimScore™
        </h1>
        <p
          style={{
            color: colors.secondaryText,
            fontSize: typography.heroSubtitleSize,
            fontWeight: 400,
            margin: 0,
          }}
        >
          The male fertility health metric
        </p>
      </div>
    </div>
  );
};
