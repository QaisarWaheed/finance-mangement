import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const Loading = ({ size = 'large' }: { size?: 'small' | 'large' | number }) => (
  <View style={styles.center}>
    <ActivityIndicator size={size as any} />
  </View>
);

const styles = StyleSheet.create({
  center: { padding: 24, alignItems: 'center', justifyContent: 'center' },
});
