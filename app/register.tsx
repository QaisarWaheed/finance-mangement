import Button from "@/_components/ui/Button";
import Input from "@/_components/ui/Input";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    // mock
    alert("Registered (mock)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••"
      />
      <Button title="Create" onPress={submit} style={{ marginTop: 16 }} />

      <View style={{ marginTop: 12 }}>
        <Link href="/login">
          <Link.Trigger>
            <Text style={{ color: "#2E9CCA" }}>Already have an account?</Text>
          </Link.Trigger>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 12 },
});
