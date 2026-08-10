import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors, radius, sizes, spacing, type } from '@/theme';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  label: string;
  onPress(): void;
  variant?: ButtonVariant;
  icon?: IconName;
  disabled?: boolean;
  compact?: boolean;
  style?: ViewStyle;
}

const variants = {
  primary: { background: colors.primary, border: colors.primary, text: colors.white },
  secondary: { background: colors.surfaceSecondary, border: colors.border, text: colors.textPrimary },
  ghost: { background: 'transparent', border: 'transparent', text: colors.textSecondary },
  danger: { background: colors.dangerSoft, border: colors.dangerSoft, text: colors.danger },
};

export function Button({ label, onPress, variant = 'primary', icon, disabled, compact, style }: ButtonProps) {
  const palette = variants[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.base, compact && styles.compact, { backgroundColor: palette.background, borderColor: palette.border }, pressed && styles.pressed, disabled && styles.disabled, style]}>
      {icon ? <MaterialCommunityIcons name={icon} size={18} color={palette.text} /> : null}
      <Text style={[type.button, { color: palette.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: sizes.touch, paddingHorizontal: spacing.base, borderWidth: 1, borderRadius: radius.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  compact: { paddingHorizontal: spacing.md },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.45 },
});
