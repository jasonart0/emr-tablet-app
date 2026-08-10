import { FlatList, StyleSheet, Text, View } from 'react-native';

import { AppointmentCard } from '@/components/appointment/AppointmentCard';
import { EmptyState } from '@/components/common/EmptyState';
import { useAppState } from '@/state/AppState';
import { colors, spacing, type } from '@/theme';
import { Appointment } from '@/types/models';
import { buildTimeSlots, formatTime } from '@/utils/date';

const slots = buildTimeSlots();

export function DaySchedule({ date, onAppointment }: { date: string; onAppointment(appointment: Appointment): void }) {
  const { appointments, getPatient, getProvider, getFacility } = useAppState();
  const daily = appointments.filter((item) => item.date === date && item.status !== 'Cancelled');
  return (
    <FlatList data={slots} keyExtractor={(item) => item} contentContainerStyle={styles.list} renderItem={({ item }) => {
      const items = daily.filter((appointment) => appointment.startTime === item);
      return <View style={styles.slot}><View style={styles.timeRail}><Text style={styles.time}>{formatTime(item)}</Text></View><View style={styles.slotContent}>{items.map((appointment) => <AppointmentCard key={appointment.id} compact appointment={appointment} patient={getPatient(appointment.patientId)} provider={getProvider(appointment.providerId)} facility={getFacility(appointment.facilityId)} onPress={() => onAppointment(appointment)} />)}</View></View>;
    }} ListFooterComponent={!daily.length ? <EmptyState title="No appointments scheduled" description="This day is open. Create an appointment to add it to the timeline." /> : null} />
  );
}

const styles = StyleSheet.create({ list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }, slot: { minHeight: 68, flexDirection: 'row' }, timeRail: { width: 74, borderRightWidth: 1, borderRightColor: colors.border, paddingTop: spacing.sm }, time: { ...type.caption, color: colors.textSecondary }, slotContent: { flex: 1, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border, padding: spacing.xs, gap: spacing.xs } });
