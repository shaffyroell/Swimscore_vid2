import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, containerStyle, spacing } from '../styles';

// Scene 4: Different Profiles - Baseball Cards (Frames 125-205)
// Three profile cards shown sequentially with star ratings

interface ProfileData {
  name: string;
  ratings: {
    metric: string;
    stars: number; // 1-5
  }[];
}

const profiles: ProfileData[] = [
  {
    name: 'Profile 1',
    ratings: [
      { metric: 'Total moving swimmers', stars: 4 },
      { metric: 'Movement speed', stars: 2 },
      { metric: 'DNA quality', stars: 3 },
      { metric: 'Testosterone', stars: 4 },
    ],
  },
  {
    name: 'Profile 2',
    ratings: [
      { metric: 'Total moving swimmers', stars: 3 },
      { metric: 'Movement speed', stars: 5 },
      { metric: 'DNA quality', stars: 2 },
      { metric: 'Testosterone', stars: 3 },
    ],
  },
  {
    name: 'Profile 3',
    ratings: [
      { metric: 'Total moving swimmers', stars: 5 },
      { metric: 'Movement speed', stars: 4 },
      { metric: 'DNA quality', stars: 4 },
      { metric: 'Testosterone', stars: 2 },
    ],
  },
];

// Profile timing (relative to scene start at frame 0)
// Profile 1: 0-30 (slides in, pauses, slides out)
// Profile 2: 30-60
// Profile 3: 60-80 (stays at end)

const PROFILE_DURATION = 30;
const SLIDE_IN_DURATION = 10;
const SLIDE_OUT_DURATION = 8;

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
            fontSize: 14,
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
  frame: number;
  startFrame: number;
  isLast: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, frame, startFrame, isLast }) => {
  const localFrame = frame - startFrame;

  // Slide in from right
  const slideInProgress = interpolate(
    localFrame,
    [0, SLIDE_IN_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  // Slide out to left (only if not last)
  const slideOutProgress = isLast
    ? 0
    : interpolate(
        localFrame,
        [PROFILE_DURATION - SLIDE_OUT_DURATION, PROFILE_DURATION],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.ease) }
      );

  // Calculate transform
  const translateX = interpolate(slideInProgress, [0, 1], [400, 0]) +
    interpolate(slideOutProgress, [0, 1], [0, -400]);

  const opacity = interpolate(slideInProgress, [0, 1], [0, 1]) *
    interpolate(slideOutProgress, [0, 1], [1, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        opacity,
        transform: `translateX(${translateX}px)`,
        backgroundColor: colors.cardBackground,
        borderRadius: spacing.cardRadius,
        padding: 24,
        width: 320,
      }}
    >
      {/* Profile header */}
      <h3
        style={{
          color: colors.cardText,
          fontSize: typography.profileHeaderSize,
          fontWeight: 600,
          marginBottom: 20,
          textAlign: 'center',
          borderBottom: '1px solid #e0e0e0',
          paddingBottom: 12,
        }}
      >
        {profile.name}
      </h3>

      {/* Metrics with stars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                fontSize: typography.metricTextSize,
                fontWeight: 400,
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

  // Header animation
  const headerOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Determine which profile(s) to show based on frame
  const getProfileVisibility = (profileIndex: number) => {
    const startFrame = profileIndex * PROFILE_DURATION;
    const endFrame = startFrame + PROFILE_DURATION + (profileIndex === 2 ? 10 : 0);
    return frame >= startFrame && frame <= endFrame;
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <p
        style={{
          color: colors.secondaryText,
          fontSize: typography.headerSize,
          fontWeight: 500,
          marginBottom: 32,
          opacity: headerOpacity,
          position: 'absolute',
          top: 80,
        }}
      >
        Everyone is different
      </p>

      {/* Profile cards container */}
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 280,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {profiles.map((profile, index) =>
          getProfileVisibility(index) ? (
            <ProfileCard
              key={profile.name}
              profile={profile}
              frame={frame}
              startFrame={index * PROFILE_DURATION}
              isLast={index === profiles.length - 1}
            />
          ) : null
        )}
      </div>
    </div>
  );
};
