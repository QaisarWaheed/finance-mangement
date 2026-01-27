import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '@/_constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Props {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  style?: any;
}

export const Button: React.FC<Props> = ({ title, onPress, variant = 'primary', style }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.btn,
        { backgroundColor: variant === 'primary' ? palette.primary : 'transparent' },
        style,
      ]}>
      <Text style={[styles.text, { color: variant === 'primary' ? '#fff' : palette.text }]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});
