import { PropsWithChildren, ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, radius, shadows, spacing, type } from '@/theme';

export function DashboardPanel({ title, subtitle, action, style, children }: PropsWithChildren<{ title: string; subtitle?: string; action?: ReactNode; style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.panel, shadows.card, style]}><View style={styles.header}><View style={styles.titleGroup}><Text style={type.cardTitle}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>{action}</View><View style={styles.content}>{children}</View></View>;
}

const styles = StyleSheet.create({ panel: { alignSelf: 'stretch', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, overflow: 'hidden' }, header: { minHeight: 58, paddingHorizontal: spacing.base, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md }, titleGroup: { flex: 1, minWidth: 160 }, subtitle: { ...type.caption, color: colors.textSecondary }, content: { padding: spacing.base, gap: spacing.md } });
