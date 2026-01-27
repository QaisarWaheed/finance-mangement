import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '@/_store/useStore';
import Card from '@/_components/ui/Card';

export default function Reports() {
  const expenses = useStore((s) => s.expenses);

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: '800' }}>Reports</Text>
      <Card style={{ marginTop: 12 }}>
        <Text style={{ fontWeight: '700' }}>Month to date</Text>
        <Text style={{ marginTop: 8 }}>Expenses: ${total.toFixed(2)}</Text>
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Text style={{ fontWeight: '700' }}>Weekly</Text>
        <Text style={{ marginTop: 8 }}>Coming soon</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, });