import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/_constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
      {subtitle ? <Text style={[styles.sub, { color: palette.muted }]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 12 },
  title: { fontSize: 18, fontWeight: '700' },
  sub: { fontSize: 13, marginTop: 4 },
});