import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Text style={styles.title}>Track expenses effortlessly</Text>
        <Text style={styles.sub}>Log expenses, categorize them, and visualize where money goes.</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>Set budgets & goals</Text>
        <Text style={styles.sub}>Keep your monthly spending under control with budget targets.</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>Reports & insights</Text>
        <Text style={styles.sub}>Weekly and monthly summaries with clear charts.</Text>
      </View>

      <View style={styles.footer}>
        <Link href="/login">
          <Link.Trigger>
            <Pressable style={styles.button}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Get started</Text>
            </Pressable>
          </Link.Trigger>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'space-between' },
  slide: { marginTop: 12 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 6 },
  sub: { color: '#6B7280' },
  footer: { paddingBottom: 40 },
  button: { backgroundColor: '#2E9CCA', padding: 14, borderRadius: 12, alignItems: 'center' },
});