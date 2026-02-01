import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, cardStyle, spacing } from '../styles';

// Scene 2: What We Measure (Frames 0-90)
// Large metric cards animate in one-by-one, centered

const metrics = [
  'Total moving swimmers',
  'Movement speed',
  'Cell shape',
  'DNA quality',
  'Testosterone & hormones',
];

const STAGGER_FRAMES = 10;
const ANIMATION_DURATION = 18;

interface MetricCardProps {
  text: string;
  index: number;
  frame: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ text, index, frame }) => {
  const startFrame = 20 + index * STAGGER_FRAMES; // Start after header

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + ANIMATION_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const translateY = interpolate(
    frame,
    [startFrame, startFrame + ANIMATION_DURATION],
    [30, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const scale = interpolate(
    frame,
    [startFrame, startFrame + ANIMATION_DURATION],
    [0.95, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  return (
    <div
      style={{
        ...cardStyle,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        marginBottom: spacing.cardGap,
      }}
    >
      {text}
    </div>
  );
};

export const Scene2Metrics: React.FC = () => {
  const frame = useCurrentFrame();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const headerTranslateY = interpolate(frame, [0, 20], [20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div style={{ ...containerStyle, justifyContent: 'flex-start', paddingTop: 160 }}>
      {/* Section header */}
      <p
        style={{
          color: colors.secondaryText,
          fontSize: typography.headerSize,
          fontWeight: 600,
          marginBottom: 48,
          opacity: headerOpacity,
          transform: `translateY(${headerTranslateY}px)`,
          letterSpacing: '-0.01em',
        }}
      >
        We measure what matters
      </p>

      {/* Metric cards - vertically stacked, centered */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {metrics.map((metric, index) => (
          <MetricCard key={metric} text={metric} index={index} frame={frame} />
        ))}
      </div>
    </div>
  );
};
