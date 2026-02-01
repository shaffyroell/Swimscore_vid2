import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, cardStyle, spacing } from '../styles';

// Scene 3: Clear the Stage (Frames 105-125)
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

  // Fade out animation over ~15 frames
  const opacity = interpolate(frame, [0, 15], [1, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.ease),
  });

  // Optional subtle scale down
  const scale = interpolate(frame, [0, 15], [1, 0.97], {
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.ease),
  });

  return (
    <div style={{ ...containerStyle, justifyContent: 'flex-start', paddingTop: 80 }}>
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
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
            fontWeight: 500,
            marginBottom: 24,
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
