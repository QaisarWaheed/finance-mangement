import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useStore } from '@/_store/useStore';

export default function Settings() {
  const settings = useStore((s) => s.settings);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: '800' }}>Settings</Text>

      <View style={{ marginTop: 16 }}>
        <Text>Dark mode</Text>
        <Switch value={settings.darkMode} onValueChange={() => alert('Toggle (mock)')} />
      </View>

      <View style={{ marginTop: 16 }}>
        <Text>Notifications</Text>
        <Switch value={settings.notifications} onValueChange={() => alert('Toggle (mock)')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, });