import { Pressable, StyleSheet, Text, View } from 'react-native';

import { StatusBadge } from '@/components/common/StatusBadge';
import { colors, radius, spacing, type } from '@/theme';
import { Encounter, Facility, Provider } from '@/types/models';
import { formatDate, formatTime } from '@/utils/date';

export function EncounterCard({ encounter, provider, facility, onPress }: { encounter: Encounter; provider?: Provider; facility?: Facility; onPress(): void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Open ${encounter.type} encounter from ${formatDate(encounter.date)}`} onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.dateBox}><Text style={styles.month}>{formatDate(encounter.date, { month: 'short' }).toUpperCase()}</Text><Text style={styles.day}>{formatDate(encounter.date, { day: '2-digit' })}</Text><Text style={styles.time}>{formatTime(encounter.time)}</Text></View>
      <View style={styles.main}><View style={styles.top}><Text style={type.cardTitle}>{encounter.type}</Text><StatusBadge status={encounter.status} /></View><Text style={styles.reason}>{encounter.chiefComplaint}</Text><Text style={styles.meta}>{provider?.name} · {facility?.shortName}</Text><Text numberOfLines={2} style={styles.notes}>{encounter.diagnosisSummary}</Text></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({ card: { flexDirection: 'row', gap: spacing.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: radius.lg }, pressed: { opacity: 0.72 }, dateBox: { width: 64, minHeight: 72, backgroundColor: colors.primarySoft, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' }, month: { ...type.caption, color: colors.primary }, day: { ...type.sectionTitle, color: colors.primary }, time: { ...type.caption, fontSize: 10 }, main: { flex: 1, minWidth: 0, gap: 3 }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm }, reason: { ...type.bodyMedium }, meta: { ...type.caption, color: colors.textSecondary }, notes: { ...type.body, color: colors.textSecondary, fontSize: 13 } });
