// import { useRouter } from "@/.expo/types/router";
import { useStore } from "@/_store/useStore";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
// import { useLocalSearchParams, useRouter } from "expo-router/build/exports";
// import { useRouter, useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ExpenseDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const expense = useStore((s) => s.expenses.find((x) => x.id === id));
  const deleteExpense = useStore((s) => s.deleteExpense);

  if (!expense)
    return (
      <View style={styles.container}>
        <Text>Expense not found</Text>
      </View>
    );

  const handleDelete = () => {
    Alert.alert("Delete Expense", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteExpense(expense.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
        <Text style={styles.category}>{expense.category}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Date</Text>
        <Text style={styles.info}>
          {format(new Date(expense.date), "eeee, dd MMM yyyy")}
        </Text>

        {expense.notes ? (
          <>
            <Text style={styles.label}>Notes</Text>
            <Text style={styles.info}>{expense.notes}</Text>
          </>
        ) : null}
      </View>

      <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Delete Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 2,
  },
  amount: { fontSize: 36, fontWeight: "800", color: "#111827" },
  category: { fontSize: 18, color: "#6B7280", marginTop: 4 },
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 20 },
  label: {
    fontSize: 12,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  info: { fontSize: 16, color: "#374151", marginTop: 4, marginBottom: 15 },
  deleteBtn: {
    marginTop: 30,
    padding: 18,
    backgroundColor: "#FEE2E2",
    borderRadius: 15,
    alignItems: "center",
  },
  deleteText: { color: "#EF4444", fontWeight: "bold", fontSize: 16 },
});
