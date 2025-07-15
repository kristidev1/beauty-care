import React from 'react';
import {Stack} from 'expo-router';
import {useColorScheme} from 'react-native';
import {colors} from 'cons';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors[colorScheme ?? 'light'].background,
        },
        headerTintColor: colors[colorScheme ?? 'light'].text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* Tab screens */}
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />

      {/* Modal or full-screen pages */}
      <Stack.Screen
        name="barber/[id]"
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="barber/booking"
        options={{
          title: 'Book Appointment',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          title: 'Payment',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: 'Search',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
