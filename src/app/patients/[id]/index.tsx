import { Redirect, useLocalSearchParams } from 'expo-router';

export default function PatientIndex() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Redirect href={{ pathname: '/patients/[id]/info', params: { id } }} />;
}
