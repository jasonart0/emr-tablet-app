import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { StatusBadge } from '@/components/common/StatusBadge';
import { useAppState } from '@/state/AppState';
import { colors, radius, spacing, type } from '@/theme';
import { Appointment } from '@/types/models';
import { addDays, buildTimeSlots, formatDate, formatTime, startOfWeek } from '@/utils/date';

const slots = buildTimeSlots();

export function WeekSchedule({ date, onAppointment }: { date: string; onAppointment(appointment: Appointment): void }) {
  const { width } = useWindowDimensions();
  const { appointments, getPatient } = useAppState();
  const start = startOfWeek(date);
  const days = Array.from({ length: 7 }, (_, index) => addDays(start, index));
  const available = Math.max(700, width - 180);
  const dayWidth = width >= 1200 ? Math.max(145, available / 7) : 170;
  return (
    <ScrollView contentContainerStyle={styles.vertical}>
      <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={styles.week}>
        <View style={styles.timeColumn}><View style={styles.corner} />{slots.map((slot) => <View key={slot} style={styles.weekSlot}><Text style={styles.time}>{formatTime(slot)}</Text></View>)}</View>
        {days.map((day) => <View key={day} style={{ width: dayWidth }}><View style={[styles.dayHeader, day === date && styles.selectedDay]}><Text style={styles.dayName}>{formatDate(day, { weekday: 'short' })}</Text><Text style={styles.dayNumber}>{formatDate(day, { month: 'short', day: 'numeric' })}</Text></View>{slots.map((slot) => { const items = appointments.filter((item) => item.date === day && item.startTime === slot && item.status !== 'Cancelled'); return <View key={slot} style={styles.weekSlot}>{items.map((item) => { const patient = getPatient(item.patientId); return <Pressable key={item.id} onPress={() => onAppointment(item)} style={({ pressed }) => [styles.appointment, pressed && styles.pressed]}><Text numberOfLines={1} style={styles.patient}>{patient ? `${patient.firstName} ${patient.lastName}` : item.visitType}</Text><StatusBadge status={item.status} /></Pressable>; })}</View>; })}</View>)}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ vertical: { paddingBottom: spacing.xl }, week: { padding: spacing.lg }, timeColumn: { width: 72 }, corner: { height: 52, borderBottomWidth: 1, borderBottomColor: colors.border }, dayHeader: { height: 52, padding: spacing.xs, borderBottomWidth: 1, borderBottomColor: colors.border, borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: colors.border, alignItems: 'center', justifyContent: 'center' }, selectedDay: { backgroundColor: colors.primarySoft }, dayName: { ...type.caption, color: colors.textSecondary }, dayNumber: { ...type.bodyMedium }, weekSlot: { height: 58, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border, borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: colors.border, padding: 2 }, time: { ...type.caption, color: colors.textSecondary, paddingTop: spacing.sm }, appointment: { flex: 1, minHeight: 52, borderRadius: radius.sm, backgroundColor: colors.primarySoft, borderLeftWidth: 3, borderLeftColor: colors.primary, padding: 4, gap: 2 }, pressed: { opacity: 0.7 }, patient: { ...type.caption, color: colors.textPrimary } });
