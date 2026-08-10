import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppointmentCard } from '@/components/appointment/AppointmentCard';
import { AppointmentDetailModal } from '@/components/appointment/AppointmentDetailModal';
import { AppointmentFormModal } from '@/components/appointment/AppointmentFormModal';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { PatientWorkspace } from '@/components/patient/PatientWorkspace';
import { useAppState } from '@/state/AppState';
import { colors, radius, spacing, type } from '@/theme';
import { Appointment } from '@/types/models';
import { toDateKey } from '@/utils/date';

export default function PatientAppointmentsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { appointments, getPatient, getProvider, getFacility, setAppointmentStatus } = useAppState();
  const [segment, setSegment] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [selected, setSelected] = useState<Appointment>();
  const [editing, setEditing] = useState<Appointment>();
  const today = toDateKey(new Date());
  const data = useMemo(() => appointments.filter((item) => item.patientId === id && (segment === 'Upcoming' ? item.date >= today && item.status !== 'Cancelled' : item.date < today || item.status === 'Cancelled')).sort((a, b) => segment === 'Upcoming' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)), [appointments, id, segment, today]);
  return (
    <PatientWorkspace patientId={id} scroll={false}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View style={styles.item}><AppointmentCard appointment={item} patient={getPatient(item.patientId)} provider={getProvider(item.providerId)} facility={getFacility(item.facilityId)} onPress={() => setSelected(item)} /><View style={styles.actions}><Button label="View in scheduler" icon="calendar-arrow-right" variant="ghost" compact onPress={() => router.push({ pathname: '/scheduler', params: { date: item.date, appointmentId: item.id } })} />{segment === 'Upcoming' ? <><Button label="Reschedule" icon="calendar-edit" variant="secondary" compact onPress={() => setEditing(item)} /><Button label="Cancel" variant="danger" compact onPress={() => setAppointmentStatus(item.id, 'Cancelled')} /></> : item.encounterId ? <Button label="View encounter" icon="file-document-outline" variant="secondary" compact onPress={() => router.push({ pathname: '/encounters/[id]', params: { id: item.encounterId! } })} /> : null}</View></View>}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        contentContainerStyle={[styles.list, !data.length && styles.empty]}
        ListHeaderComponent={<View style={styles.segment}>{(['Upcoming', 'Past'] as const).map((item) => <Pressable key={item} accessibilityRole="tab" accessibilityState={{ selected: segment === item }} onPress={() => setSegment(item)} style={[styles.segmentButton, segment === item && styles.segmentActive]}><Text style={[styles.segmentText, segment === item && styles.segmentTextActive]}>{item}</Text></Pressable>)}</View>}
        ListEmptyComponent={<EmptyState title={`No ${segment.toLowerCase()} appointments`} description={`This patient has no ${segment.toLowerCase()} appointments to display.`} />}
      />
      <AppointmentDetailModal appointment={selected} visible={!!selected} onClose={() => setSelected(undefined)} />
      <AppointmentFormModal appointment={editing} visible={!!editing} onClose={() => setEditing(undefined)} />
    </PatientWorkspace>
  );
}

const styles = StyleSheet.create({ list: { flexGrow: 1 }, empty: { justifyContent: 'center' }, segment: { alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: colors.surfaceSecondary, padding: spacing.xs, borderRadius: radius.md, marginBottom: spacing.base }, segmentButton: { minWidth: 108, minHeight: 40, paddingHorizontal: spacing.base, alignItems: 'center', justifyContent: 'center', borderRadius: radius.sm }, segmentActive: { backgroundColor: colors.surface }, segmentText: { ...type.button, color: colors.textSecondary }, segmentTextActive: { color: colors.primary }, item: { gap: spacing.sm }, actions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', gap: spacing.sm } });
