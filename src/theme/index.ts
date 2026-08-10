import { Platform, TextStyle, ViewStyle } from 'react-native';

export const colors = {
  primary: '#45B8ED',
  primaryDark: '#249BD0',
  primaryLight: '#73D5F6',
  primarySoft: '#183B54',
  background: '#0B1020',
  surface: '#132235',
  surfaceSecondary: '#172A3D',
  surfaceActive: '#1D4966',
  textPrimary: '#DDE8F2',
  textStrong: '#F7FAFC',
  textSecondary: '#9EB1C3',
  textMuted: '#71879A',
  border: '#213B50',
  borderStrong: '#2A506A',
  success: '#58D68D',
  successSoft: '#173D34',
  warning: '#F5B54C',
  warningSoft: '#443622',
  danger: '#F36E73',
  dangerSoft: '#46262F',
  info: '#45B8ED',
  infoSoft: '#183B54',
  purple: '#9A88FF',
  purpleSoft: '#2D2D55',
  white: '#FFFFFF',
  overlay: 'rgba(3, 8, 20, 0.78)',
} as const;

export const spacing = { xs: 4, sm: 6, md: 10, base: 14, lg: 16, xl: 20, xxl: 24, xxxl: 32 } as const;
export const radius = { sm: 6, md: 8, lg: 12, xl: 16, pill: 999 } as const;
export const sizes = { touch: 44, railCompact: 64, railExpanded: 196, topBar: 60, contentMax: 1500 } as const;
export const breakpoints = { compact: 768, tablet: 1024, wide: 1366 } as const;

export const shadows = Platform.select<Record<string, ViewStyle>>({
  ios: { card: { shadowColor: '#000000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.18, shadowRadius: 12 } },
  android: { card: { elevation: 3 } },
  default: { card: { shadowColor: '#000000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.18, shadowRadius: 12 } },
}) ?? { card: {} };

export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

export const type = {
  screenTitle: { fontFamily: fonts.semiBold, fontSize: 24, lineHeight: 32, color: colors.textStrong } as TextStyle,
  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 18, lineHeight: 26, color: colors.textStrong } as TextStyle,
  cardTitle: { fontFamily: fonts.semiBold, fontSize: 15, lineHeight: 22, color: colors.textStrong } as TextStyle,
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: colors.textPrimary } as TextStyle,
  bodyMedium: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 21, color: colors.textStrong } as TextStyle,
  label: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 18, color: colors.textSecondary } as TextStyle,
  caption: { fontFamily: fonts.regular, fontSize: 11, lineHeight: 17, color: colors.textMuted } as TextStyle,
  button: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 20 } as TextStyle,
} as const;

export type ResponsiveMode = 'compact' | 'tablet' | 'wide' | 'extraWide';

export function getResponsiveMode(width: number): ResponsiveMode {
  if (width < breakpoints.compact) return 'compact';
  if (width < breakpoints.tablet) return 'tablet';
  if (width <= breakpoints.wide) return 'wide';
  return 'extraWide';
}

export function isWideLayout(width: number) {
  return width >= breakpoints.tablet;
}
