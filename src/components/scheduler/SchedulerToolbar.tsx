import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { colors, radius, spacing, type } from '@/theme';
import { formatDate } from '@/utils/date';

export function SchedulerToolbar({ date, view, onDateDelta, onToday, onCalendar, onView, onCreate, onPatients }: { date: string; view: 'Day' | 'Week'; onDateDelta(delta: number): void; onToday(): void; onCalendar(): void; onView(value: 'Day' | 'Week'): void; onCreate(): void; onPatients(): void }) {
  return (
    <View style={styles.toolbar}>
      <View style={styles.dateGroup}><Text style={type.screenTitle}>Scheduler</Text><Text style={styles.date}>{formatDate(date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</Text></View>
      <View style={styles.controls}><View style={styles.controlGroup}><Button label="Previous" icon="chevron-left" variant="secondary" compact onPress={() => onDateDelta(view === 'Day' ? -1 : -7)} /><Button label="Today" variant="secondary" compact onPress={onToday} /><Button label="Next" icon="chevron-right" variant="secondary" compact onPress={() => onDateDelta(view === 'Day' ? 1 : 7)} /><Button label="Choose date" icon="calendar-outline" variant="secondary" compact onPress={onCalendar} /></View><View style={styles.switcher}>{(['Day', 'Week'] as const).map((item) => <Button key={item} label={item} variant={view === item ? 'primary' : 'ghost'} compact onPress={() => onView(item)} />)}</View><Button label="Patient search" icon="account-search-outline" variant="ghost" compact onPress={onPatients} /><Button label="Appointment" icon="plus" onPress={onCreate} /></View>
    </View>
  );
}

const styles = StyleSheet.create({ toolbar: { padding: spacing.lg, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: spacing.base }, dateGroup: { minWidth: 210, gap: 2 }, date: { ...type.body, color: colors.textSecondary }, controls: { flexGrow: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap', gap: spacing.sm }, controlGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, switcher: { flexDirection: 'row', padding: 3, borderRadius: radius.md, backgroundColor: colors.surfaceSecondary }, });
