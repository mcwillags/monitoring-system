import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { defaultFontStyle } from '@utils';

interface AppLinkProps {
  onPress: () => void;
  text: string;
  center: boolean;
}

export const AppLink = ({ onPress, text, center }: AppLinkProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          ...styles.appLink,
          textAlign: center ? 'center' : undefined,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appLink: {
    color: '#535bf2',
    border: '1px solid #000',
    ...defaultFontStyle,
  },
});
