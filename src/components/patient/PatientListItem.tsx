import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { StatusBadge } from '@/components/common/StatusBadge';
import { PatientAvatar } from '@/components/patient/PatientAvatar';
import { colors, radius, spacing, type } from '@/theme';
import { Patient } from '@/types/models';
import { formatDate } from '@/utils/date';

export function PatientListItem({ patient, wide }: { patient: Patient; wide: boolean }) {
  const router = useRouter();
  const open = () => router.push({ pathname: '/patients/[id]/info', params: { id: patient.id } });
  if (!wide) return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Open ${patient.firstName} ${patient.lastName}`} onPress={open} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <PatientAvatar patient={patient} size={48} />
      <View style={styles.cardMain}><Text style={type.cardTitle}>{patient.firstName} {patient.lastName}</Text><Text style={styles.muted}>{patient.pid} · DOB {formatDate(patient.dob)}</Text><Text style={styles.muted}>{patient.phone}</Text><Text numberOfLines={1} style={styles.address}>{patient.gender} · {patient.address.street}, {patient.address.city}</Text></View>
      <StatusBadge status={patient.status} />
    </Pressable>
  );
  const cells = [`${formatDate(patient.dob)}`, patient.pid, patient.phone, patient.gender, `${patient.address.city}, ${patient.address.state}`];
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Open ${patient.firstName} ${patient.lastName}`} onPress={open} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={[styles.identity, styles.patientCell]}><PatientAvatar patient={patient} /><View><Text style={type.bodyMedium}>{patient.firstName} {patient.lastName}</Text><Text style={styles.muted}>{patient.mrn}</Text></View></View>
      {cells.map((value, index) => <Text key={index} numberOfLines={1} style={[styles.cell, index === 4 && styles.addressCell]}>{value}</Text>)}
      <View style={styles.statusCell}><StatusBadge status={patient.status} /></View>
    </Pressable>
  );
}

export const patientColumnStyles = StyleSheet.create({ header: { flexDirection: 'row', paddingHorizontal: spacing.base, paddingVertical: spacing.md, backgroundColor: colors.surfaceSecondary, borderBottomWidth: 1, borderBottomColor: colors.border }, patient: { flex: 2, minWidth: 190 }, cell: { flex: 1, minWidth: 100 }, address: { flex: 1.2 }, status: { width: 116 } });

const styles = StyleSheet.create({
  pressed: { opacity: 0.72 }, card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.base, flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md }, cardMain: { flex: 1, minWidth: 0, gap: 3 }, muted: { ...type.caption, color: colors.textSecondary }, address: { ...type.caption, color: colors.textMuted, marginTop: spacing.xs },
  row: { minHeight: 62, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.base, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface }, identity: { flexDirection: 'row', alignItems: 'center', gap: spacing.md }, patientCell: { flex: 2, minWidth: 190 }, cell: { ...type.body, flex: 1, minWidth: 100, paddingRight: spacing.sm }, addressCell: { flex: 1.2 }, statusCell: { width: 116 },
});
