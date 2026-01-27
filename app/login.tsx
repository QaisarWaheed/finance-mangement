import Button from "@/_components/ui/Button";
import Input from "@/_components/ui/Input";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = () => {
    // mock auth
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
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
      <Button title="Sign in" onPress={submit} style={{ marginTop: 16 }} />

      <View style={styles.row}>
        <Link href="/register">
          <Link.Trigger>
            <Text style={{ color: "#2E9CCA" }}>Create account</Text>
          </Link.Trigger>
        </Link>
        <Link href="/forgot">
          <Link.Trigger>
            <Text style={{ color: "#2E9CCA" }}>Forgot password</Text>
          </Link.Trigger>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
});
