import SmallBar from "@/_components/charts/BarChart";
import ProfessionalPie from "@/_components/charts/PieChart";
import { ThemedText } from "@/_components/themed-text";
import { ThemedView } from "@/_components/themed-view";
import { useStore } from "@/_store/useStore";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Dashboard() {
  const { expenses, budgetMonthly, incomeMonthly } = useStore();
  const addExpense = useStore((state) => state.addExpense);
  const router = useRouter(); // Initialize router

  const totals = useMemo(() => {
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const categories = expenses.reduce<Record<string, number>>((acc, cur) => {
      acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
      return acc;
    }, {});
    return { total, categories };
  }, [expenses]);

  const pieData = Object.keys(totals.categories).map((k, i) => ({
    name: k,
    amount: totals.categories[k],
    color: ["#2E9CCA", "#7ED957", "#F59E0B", "#F97316", "#F43F5E", "#60A5FA"][
      i % 6
    ],
  }));

  const barLabels = expenses
    .slice(0, 5)
    .reverse()
    .map((e) => format(new Date(e.date), "dd MMM"));
  const barValues = expenses
    .slice(0, 5)
    .reverse()
    .map((e) => e.amount);

  const handleAddExpense = () => {
    const newExpense = {
      id: Math.random().toString(),
      amount: 1000, // Example amount
      category: "Food", // Example category
      date: new Date().toISOString(),
      notes: "Example expense",
    };
    addExpense(newExpense);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Dashboard</ThemedText>
        <ThemedText type="caption">Budget: ${budgetMonthly}</ThemedText>
      </ThemedView>

      <View style={styles.balanceCard}>
        <View>
          <Text style={styles.label}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            ${(incomeMonthly - totals.total).toFixed(2)}
          </Text>
        </View>
        <View style={styles.statsRow}>
          <View>
            <Text style={styles.incomeText}>Income: ${incomeMonthly}</Text>
            <Text style={styles.expenseText}>
              Spent: ${totals.total.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Expenses by Category</Text>
        {pieData.length > 0 ? (
          <ProfessionalPie data={pieData} />
        ) : (
          <Text style={styles.noData}>No expense data yet</Text>
        )}
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Recent Spending</Text>
        {barValues.length > 0 ? (
          <SmallBar labels={barLabels} values={barValues} />
        ) : (
          <Text style={styles.noData}>No recent transactions</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.viewAll, styles.buttonSpacing]}
        activeOpacity={0.8}
        onPress={() => router.push("/expenses")}
      >
        <Text style={styles.viewAllText}>View All Expenses →</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.viewAll, styles.buttonSpacing]}
        activeOpacity={0.8}
        onPress={() => router.push("/add-expense")}
      >
        <Text style={styles.viewAllText}>+ Add Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.viewAll, styles.buttonSpacing]}
        activeOpacity={0.8}
        onPress={() => router.push("/set-income")}
      >
        <Text style={styles.viewAllText}>Set Income</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F9FAFB" },
  container: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 20 },
  balanceCard: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  label: { color: "#6B7280", fontSize: 14, marginBottom: 5 },
  balanceAmount: { fontSize: 32, fontWeight: "bold", color: "#10B981" },
  statsRow: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 15,
  },
  incomeText: { color: "#059669", fontWeight: "600" },
  expenseText: { color: "#EF4444", fontWeight: "600", marginTop: 4 },
  chartCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#1F2937",
  },
  noData: {
    textAlign: "center",
    color: "#9CA3AF",
    padding: 20,
    fontStyle: "italic",
  },
  viewAll: {
    backgroundColor: "#2E9CCA", // Original button color
    padding: 18,
    borderRadius: 16, // Original border radius
    alignItems: "center", // Original alignment
  },
  viewAllText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  buttonSpacing: {
    marginBottom: 10, // Add spacing between buttons
  },
});
