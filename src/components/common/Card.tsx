import { PropsWithChildren, ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, radius, shadows, spacing, type } from '@/theme';

export function BaseCard({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.card, shadows.card, style]}>{children}</View>;
}

export function SectionCard({ title, action, children, style }: PropsWithChildren<{ title: string; action?: ReactNode; style?: StyleProp<ViewStyle> }>) {
  return (
    <BaseCard style={style}>
      <View style={styles.header}><Text style={type.cardTitle}>{title}</Text>{action}</View>
      {children}
    </BaseCard>
  );
}

export function DetailRow({ label, value }: { label: string; value?: string }) {
  return <View style={styles.row}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value || '—'}</Text></View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.base, gap: spacing.md },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  row: { paddingVertical: spacing.sm, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border, gap: 3 },
  label: { ...type.caption, color: colors.textSecondary },
  value: { ...type.body, color: colors.textPrimary },
});
