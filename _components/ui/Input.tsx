import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/_constants/colors';

interface Props {
  label?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  keyboardType?: any;
  style?: any;
}

export default function Input({ label, value, onChangeText, placeholder, keyboardType, style }: Props) {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];

  return (
    <View style={style}>
      {label ? <Text style={[styles.label, { color: palette.muted }]}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={palette.muted}
        style={[styles.input, { backgroundColor: palette.card, color: palette.text }]}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: 6, fontSize: 13 },
  input: {
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
});