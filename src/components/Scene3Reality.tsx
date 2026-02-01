import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, layout } from '../styles';
import { signals } from '../data';

// Scene 3: Reality (Frames 0-60)
// Big bold signal rows, Apple Health style
// Rows appear bottom → top with fast stagger

const STAGGER_FRAMES = 5;
const SLIDE_DURATION = 10;

interface StarRatingProps {
  filled: number;
  total?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ filled, total = 5 }) => {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
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
  showDivider: boolean;
}

const SignalRow: React.FC<SignalRowProps> = ({ label, stars, index, frame, showDivider }) => {
  // Rows appear bottom to top, so reverse the index for stagger
  const reverseIndex = signals.length - 1 - index;
  const startFrame = 5 + reverseIndex * STAGGER_FRAMES;

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + SLIDE_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Slide up from +8px
  const translateY = interpolate(
    frame,
    [startFrame, startFrame + SLIDE_DURATION],
    [8, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
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

export const Scene3Reality: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {signals.map((signal, index) => (
          <SignalRow
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
