import { Tabs } from 'expo-router/tabs';
import React from 'react';
import { Dimensions } from 'react-native';

import { HapticTab } from '@/_components/haptic-tab';
import { IconSymbol } from '@/_components/ui/icon-symbol';
import { Colors } from '@/_constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width: screenWidth } = Dimensions.get('window');
  const isSmallScreen = screenWidth < 375;
  const iconSize = isSmallScreen ? 24 : 28;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingBottom: isSmallScreen ? 5 : 10,
          paddingTop: isSmallScreen ? 5 : 10,
          height: isSmallScreen ? 60 : 70,
        },
        tabBarLabelStyle: {
          fontSize: isSmallScreen ? 10 : 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={iconSize} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={iconSize} name="chart.bar.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={iconSize} name="list.bullet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={iconSize} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
