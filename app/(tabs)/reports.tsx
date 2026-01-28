import SmallBar from "@/_components/charts/BarChart";
import SmallPie from "@/_components/charts/PieChart";
import { ThemedText } from "@/_components/themed-text";
import { ThemedView } from "@/_components/themed-view";
import { Colors } from "@/_constants/theme";
import { Expense, useStore } from "@/_store/useStore";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReportsScreen() {
  const { expenses = [], categories = [] } = useStore();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Calculate monthly expenses
  const monthlyData = expenses.reduce(
    (acc, expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "short",
      });
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const barLabels = Object.keys(monthlyData);
  const barValues = Object.values(monthlyData);

  // Category pie data
  const categoryData = categories
    .map((cat: string) => ({
      name: cat,
      amount: expenses
        .filter((e: Expense) => e.category === cat)
        .reduce((sum: number, e: Expense) => sum + e.amount, 0),
      color: "#3B82F6", // Default color since categories are strings
    }))
    .filter((d: { amount: number }) => d.amount > 0);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Reports
          </ThemedText>
          <ThemedText type="caption" style={styles.subtitle}>
            Analyze your spending patterns
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Monthly Expenses
          </ThemedText>
          <ThemedText type="caption" style={styles.sectionDescription}>
            Track your spending trends over time
          </ThemedText>
          <View style={styles.chartContainer}>
            {barLabels.length > 0 ? (
              <SmallBar labels={barLabels} values={barValues} />
            ) : (
              <ThemedText type="body" style={styles.noDataText}>
                No expenses to display
              </ThemedText>
            )}
          </View>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Expenses by Category
          </ThemedText>
          <ThemedText type="caption" style={styles.sectionDescription}>
            See where your money goes
          </ThemedText>
          <View style={styles.chartContainer}>
            {categoryData.length > 0 ? (
              <SmallPie data={categoryData} />
            ) : (
              <ThemedText type="body" style={styles.noDataText}>
                No category data to display
              </ThemedText>
            )}
          </View>
        </ThemedView>

        <ThemedView style={[styles.card, styles.summaryCard]}>
          <ThemedText type="subtitle" style={styles.summaryTitle}>
            Summary
          </ThemedText>
          <View style={styles.summaryRow}>
            <ThemedText type="body" style={styles.summaryLabel}>
              Total Expenses:
            </ThemedText>
            <ThemedText type="heading" style={styles.summaryValue}>
              ${totalExpenses.toFixed(2)}
            </ThemedText>
          </View>
          <View style={styles.summaryRow}>
            <ThemedText type="body" style={styles.summaryLabel}>
              Number of Expenses:
            </ThemedText>
            <ThemedText type="heading" style={styles.summaryValue}>
              {expenses.length}
            </ThemedText>
          </View>
          <View style={styles.summaryRow}>
            <ThemedText type="body" style={styles.summaryLabel}>
              Average per Expense:
            </ThemedText>
            <ThemedText type="heading" style={styles.summaryValue}>
              $
              {expenses.length > 0
                ? (totalExpenses / expenses.length).toFixed(2)
                : "0.00"}
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    marginBottom: 4,
    color: "#111827",
  },
  sectionDescription: {
    marginBottom: 16,
    color: "#6B7280",
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  noDataText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  summaryCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  summaryTitle: {
    marginBottom: 16,
    textAlign: "center",
    color: "#1F2937",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  summaryLabel: {
    color: "#6B7280",
    flex: 1,
  },
  summaryValue: {
    color: "#1F2937",
    fontWeight: "700",
  },
});
