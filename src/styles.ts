// Design Tokens for SwimScore TikTok Video
// Bold, high contrast, modern sans-serif

export const colors = {
  background: '#1a1a1f', // Deep graphite (not pure black)
  primaryText: '#ffffff',
  mutedText: 'rgba(255, 255, 255, 0.65)',
  accent: '#2dd4bf', // Teal/aqua - ONLY for SwimScore
  divider: 'rgba(255, 255, 255, 0.08)',
  starFilled: 'rgba(255, 255, 255, 0.4)',
  starEmpty: 'rgba(255, 255, 255, 0.12)',
};

export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", system-ui, sans-serif',
  // Hook/tension text
  hookSize: 72,
  hookWeight: 700,
  // Signal rows
  rowLabelSize: 38,
  rowLabelWeight: 600,
  starSize: 18,
  // Brand
  brandSize: 80,
  brandSubtitleSize: 28,
  // CTA
  ctaSize: 48,
  ctaWeight: 700,
};

export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

export const layout = {
  rowWidth: 920,
  rowHeight: 80,
  dividerHeight: 1,
  // Off-center positioning for hook
  hookOffsetX: -80,
  hookOffsetY: -100,
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
  boxSizing: 'border-box',
};
