import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { type Href, usePathname, useRouter } from 'expo-router';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton } from '@/components/common/IconButton';
import { colors, radius, sizes, spacing, type } from '@/theme';

const navItems = [
  { label: 'Dashboard', icon: 'view-dashboard-outline' as const, href: '/dashboard' as const },
  { label: 'Scheduler', icon: 'calendar-month-outline' as const, href: '/scheduler' as const },
  { label: 'Patients', icon: 'account-group-outline' as const, href: '/patients' as const },
];

export function AppShell({ title, subtitle, back, actions, children }: PropsWithChildren<{ title: string; subtitle?: string; back?: boolean; actions?: ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const [patientSearch, setPatientSearch] = useState('');
  const openPatientSearch = () => {
    const query = patientSearch.trim();
    router.push({ pathname: '/patients', params: query ? { query } : {} } as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.shell}>
        <View style={styles.rail}>
          <View style={styles.brand}>
            <Image source={require('../../../assets/images/sidebar-logo.png')} resizeMode="contain" style={styles.brandLogo} />
          </View>
          <View style={styles.navigation}>
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Pressable key={item.href} accessibilityRole="button" accessibilityLabel={item.label} accessibilityState={{ selected: active }} onPress={() => router.push(item.href as Href)} style={({ pressed }) => [styles.navItem, active && styles.navActive, pressed && styles.pressed]}>
                  <MaterialCommunityIcons name={item.icon} size={22} color={active ? colors.white : colors.textSecondary} />
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.workspace}>
          <View style={styles.topBar}>
            {back ? <IconButton name="arrow-left" label="Go back" onPress={() => router.back()} /> : null}
            <View style={styles.titleGroup}><Text numberOfLines={1} style={styles.title}>{title}</Text>{subtitle ? <Text numberOfLines={1} style={styles.subtitle}>{subtitle}</Text> : null}</View>
            <View style={styles.actions}>{actions}</View>
            <View style={styles.headerTools}>
              <IconButton name="clock-outline" label="Open scheduler" onPress={() => router.push('/scheduler')} style={styles.headerIcon} />
              <View style={styles.headerSearch}>
                <TextInput accessibilityLabel="Search Patient" value={patientSearch} onChangeText={setPatientSearch} onSubmitEditing={openPatientSearch} placeholder="Search Patient" placeholderTextColor={colors.textMuted} returnKeyType="search" style={styles.headerSearchInput} />
                <Pressable accessibilityRole="button" accessibilityLabel="Search patients" onPress={openPatientSearch} style={({ pressed }) => [styles.searchAction, pressed && styles.pressed]}><MaterialCommunityIcons name="magnify" size={23} color={colors.primary} /></Pressable>
              </View>
              <IconButton name="microphone-outline" label="Voice input" onPress={() => {}} style={styles.headerIcon} />
              <IconButton name="note-text-outline" label="Clinical notes" onPress={() => {}} style={styles.headerIcon} />
              <IconButton name="email-outline" label="Messages" onPress={() => {}} style={styles.headerIcon} />
              <IconButton name="bell-outline" label="Notifications" onPress={() => {}} style={styles.headerIcon} />
              <View accessibilityLabel="Clinical Admin, active session" style={styles.userTile}>
                <View style={styles.profile}><Text style={styles.profileText}>CM</Text></View>
                <View style={styles.userText}>
                  <Text numberOfLines={1} style={styles.userName}>Clinical Admin</Text>
                  <Text numberOfLines={1} style={styles.userStatus}>● Active session</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface }, shell: { flex: 1, flexDirection: 'row', backgroundColor: colors.background },
  rail: { width: sizes.railCompact, backgroundColor: colors.surface, borderRightWidth: 1, borderRightColor: colors.border, padding: spacing.md, gap: spacing.base },
  brand: { height: 44, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  brandLogo: { width: 38, height: 38 }, navigation: { flex: 1, gap: spacing.sm },
  navItem: { width: 40, height: 44, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  navActive: { backgroundColor: colors.primary }, pressed: { opacity: 0.7 },
  workspace: { flex: 1, minWidth: 0 }, topBar: { minHeight: sizes.topBar, paddingHorizontal: spacing.lg, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  titleGroup: { flex: 1, minWidth: 90 }, title: { ...type.sectionTitle, fontSize: 18 }, subtitle: { ...type.caption, color: colors.textSecondary }, actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerTools: { flexShrink: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.xs }, headerIcon: { width: 40, height: 40 },
  headerSearch: { minWidth: 160, maxWidth: 360, flex: 1, height: 40, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radius.md, backgroundColor: colors.surfaceSecondary, overflow: 'hidden' },
  headerSearchInput: { ...type.body, flex: 1, minWidth: 80, height: '100%', paddingHorizontal: spacing.md, paddingVertical: 0 }, searchAction: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: colors.border },
  userTile: { minHeight: 44, maxWidth: 190, paddingHorizontal: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, borderRadius: radius.md, backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border },
  profile: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' }, profileText: { ...type.label, color: colors.primary },
  userText: { flexShrink: 1, minWidth: 0 }, userName: { ...type.bodyMedium, fontSize: 12 }, userStatus: { ...type.caption, color: colors.success, fontSize: 9 },
  content: { flex: 1, minWidth: 0 },
});
