import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, layout } from '../styles';
import { signals } from '../data';

// Scene 2: Weighting - What Matters Most (Frames 0-45)
// Emphasized rows brighten, others fade
// Header changes to "Not all signals weigh the same"

const TRANSITION_DURATION = 20;

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
  frame: number;
  showDivider: boolean;
}

const MetricRow: React.FC<MetricRowProps> = ({ label, stars, emphasized, frame, showDivider }) => {
  // Emphasized rows stay bright, others fade to 45%
  const rowOpacity = interpolate(
    frame,
    [5, 5 + TRANSITION_DURATION],
    [1, emphasized ? 1 : 0.45],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.ease) }
  );

  // Emphasized rows shift up slightly (-8px)
  const translateY = interpolate(
    frame,
    [5, 5 + TRANSITION_DURATION],
    [0, emphasized ? -8 : 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.ease) }
  );

  return (
    <div
      style={{
        opacity: rowOpacity,
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
        <StarRating filled={stars} opacity={1} />
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

export const Scene2Weighting: React.FC = () => {
  const frame = useCurrentFrame();

  // Header transition
  const headerOpacity = interpolate(frame, [0, 12], [0, 1], {
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
          letterSpacing: '-0.01em',
        }}
      >
        Not all signals weigh the same
      </p>

      {/* Metric rows with emphasis */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {signals.map((signal, index) => (
          <MetricRow
            key={signal.label}
            label={signal.label}
            stars={signal.stars}
            emphasized={signal.emphasized}
            frame={frame}
            showDivider={index < signals.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
