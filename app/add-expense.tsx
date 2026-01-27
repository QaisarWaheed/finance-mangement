import * as React from 'react';
import { useState } from 'react';
import { View as RNView, Text, StyleSheet, Pressable } from 'react-native';
// @ts-ignore: package does not provide TypeScript type declarations in this project
import DateTimePicker from '@react-native-community/datetimepicker';

import uuid from 'react-native-uuid';
import { useStore } from '@/_store/useStore';
import Input from '@/_components/ui/Input';
import Button from '@/_components/ui/Button';


export default function AddExpense({ route, navigation }: any) {
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [category, setCategory] = useState('Food');

  const addExpense = useStore((s: any) => s.addExpense);

  const submit = () => {
    if (!amount || Number.isNaN(Number(amount))) return alert('Enter valid amount');

    addExpense({ id: uuid.v4(), amount: Number(amount), category: category as any, date: date.toISOString(), notes });
    navigation?.goBack();
  };

  return (
    <RNView style={styles.container}>
      <Input label="Amount" value={amount} onChangeText={setAmount} placeholder="0.00" keyboardType="numeric" />
      <Input label="Category" value={category} onChangeText={setCategory} placeholder="Food" />
      <Pressable onPress={() => setShowDate(true)} style={{ marginTop: 8 }}>
        <Text style={{ color: '#6B7280' }}>Date: {date.toDateString()}</Text>
      </Pressable>
      {showDate && (
        <DateTimePicker value={date} mode="date" onChange={(e: any, d?: Date) => {
          if (d) setDate(d);
          setShowDate(false);
        }} />
      )}

      <Input label="Notes" value={notes} onChangeText={setNotes} placeholder="Optional notes" />

      <RNView style={{ marginTop: 12 }}>
        <Button title="Add expense" onPress={submit} />
      </RNView>
    </RNView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, });