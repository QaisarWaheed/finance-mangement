import { ThemedText } from "@/_components/themed-text";
import { ThemedView } from "@/_components/themed-view";
import { Colors } from "@/_constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useStore } from "@/_store/useStore";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpensesScreen() {
  const { expenses, categories } = useStore();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const { width: screenWidth } = Dimensions.get("window");
  const isSmallScreen = screenWidth < 375;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  const sortedExpenses = filteredExpenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingHorizontal: screenWidth * 0.05,
      paddingVertical: screenWidth * 0.04,
      borderBottomWidth: 1,
      borderBottomColor: "#E5E7EB",
    },
    filterContainer: {
      flexDirection: "row",
      paddingHorizontal: screenWidth * 0.05,
      paddingVertical: screenWidth * 0.04,
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: screenWidth * 0.04,
      paddingVertical: screenWidth * 0.02,
      borderRadius: 20,
      backgroundColor: "#F3F4F6",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    },
    filterButtonActive: {
      backgroundColor: "#3B82F6",
      borderColor: "#3B82F6",
    },
    filterText: {
      color: "#374151",
      fontWeight: "500",
      fontSize: isSmallScreen ? 12 : 14,
    },
    filterTextActive: {
      color: "#FFFFFF",
      fontWeight: "600",
      fontSize: isSmallScreen ? 12 : 14,
    },
    listContent: {
      paddingHorizontal: screenWidth * 0.05,
      paddingBottom: 40,
    },
    expenseItem: {
      borderRadius: 12,
      padding: screenWidth * 0.04,
      marginBottom: screenWidth * 0.03,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    expenseContent: {
      flex: 1,
    },
    expenseHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    expenseTitle: {
      flex: 1,
      fontSize: isSmallScreen ? 14 : 16,
      lineHeight: isSmallScreen ? 18 : 20,
      marginRight: 12,
    },
    amount: {
      fontSize: isSmallScreen ? 16 : 18,
      fontWeight: "700",
    },
    expenseMeta: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    categoryBadge: {
      paddingHorizontal: screenWidth * 0.02,
      paddingVertical: screenWidth * 0.01,
      borderRadius: 12,
    },
    categoryText: {
      color: "#FFFFFF",
      fontWeight: "600",
      fontSize: isSmallScreen ? 10 : 12,
    },
    dateText: {
      color: "#6B7280",
      fontSize: isSmallScreen ? 12 : 14,
    },
    empty: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 60,
    },
  });

  const renderExpense = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={[styles.expenseItem, { backgroundColor: colors.card }]}
        onPress={() => router.push(`/expense-details?id=${item.id}`)}
        activeOpacity={0.7}
      >
        <View style={styles.expenseContent}>
          <View style={styles.expenseHeader}>
            <ThemedText type="defaultSemiBold" style={styles.expenseTitle}>
              {item.notes || "Expense"}
            </ThemedText>
            <ThemedText
              type="heading"
              style={[styles.amount, { color: "#DC2626" }]}
            >
              ${item.amount.toFixed(2)}
            </ThemedText>
          </View>
          <View style={styles.expenseMeta}>
            <View
              style={[styles.categoryBadge, { backgroundColor: "#E5E7EB" }]}
            >
              <ThemedText type="caption" style={styles.categoryText}>
                {item.category}
              </ThemedText>
            </View>
            <ThemedText type="caption" style={styles.dateText}>
              {format(new Date(item.date), "MMM dd, yyyy")}
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title">Expenses</ThemedText>
      </ThemedView>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          key="all"
          style={[
            styles.filterButton,
            selectedCategory === null && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedCategory(null)}
          activeOpacity={0.7}
        >
          <ThemedText
            type="body"
            style={
              selectedCategory === null
                ? styles.filterTextActive
                : styles.filterText
            }
          >
            All
          </ThemedText>
        </TouchableOpacity>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              selectedCategory === cat && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
            activeOpacity={0.7}
          >
            <ThemedText
              type="body"
              style={
                selectedCategory === cat
                  ? styles.filterTextActive
                  : styles.filterText
              }
            >
              {cat}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={sortedExpenses}
        renderItem={renderExpense}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <ThemedView style={styles.empty}>
            <ThemedText>No expenses found</ThemedText>
          </ThemedView>
        }
      />
    </SafeAreaView>
  );
}
