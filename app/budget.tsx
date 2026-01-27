import Button from "@/_components/ui/Button";
import Input from "@/_components/ui/Input";
import { useStore } from "@/_store/useStore";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Budget() {
  const budget = useStore((s) => s.budgetMonthly);
  const setBudget = useStore((s) => s.setBudget);
  const [val, setVal] = useState(String(budget));

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Monthly budget</Text>
      <Input label="Amount" value={val} onChangeText={setVal} />
      <Button
        title="Save"
        onPress={() => setBudget(Number(val || 0))}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
