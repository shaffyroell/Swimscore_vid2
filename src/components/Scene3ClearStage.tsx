import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, cardStyle, spacing } from '../styles';

// Scene 3: Clear the Stage (Frames 0-20)
// All cards fade out together, preparing for profiles

const metrics = [
  'Total moving swimmers',
  'Movement speed',
  'Cell shape',
  'DNA quality',
  'Testosterone & hormones',
];

export const Scene3ClearStage: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade out animation over ~18 frames
  const opacity = interpolate(frame, [0, 18], [1, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Subtle scale down for smooth exit
  const scale = interpolate(frame, [0, 18], [1, 0.96], {
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Slight upward motion as it fades
  const translateY = interpolate(frame, [0, 18], [0, -20], {
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  return (
    <div style={{ ...containerStyle, justifyContent: 'flex-start', paddingTop: 160 }}>
      <div
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${translateY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Section header */}
        <p
          style={{
            color: colors.secondaryText,
            fontSize: typography.headerSize,
            fontWeight: 600,
            marginBottom: 48,
            letterSpacing: '-0.01em',
          }}
        >
          We measure what matters
        </p>

        {/* Metric cards */}
        {metrics.map((metric) => (
          <div
            key={metric}
            style={{
              ...cardStyle,
              marginBottom: spacing.cardGap,
            }}
          >
            {metric}
          </div>
        ))}
      </div>
    </div>
  );
};
