import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { DetailRow, SectionCard } from '@/components/common/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { StatusBadge } from '@/components/common/StatusBadge';
import { AppShell } from '@/components/layout/AppShell';
import { PatientAvatar } from '@/components/patient/PatientAvatar';
import { useAppState } from '@/state/AppState';
import { colors, sizes, spacing, type } from '@/theme';
import { formatDate, formatTime } from '@/utils/date';

export default function EncounterDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { encounters, getPatient, getProvider, getFacility } = useAppState();
  const { width } = useWindowDimensions();
  const encounter = encounters.find((item) => item.id === id);
  if (!encounter) return <AppShell title="Encounter not found" back><EmptyState title="Encounter not found" description="This encounter is not available." /></AppShell>;
  const patient = getPatient(encounter.patientId);
  const provider = getProvider(encounter.providerId);
  const facility = getFacility(encounter.facilityId);
  return (
    <AppShell title="Encounter details" subtitle={encounter.id} back>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.summary}>{patient ? <PatientAvatar patient={patient} size={52} /> : null}<View style={styles.summaryText}><Text style={type.sectionTitle}>{encounter.type}</Text><Text style={styles.patientName}>{patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown patient'}</Text><Text style={styles.meta}>{formatDate(encounter.date)} at {formatTime(encounter.time)} · {provider?.name}</Text></View><StatusBadge status={encounter.status} /></View>
        <View style={[styles.grid, width >= 1000 && styles.columns]}>
          <SectionCard title="Encounter overview" style={styles.card}><DetailRow label="Encounter ID" value={encounter.id} /><DetailRow label="Patient" value={patient ? `${patient.firstName} ${patient.lastName} · ${patient.pid}` : undefined} /><DetailRow label="Provider" value={provider?.name} /><DetailRow label="Facility" value={facility?.name} /><DetailRow label="Date and time" value={`${formatDate(encounter.date)} · ${formatTime(encounter.time)}`} /></SectionCard>
          <SectionCard title="Chief complaint" style={styles.card}><Text style={styles.clinical}>{encounter.chiefComplaint}</Text></SectionCard>
          <SectionCard title="Vitals summary" style={styles.card}><Text style={styles.clinical}>{encounter.vitals}</Text></SectionCard>
          <SectionCard title="Assessment" style={styles.card}><Text style={styles.clinical}>{encounter.assessment}</Text></SectionCard>
          <SectionCard title="Diagnoses" style={styles.card}>{encounter.diagnoses.map((diagnosis) => <Text key={diagnosis} style={styles.clinical}>• {diagnosis}</Text>)}</SectionCard>
          <SectionCard title="Plan" style={styles.card}><Text style={styles.clinical}>{encounter.plan}</Text></SectionCard>
          <SectionCard title="Clinical notes" style={[styles.card, styles.full]}><Text style={styles.clinical}>{encounter.notes}</Text></SectionCard>
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({ page: { width: '100%', maxWidth: sizes.contentMax, alignSelf: 'center', padding: spacing.lg, gap: spacing.base }, summary: { backgroundColor: colors.surface, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: spacing.md }, summaryText: { flex: 1, gap: 2 }, patientName: { ...type.bodyMedium, color: colors.primary }, meta: { ...type.caption, color: colors.textSecondary }, grid: { gap: spacing.base }, columns: { flexDirection: 'row', flexWrap: 'wrap' }, card: { flexGrow: 1, flexBasis: 390 }, full: { flexBasis: '100%' }, clinical: { ...type.body, color: colors.textSecondary } });
