import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, planCardStyle, spacing } from '../styles';
import { profiles } from './Scene4Profiles';

// Scene 5: Personalized Plans (Frames 0-180)
// Each profile gets their own personalized plan - 60 frames each (2 seconds)

const PLAN_DURATION = 60;
const FADE_DURATION = 15;
const STAGGER_FRAMES = 10;
const CARD_ANIMATION_DURATION = 15;

interface PlanCardProps {
  text: string;
  index: number;
  localFrame: number;
}

const PlanCard: React.FC<PlanCardProps> = ({ text, index, localFrame }) => {
  const startFrame = 25 + index * STAGGER_FRAMES;

  const opacity = interpolate(
    localFrame,
    [startFrame, startFrame + CARD_ANIMATION_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const translateY = interpolate(
    localFrame,
    [startFrame, startFrame + CARD_ANIMATION_DURATION],
    [30, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const scale = interpolate(
    localFrame,
    [startFrame, startFrame + CARD_ANIMATION_DURATION],
    [0.95, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  return (
    <div
      style={{
        ...planCardStyle,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        marginBottom: spacing.cardGap,
      }}
    >
      {text}
    </div>
  );
};

interface PlanViewProps {
  profileIndex: number;
  localFrame: number;
  isLast: boolean;
}

const PlanView: React.FC<PlanViewProps> = ({ profileIndex, localFrame, isLast }) => {
  const profile = profiles[profileIndex];

  // Container fade in
  const fadeIn = interpolate(
    localFrame,
    [0, FADE_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Container fade out (not for last)
  const fadeOut = isLast
    ? 1
    : interpolate(
        localFrame,
        [PLAN_DURATION - FADE_DURATION, PLAN_DURATION],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) }
      );

  const containerOpacity = fadeIn * fadeOut;

  // Title animation
  const titleOpacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const titleTranslateY = interpolate(localFrame, [0, 20], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        ...containerStyle,
        opacity: containerOpacity,
        justifyContent: 'flex-start',
        paddingTop: 200,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      {/* Title section */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          textAlign: 'center',
          marginBottom: 56,
        }}
      >
        <h2
          style={{
            color: colors.primaryText,
            fontSize: typography.planTitleSize,
            fontWeight: 700,
            margin: 0,
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}
        >
          Your plan
        </h2>
        <p
          style={{
            color: colors.secondaryText,
            fontSize: typography.planSubtitleSize,
            fontWeight: 500,
            margin: 0,
          }}
        >
          {profile.name}
        </p>
      </div>

      {/* Plan cards for this profile */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {profile.plan.map((item, index) => (
          <PlanCard key={item} text={item} index={index} localFrame={localFrame} />
        ))}
      </div>
    </div>
  );
};

export const Scene5Plan: React.FC = () => {
  const frame = useCurrentFrame();

  // Determine current plan index (one per profile)
  const currentPlanIndex = Math.min(
    Math.floor(frame / PLAN_DURATION),
    profiles.length - 1
  );

  const localFrame = frame - currentPlanIndex * PLAN_DURATION;
  const isLast = currentPlanIndex === profiles.length - 1;

  return (
    <div style={{ position: 'relative', width: 1080, height: 1920 }}>
      <PlanView
        profileIndex={currentPlanIndex}
        localFrame={localFrame}
        isLast={isLast}
      />
    </div>
  );
};
