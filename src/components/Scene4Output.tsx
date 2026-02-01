import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, layout } from '../styles';

// Scene 4: Output - SwimScore Reveal (Frames 0-30)
// Circle finishes resolving, SwimScore text fades in

const TEXT_START = 8;
const TEXT_DURATION = 18;

interface ScoreCircleProps {
  frame: number;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ frame }) => {
  const size = layout.circleSize;
  const strokeWidth = layout.circleStrokeWidth;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Circle completes its stroke animation
  const strokeProgress = interpolate(
    frame,
    [0, 20],
    [circumference * 0.15, 0], // Complete the circle
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  return (
    <svg
      width={size}
      height={size}
      style={{
        position: 'absolute',
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

export const Scene4Output: React.FC = () => {
  const frame = useCurrentFrame();

  // Text fade in
  const textOpacity = interpolate(
    frame,
    [TEXT_START, TEXT_START + TEXT_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  // Subtitle slightly delayed
  const subtitleOpacity = interpolate(
    frame,
    [TEXT_START + 8, TEXT_START + TEXT_DURATION + 8],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  return (
    <div style={containerStyle}>
      {/* Circle */}
      <ScoreCircle frame={frame} />

      {/* SwimScore text centered within circle area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}
      >
        <span
          style={{
            color: colors.primaryText,
            fontSize: typography.scoreSize,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            opacity: textOpacity,
          }}
        >
          SwimScore™
        </span>
        <span
          style={{
            color: colors.mutedText,
            fontSize: typography.scoreSubtitleSize,
            fontWeight: 400,
            marginTop: 12,
            opacity: subtitleOpacity,
            letterSpacing: '-0.01em',
          }}
        >
          Your male fertility health metric
        </span>
      </div>
    </div>
  );
};
