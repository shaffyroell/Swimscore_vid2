import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, layout } from '../styles';
import { signals } from '../data';

// Scene 1: Input - Your Signals (Frames 0-60)
// Apple Health style rows with star ratings
// No backgrounds, thin dividers, calm fade-in

const STAGGER_FRAMES = 7;
const FADE_DURATION = 12;

interface StarRatingProps {
  filled: number;
  total?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ filled, total = 5 }) => {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          style={{
            fontSize: typography.starSize,
            color: i < filled ? colors.starFilled : colors.starEmpty,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

interface MetricRowProps {
  label: string;
  stars: number;
  index: number;
  frame: number;
  showDivider: boolean;
}

const MetricRow: React.FC<MetricRowProps> = ({ label, stars, index, frame, showDivider }) => {
  const startFrame = 15 + index * STAGGER_FRAMES;

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + FADE_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  const translateY = interpolate(
    frame,
    [startFrame, startFrame + FADE_DURATION],
    [6, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        width: layout.rowWidth,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: layout.rowHeight,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        <span
          style={{
            color: colors.primaryText,
            fontSize: typography.rowLabelSize,
            fontWeight: typography.rowLabelWeight,
            letterSpacing: '-0.01em',
          }}
        >
          {label}
        </span>
        <StarRating filled={stars} />
      </div>
      {showDivider && (
        <div
          style={{
            height: layout.dividerHeight,
            backgroundColor: colors.divider,
            width: '100%',
          }}
        />
      )}
    </div>
  );
};

export const Scene1Input: React.FC = () => {
  const frame = useCurrentFrame();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const headerTranslateY = interpolate(frame, [0, 15], [6, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <div style={containerStyle}>
      {/* Header */}
      <p
        style={{
          color: colors.mutedText,
          fontSize: typography.headerSize,
          fontWeight: typography.headerWeight,
          marginBottom: 48,
          opacity: headerOpacity,
          transform: `translateY(${headerTranslateY}px)`,
          letterSpacing: '-0.01em',
        }}
      >
        Your fertility signals
      </p>

      {/* Metric rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {signals.map((signal, index) => (
          <MetricRow
            key={signal.label}
            label={signal.label}
            stars={signal.stars}
            index={index}
            frame={frame}
            showDivider={index < signals.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
