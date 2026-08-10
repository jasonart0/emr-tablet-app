import { StyleSheet, Text, View } from 'react-native';

import { Patient } from '@/types/models';
import { colors, type } from '@/theme';

export function PatientAvatar({ patient, size = 44 }: { patient: Patient; size?: number }) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[type.bodyMedium, { color: colors.primary, fontSize: Math.max(12, size * 0.32) }]}>{patient.firstName[0]}{patient.lastName[0]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ avatar: { backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' } });
