import { useStore } from "@/_store/useStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SetIncome() {
  const [income, setIncome] = useState("");
  const setIncomeInStore = useStore((state) => state.setIncome);
  const router = useRouter();

  const handleSubmit = () => {
    const parsedIncome = parseFloat(income);
    if (isNaN(parsedIncome) || parsedIncome <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid income amount.");
      return;
    }
    setIncomeInStore(parsedIncome);
    Alert.alert("Success", "Income updated successfully.");
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Monthly Income</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your monthly income"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Income</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2E9CCA",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
