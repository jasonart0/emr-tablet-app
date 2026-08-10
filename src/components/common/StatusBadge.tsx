import { StyleSheet, Text, View } from 'react-native';

import { AppointmentStatus, EncounterStatus, PatientStatus } from '@/types/models';
import { colors, radius, spacing, type } from '@/theme';

type Status = AppointmentStatus | EncounterStatus | PatientStatus;

function palette(status: Status) {
  if (['Active', 'Completed', 'Confirmed'].includes(status)) return { bg: colors.successSoft, fg: colors.success, dot: colors.success };
  if (['Cancelled', 'No Show'].includes(status)) return { bg: colors.dangerSoft, fg: colors.danger, dot: colors.danger };
  if (['Checked In', 'In Progress', 'Open'].includes(status)) return { bg: colors.infoSoft, fg: colors.info, dot: colors.info };
  if (['Inactive', 'Discharged'].includes(status)) return { bg: colors.surfaceSecondary, fg: colors.textSecondary, dot: colors.textMuted };
  if (status === 'Scheduled') return { bg: colors.purpleSoft, fg: colors.purple, dot: colors.purple };
  return { bg: colors.warningSoft, fg: colors.warning, dot: colors.warning };
}

export function StatusBadge({ status }: { status: Status }) {
  const value = palette(status);
  return (
    <View accessibilityLabel={`Status: ${status}`} style={[styles.badge, { backgroundColor: value.bg }]}>
      <View style={[styles.dot, { backgroundColor: value.dot }]} />
      <Text style={[type.caption, { color: value.fg }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ badge: { alignSelf: 'flex-start', minHeight: 26, paddingHorizontal: spacing.sm, borderRadius: radius.pill, flexDirection: 'row', gap: 6, alignItems: 'center' }, dot: { width: 6, height: 6, borderRadius: 3 } });
