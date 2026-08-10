import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { DetailRow, SectionCard } from '@/components/common/Card';
import { PatientWorkspace } from '@/components/patient/PatientWorkspace';
import { useAppState } from '@/state/AppState';
import { spacing } from '@/theme';
import { getAge } from '@/utils/date';

export default function PatientInfoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getPatient } = useAppState();
  const { width } = useWindowDimensions();
  const patient = getPatient(id);
  if (!patient) return <PatientWorkspace patientId={id} />;
  const cards = [
    { title: 'Personal information', rows: [['First name', patient.firstName], ['Last name', patient.lastName], ['Date of birth', patient.dob], ['Age', String(getAge(patient.dob))], ['Gender', patient.gender], ['Marital status', patient.maritalStatus], ['Preferred language', patient.preferredLanguage]] },
    { title: 'Contact information', rows: [['Mobile', patient.phone], ['Home phone', patient.homePhone], ['Email', patient.email]] },
    { title: 'Address', rows: [['Street', patient.address.street], ['City', patient.address.city], ['State', patient.address.state], ['ZIP', patient.address.zip]] },
    { title: 'Primary insurance', rows: [['Provider', patient.primaryInsurance.provider], ['Member ID', patient.primaryInsurance.memberId], ['Plan', patient.primaryInsurance.plan]] },
    { title: 'Secondary insurance', rows: [['Provider', patient.secondaryInsurance?.provider ?? 'None'], ['Member ID', patient.secondaryInsurance?.memberId ?? '—'], ['Plan', patient.secondaryInsurance?.plan ?? '—']] },
    { title: 'Emergency contact', rows: [['Name', patient.emergencyContact.name], ['Relationship', patient.emergencyContact.relationship], ['Phone', patient.emergencyContact.phone]] },
    { title: 'Patient identifiers', rows: [['PID', patient.pid], ['MRN', patient.mrn]] },
  ];
  return <PatientWorkspace patientId={id}><View style={[styles.grid, width >= 1000 && styles.twoColumns]}>{cards.map((card) => <SectionCard key={card.title} title={card.title} style={styles.card}>{card.rows.map(([label, value]) => <DetailRow key={label} label={label} value={value} />)}</SectionCard>)}</View></PatientWorkspace>;
}

const styles = StyleSheet.create({ grid: { gap: spacing.base }, twoColumns: { flexDirection: 'row', flexWrap: 'wrap' }, card: { flexGrow: 1, flexBasis: 390 } });
