import Button from "@/_components/ui/Button";
import Input from "@/_components/ui/Input";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const submit = () => alert("Password reset email sent (mock)");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password</Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
      />
      <Button title="Reset" onPress={submit} style={{ marginTop: 16 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 12 },
});
