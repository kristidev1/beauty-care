import {PropsWithChildren, useState} from 'react';
import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';

import {IconSymbol, ThemedText, ThemedView} from 'components';

import {colors} from 'cons';

export function Collapsible({children, title}: PropsWithChildren & {title: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen(value => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === 'light' ? colors.light.icon : colors.dark.icon}
          style={{transform: [{rotate: isOpen ? '90deg' : '0deg'}]}}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
