import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { FormField } from '@/components/common/FormField';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';
import { useAppState } from '@/state/AppState';
import { spacing } from '@/theme';
import { Patient } from '@/types/models';

export function PatientEditModal({ patient, visible, onClose }: { patient: Patient; visible: boolean; onClose(): void }) {
  const { width } = useWindowDimensions();
  const { updatePatient } = useAppState();
  const [form, setForm] = useState(patient);
  useEffect(() => setForm(patient), [patient, visible]);
  const set = (key: keyof Patient, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const save = () => { updatePatient(patient.id, form); onClose(); };
  const columns = width >= 900;
  return (
    <ResponsiveModal visible={visible} title="Edit patient" subtitle={`${patient.firstName} ${patient.lastName}`} onClose={onClose} wide footer={<><Button label="Cancel" variant="ghost" onPress={onClose} /><Button label="Save changes" icon="content-save-outline" onPress={save} /></>}>
      <View style={[styles.form, columns && styles.columns]}>
        <FormField label="First name" value={form.firstName} onChangeText={(value) => set('firstName', value)} containerStyle={styles.field} />
        <FormField label="Last name" value={form.lastName} onChangeText={(value) => set('lastName', value)} containerStyle={styles.field} />
        <FormField label="Date of birth" value={form.dob} onChangeText={(value) => set('dob', value)} placeholder="YYYY-MM-DD" containerStyle={styles.field} />
        <FormField label="Gender" value={form.gender} onChangeText={(value) => set('gender', value)} containerStyle={styles.field} />
        <FormField label="Mobile phone" value={form.phone} onChangeText={(value) => set('phone', value)} keyboardType="phone-pad" containerStyle={styles.field} />
        <FormField label="Home phone" value={form.homePhone} onChangeText={(value) => set('homePhone', value)} keyboardType="phone-pad" containerStyle={styles.field} />
        <FormField label="Email" value={form.email} onChangeText={(value) => set('email', value)} keyboardType="email-address" autoCapitalize="none" containerStyle={styles.field} />
        <FormField label="Preferred language" value={form.preferredLanguage} onChangeText={(value) => set('preferredLanguage', value)} containerStyle={styles.field} />
        <FormField label="Street" value={form.address.street} onChangeText={(value) => setForm((current) => ({ ...current, address: { ...current.address, street: value } }))} containerStyle={styles.field} />
        <FormField label="City" value={form.address.city} onChangeText={(value) => setForm((current) => ({ ...current, address: { ...current.address, city: value } }))} containerStyle={styles.field} />
        <FormField label="State" value={form.address.state} onChangeText={(value) => setForm((current) => ({ ...current, address: { ...current.address, state: value } }))} containerStyle={styles.field} />
        <FormField label="ZIP" value={form.address.zip} onChangeText={(value) => setForm((current) => ({ ...current, address: { ...current.address, zip: value } }))} containerStyle={styles.field} />
        <FormField label="Primary insurance" value={form.primaryInsurance.provider} onChangeText={(value) => setForm((current) => ({ ...current, primaryInsurance: { ...current.primaryInsurance, provider: value } }))} containerStyle={styles.field} />
        <FormField label="Member ID" value={form.primaryInsurance.memberId} onChangeText={(value) => setForm((current) => ({ ...current, primaryInsurance: { ...current.primaryInsurance, memberId: value } }))} containerStyle={styles.field} />
        <FormField label="Emergency contact" value={form.emergencyContact.name} onChangeText={(value) => setForm((current) => ({ ...current, emergencyContact: { ...current.emergencyContact, name: value } }))} containerStyle={styles.field} />
        <FormField label="Emergency phone" value={form.emergencyContact.phone} onChangeText={(value) => setForm((current) => ({ ...current, emergencyContact: { ...current.emergencyContact, phone: value } }))} containerStyle={styles.field} />
      </View>
    </ResponsiveModal>
  );
}

const styles = StyleSheet.create({ form: { gap: spacing.base }, columns: { flexDirection: 'row', flexWrap: 'wrap' }, field: { flexGrow: 1, flexBasis: 260 } });
