import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, shadows, spacing, type } from '@/theme';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export function DashboardMetric({ label, value, detail, icon, color }: { label: string; value: string | number; detail: string; icon: IconName; color: string }) {
  return <View style={[styles.card, shadows.card]}><View style={[styles.icon, { backgroundColor: `${color}22`, borderColor: `${color}66` }]}><MaterialCommunityIcons name={icon} size={22} color={color} /></View><View style={styles.text}><Text style={styles.value}>{value}</Text><Text style={styles.label}>{label}</Text><Text style={[styles.detail, { color }]}>{detail}</Text></View></View>;
}

const styles = StyleSheet.create({ card: { minWidth: 180, flexGrow: 1, flexBasis: 200, alignSelf: 'stretch', minHeight: 112, padding: spacing.base, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', gap: spacing.md }, icon: { width: 46, height: 46, borderRadius: 23, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }, text: { flex: 1, gap: 1 }, value: { ...type.screenTitle, fontSize: 22 }, label: { ...type.bodyMedium, color: colors.textPrimary }, detail: { ...type.caption } });
