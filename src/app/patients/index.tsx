import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';
import { AppShell } from '@/components/layout/AppShell';
import { PatientListItem, patientColumnStyles } from '@/components/patient/PatientListItem';
import { filterPatients } from '@/services/patientService';
import { useAppState } from '@/state/AppState';
import { colors, radius, sizes, spacing, type } from '@/theme';
import { Gender, PatientStatus } from '@/types/models';

const statuses: Array<'All' | PatientStatus> = ['All', 'Active', 'Inactive', 'Discharged'];
const genders: Array<'All' | Gender> = ['All', 'Female', 'Male', 'Non-binary'];

function FilterChips<T extends string>({ label, options, value, onChange }: { label: string; options: T[]; value: T; onChange(value: T): void }) {
  return <View style={styles.filterGroup}><Text style={type.label}>{label}</Text><View style={styles.chips}>{options.map((option) => <Pressable key={option} onPress={() => onChange(option)} style={[styles.chip, value === option && styles.chipActive]}><Text style={[styles.chipText, value === option && styles.chipTextActive]}>{option}</Text></Pressable>)}</View></View>;
}

export default function PatientsScreen() {
  const params = useLocalSearchParams<{ query?: string }>();
  const { patients } = useAppState();
  const { width } = useWindowDimensions();
  const wide = width >= 1050;
  const [query, setQuery] = useState(params.query ?? '');
  const [status, setStatus] = useState<(typeof statuses)[number]>('All');
  const [gender, setGender] = useState<(typeof genders)[number]>('All');
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => { if (typeof params.query === 'string') setQuery(params.query); }, [params.query]);
  const filtered = useMemo(() => filterPatients(patients, query).filter((patient) => (status === 'All' || patient.status === status) && (gender === 'All' || patient.gender === gender)), [gender, patients, query, status]);
  const filters = <><FilterChips<(typeof statuses)[number]> label="Status" options={statuses} value={status} onChange={setStatus} /><FilterChips<(typeof genders)[number]> label="Gender" options={genders} value={gender} onChange={setGender} /></>;
  return (
    <AppShell title="Patients" subtitle={`${filtered.length} patient${filtered.length === 1 ? '' : 's'}`}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PatientListItem patient={item} wide={wide} />}
        ItemSeparatorComponent={() => wide ? null : <View style={{ height: spacing.md }} />}
        contentContainerStyle={[styles.list, !filtered.length && styles.emptyList]}
        ListHeaderComponent={<View style={styles.header}>{width < 900 ? <View style={styles.filterActions}><Button label="Filters" icon="filter-variant" variant="secondary" onPress={() => setFiltersOpen(true)} /></View> : null}{width >= 900 ? <View style={styles.inlineFilters}>{filters}</View> : null}{wide ? <View style={patientColumnStyles.header}><Text style={[styles.columnLabel, patientColumnStyles.patient]}>Patient</Text>{['DOB', 'PID', 'Phone', 'Gender'].map((item) => <Text key={item} style={[styles.columnLabel, patientColumnStyles.cell]}>{item}</Text>)}<Text style={[styles.columnLabel, patientColumnStyles.address]}>Address</Text><Text style={[styles.columnLabel, patientColumnStyles.status]}>Status</Text></View> : null}</View>}
        ListEmptyComponent={<EmptyState title="No patients found" description="Try clearing the search or adjusting the selected filters." actionLabel="Clear filters" onAction={() => { setQuery(''); setStatus('All'); setGender('All'); }} />}
      />
      <ResponsiveModal visible={filtersOpen} title="Patient filters" onClose={() => setFiltersOpen(false)} footer={<Button label="Apply filters" onPress={() => setFiltersOpen(false)} />}>{filters}</ResponsiveModal>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  list: { width: '100%', maxWidth: sizes.contentMax, alignSelf: 'center', padding: spacing.lg }, emptyList: { flexGrow: 1 }, header: { gap: spacing.base }, filterActions: { flexDirection: 'row', justifyContent: 'flex-end' }, inlineFilters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xl, marginBottom: spacing.sm }, filterGroup: { gap: spacing.sm }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, chip: { minHeight: 36, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface }, chipActive: { backgroundColor: colors.primarySoft, borderColor: colors.primaryLight }, chipText: { ...type.label, color: colors.textSecondary }, chipTextActive: { color: colors.primary }, columnLabel: { ...type.label, paddingRight: spacing.sm },
});
