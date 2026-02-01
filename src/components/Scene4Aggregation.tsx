import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, layout } from '../styles';
import { signals } from '../data';

// Scene 4: Aggregation (Frames 0-45)
// Rows drift inward, stars fade first, text second
// Center brightens, accent color appears for first time

const DRIFT_DURATION = 35;

interface StarRatingProps {
  filled: number;
  total?: number;
  opacity: number;
}

const StarRating: React.FC<StarRatingProps> = ({ filled, total = 5, opacity }) => {
  return (
    <div style={{ display: 'flex', gap: 4, opacity }}>
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

interface SignalRowProps {
  label: string;
  stars: number;
  index: number;
  frame: number;
  totalRows: number;
}

const SignalRow: React.FC<SignalRowProps> = ({ label, stars, index, frame, totalRows }) => {
  // Calculate drift toward center
  const middleIndex = (totalRows - 1) / 2;
  const distanceFromMiddle = index - middleIndex;

  // Rows drift inward (toward center)
  const driftY = interpolate(
    frame,
    [0, DRIFT_DURATION],
    [0, -distanceFromMiddle * 30],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.ease) }
  );

  // Scale slightly as they converge
  const scale = interpolate(
    frame,
    [0, DRIFT_DURATION],
    [1, 0.92],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.ease) }
  );

  // Stars fade first
  const starOpacity = interpolate(
    frame,
    [5, 20],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.ease) }
  );

  // Text fades second
  const textOpacity = interpolate(
    frame,
    [15, 35],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.ease) }
  );

  return (
    <div
      style={{
        transform: `translateY(${driftY}px) scale(${scale})`,
        width: layout.rowWidth,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: layout.rowHeight,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <span
          style={{
            color: colors.primaryText,
            fontSize: typography.rowLabelSize,
            fontWeight: typography.rowLabelWeight,
            letterSpacing: '-0.02em',
            opacity: textOpacity,
          }}
        >
          {label}
        </span>
        <StarRating filled={stars} opacity={starOpacity} />
      </div>
    </div>
  );
};

export const Scene4Aggregation: React.FC = () => {
  const frame = useCurrentFrame();

  // Center glow/brightness appears
  const centerGlowOpacity = interpolate(
    frame,
    [20, 40],
    [0, 0.15],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  // Accent color hint
  const accentOpacity = interpolate(
    frame,
    [30, 45],
    [0, 0.4],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  return (
    <div style={containerStyle}>
      {/* Center glow */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
          opacity: centerGlowOpacity,
        }}
      />

      {/* Rows drifting inward */}
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {signals.map((signal, index) => (
          <SignalRow
            key={signal.label}
            label={signal.label}
            stars={signal.stars}
            index={index}
            frame={frame}
            totalRows={signals.length}
          />
        ))}
      </div>
    </div>
  );
};
