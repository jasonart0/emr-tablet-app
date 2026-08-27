import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { colors, radius, spacing } from '@/theme';

export function SchedulerToolbar({ view, onDateDelta, onToday, onCalendar, onView, onCreate, onPatients }: { view: 'Day' | 'Week'; onDateDelta(delta: number): void; onToday(): void; onCalendar(): void; onView(value: 'Day' | 'Week'): void; onCreate(): void; onPatients(): void }) {
  return (
    <View style={styles.toolbar}>
      <View style={styles.controls}>
        <View style={styles.scheduleFilters}>
          <View style={styles.controlGroup}><Button label="Previous" icon="chevron-left" variant="secondary" compact onPress={() => onDateDelta(view === 'Day' ? -1 : -7)} /><Button label="Today" variant="secondary" compact onPress={onToday} /><Button label="Next" icon="chevron-right" variant="secondary" compact onPress={() => onDateDelta(view === 'Day' ? 1 : 7)} /><Button label="Choose date" icon="calendar-outline" variant="secondary" compact onPress={onCalendar} /></View>
          <View style={styles.switcher}>{(['Day', 'Week'] as const).map((item) => <Button key={item} label={item} variant={view === item ? 'primary' : 'ghost'} compact onPress={() => onView(item)} />)}</View>
        </View>
        <View style={styles.actionGroup}><Button label="Patient search" icon="account-search-outline" variant="ghost" compact onPress={onPatients} /><Button label="Appointment" icon="plus" onPress={onCreate} /></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ toolbar: { padding: spacing.lg, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border }, controls: { width: '100%', minWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: spacing.base }, scheduleFilters: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm }, controlGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, switcher: { flexDirection: 'row', padding: 3, borderRadius: radius.md, backgroundColor: colors.surfaceSecondary }, actionGroup: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, });
