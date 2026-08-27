import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppointmentDetailModal } from '@/components/appointment/AppointmentDetailModal';
import { AppointmentFormModal } from '@/components/appointment/AppointmentFormModal';
import { Button } from '@/components/common/Button';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';
import { AppShell } from '@/components/layout/AppShell';
import { CalendarPicker } from '@/components/scheduler/CalendarPicker';
import { DaySchedule } from '@/components/scheduler/DaySchedule';
import { SchedulerToolbar } from '@/components/scheduler/SchedulerToolbar';
import { WeekSchedule } from '@/components/scheduler/WeekSchedule';
import { useAppState } from '@/state/AppState';
import { colors } from '@/theme';
import { Appointment } from '@/types/models';
import { addDays, formatDate, toDateKey } from '@/utils/date';

export default function SchedulerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ date?: string; appointmentId?: string }>();
  const { appointments } = useAppState();
  const [date, setDate] = useState(params.date ?? toDateKey(new Date()));
  const [view, setView] = useState<'Day' | 'Week'>('Day');
  const [selected, setSelected] = useState<Appointment>();
  const [creating, setCreating] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [dateDraft, setDateDraft] = useState(date);
  useEffect(() => { if (params.date) setDate(params.date); }, [params.date]);
  useEffect(() => { if (params.appointmentId) { const found = appointments.find((item) => item.id === params.appointmentId); if (found) setSelected(found); } }, [appointments, params.appointmentId]);
  return (
    <AppShell title="Scheduler" subtitle={formatDate(date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}>
      <View style={styles.page}>
        <SchedulerToolbar view={view} onDateDelta={(delta) => setDate(addDays(date, delta))} onToday={() => setDate(toDateKey(new Date()))} onCalendar={() => { setDateDraft(date); setDateModal(true); }} onView={setView} onCreate={() => setCreating(true)} onPatients={() => router.push('/patients')} />
        <View style={styles.schedule}>{view === 'Day' ? <DaySchedule date={date} onAppointment={setSelected} /> : <WeekSchedule date={date} onAppointment={setSelected} />}</View>
      </View>
      <AppointmentDetailModal appointment={selected} visible={!!selected} onClose={() => setSelected(undefined)} />
      <AppointmentFormModal visible={creating} initialDate={date} onClose={() => setCreating(false)} onSaved={(appointment) => { setDate(appointment.date); setSelected(appointment); }} />
      <ResponsiveModal visible={dateModal} title="Choose date" subtitle={formatDate(dateDraft, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} onClose={() => setDateModal(false)} footer={<><Button label="Cancel" variant="ghost" onPress={() => setDateModal(false)} /><Button label="Today" variant="secondary" onPress={() => setDateDraft(toDateKey(new Date()))} /><Button label="Open date" onPress={() => { setDate(dateDraft); setDateModal(false); }} /></>}><CalendarPicker selected={dateDraft} onSelect={setDateDraft} /></ResponsiveModal>
    </AppShell>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.background }, schedule: { flex: 1 } });
