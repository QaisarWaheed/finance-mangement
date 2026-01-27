import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useStore } from '@/_store/useStore';
import { useSearchParams, useRouter } from 'expo-router';
import { format } from 'date-fns';

export default function ExpenseDetails() {
  const { id } = useSearchParams();
  const router = useRouter();
  const expense = useStore((s) => s.expenses.find((x) => x.id === id));
  const deleteExpense = useStore((s) => s.deleteExpense);

  if (!expense) return <View style={{ padding: 16 }}><Text>Not found</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: '800' }}>${expense.amount.toFixed(2)}</Text>
      <Text style={{ color: '#6B7280' }}>{expense.category}</Text>
      <Text style={{ marginTop: 8 }}>{expense.notes}</Text>
      <Text style={{ marginTop: 8 }}>{format(new Date(expense.date), 'eeee, dd MMM yyyy')}</Text>

      <Pressable onPress={() => { deleteExpense(expense.id); router.back(); }} style={{ marginTop: 24 }}>
        <Text style={{ color: '#E15757' }}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, });