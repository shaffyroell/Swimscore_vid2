import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, layout } from '../styles';
import { signals } from '../data';

// Scene 3: Aggregation - Turning Signals Into a Score (Frames 0-45)
// Rows drift inward/outward, circle outline appears and resolves

const DRIFT_DURATION = 30;
const CIRCLE_START = 10;
const CIRCLE_DURATION = 35;

interface StarRatingProps {
  filled: number;
  total?: number;
  opacity: number;
}

const StarRating: React.FC<StarRatingProps> = ({ filled, total = 5, opacity }) => {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          style={{
            fontSize: typography.starSize,
            color: i < filled
              ? `rgba(255, 255, 255, ${0.5 * opacity})`
              : `rgba(255, 255, 255, ${0.15 * opacity})`,
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
  emphasized: boolean;
  index: number;
  frame: number;
}

const MetricRow: React.FC<MetricRowProps> = ({ label, stars, emphasized, index, frame }) => {
  // Starting state: emphasized rows at -8px, others at 0
  const startY = emphasized ? -8 : 0;
  const startOpacity = emphasized ? 1 : 0.45;

  // All rows drift toward center and fade
  const rowOpacity = interpolate(
    frame,
    [0, DRIFT_DURATION],
    [startOpacity, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.ease) }
  );

  // Emphasized rows drift inward (toward center), de-emphasized drift outward
  const driftAmount = emphasized ? -40 : 30;
  const translateY = interpolate(
    frame,
    [0, DRIFT_DURATION],
    [startY, startY + driftAmount],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.ease) }
  );

  // Slight scale toward center
  const scale = interpolate(
    frame,
    [0, DRIFT_DURATION],
    [1, emphasized ? 0.95 : 1.02],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.ease) }
  );

  return (
    <div
      style={{
        opacity: rowOpacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
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
        <StarRating filled={stars} opacity={1} />
      </div>
    </div>
  );
};

interface AggregationCircleProps {
  frame: number;
}

const AggregationCircle: React.FC<AggregationCircleProps> = ({ frame }) => {
  const size = layout.circleSize;
  const strokeWidth = layout.circleStrokeWidth;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Circle appears and stroke resolves
  const circleOpacity = interpolate(
    frame,
    [CIRCLE_START, CIRCLE_START + 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  // Stroke dash offset animates from full to 0 (drawing the circle)
  const strokeProgress = interpolate(
    frame,
    [CIRCLE_START, CIRCLE_START + CIRCLE_DURATION],
    [circumference, circumference * 0.15], // Don't complete fully yet
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  return (
    <svg
      width={size}
      height={size}
      style={{
        position: 'absolute',
        opacity: circleOpacity,
      }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={colors.circleStroke}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeProgress}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};

export const Scene3Aggregation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={containerStyle}>
      {/* Metric rows drifting */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
        }}
      >
        {signals.map((signal, index) => (
          <MetricRow
            key={signal.label}
            label={signal.label}
            stars={signal.stars}
            emphasized={signal.emphasized}
            index={index}
            frame={frame}
          />
        ))}
      </div>

      {/* Circle appearing in center */}
      <AggregationCircle frame={frame} />
    </div>
  );
};
