import {Platform, StyleSheet} from 'react-native';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {BlurView} from 'expo-blur';

export function BlurTabBarBackground() {
  if (Platform.OS === 'ios')
    return (
      <BlurView
        // System chrome material automatically adapts to the system's theme
        // and matches the native tab bar appearance on iOS.
        tint="systemChromeMaterial"
        intensity={100}
        style={StyleSheet.absoluteFill}
      />
    );

  return undefined;
}

export function useBottomTabOverflow() {
  const tabBarHeight = useBottomTabBarHeight();
  return Platform.OS === 'ios' ? tabBarHeight : 0;
}
