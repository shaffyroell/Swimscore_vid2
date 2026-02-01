import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, cardStyle, spacing } from '../styles';

// Scene 5: Personalized Plan (Frames 205-285)
// Title with plan cards stacking in

const planCards = [
  'What to focus on',
  'What to retest',
  'What to improve',
];

const STAGGER_FRAMES = 8;
const ANIMATION_DURATION = 15;
const TITLE_ANIMATION_DURATION = 20;

interface PlanCardProps {
  text: string;
  index: number;
  frame: number;
}

const PlanCard: React.FC<PlanCardProps> = ({ text, index, frame }) => {
  // Cards start animating after title (offset by title duration + some buffer)
  const startFrame = TITLE_ANIMATION_DURATION + 5 + index * STAGGER_FRAMES;

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

export const Scene5Plan: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animation
  const titleOpacity = interpolate(frame, [0, TITLE_ANIMATION_DURATION], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const titleTranslateY = interpolate(frame, [0, TITLE_ANIMATION_DURATION], [8, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <div style={{ ...containerStyle, justifyContent: 'flex-start', paddingTop: 120 }}>
      {/* Title section */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        <h2
          style={{
            color: colors.primaryText,
            fontSize: 36,
            fontWeight: 700,
            margin: 0,
            marginBottom: 8,
          }}
        >
          Personalized plan
        </h2>
        <p
          style={{
            color: colors.secondaryText,
            fontSize: typography.heroSubtitleSize,
            fontWeight: 400,
            margin: 0,
          }}
        >
          Fit to your health
        </p>
      </div>

      {/* Plan cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {planCards.map((card, index) => (
          <PlanCard key={card} text={card} index={index} frame={frame} />
        ))}
      </div>
    </div>
  );
};
