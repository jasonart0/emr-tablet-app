import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IconButton } from '@/components/common/IconButton';
import { colors, radius, sizes, spacing, type } from '@/theme';
import { fromDateKey, toDateKey } from '@/utils/date';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarPicker({ selected, onSelect }: { selected: string; onSelect(date: string): void }) {
  const selectedDate = fromDateKey(selected);
  const [cursor, setCursor] = useState(() => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  useEffect(() => {
    setCursor(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selected]);

  const days = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    first.setDate(first.getDate() - first.getDay());
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(first);
      date.setDate(first.getDate() + index);
      return date;
    });
  }, [cursor]);

  const today = toDateKey(new Date());
  const moveMonth = (amount: number) => setCursor((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));

  return (
    <View style={styles.calendar}>
      <View style={styles.monthHeader}>
        <IconButton name="chevron-left" label="Previous month" onPress={() => moveMonth(-1)} />
        <View style={styles.monthTitle}>
          <MaterialCommunityIcons name="calendar-month-outline" size={20} color={colors.primary} />
          <Text style={type.sectionTitle}>{cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
        </View>
        <IconButton name="chevron-right" label="Next month" onPress={() => moveMonth(1)} />
      </View>
      <View style={styles.weekRow}>{weekdays.map((day) => <Text key={day} style={styles.weekday}>{day}</Text>)}</View>
      <View style={styles.grid}>
        {days.map((date) => {
          const key = toDateKey(date);
          const outside = date.getMonth() !== cursor.getMonth();
          const active = key === selected;
          const isToday = key === today;
          return (
            <View key={key} style={styles.cellWrap}>
              <Pressable accessibilityRole="button" accessibilityLabel={date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} accessibilityState={{ selected: active }} onPress={() => onSelect(key)} style={({ pressed }) => [styles.day, isToday && styles.today, active && styles.selected, pressed && styles.pressed]}>
                <Text style={[styles.dayText, outside && styles.outsideText, isToday && styles.todayText, active && styles.selectedText]}>{date.getDate()}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: { width: '100%', gap: spacing.md },
  monthHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  monthTitle: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  weekRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: spacing.sm },
  weekday: { ...type.label, width: `${100 / 7}%`, textAlign: 'center', color: colors.textSecondary },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cellWrap: { width: `${100 / 7}%`, padding: 2 },
  day: { minHeight: sizes.touch, borderWidth: 1, borderColor: 'transparent', borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  dayText: { ...type.bodyMedium }, outsideText: { color: colors.textMuted, opacity: 0.55 },
  today: { borderColor: colors.primaryLight }, todayText: { color: colors.primary },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary }, selectedText: { color: colors.white },
  pressed: { opacity: 0.7 },
});
