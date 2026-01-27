import { Category, Expense, User } from "@/_types";
import uuid from "react-native-uuid";

const categories: Category[] = [
  "Food",
  "Transport",
  "Rent",
  "Shopping",
  "Bills",
  "Other",
];

export const getCategories = async (): Promise<Category[]> => {
  // small delay to simulate network
  await new Promise((r) => setTimeout(r, 300));
  return categories;
};

export const getMockExpenses = async (): Promise<Expense[]> => {
  await new Promise((r) => setTimeout(r, 300));

  const now = new Date();
  const sample = Array.from({ length: 12 }).map((_, i) => {
    const amt = Math.round(Math.random() * 120 + 5);
    const date = new Date(
      now.getTime() - i * 1000 * 60 * 60 * 24 * (Math.random() * 10 + 1),
    );
    return {
      id: uuid.v4(),
      amount: amt,
      category: categories[Math.floor(Math.random() * categories.length)],
      date: date.toISOString(),
      notes: Math.random() > 0.6 ? "Coffee & snacks" : undefined,
    } as Expense;
  });

  return sample;
};

export const getMockUser = async (): Promise<User> => ({
  id: "u-1",
  name: "Jane Doe",
  email: "jane@example.com",
  currency: "USD",
});
