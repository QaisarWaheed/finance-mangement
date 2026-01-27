import { StackActions, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.dispatch(StackActions.replace("/onboarding"));
    }, 1000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/partial-react-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>SmartSpend</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  logo: { width: 140, height: 86, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "700" },
});
