import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PropsWithChildren, ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors, radius, spacing, type } from '@/theme';

export function ResponsiveModal({ visible, title, subtitle, onClose, children, footer, wide = false }: PropsWithChildren<{ visible: boolean; title: string; subtitle?: string; onClose(): void; footer?: ReactNode; wide?: boolean }>) {
  const { width, height } = useWindowDimensions();
  const landscapeSheet = width >= 900 && width > height;
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.fill}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <SafeAreaView style={[styles.sheet, landscapeSheet ? styles.sideSheet : styles.bottomSheet, wide && landscapeSheet && styles.wide]}>
          <View style={styles.header}>
            <View style={styles.headerText}><Text style={type.sectionTitle}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>
            <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} style={styles.close}><MaterialCommunityIcons name="close" size={23} color={colors.textSecondary} /></Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView>
          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 }, backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.overlay },
  sheet: { position: 'absolute', backgroundColor: colors.surface, maxHeight: '94%', overflow: 'hidden' },
  sideSheet: { top: 0, bottom: 0, right: 0, width: 540, maxHeight: '100%', borderTopLeftRadius: radius.xl, borderBottomLeftRadius: radius.xl },
  wide: { width: 680 },
  bottomSheet: { left: 0, right: 0, bottom: 0, minHeight: '70%', borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl },
  header: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerText: { flex: 1, gap: 2 }, subtitle: { ...type.caption, color: colors.textSecondary },
  close: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: radius.md },
  content: { padding: spacing.lg, gap: spacing.base }, footer: { padding: spacing.base, borderTopWidth: 1, borderTopColor: colors.border, flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.sm },
});
