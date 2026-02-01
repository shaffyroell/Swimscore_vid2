// Design Tokens for SwimScore Video
// Optimized for 1080 × 1920 (9:16 Meta format)

export const colors = {
  background: '#0f1419', // Deep dark navy
  cardBackground: '#ffffff', // Clean white
  cardBackgroundAlt: '#f8f9fa', // Slightly off-white
  cardText: '#1a1a1a', // Dark text
  primaryText: '#ffffff', // White text
  secondaryText: 'rgba(255, 255, 255, 0.75)', // Muted white
  accentBlue: '#3b82f6', // Accent blue
  starFilled: '#64748b', // Neutral filled star
  starEmpty: '#e2e8f0', // Empty star
  divider: '#e5e7eb', // Light divider
};

export const spacing = {
  cardPadding: 48,
  cardPaddingLarge: 64,
  cardGap: 24,
  cardRadius: 32,
  cardRadiusLarge: 40,
};

export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
  // Hero scene
  heroSize: 72,
  heroSubtitleSize: 36,
  // Section headers
  headerSize: 32,
  // Metric cards
  cardTextSize: 34,
  // Profile cards
  profileHeaderSize: 44,
  metricLabelSize: 28,
  starSize: 28,
  // Plan cards
  planTitleSize: 56,
  planSubtitleSize: 32,
  planCardSize: 32,
};

// Video dimensions
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

// Card dimensions - sized for impact
export const cardDimensions = {
  metricCardWidth: 920,
  profileCardWidth: 920,
  profileCardHeight: 700,
  planCardWidth: 920,
};

export const containerStyle: React.CSSProperties = {
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
  backgroundColor: colors.background,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: typography.fontFamily,
  padding: 80,
  boxSizing: 'border-box',
};

export const cardStyle: React.CSSProperties = {
  backgroundColor: colors.cardBackground,
  color: colors.cardText,
  padding: spacing.cardPadding,
  borderRadius: spacing.cardRadius,
  fontSize: typography.cardTextSize,
  fontWeight: 600,
  textAlign: 'center' as const,
  width: cardDimensions.metricCardWidth,
};

export const profileCardStyle: React.CSSProperties = {
  backgroundColor: colors.cardBackground,
  color: colors.cardText,
  padding: spacing.cardPaddingLarge,
  borderRadius: spacing.cardRadiusLarge,
  width: cardDimensions.profileCardWidth,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

export const planCardStyle: React.CSSProperties = {
  backgroundColor: colors.cardBackground,
  color: colors.cardText,
  padding: spacing.cardPadding,
  borderRadius: spacing.cardRadius,
  fontSize: typography.planCardSize,
  fontWeight: 600,
  textAlign: 'center' as const,
  width: cardDimensions.planCardWidth,
};
