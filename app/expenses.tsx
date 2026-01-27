import Card from "@/_components/ui/Card";
import { useStore } from "@/_store/useStore";
import { format } from "date-fns";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function Expenses() {
  const expenses = useStore((s) => s.expenses);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      expenses.filter(
        (e) =>
          e.notes?.toLowerCase().includes(query.toLowerCase()) ||
          e.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [expenses, query],
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Link href={`/expense-details?id=${item.id}`}>
            <Link.Trigger>
              <Card style={styles.item}>
                <View>
                  <Text style={{ fontWeight: "700" }}>
                    ${item.amount.toFixed(2)}
                  </Text>
                  <Text style={{ color: "#6B7280" }}>{item.category}</Text>
                </View>
                <Text style={{ color: "#6B7280" }}>
                  {format(new Date(item.date), "dd MMM yyyy")}
                </Text>
              </Card>
            </Link.Trigger>
          </Link>
        )}
        ListEmptyComponent={<Text style={{ padding: 16 }}>No expenses</Text>}
      />

      <Link href="/add-expense">
        <Link.Trigger>
          <Card style={{ marginTop: 12, alignItems: "center" }}>
            <Text style={{ color: "#2E9CCA", fontWeight: "700" }}>
              Add expense
            </Text>
          </Card>
        </Link.Trigger>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  search: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
});
