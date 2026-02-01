import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, cardStyle, spacing } from '../styles';

// Scene 2: What We Measure (Frames 45-105)
// Cards animate in one-by-one showing metrics

const metrics = [
  'Total moving swimmers',
  'Movement speed',
  'Cell shape',
  'DNA quality',
  'Testosterone & hormones',
];

const STAGGER_FRAMES = 8;
const ANIMATION_DURATION = 15;

interface MetricCardProps {
  text: string;
  index: number;
  frame: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ text, index, frame }) => {
  const startFrame = index * STAGGER_FRAMES;

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + ANIMATION_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  const translateY = interpolate(
    frame,
    [startFrame, startFrame + ANIMATION_DURATION],
    [12, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  return (
    <div
      style={{
        ...cardStyle,
        opacity,
        transform: `translateY(${translateY}px)`,
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
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <div style={{ ...containerStyle, justifyContent: 'flex-start', paddingTop: 80 }}>
      {/* Section header */}
      <p
        style={{
          color: colors.secondaryText,
          fontSize: typography.headerSize,
          fontWeight: 500,
          marginBottom: 24,
          opacity: headerOpacity,
        }}
      >
        We measure what matters
      </p>

      {/* Metric cards */}
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
