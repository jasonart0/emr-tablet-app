import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { colors, radius, sizes } from '@/theme';

export function IconButton({ name, label, onPress, selected, style }: { name: ComponentProps<typeof MaterialCommunityIcons>['name']; label: string; onPress(): void; selected?: boolean; style?: ViewStyle }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [styles.button, selected && styles.selected, pressed && styles.pressed, style]}>
      <MaterialCommunityIcons name={name} size={21} color={selected ? colors.primary : colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { width: sizes.touch, height: sizes.touch, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  selected: { backgroundColor: colors.primarySoft, borderColor: colors.primaryLight },
  pressed: { opacity: 0.7 },
});
