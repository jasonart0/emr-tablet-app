import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import { colors, radius, sizes, spacing, type } from '@/theme';

export function FormField({ label, error, multiline, containerStyle, ...props }: TextInputProps & { label: string; error?: string; containerStyle?: ViewStyle }) {
  return (
    <View style={[styles.field, containerStyle]}>
      <Text style={type.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        {...props}
        style={[styles.input, multiline && styles.multiline, error && styles.errorInput, props.style]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: spacing.xs, minWidth: 0 },
  input: { ...type.body, minHeight: sizes.touch, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  multiline: { minHeight: 88, textAlignVertical: 'top' },
  errorInput: { borderColor: colors.danger },
  error: { ...type.caption, color: colors.danger },
});
