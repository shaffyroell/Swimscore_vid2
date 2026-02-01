import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, profileCardStyle, cardDimensions } from '../styles';

// Scene 4: Profile Baseball Cards (Frames 0-180)
// Three large, centered profile cards - 2 seconds (60 frames) each
// Each profile has unique star ratings

export interface ProfileData {
  name: string;
  ratings: {
    metric: string;
    stars: number;
  }[];
  plan: string[]; // Personalized plan items
}

export const profiles: ProfileData[] = [
  {
    name: 'Profile 1',
    ratings: [
      { metric: 'Total moving swimmers', stars: 4 },
      { metric: 'Movement speed', stars: 2 },
      { metric: 'DNA quality', stars: 3 },
      { metric: 'Testosterone', stars: 5 },
    ],
    plan: ['Focus on movement', 'Retest in 60 days', 'Consider supplements'],
  },
  {
    name: 'Profile 2',
    ratings: [
      { metric: 'Total moving swimmers', stars: 3 },
      { metric: 'Movement speed', stars: 5 },
      { metric: 'DNA quality', stars: 2 },
      { metric: 'Testosterone', stars: 3 },
    ],
    plan: ['Improve DNA health', 'Lifestyle changes', 'Follow-up testing'],
  },
  {
    name: 'Profile 3',
    ratings: [
      { metric: 'Total moving swimmers', stars: 5 },
      { metric: 'Movement speed', stars: 4 },
      { metric: 'DNA quality', stars: 5 },
      { metric: 'Testosterone', stars: 2 },
    ],
    plan: ['Optimize hormones', 'Diet adjustments', 'Monitor progress'],
  },
];

// 2 seconds per profile = 60 frames each
const PROFILE_DURATION = 60;
const FADE_DURATION = 15;

interface StarRatingProps {
  filled: number;
  total?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ filled, total = 5 }) => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
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

interface ProfileCardProps {
  profile: ProfileData;
  localFrame: number;
  isLast: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, localFrame, isLast }) => {
  // Fade in
  const fadeIn = interpolate(
    localFrame,
    [0, FADE_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Fade out (not for last profile)
  const fadeOut = isLast
    ? 1
    : interpolate(
        localFrame,
        [PROFILE_DURATION - FADE_DURATION, PROFILE_DURATION],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) }
      );

  const opacity = fadeIn * fadeOut;

  // Scale animation
  const scale = interpolate(
    localFrame,
    [0, FADE_DURATION],
    [0.92, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Slight Y movement
  const translateY = interpolate(
    localFrame,
    [0, FADE_DURATION],
    [40, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  return (
    <div
      style={{
        ...profileCardStyle,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
      }}
    >
      {/* Profile header */}
      <div
        style={{
          borderBottom: `2px solid ${colors.divider}`,
          paddingBottom: 28,
          marginBottom: 32,
        }}
      >
        <h2
          style={{
            color: colors.cardText,
            fontSize: typography.profileHeaderSize,
            fontWeight: 700,
            margin: 0,
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          {profile.name}
        </h2>
      </div>

      {/* Metrics with stars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {profile.ratings.map(({ metric, stars }) => (
          <div
            key={metric}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                color: colors.cardText,
                fontSize: typography.metricLabelSize,
                fontWeight: 500,
              }}
            >
              {metric}
            </span>
            <StarRating filled={stars} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene4Profiles: React.FC = () => {
  const frame = useCurrentFrame();

  // Determine current profile index
  const currentProfileIndex = Math.min(
    Math.floor(frame / PROFILE_DURATION),
    profiles.length - 1
  );

  const localFrame = frame - currentProfileIndex * PROFILE_DURATION;
  const currentProfile = profiles[currentProfileIndex];
  const isLast = currentProfileIndex === profiles.length - 1;

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
    <div style={containerStyle}>
      {/* Header */}
      <p
        style={{
          color: colors.secondaryText,
          fontSize: typography.headerSize,
          fontWeight: 600,
          opacity: headerOpacity,
          transform: `translateY(${headerTranslateY}px)`,
          position: 'absolute',
          top: 140,
          letterSpacing: '-0.01em',
        }}
      >
        Everyone is different
      </p>

      {/* Profile card - centered */}
      <ProfileCard
        profile={currentProfile}
        localFrame={localFrame}
        isLast={isLast}
      />
    </div>
  );
};
