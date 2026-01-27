import { Colors } from "@/_constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, View } from "react-native";

export const Card: React.FC<{ style?: any; children?: any }> = ({
  children,
  style,
}) => {
  const scheme = useColorScheme() ?? "light";
  const palette = Colors[scheme];
  return (
    <View style={[styles.card, { backgroundColor: palette.card }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});
