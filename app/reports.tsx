import ProfessionalBar from "@/_components/charts/BarChart";
import ProfessionalPie from "@/_components/charts/PieChart";
import { useStore } from "@/_store/useStore";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  startOfWeek,
} from "date-fns";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Reports() {
  const store = useStore();
  const [isClientReady, setIsClientReady] = useState(false);

  const expenses = useMemo(() => store.expenses || [], [store.expenses]);
  const budget = store.budgetMonthly || 2000;

  const categoryData = useMemo(() => {
    if (expenses.length === 0) return [];
    const totals: Record<string, number> = {};
    expenses.forEach((e) => {
      if (e && e.category) {
        totals[e.category] = (totals[e.category] || 0) + (e.amount || 0);
      }
    });
    return Object.keys(totals).map((key, i) => ({
      name: key,
      amount: totals[key],
      color: ["#2E9CCA", "#7ED957", "#F59E0B", "#F97316", "#F43F5E", "#60A5FA"][
        i % 6
      ],
    }));
  }, [expenses]);

  const weeklyData = useMemo(() => {
    const days = eachDayOfInterval({
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date()),
    });
    return {
      labels: days.map((d) => format(d, "EEE")),
      values: days.map((d) =>
        expenses
          .filter((e) => e.date && isSameDay(new Date(e.date), d))
          .reduce((s, e) => s + (e.amount || 0), 0),
      ),
    };
  }, [expenses]);

  // Ensure hydration is complete
  useEffect(() => {
    if (store._hasHydrated) {
      setIsClientReady(true);
    }
  }, [store._hasHydrated]);

  // 1. GATEKEEPER: Agar store ready nahi, toh spinner dikhao
  if (!isClientReady || !store) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2E9CCA" />
        <Text style={{ marginTop: 10, color: "#6B7280" }}>Syncing Data...</Text>
      </View>
    );
  }

  // Ab yahan data 100% safe hai
  const totalSpent = categoryData.reduce((s, c) => s + c.amount, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports</Text>
        <Text style={styles.subtitle}>Analysis of your transactions</Text>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Spent</Text>
          <Text style={styles.summaryValue}>${totalSpent.toFixed(2)}</Text>
        </View>
        <View
          style={[
            styles.summaryCard,
            { backgroundColor: totalSpent > budget ? "#FEE2E2" : "#DCFCE7" },
          ]}
        >
          <Text style={styles.summaryLabel}>Budget Status</Text>
          <Text
            style={[
              styles.summaryValue,
              { color: totalSpent > budget ? "#EF4444" : "#10B981" },
            ]}
          >
            {totalSpent > budget ? "Over" : "Safe"}
          </Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Expenses by Category</Text>
        {categoryData.length > 0 ? (
          <ProfessionalPie data={categoryData} />
        ) : (
          <Text style={styles.noDataText}>No data to visualize yet.</Text>
        )}
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Weekly Activity</Text>
        {weeklyData.values.some((v) => v > 0) ? (
          <ProfessionalBar
            labels={weeklyData.labels}
            values={weeklyData.values}
          />
        ) : (
          <Text style={styles.noDataText}>Start adding expenses!</Text>
        )}
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 20 },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  header: { marginBottom: 25, marginTop: 10 },
  title: { fontSize: 32, fontWeight: "800", color: "#111827" },
  subtitle: { fontSize: 16, color: "#6B7280" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    width: (screenWidth - 55) / 2,
    elevation: 1,
  },
  summaryLabel: { color: "#6B7280", fontSize: 12, marginBottom: 4 },
  summaryValue: { fontSize: 18, fontWeight: "700" },
  chartCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 15,
  },
  noDataText: {
    textAlign: "center",
    padding: 30,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
});
