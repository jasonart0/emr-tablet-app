import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { AppointmentCard } from '@/components/appointment/AppointmentCard';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { DashboardMetric } from '@/components/dashboard/DashboardMetric';
import { DashboardPanel } from '@/components/dashboard/DashboardPanel';
import { AppShell } from '@/components/layout/AppShell';
import { useAppState } from '@/state/AppState';
import { colors, radius, sizes, spacing, type } from '@/theme';
import { toDateKey } from '@/utils/date';

const activity = [42, 54, 47, 68, 63, 79, 72, 86, 74, 91, 83, 96];

export default function DashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { patients, appointments, encounters, providers, getPatient, getProvider, getFacility } = useAppState();
  const today = toDateKey(new Date());
  const todayAppointments = appointments.filter((item) => item.date === today && item.status !== 'Cancelled').sort((a, b) => a.startTime.localeCompare(b.startTime));
  const checkedIn = todayAppointments.filter((item) => ['Checked In', 'In Progress'].includes(item.status)).length;
  const activePatients = patients.filter((item) => item.status === 'Active').length;
  const openEncounters = encounters.filter((item) => item.status === 'Open').length;
  const wide = width >= 1120;
  const activePercent = Math.round((activePatients / patients.length) * 100);

  return <AppShell title="Clinical Dashboard" subtitle="Monday operations overview" actions={<Button label="New appointment" icon="plus" compact onPress={() => router.push('/scheduler')} />}>
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.welcome}><View style={styles.welcomeCopy}><Text style={type.screenTitle}>Good morning, Clinical Admin</Text><Text style={styles.welcomeText}>Here is today&apos;s patient flow and clinical activity.</Text></View><View style={styles.live}><View style={styles.liveDot} /><Text style={styles.liveText}>Live operations</Text></View></View>

      <View style={styles.metrics}>
        <DashboardMetric label="Today’s appointments" value={todayAppointments.length} detail="Scheduled clinic visits" icon="calendar-clock" color={colors.primary} />
        <DashboardMetric label="Checked in" value={checkedIn} detail="Ready or in progress" icon="account-check-outline" color={colors.success} />
        <DashboardMetric label="Active patients" value={activePatients} detail={`${activePercent}% of patient panel`} icon="account-heart-outline" color={colors.purple} />
        <DashboardMetric label="Open encounters" value={openEncounters} detail="Require clinical action" icon="clipboard-pulse-outline" color={colors.warning} />
      </View>

      <View style={[styles.workspace, !wide && styles.stack]}>
        <View style={[styles.primaryColumn, !wide && styles.fullColumn]}>
          <DashboardPanel title="Today’s Schedule" subtitle="Appointments across all providers" action={<Button label="Open scheduler" variant="ghost" compact onPress={() => router.push('/scheduler')} />}>
            {todayAppointments.length ? todayAppointments.slice(0, 5).map((appointment) => <AppointmentCard key={appointment.id} compact appointment={appointment} patient={getPatient(appointment.patientId)} provider={getProvider(appointment.providerId)} facility={getFacility(appointment.facilityId)} onPress={() => router.push({ pathname: '/scheduler', params: { date: appointment.date, appointmentId: appointment.id } })} />) : <EmptyState title="No appointments today" description="The clinic schedule is currently clear." />}
          </DashboardPanel>

          <DashboardPanel title="Patient Activity" subtitle="Clinical activity trend over the last 12 periods">
            <View style={styles.chartHeader}><View><Text style={styles.chartValue}>{appointments.length + encounters.length}</Text><Text style={styles.chartLabel}>Appointments and encounters</Text></View><View style={styles.trend}><MaterialCommunityIcons name="trending-up" size={16} color={colors.success} /><Text style={styles.trendText}>+15.8%</Text></View></View>
            <View style={styles.chart}>{activity.map((value, index) => <View key={index} style={styles.barTrack}><View style={[styles.bar, { height: `${value}%`, backgroundColor: index > 8 ? colors.success : colors.primary }]} /></View>)}</View>
            <View style={styles.legend}><Text style={styles.legendText}>12 weeks ago</Text><View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: colors.primary }]} /><Text style={styles.legendText}>Visits</Text><View style={[styles.legendDot, { backgroundColor: colors.success }]} /><Text style={styles.legendText}>Current trend</Text></View><Text style={styles.legendText}>Today</Text></View>
          </DashboardPanel>
        </View>

        <View style={[styles.secondaryColumn, !wide && styles.fullColumn]}>
          <DashboardPanel title="Patient Panel" subtitle="Current registration status">
            {[{ label: 'Active', count: activePatients, color: colors.success }, { label: 'Inactive', count: patients.filter((item) => item.status === 'Inactive').length, color: colors.warning }, { label: 'Discharged', count: patients.filter((item) => item.status === 'Discharged').length, color: colors.purple }].map((item) => <View key={item.label} style={styles.statRow}><View style={styles.statTop}><Text style={styles.statLabel}>{item.label}</Text><Text style={styles.statCount}>{item.count}</Text></View><View style={styles.progressTrack}><View style={[styles.progress, { width: `${(item.count / patients.length) * 100}%`, backgroundColor: item.color }]} /></View></View>)}
            <Button label="View all patients" icon="account-group-outline" variant="secondary" onPress={() => router.push('/patients')} />
          </DashboardPanel>

          <DashboardPanel title="Provider Workload" subtitle="Today’s assigned visits">
            {providers.map((provider) => { const count = todayAppointments.filter((item) => item.providerId === provider.id).length; return <View key={provider.id} style={styles.provider}><View style={styles.providerAvatar}><Text style={styles.providerInitials}>{provider.initials}</Text></View><View style={styles.providerMain}><Text style={styles.providerName}>{provider.name}</Text><Text style={styles.providerSpecialty}>{provider.specialty}</Text></View><View style={styles.providerCount}><Text style={styles.providerCountText}>{count}</Text></View></View>; })}
          </DashboardPanel>

          <DashboardPanel title="Clinical Alerts" subtitle="Items needing attention">
            <View style={styles.alert}><MaterialCommunityIcons name="alert-circle-outline" size={20} color={colors.warning} /><View style={styles.alertMain}><Text style={styles.alertTitle}>{openEncounters} open encounters</Text><Text style={styles.alertText}>Review documentation and finalize outstanding plans.</Text></View></View>
            <View style={styles.alert}><MaterialCommunityIcons name="calendar-alert" size={20} color={colors.danger} /><View style={styles.alertMain}><Text style={styles.alertTitle}>2 scheduling conflicts</Text><Text style={styles.alertText}>Two provider time slots need confirmation.</Text></View></View>
          </DashboardPanel>
        </View>
      </View>
    </ScrollView>
  </AppShell>;
}

const styles = StyleSheet.create({ page: { width: '100%', maxWidth: sizes.contentMax, alignSelf: 'center', padding: spacing.lg, gap: spacing.base }, welcome: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: spacing.base }, welcomeCopy: { flex: 1, minWidth: 260 }, welcomeText: { ...type.body, color: colors.textSecondary }, live: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md, minHeight: 34, borderRadius: radius.pill, backgroundColor: colors.successSoft, borderWidth: 1, borderColor: `${colors.success}55` }, liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success }, liveText: { ...type.label, color: colors.success }, metrics: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch', gap: spacing.md }, workspace: { flexDirection: 'row', alignItems: 'stretch', gap: spacing.base, minWidth: 0 }, stack: { flexDirection: 'column' }, primaryColumn: { flex: 1.55, minWidth: 0, gap: spacing.base }, secondaryColumn: { flex: 1, minWidth: 300, gap: spacing.base }, fullColumn: { width: '100%', minWidth: 0 }, chartHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, chartValue: { ...type.screenTitle, fontSize: 22 }, chartLabel: { ...type.caption }, trend: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center', padding: spacing.sm, borderRadius: radius.md, backgroundColor: colors.successSoft }, trendText: { ...type.label, color: colors.success }, chart: { height: 170, flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, paddingTop: spacing.base, borderBottomWidth: 1, borderBottomColor: colors.border }, barTrack: { flex: 1, height: '100%', justifyContent: 'flex-end', backgroundColor: colors.surfaceSecondary, borderTopLeftRadius: radius.sm, borderTopRightRadius: radius.sm, overflow: 'hidden' }, bar: { width: '100%', minHeight: 8, borderTopLeftRadius: radius.sm, borderTopRightRadius: radius.sm }, legend: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, legendItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs }, legendDot: { width: 7, height: 7, borderRadius: 4, marginLeft: spacing.sm }, legendText: { ...type.caption }, statRow: { gap: spacing.sm }, statTop: { flexDirection: 'row', justifyContent: 'space-between' }, statLabel: { ...type.body }, statCount: { ...type.bodyMedium }, progressTrack: { height: 8, borderRadius: radius.pill, backgroundColor: colors.surfaceSecondary, overflow: 'hidden' }, progress: { height: '100%', borderRadius: radius.pill }, provider: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border }, providerAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, providerInitials: { ...type.label, color: colors.primary }, providerMain: { flex: 1 }, providerName: { ...type.bodyMedium }, providerSpecialty: { ...type.caption }, providerCount: { minWidth: 30, height: 30, paddingHorizontal: spacing.sm, borderRadius: radius.md, backgroundColor: colors.surfaceActive, alignItems: 'center', justifyContent: 'center' }, providerCountText: { ...type.label, color: colors.primary }, alert: { flexDirection: 'row', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border }, alertMain: { flex: 1, gap: 2 }, alertTitle: { ...type.bodyMedium }, alertText: { ...type.caption, color: colors.textSecondary } });
