import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading({ size = 'large' }: { size?: 'small' | 'large' | number }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size={size as any} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { padding: 24, alignItems: 'center', justifyContent: 'center' },
});