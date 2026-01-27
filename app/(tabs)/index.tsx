import SmallBar from "@/_components/charts/BarChart";
import SmallPie from "@/_components/charts/PieChart";
import { ThemedText } from "@/_components/themed-text";
import { ThemedView } from "@/_components/themed-view";
import { Colors } from "@/_constants/theme";
import { useStore } from "@/_store/useStore";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { format } from "date-fns";
import { Link } from "expo-router";
import { useEffect, useMemo } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

export default function Dashboard() {
  const { expenses, loadInitialData, budgetMonthly } = useStore();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { width: screenWidth } = Dimensions.get("window");
  const isSmallScreen = screenWidth < 375;

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

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
    .slice(0, 7)
    .map((e) => format(new Date(e.date), "dd MMM"));
  const barValues = expenses.slice(0, 7).map((e) => e.amount);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      padding: screenWidth * 0.05, // 5% of screen width
      paddingBottom: 40,
    },
    header: {
      marginBottom: screenWidth * 0.06, // 6% of screen width
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
      padding: screenWidth * 0.05,
      marginBottom: screenWidth * 0.04,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    balanceCard: {
      flexDirection: isSmallScreen ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isSmallScreen ? "flex-start" : "center",
      paddingVertical: screenWidth * 0.06,
    },
    balanceSection: {
      flex: 1,
      marginBottom: isSmallScreen ? 16 : 0,
    },
    balanceLabel: {
      marginBottom: 8,
      color: "#6B7280",
    },
    balanceAmount: {
      color: "#059669",
    },
    monthlySection: {
      alignItems: isSmallScreen ? "flex-start" : "flex-end",
    },
    monthlyLabel: {
      marginBottom: 8,
      color: "#6B7280",
    },
    incomeText: {
      color: "#059669",
      marginBottom: 4,
    },
    expenseText: {
      color: "#DC2626",
    },
    sectionTitle: {
      marginBottom: screenWidth * 0.04,
      color: "#111827",
    },
    chartContainer: {
      alignItems: "center",
      justifyContent: "center",
      minHeight: screenWidth * 0.4, // 40% of screen width
    },
    noDataText: {
      textAlign: "center",
      color: "#9CA3AF",
      fontStyle: "italic",
    },
    viewAllCard: {
      alignItems: "center",
      paddingVertical: screenWidth * 0.04,
      backgroundColor: "#F3F4F6",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    },
    viewAllText: {
      fontSize: isSmallScreen ? 14 : 16,
      fontWeight: "600",
    },
  });

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.container}
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Dashboard
        </ThemedText>
        <ThemedText type="caption" style={styles.subtitle}>
          Monthly budget: ${budgetMonthly}
        </ThemedText>
      </ThemedView>

      <ThemedView style={[styles.card, styles.balanceCard]}>
        <View style={styles.balanceSection}>
          <ThemedText type="label" style={styles.balanceLabel}>
            Total Balance
          </ThemedText>
          <ThemedText type="heading" style={styles.balanceAmount}>
            ${(10000 - totals.total).toFixed(2)}
          </ThemedText>
        </View>
        <View style={styles.monthlySection}>
          <ThemedText type="label" style={styles.monthlyLabel}>
            This Month
          </ThemedText>
          <ThemedText type="body" style={styles.incomeText}>
            Income: $4,000
          </ThemedText>
          <ThemedText type="body" style={styles.expenseText}>
            Expenses: ${totals.total.toFixed(2)}
          </ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Expenses by Category
        </ThemedText>
        <View style={styles.chartContainer}>
          {pieData.length ? (
            <SmallPie data={pieData} />
          ) : (
            <ThemedText type="body" style={styles.noDataText}>
              No expense data available
            </ThemedText>
          )}
        </View>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Recent Expenses
        </ThemedText>
        <View style={styles.chartContainer}>
          {barValues.length ? (
            <SmallBar labels={barLabels} values={barValues} />
          ) : (
            <ThemedText type="body" style={styles.noDataText}>
              No recent expenses
            </ThemedText>
          )}
        </View>
      </ThemedView>

      <Link href="/expenses">
        <Link.Trigger>
          <ThemedView style={[styles.card, styles.viewAllCard]}>
            <ThemedText type="link" style={styles.viewAllText}>
              View All Expenses →
            </ThemedText>
          </ThemedView>
        </Link.Trigger>
      </Link>
    </ScrollView>
  );
}
