import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { FormField } from '@/components/common/FormField';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';
import { SearchField } from '@/components/common/SearchField';
import { PatientAvatar } from '@/components/patient/PatientAvatar';
import { filterPatients } from '@/services/patientService';
import { useAppState } from '@/state/AppState';
import { colors, radius, spacing, type } from '@/theme';
import { Appointment, AppointmentInput, AppointmentStatus } from '@/types/models';
import { toDateKey } from '@/utils/date';

const statusOptions: AppointmentStatus[] = ['Scheduled', 'Confirmed', 'Checked In', 'In Progress', 'Completed', 'Cancelled', 'No Show'];
const visitTypes = ['Office Visit', 'Follow-up', 'Annual Physical', 'Urgent Visit', 'Care Planning'];

function ChoiceField({ label, options, value, onChange }: { label: string; options: Array<{ label: string; value: string }>; value: string; onChange(value: string): void }) {
  return <View style={styles.choiceField}><Text style={type.label}>{label}</Text><View style={styles.choices}>{options.map((option) => <Pressable key={option.value} onPress={() => onChange(option.value)} style={[styles.choice, value === option.value && styles.choiceActive]}><Text style={[styles.choiceText, value === option.value && styles.choiceTextActive]}>{option.label}</Text></Pressable>)}</View></View>;
}

export function AppointmentFormModal({ visible, onClose, appointment, initialPatientId, initialDate, onSaved }: { visible: boolean; onClose(): void; appointment?: Appointment; initialPatientId?: string; initialDate?: string; onSaved?(appointment: Appointment): void }) {
  const { width } = useWindowDimensions();
  const { patients, providers, facilities, createAppointment, updateAppointment } = useAppState();
  const blank = (): AppointmentInput => ({ patientId: initialPatientId ?? '', providerId: providers[0].id, facilityId: facilities[0].id, date: initialDate ?? toDateKey(new Date()), startTime: '09:00', duration: 30, visitType: visitTypes[0], reason: '', status: 'Scheduled', notes: '' });
  const [form, setForm] = useState<AppointmentInput>(appointment ?? blank());
  const [patientSearch, setPatientSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { if (visible) { setForm(appointment ?? blank()); setPatientSearch(''); setSubmitted(false); } }, [appointment, visible]);
  const patientResults = useMemo(() => filterPatients(patients, patientSearch).slice(0, 6), [patientSearch, patients]);
  const selectedPatient = patients.find((patient) => patient.id === form.patientId);
  const set = <K extends keyof AppointmentInput>(key: K, value: AppointmentInput[K]) => setForm((current) => ({ ...current, [key]: value }));
  const invalid = !form.patientId || !form.date || !/^\d{2}:\d{2}$/.test(form.startTime) || !form.providerId || !form.facilityId || !form.visitType || !form.reason.trim();
  const save = () => {
    setSubmitted(true);
    if (invalid) return;
    let saved: Appointment;
    if (appointment) { saved = { ...appointment, ...form }; updateAppointment(appointment.id, form); } else saved = createAppointment(form);
    onSaved?.(saved); onClose();
  };
  const columns = width >= 900;
  return (
    <ResponsiveModal visible={visible} title={appointment ? 'Edit appointment' : 'New appointment'} subtitle={appointment ? 'Changes update the scheduler and patient history.' : 'Schedule an existing patient.'} onClose={onClose} wide footer={<><Button label="Cancel" variant="ghost" onPress={onClose} /><Button label={appointment ? 'Save changes' : 'Create appointment'} icon="calendar-check-outline" onPress={save} /></>}>
      <View style={styles.section}><Text style={type.cardTitle}>Patient</Text>{selectedPatient ? <View style={styles.selectedPatient}><PatientAvatar patient={selectedPatient} /><View style={styles.patientMain}><Text style={type.bodyMedium}>{selectedPatient.firstName} {selectedPatient.lastName}</Text><Text style={styles.meta}>{selectedPatient.pid} · {selectedPatient.dob}</Text></View><Button label="Change" variant="ghost" compact onPress={() => set('patientId', '')} /></View> : <><SearchField value={patientSearch} onChangeText={setPatientSearch} placeholder="Search existing patients…" /><View style={styles.results}>{patientResults.map((patient) => <Pressable key={patient.id} onPress={() => { set('patientId', patient.id); setPatientSearch(''); }} style={styles.patientResult}><PatientAvatar patient={patient} size={36} /><View><Text style={type.bodyMedium}>{patient.firstName} {patient.lastName}</Text><Text style={styles.meta}>{patient.pid} · {patient.phone}</Text></View></Pressable>)}</View></>}{submitted && !form.patientId ? <Text style={styles.error}>Select a patient.</Text> : null}</View>
      <View style={[styles.form, columns && styles.columns]}>
        <FormField label="Date" value={form.date} onChangeText={(value) => set('date', value)} placeholder="YYYY-MM-DD" error={submitted && !form.date ? 'Required' : undefined} containerStyle={styles.field} />
        <FormField label="Start time" value={form.startTime} onChangeText={(value) => set('startTime', value)} placeholder="HH:MM" error={submitted && !/^\d{2}:\d{2}$/.test(form.startTime) ? 'Use HH:MM' : undefined} containerStyle={styles.field} />
        <FormField label="Duration (minutes)" value={String(form.duration)} onChangeText={(value) => set('duration', Number(value) || 0)} keyboardType="number-pad" containerStyle={styles.field} />
        <ChoiceField label="Provider" options={providers.map((item) => ({ label: item.name, value: item.id }))} value={form.providerId} onChange={(value) => set('providerId', value)} />
        <ChoiceField label="Facility" options={facilities.map((item) => ({ label: item.shortName, value: item.id }))} value={form.facilityId} onChange={(value) => set('facilityId', value)} />
        <ChoiceField label="Visit type" options={visitTypes.map((item) => ({ label: item, value: item }))} value={form.visitType} onChange={(value) => set('visitType', value)} />
        <ChoiceField label="Status" options={statusOptions.map((item) => ({ label: item, value: item }))} value={form.status} onChange={(value) => set('status', value as AppointmentStatus)} />
        <FormField label="Reason" value={form.reason} onChangeText={(value) => set('reason', value)} error={submitted && !form.reason.trim() ? 'Reason is required' : undefined} containerStyle={styles.fullField} />
        <FormField label="Notes" value={form.notes} onChangeText={(value) => set('notes', value)} multiline containerStyle={styles.fullField} />
      </View>
    </ResponsiveModal>
  );
}

const styles = StyleSheet.create({ section: { gap: spacing.md }, selectedPatient: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderRadius: radius.md, backgroundColor: colors.primarySoft, gap: spacing.md }, patientMain: { flex: 1 }, meta: { ...type.caption, color: colors.textSecondary }, results: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, overflow: 'hidden' }, patientResult: { minHeight: 54, flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }, error: { ...type.caption, color: colors.danger }, form: { gap: spacing.base }, columns: { flexDirection: 'row', flexWrap: 'wrap' }, field: { flexGrow: 1, flexBasis: 190 }, fullField: { flexBasis: '100%' }, choiceField: { gap: spacing.sm, flexBasis: '100%' }, choices: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, choice: { minHeight: 40, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' }, choiceActive: { backgroundColor: colors.primarySoft, borderColor: colors.primaryLight }, choiceText: { ...type.label, color: colors.textSecondary }, choiceTextActive: { color: colors.primary } });
