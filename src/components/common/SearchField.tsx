import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, TextInput, View } from 'react-native';

import { IconButton } from '@/components/common/IconButton';
import { colors, radius, sizes, spacing, type } from '@/theme';

export function SearchField({ value, onChangeText, placeholder = 'Search…' }: { value: string; onChangeText(value: string): void; placeholder?: string }) {
  return (
    <View style={styles.wrapper}>
      <MaterialCommunityIcons name="magnify" size={21} color={colors.textMuted} />
      <TextInput
        accessibilityLabel={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />
      {value ? <IconButton name="close" label="Clear search" onPress={() => onChangeText('')} style={styles.clear} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { minHeight: sizes.touch + 4, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: colors.surface, borderRadius: radius.md, paddingLeft: spacing.md, flex: 1 },
  input: { ...type.body, flex: 1, minWidth: 80, paddingVertical: spacing.md },
  clear: { borderWidth: 0, backgroundColor: 'transparent' },
});
