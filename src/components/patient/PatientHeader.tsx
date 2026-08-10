import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { PatientAvatar } from '@/components/patient/PatientAvatar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { colors, spacing, type } from '@/theme';
import { Patient } from '@/types/models';
import { formatDate, getAge } from '@/utils/date';

export function PatientHeader({ patient }: { patient: Patient }) {
  const { width } = useWindowDimensions();
  const compact = width < 850;
  const facts = [
    ['PID', patient.pid], ['MRN', patient.mrn], ['DOB', `${formatDate(patient.dob)} (${getAge(patient.dob)})`],
    ['Gender', patient.gender], ['Phone', patient.phone], ['Insurance', patient.primaryInsurance.provider],
  ];
  return (
    <View style={[styles.header, compact && styles.compact]}>
      <View style={styles.identity}><PatientAvatar patient={patient} size={58} /><View style={styles.nameGroup}><View style={styles.nameRow}><Text style={styles.name}>{patient.firstName} {patient.lastName}</Text><StatusBadge status={patient.status} /></View><Text style={styles.address}>{patient.address.street}, {patient.address.city}, {patient.address.state}</Text></View></View>
      <View style={styles.facts}>{facts.map(([label, value]) => <View key={label} style={styles.fact}><Text style={styles.factLabel}>{label}</Text><Text numberOfLines={1} style={styles.factValue}>{value}</Text></View>)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, gap: spacing.lg }, compact: { paddingHorizontal: spacing.lg },
  identity: { flexDirection: 'row', alignItems: 'center', gap: spacing.md }, nameGroup: { flex: 1, gap: spacing.xs }, nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm }, name: { ...type.sectionTitle, fontSize: 21 }, address: { ...type.caption, color: colors.textSecondary },
  facts: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.base }, fact: { minWidth: 110, maxWidth: 220, flexGrow: 1, gap: 2 }, factLabel: { ...type.caption }, factValue: { ...type.bodyMedium, fontSize: 13 },
});
