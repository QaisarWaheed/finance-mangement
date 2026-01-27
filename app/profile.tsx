import { useStore } from "@/_store/useStore";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const user = useStore((s) => s.user);

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "800", fontSize: 20 }}>Profile</Text>
      <Text style={{ marginTop: 12 }}>{user?.name}</Text>
      <Text style={{ marginTop: 6 }}>{user?.email}</Text>

      <Pressable
        style={{ marginTop: 24 }}
        onPress={() => alert("Logout (mock)")}
      >
        <Text style={{ color: "#E15757" }}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
