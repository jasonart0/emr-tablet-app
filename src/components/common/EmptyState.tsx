import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { colors, radius, spacing, type } from '@/theme';

export function EmptyState({ title, description, actionLabel, onAction }: { title: string; description: string; actionLabel?: string; onAction?(): void }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.icon}><MaterialCommunityIcons name="clipboard-text-outline" size={28} color={colors.primary} /></View>
      <Text style={type.cardTitle}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} variant="secondary" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({ wrapper: { alignItems: 'center', justifyContent: 'center', padding: spacing.xxxl, gap: spacing.sm }, icon: { width: 52, height: 52, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft }, description: { ...type.body, color: colors.textSecondary, textAlign: 'center', maxWidth: 380 } });
