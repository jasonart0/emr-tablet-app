import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/common/EmptyState';
import { SearchField } from '@/components/common/SearchField';
import { EncounterCard } from '@/components/encounter/EncounterCard';
import { PatientWorkspace } from '@/components/patient/PatientWorkspace';
import { useAppState } from '@/state/AppState';
import { spacing } from '@/theme';

export default function PatientEncountersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { encounters, getProvider, getFacility } = useAppState();
  const [query, setQuery] = useState('');
  const data = useMemo(() => encounters.filter((item) => item.patientId === id && [item.type, item.chiefComplaint, item.diagnosisSummary, item.status].join(' ').toLowerCase().includes(query.toLowerCase())).sort((a, b) => b.date.localeCompare(a.date)), [encounters, id, query]);
  return (
    <PatientWorkspace patientId={id} scroll={false}>
      <FlatList data={data} keyExtractor={(item) => item.id} renderItem={({ item }) => <EncounterCard encounter={item} provider={getProvider(item.providerId)} facility={getFacility(item.facilityId)} onPress={() => router.push({ pathname: '/encounters/[id]', params: { id: item.id } })} />} ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />} contentContainerStyle={[styles.list, !data.length && styles.empty]} ListHeaderComponent={<View style={styles.search}><SearchField value={query} onChangeText={setQuery} placeholder="Search encounters by type, reason or diagnosis…" /></View>} ListEmptyComponent={<EmptyState title="No encounters found" description="No encounters match the current patient and search." />} />
    </PatientWorkspace>
  );
}

const styles = StyleSheet.create({ list: { flexGrow: 1 }, empty: { justifyContent: 'center' }, search: { marginBottom: spacing.base } });
