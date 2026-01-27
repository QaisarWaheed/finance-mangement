import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '@/_components/ui/Input';
import Button from '@/_components/ui/Button';
import { useStore } from '@/_store/useStore';

export default function Budget() {
  const budget = useStore((s) => s.budgetMonthly);
  const setBudget = useStore((s) => s.setBudget);
  const [val, setVal] = useState(String(budget));

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>Monthly budget</Text>
      <Input label="Amount" value={val} onChangeText={setVal} />
      <Button title="Save" onPress={() => setBudget(Number(val || 0))} style={{ marginTop: 12 }} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, });