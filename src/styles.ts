// Design Tokens for SwimScore Video
// Minimal health-data aesthetic - no boxes, no colors

export const colors = {
  background: '#000000',
  primaryText: '#ffffff',
  mutedText: 'rgba(255, 255, 255, 0.6)',
  deemphasizedText: 'rgba(255, 255, 255, 0.45)',
  divider: 'rgba(255, 255, 255, 0.07)',
  starFilled: 'rgba(255, 255, 255, 0.5)',
  starEmpty: 'rgba(255, 255, 255, 0.15)',
  circleStroke: 'rgba(255, 255, 255, 0.8)',
};

export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
  headerSize: 28,
  headerWeight: 500,
  rowLabelSize: 32,
  rowLabelWeight: 400,
  starSize: 20,
  scoreSize: 64,
  scoreSubtitleSize: 24,
  ctaSize: 36,
};

export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

export const layout = {
  rowWidth: 900,
  rowHeight: 72,
  rowGap: 0,
  dividerHeight: 1,
  circleSize: 200,
  circleStrokeWidth: 2,
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
