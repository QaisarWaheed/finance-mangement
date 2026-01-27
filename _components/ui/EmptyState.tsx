import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ title = 'No data', subtitle }: { title?: string; subtitle?: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  sub: { color: '#6B7280' },
});