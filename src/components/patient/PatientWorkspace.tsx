import { PropsWithChildren, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { AppShell } from '@/components/layout/AppShell';
import { PatientEditModal } from '@/components/patient/PatientEditModal';
import { PatientHeader } from '@/components/patient/PatientHeader';
import { PatientTabs } from '@/components/patient/PatientTabs';
import { useAppState } from '@/state/AppState';
import { sizes, spacing } from '@/theme';

export function PatientWorkspace({ patientId, children, scroll = true }: PropsWithChildren<{ patientId: string; scroll?: boolean }>) {
  const { getPatient } = useAppState();
  const [editing, setEditing] = useState(false);
  const patient = getPatient(patientId);
  if (!patient) return <AppShell title="Patient not found" back><EmptyState title="Patient not found" description="This patient record may no longer be available." /></AppShell>;
  const body = <View style={styles.content}>{children}</View>;
  return (
    <AppShell title="Patient details" subtitle={`${patient.firstName} ${patient.lastName}`} back actions={<Button label="Edit patient" icon="pencil-outline" variant="secondary" compact onPress={() => setEditing(true)} />}>
      <PatientHeader patient={patient} />
      <PatientTabs patientId={patient.id} />
      {scroll ? <ScrollView contentContainerStyle={styles.scroll}>{body}</ScrollView> : body}
      <PatientEditModal patient={patient} visible={editing} onClose={() => setEditing(false)} />
    </AppShell>
  );
}

const styles = StyleSheet.create({ scroll: { flexGrow: 1 }, content: { flex: 1, width: '100%', maxWidth: sizes.contentMax, alignSelf: 'center', padding: spacing.lg, gap: spacing.base } });
