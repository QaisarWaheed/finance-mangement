import * as SecureStore from "expo-secure-store";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const secureStorage = createJSONStorage(() => ({
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
}));

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  notes: string;
}

interface User {
  email: string;
  name: string; // Added name property
}

interface StoreState {
  expenses: Expense[];
  categories: string[]; // Added categories property
  budgetMonthly: number;
  incomeMonthly: number;
  settings: {
    darkMode: boolean;
    notifications: boolean;
  }; // Added settings property
  _hasHydrated: boolean; // Ye flag check karega ke data load ho gaya ya nahi
  setHasHydrated: (state: boolean) => void;
  addExpense: (e: Expense) => void;
  deleteExpense: (id: string) => void;
  setIncome: (income: number) => void; // Add setIncome method
  user: User | null; // Add user property
  setUser: (user: User | null) => void; // Add setUser method
  deleteAccount: () => void; // Add deleteAccount method
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      expenses: [],
      categories: [],
      budgetMonthly: 0,
      incomeMonthly: 0,
      settings: {
        darkMode: false,
        notifications: true,
      },
      _hasHydrated: false,
      user: null,

      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),

      addExpense: (e: Expense) =>
        set((state) => ({
          expenses: [e, ...(state.expenses || [])],
          categories: Array.from(
            new Set([...(state.categories || []), e.category]),
          ),
        })),

      deleteExpense: (id: string) =>
        set((state) => ({
          expenses: (state.expenses || []).filter((x) => x.id !== id),
        })),

      setIncome: (income: number) => set({ incomeMonthly: income }),

      setUser: (user: User | null) => set({ user }),

      deleteAccount: () => set({ user: null, expenses: [], categories: [] }),
    }),
    {
      name: "finance-store",
      storage: secureStorage, // Use secure storage for sensitive data
    },
  ),
);
