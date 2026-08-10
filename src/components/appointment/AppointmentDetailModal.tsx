import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppointmentFormModal } from '@/components/appointment/AppointmentFormModal';
import { Button } from '@/components/common/Button';
import { DetailRow } from '@/components/common/Card';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PatientAvatar } from '@/components/patient/PatientAvatar';
import { useAppState } from '@/state/AppState';
import { colors, radius, spacing, type } from '@/theme';
import { Appointment } from '@/types/models';
import { formatDate, formatTime } from '@/utils/date';

export function AppointmentDetailModal({ appointment, visible, onClose }: { appointment?: Appointment; visible: boolean; onClose(): void }) {
  const router = useRouter();
  const { getPatient, getProvider, getFacility, setAppointmentStatus, appointments } = useAppState();
  const [editing, setEditing] = useState(false);
  const current = appointment ? appointments.find((item) => item.id === appointment.id) ?? appointment : undefined;
  if (!current) return null;
  const patient = getPatient(current.patientId); const provider = getProvider(current.providerId); const facility = getFacility(current.facilityId);
  return <><ResponsiveModal visible={visible && !editing} title="Appointment details" subtitle={`${formatDate(current.date)} · ${formatTime(current.startTime)}`} onClose={onClose} footer={<><Button label="Cancel appointment" variant="danger" onPress={() => setAppointmentStatus(current.id, 'Cancelled')} /><Button label="Edit" variant="secondary" icon="pencil-outline" onPress={() => setEditing(true)} /><Button label="Check in" icon="account-check-outline" disabled={['Checked In', 'Completed', 'Cancelled'].includes(current.status)} onPress={() => setAppointmentStatus(current.id, 'Checked In')} /></>}>
    {patient ? <View style={styles.patient}><PatientAvatar patient={patient} size={52} /><View style={styles.patientMain}><Text style={type.sectionTitle}>{patient.firstName} {patient.lastName}</Text><Text style={styles.meta}>{patient.pid} · DOB {formatDate(patient.dob)}</Text></View><StatusBadge status={current.status} /></View> : null}
    <View style={styles.details}><DetailRow label="Date and time" value={`${formatDate(current.date)} at ${formatTime(current.startTime)} · ${current.duration} minutes`} /><DetailRow label="Provider" value={provider?.name} /><DetailRow label="Facility" value={facility?.name} /><DetailRow label="Visit type" value={current.visitType} /><DetailRow label="Reason" value={current.reason} /><DetailRow label="Notes" value={current.notes} /></View>
    {patient ? <Button label="Open patient" icon="account-arrow-right-outline" variant="secondary" onPress={() => { onClose(); router.push({ pathname: '/patients/[id]/info', params: { id: patient.id } }); }} /> : null}
  </ResponsiveModal><AppointmentFormModal visible={editing} appointment={current} onClose={() => setEditing(false)} /></>;
}

const styles = StyleSheet.create({ patient: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.base, backgroundColor: colors.primarySoft, borderRadius: radius.lg }, patientMain: { flex: 1 }, meta: { ...type.caption, color: colors.textSecondary }, details: { gap: spacing.xs } });
