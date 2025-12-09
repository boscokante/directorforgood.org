import { StyleSheet } from '@react-pdf/renderer';

// Color palette - professional monochrome with accent
export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  accent: '#3B82F6', // Blue accent for highlights
};

// Typography
export const fonts = {
  heading: 'Helvetica-Bold',
  body: 'Helvetica',
  light: 'Helvetica',
};

// Slide dimensions (16:9 aspect ratio)
export const slide = {
  width: 1920 / 2, // 960pt
  height: 1080 / 2, // 540pt
  padding: 40,
  paddingSmall: 24,
};

// Font sizes (reduced to fit slides)
export const fontSize = {
  title: 36,
  subtitle: 20,
  heading: 24,
  subheading: 18,
  body: 12,
  small: 10,
  tiny: 9,
};

// Spacing (tighter for slides)
export const spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
};

// Common styles
export const styles = StyleSheet.create({
  // Page/Slide styles
  page: {
    width: slide.width,
    height: slide.height,
    backgroundColor: colors.black,
    padding: slide.padding,
    position: 'relative',
  },
  pageLight: {
    width: slide.width,
    height: slide.height,
    backgroundColor: colors.gray[900],
    padding: slide.padding,
    position: 'relative',
  },
  
  // Typography
  title: {
    fontFamily: fonts.heading,
    fontSize: fontSize.title,
    color: colors.white,
    marginBottom: spacing.lg,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSize.subtitle,
    color: colors.gray[300],
    marginBottom: spacing.xl,
    lineHeight: 1.4,
  },
  heading: {
    fontFamily: fonts.heading,
    fontSize: fontSize.heading,
    color: colors.white,
    marginBottom: spacing.md,
  },
  subheading: {
    fontFamily: fonts.heading,
    fontSize: fontSize.subheading,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    color: colors.gray[300],
    lineHeight: 1.5,
  },
  bodyWhite: {
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    color: colors.white,
    lineHeight: 1.5,
  },
  small: {
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: colors.gray[400],
    lineHeight: 1.4,
  },
  
  // Layout
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  
  // Bullets
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginRight: spacing.sm,
    marginTop: 4,
  },
  bulletText: {
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    color: colors.gray[300],
    lineHeight: 1.4,
    flex: 1,
  },
  
  // Boxes/Cards
  card: {
    backgroundColor: colors.gray[800],
    borderRadius: 8,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardBordered: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderRadius: 8,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardHighlight: {
    backgroundColor: colors.gray[800],
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 8,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  
  // Dividers
  divider: {
    height: 1,
    backgroundColor: colors.gray[700],
    marginVertical: spacing.lg,
  },
  dividerVertical: {
    width: 4,
    backgroundColor: colors.white,
    marginRight: spacing.md,
  },
  
  // Footer/Page number
  footer: {
    position: 'absolute',
    bottom: spacing.lg,
    right: slide.padding,
    fontFamily: fonts.body,
    fontSize: fontSize.tiny,
    color: colors.gray[500],
  },
  
  // Two column layout
  twoColumn: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  columnHalf: {
    flex: 1,
  },
  
  // Grid layouts
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  gridItem2: {
    width: '48%',
  },
  
  // Placeholder styles
  imagePlaceholder: {
    backgroundColor: colors.gray[800],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderStyle: 'dashed',
  },
  
  // Icon container
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.gray[800],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
});

export default styles;

