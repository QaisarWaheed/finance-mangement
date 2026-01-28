import { ThemedText } from "@/_components/themed-text";
import { ThemedView } from "@/_components/themed-view";
import { Colors } from "@/_constants/theme";
import { useStore } from "@/_store/useStore";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user } = useStore();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const { width: screenWidth } = Dimensions.get("window");
  const isSmallScreen = screenWidth < 375;

  const handleLogout = () => {
    // Simple logout - in a real app, you'd clear tokens, etc.
    router.push("/login");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: screenWidth * 0.05,
      paddingBottom: 40,
    },
    header: {
      marginBottom: screenWidth * 0.06,
    },
    title: {
      marginBottom: 4,
    },
    subtitle: {
      opacity: 0.7,
    },
    profileCard: {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: screenWidth * 0.06,
      marginBottom: screenWidth * 0.06,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    avatarContainer: {
      marginBottom: screenWidth * 0.04,
    },
    avatar: {
      width: isSmallScreen ? 70 : 80,
      height: isSmallScreen ? 70 : 80,
      borderRadius: isSmallScreen ? 35 : 40,
      backgroundColor: "#3B82F6",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    avatarText: {
      color: "#FFFFFF",
      fontSize: isSmallScreen ? 28 : 32,
    },
    userInfo: {
      alignItems: "center",
    },
    userName: {
      marginBottom: 4,
      color: "#111827",
    },
    userEmail: {
      color: "#6B7280",
    },
    menu: {
      gap: screenWidth * 0.02,
    },
    menuItem: {
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: screenWidth * 0.04,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    menuItemContent: {
      flex: 1,
    },
    menuItemTitle: {
      fontWeight: "600",
      color: "#111827",
      marginBottom: 2,
      fontSize: isSmallScreen ? 14 : 16,
    },
    menuItemSubtitle: {
      color: "#6B7280",
      fontSize: isSmallScreen ? 12 : 14,
    },
    menuArrow: {
      color: "#9CA3AF",
      fontSize: isSmallScreen ? 16 : 18,
      fontWeight: "600",
    },
    divider: {
      height: 1,
      backgroundColor: "#E5E7EB",
      marginVertical: screenWidth * 0.02,
    },
    logoutItem: {
      backgroundColor: "#FEF2F2",
      borderWidth: 1,
      borderColor: "#FECACA",
    },
    logoutText: {
      color: "#DC2626",
    },
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Profile
          </ThemedText>
          <ThemedText type="caption" style={styles.subtitle}>
            Manage your account and preferences
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.profileCard}>
          <ThemedView style={styles.userInfo}>
            <ThemedText type="heading" style={styles.userName}>
              {user?.name || "User"}
            </ThemedText>
            <ThemedText type="body" style={styles.userEmail}>
              {user?.email || "user@example.com"}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/settings")}
            activeOpacity={0.7}
          >
            <ThemedView style={styles.menuItemContent}>
              <ThemedText type="body" style={styles.menuItemTitle}>
                Settings
              </ThemedText>
              <ThemedText type="caption" style={styles.menuItemSubtitle}>
                App preferences and configuration
              </ThemedText>
            </ThemedView>
            <ThemedText type="body" style={styles.menuArrow}>
              →
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/budget")}
            activeOpacity={0.7}
          >
            <ThemedView style={styles.menuItemContent}>
              <ThemedText type="body" style={styles.menuItemTitle}>
                Budget Management
              </ThemedText>
              <ThemedText type="caption" style={styles.menuItemSubtitle}>
                Set and track your monthly budget
              </ThemedText>
            </ThemedView>
            <ThemedText type="body" style={styles.menuArrow}>
              →
            </ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.divider} />

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <ThemedView style={styles.menuItemContent}>
              <ThemedText
                type="body"
                style={[styles.menuItemTitle, styles.logoutText]}
              >
                Logout
              </ThemedText>
              <ThemedText type="caption" style={styles.menuItemSubtitle}>
                Sign out of your account
              </ThemedText>
            </ThemedView>
            <ThemedText
              type="body"
              style={[styles.menuArrow, styles.logoutText]}
            >
              →
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
