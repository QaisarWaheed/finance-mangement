import Card from "@/_components/ui/Card";
import { useStore } from "@/_store/useStore";
import { format } from "date-fns";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Expenses() {
  const expenses = useStore((s) => s.expenses) || []; // Call useStore directly

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const realCategories = useMemo(() => {
    if (!expenses) return [];
    return [...new Set(expenses.map((e) => e.category))];
  }, [expenses]);

  const categories = ["All", ...realCategories];

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchesQuery =
        e.notes?.toLowerCase().includes(query.toLowerCase()) ||
        e.category.toLowerCase().includes(query.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || e.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [expenses, query, selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search expenses..."
          value={query}
          onChangeText={setQuery}
          style={styles.search}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
          keyboardShouldPersistTaps="handled"
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={`${cat}-${index}`}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.7}
              style={[styles.tab, selectedCategory === cat && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedCategory === cat && styles.activeTabText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id || Math.random().toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Link href={`/expense-details?id=${item.id}`} asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <Card style={styles.item}>
                <View style={styles.itemLeft}>
                  <View style={styles.dot} />
                  <View>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                    <Text style={styles.itemDate}>
                      {item.date
                        ? format(new Date(item.date), "dd MMM, yyyy")
                        : ""}
                    </Text>
                  </View>
                </View>
                <Text style={styles.amount}>
                  ${item.amount?.toFixed(2) || "0.00"}
                </Text>
              </Card>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No expenses found</Text>
          </View>
        }
      />

      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => console.log("Navigate to Add Expense screen")}
        >
          <Text style={styles.fabText}>+ Add Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    position: "relative", // Ensure proper positioning for absolute children
  },
  searchContainer: { paddingHorizontal: 16, paddingTop: 10, marginBottom: 10 },
  search: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tabsWrapper: { height: 55, marginBottom: 5 },
  tabsContent: { paddingHorizontal: 16, alignItems: "center" },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeTab: { backgroundColor: "#2E9CCA", borderColor: "#2E9CCA" },
  tabText: { color: "#6B7280", fontWeight: "600" },
  activeTabText: { color: "#fff" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2E9CCA",
    marginRight: 12,
  },
  itemCategory: { fontSize: 16, fontWeight: "600" },
  itemDate: { fontSize: 12, color: "#9CA3AF" },
  amount: { fontSize: 17, fontWeight: "700" },
  emptyState: { alignItems: "center", marginTop: 50 },
  emptyText: { color: "#9CA3AF" },
  fabContainer: {
    position: "absolute",
    bottom: 25,
    left: 16,
    right: 16,
    zIndex: 10, // Ensure the button appears above other components
    backgroundColor: "rgba(0, 0, 255, 0.2)", // Debugging: Add temporary background color
    borderWidth: 1, // Debugging: Add border to visualize the container
    borderColor: "red", // Debugging: Red border for visibility
  },
  fab: {
    backgroundColor: "#2E9CCA",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
    elevation: 5, // Add shadow for better visibility
  },
  fabText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
