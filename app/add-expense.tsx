import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text } from "react-native";
// Simple import (No named export error)
import Input from "@/_components/ui/Input";
import { useStore } from "@/_store/useStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [category, setCategory] = useState("");

  const addExpense = useStore((s) => s.addExpense);
  const router = useRouter();

  const submit = () => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount)) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    if (!category.trim()) {
      Alert.alert("Error", "Please enter a category");
      return;
    }

    addExpense({
      id: Math.random().toString(36).substring(7),
      amount: numAmount,
      category: category,
      date: date.toISOString(),
      notes: notes || "",
    });

    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Expense</Text>

      <Input
        label="Amount ($)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Input label="Category" value={category} onChangeText={setCategory} />
      <Input
        label="Date"
        value={date.toDateString()}
        onFocus={() => setShowDate(true)}
      />
      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event: any, selectedDate: Date | undefined) => {
            setShowDate(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
      <Input label="Notes" value={notes} onChangeText={setNotes} multiline />

      {/* Submit Button */}
      <Pressable style={styles.submitButton} onPress={submit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 },
  datePicker: {
    padding: 14,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dateLabel: { color: "#1F2937", fontSize: 16, fontWeight: "500" },
  submitButton: {
    backgroundColor: "#2E9CCA",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
