import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, type } from '@/theme';

const tabs = [{ key: 'info', label: 'Patient Info' }, { key: 'encounters', label: 'Encounters' }, { key: 'appointments', label: 'Appointments' }] as const;

export function PatientTabs({ patientId }: { patientId: string }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <View style={styles.tabs}>{tabs.map((tab) => {
      const active = pathname.endsWith(`/${tab.key}`);
      return <Pressable key={tab.key} accessibilityRole="tab" accessibilityState={{ selected: active }} onPress={() => router.replace(`/patients/${patientId}/${tab.key}`)} style={({ pressed }) => [styles.tab, active && styles.active, pressed && styles.pressed]}><Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text></Pressable>;
    })}</View>
  );
}

const styles = StyleSheet.create({ tabs: { minHeight: 52, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border, paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm }, tab: { minHeight: 48, paddingHorizontal: spacing.base, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' }, active: { borderBottomColor: colors.primary }, label: { ...type.bodyMedium, color: colors.textSecondary }, activeLabel: { color: colors.primary }, pressed: { opacity: 0.7 } });
