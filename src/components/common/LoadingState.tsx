import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

export function LoadingState() {
  return <View accessibilityLabel="Loading content" style={styles.wrapper}>{[1, 2, 3].map((item) => <View key={item} style={styles.card}><View style={styles.avatar} /><View style={styles.lines}><View style={styles.title} /><View style={styles.line} /><View style={styles.shortLine} /></View></View>)}</View>;
}

const styles = StyleSheet.create({ wrapper: { padding: spacing.lg, gap: spacing.md }, card: { minHeight: 92, flexDirection: 'row', gap: spacing.md, padding: spacing.base, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface }, avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.border }, lines: { flex: 1, gap: spacing.sm }, title: { width: '45%', height: 14, borderRadius: radius.sm, backgroundColor: colors.border }, line: { width: '75%', height: 10, borderRadius: radius.sm, backgroundColor: colors.surfaceSecondary }, shortLine: { width: '55%', height: 10, borderRadius: radius.sm, backgroundColor: colors.surfaceSecondary } });
