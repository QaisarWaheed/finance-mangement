import {
    getCategories,
    getMockExpenses,
    getMockUser,
} from "@/_services/mockApi";
import { Expense, StoreState } from "@/_types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEY = "@smartspend_store_v1";

export const useStore = create<StoreState>((set: any, get: any) => ({
  expenses: [],
  categories: ["Food", "Transport", "Rent", "Shopping", "Bills", "Other"],
  budgetMonthly: 2000,
  user: undefined,
  settings: { darkMode: false, notifications: true },

  addExpense: (e: Expense) => set({ expenses: [e, ...get().expenses] }),
  updateExpense: (id: string, partial: Partial<Expense>) =>
    set({
      expenses: get().expenses.map((x: Expense) =>
        x.id === id ? { ...x, ...partial } : x,
      ),
    }),
  deleteExpense: (id: string) =>
    set({ expenses: get().expenses.filter((x: Expense) => x.id !== id) }),
  setBudget: (amount: number) => set({ budgetMonthly: amount }),

  loadInitialData: async () => {
    try {
      // try to load from storage
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        set(parsed);
        return;
      }

      // otherwise load mock data
      const [expenses, categories, user] = await Promise.all([
        getMockExpenses(),
        getCategories(),
        getMockUser(),
      ]);

      set({ expenses, categories, user });
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          expenses,
          categories,
          budgetMonthly: 2000,
          user,
          settings: { darkMode: false, notifications: true },
        }),
      );
    } catch (err) {
      console.warn("Failed to load initial data", err);
    }
  },
}));
