import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { colors, radius, spacing, type } from '@/theme';

export function ErrorState({ message, onRetry }: { message: string; onRetry(): void }) {
  return <View accessibilityRole="alert" style={styles.wrapper}><View style={styles.icon}><MaterialCommunityIcons name="alert-circle-outline" size={28} color={colors.danger} /></View><Text style={type.cardTitle}>Unable to load this view</Text><Text style={styles.message}>{message}</Text><Button label="Try again" icon="refresh" variant="secondary" onPress={onRetry} /></View>;
}

const styles = StyleSheet.create({ wrapper: { alignItems: 'center', justifyContent: 'center', gap: spacing.sm, padding: spacing.xxxl }, icon: { width: 52, height: 52, borderRadius: radius.lg, backgroundColor: colors.dangerSoft, alignItems: 'center', justifyContent: 'center' }, message: { ...type.body, color: colors.textSecondary, textAlign: 'center' } });
