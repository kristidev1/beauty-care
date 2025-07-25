/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import {useColorScheme} from 'react-native';

import {colors} from 'cons';

export function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof colors.light & keyof typeof colors.dark,
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return colors[theme][colorName];
}
