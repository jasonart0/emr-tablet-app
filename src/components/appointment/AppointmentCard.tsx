import { Pressable, StyleSheet, Text, View } from 'react-native';

import { StatusBadge } from '@/components/common/StatusBadge';
import { PatientAvatar } from '@/components/patient/PatientAvatar';
import { colors, radius, spacing, type } from '@/theme';
import { Appointment, Facility, Patient, Provider } from '@/types/models';
import { formatDate, formatTime } from '@/utils/date';

export function AppointmentCard({ appointment, patient, provider, facility, onPress, compact = false }: { appointment: Appointment; patient?: Patient; provider?: Provider; facility?: Facility; onPress(): void; compact?: boolean }) {
  const accent = ['Completed', 'Confirmed'].includes(appointment.status)
    ? colors.success
    : ['Cancelled', 'No Show'].includes(appointment.status)
      ? colors.danger
      : appointment.status === 'Scheduled'
        ? colors.purple
        : colors.primary;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Open ${appointment.visitType} appointment`} onPress={onPress} style={({ pressed }) => [styles.card, { borderLeftColor: accent }, compact && styles.compact, pressed && styles.pressed]}>
      {patient ? <PatientAvatar patient={patient} size={compact ? 34 : 44} /> : null}
      <View style={styles.main}><View style={styles.top}><Text numberOfLines={1} style={styles.name}>{patient ? `${patient.firstName} ${patient.lastName}` : appointment.visitType}</Text><StatusBadge status={appointment.status} /></View><Text style={styles.time}>{formatDate(appointment.date, { month: 'short', day: 'numeric' })} · {formatTime(appointment.startTime)} · {appointment.duration} min</Text><Text numberOfLines={1} style={styles.meta}>{provider?.name} · {facility?.shortName}</Text><Text numberOfLines={1} style={styles.reason}>{appointment.visitType} · {appointment.reason}</Text></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({ card: { minHeight: 82, flexDirection: 'row', gap: spacing.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, borderLeftWidth: 4, backgroundColor: colors.surface, borderRadius: radius.lg }, compact: { minHeight: 56, padding: spacing.sm, gap: spacing.sm }, pressed: { opacity: 0.72 }, main: { flex: 1, minWidth: 0, gap: 2 }, top: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, justifyContent: 'space-between' }, name: { ...type.bodyMedium, flex: 1 }, time: { ...type.label, color: colors.primary }, meta: { ...type.caption, color: colors.textSecondary }, reason: { ...type.caption, color: colors.textSecondary } });
