import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { PatientAvatar } from '@/components/patient/PatientAvatar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { colors, spacing, type } from '@/theme';
import { Patient } from '@/types/models';
import { formatDate, getAge } from '@/utils/date';

export function PatientHeader({ patient }: { patient: Patient }) {
  const { width } = useWindowDimensions();
  const compact = width < 768;
  const facts = [
    ['PID', patient.pid], ['MRN', patient.mrn], ['DOB', `${formatDate(patient.dob)} (${getAge(patient.dob)})`],
    ['Gender', patient.gender], ['Phone', patient.phone], ['Insurance', patient.primaryInsurance.provider],
  ];
  return (
    <View style={[styles.header, compact && styles.compact]}>
      <View style={styles.identity}><PatientAvatar patient={patient} size={58} /><View style={styles.nameGroup}><View style={styles.nameRow}><Text style={styles.name}>{patient.firstName} {patient.lastName}</Text><StatusBadge status={patient.status} /></View><Text style={styles.address}>{patient.address.street}, {patient.address.city}, {patient.address.state}</Text></View></View>
      <View style={[styles.facts, compact && styles.compactFacts]}>{facts.map(([label, value]) => <View key={label} style={styles.fact}><Text style={styles.factLabel}>{label}</Text><Text numberOfLines={1} style={styles.factValue}>{value}</Text></View>)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.xxl },
  compact: { alignItems: 'stretch', flexDirection: 'column', gap: spacing.lg },
  identity: { flexDirection: 'row', alignItems: 'center', flexBasis: 310, flexShrink: 0, gap: spacing.md }, nameGroup: { flex: 1, gap: spacing.xs }, nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm }, name: { ...type.sectionTitle, fontSize: 21 }, address: { ...type.caption, color: colors.textSecondary },
  facts: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.base },
  compactFacts: { justifyContent: 'flex-start' },
  fact: { minWidth: 105, maxWidth: 190, flexBasis: 120, gap: 2 }, factLabel: { ...type.caption }, factValue: { ...type.bodyMedium, fontSize: 13 },
});
