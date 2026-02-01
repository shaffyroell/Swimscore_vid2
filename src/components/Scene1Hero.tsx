import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle } from '../styles';

// Scene 1: Hero Statement (Frames 0-60)
// "Know your SwimScore™" with subtitle - clean, impactful

export const Scene1Hero: React.FC = () => {
  const frame = useCurrentFrame();

  // Main text animation - smooth fade in with upward motion
  const opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const translateY = interpolate(frame, [0, 25], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Subtitle slightly delayed
  const subtitleOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const subtitleTranslateY = interpolate(frame, [10, 35], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div style={containerStyle}>
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <h1
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            color: colors.primaryText,
            fontSize: typography.heroSize,
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          Know your SwimScore™
        </h1>
        <p
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleTranslateY}px)`,
            color: colors.secondaryText,
            fontSize: typography.heroSubtitleSize,
            fontWeight: 500,
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          The male fertility health metric
        </p>
      </div>
    </div>
  );
};
