import {useColorScheme} from 'react-native';

import 'react-native-reanimated';
import 'translations';

import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {persistedStore, store} from 'store';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="screens" options={{headerShown: false}} />
          </Stack>
          <StatusBar style="dark" />
        </PersistGate>
      </Provider>
  );
}
