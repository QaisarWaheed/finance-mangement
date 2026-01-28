export type Category = 'Food' | 'Transport' | 'Rent' | 'Shopping' | 'Bills' | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  date: string; // ISO
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  currency?: string;
}

export interface StoreState {
  expenses: Expense[];
  categories: Category[];
  budgetMonthly: number;
  user?: User;
  settings: {
    darkMode: boolean;
    notifications: boolean;
  };

  // actions
  addExpense: (e: Expense) => void;
  updateExpense: (id: string, partial: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  setBudget: (amount: number) => void;
  loadInitialData: () => Promise<void>;
}
