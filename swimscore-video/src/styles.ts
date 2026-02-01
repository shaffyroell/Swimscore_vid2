// Design Tokens for SwimScore Video

export const colors = {
  background: '#1a1f2e', // Dark navy
  cardBackground: '#f5f5f7', // Light gray/off-white
  cardText: '#1a1a1a', // Dark text
  primaryText: '#ffffff', // White text
  secondaryText: 'rgba(255, 255, 255, 0.7)', // Muted white
  accentText: '#4a9eff', // Accent blue
  starFilled: '#888888', // Neutral filled star
  starEmpty: '#cccccc', // Empty star
};

export const spacing = {
  cardPadding: 20,
  cardGap: 12,
  cardRadius: 20,
};

export const typography = {
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  heroSize: 48,
  heroSubtitleSize: 24,
  headerSize: 20,
  cardTextSize: 18,
  profileHeaderSize: 22,
  metricTextSize: 16,
};

export const containerStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: colors.background,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: typography.fontFamily,
  padding: 40,
};

export const cardStyle: React.CSSProperties = {
  backgroundColor: colors.cardBackground,
  color: colors.cardText,
  padding: spacing.cardPadding,
  borderRadius: spacing.cardRadius,
  fontSize: typography.cardTextSize,
  fontWeight: 500,
  textAlign: 'center' as const,
  width: '100%',
  maxWidth: 320,
};
