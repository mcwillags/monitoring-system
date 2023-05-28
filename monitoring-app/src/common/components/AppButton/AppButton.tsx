import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { defaultFontStyle } from '@utils';

interface AppButtonProps {
  text: string;
  onPress: () => void;
  color?: string;
  isDisabled?: boolean;
}

export const AppButton = ({ text, onPress, isDisabled, color = undefined }: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: color ?? '#535bf2',
        opacity: isDisabled ? 0.75 : 1,
      }}
      onPress={onPress}
      disabled={isDisabled}>
      <Text style={[styles.buttonText, defaultFontStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    paddingVertical: 10,
    border: '1px solid #282ea4',
    borderRadius: 10,
  },
  buttonText: {
    height: '100%',
    lineHeight: 25,
    textAlign: 'center',
    color: '#fff',
  },
});
