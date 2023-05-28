import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { defaultFontStyle } from '@utils';
import { useBooleanToggle } from '@hooks';

interface TextInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  onBlur: () => void;
  onChangeText: (newValue: string) => void;
}

export const AppTextInput = ({ label, placeholder, ...props }: TextInputProps) => {
  const textLabel = label ? (
    <Text style={[styles.inputLabel, defaultFontStyle]}>{label}</Text>
  ) : null;

  return (
    <View>
      {textLabel}
      <TextInput style={[styles.input, defaultFontStyle]} placeholder={placeholder} {...props} />
    </View>
  );
};

export const AppPasswordInput = ({ label, placeholder, ...props }: TextInputProps) => {
  const [isToggled, toggle] = useBooleanToggle(false);

  const textLabel = label ? (
    <Text style={[styles.inputLabel, defaultFontStyle]}>{label}</Text>
  ) : null;

  const buttonIcon = isToggled ? (
    <Entypo name="eye-with-line" size={20} color="black" />
  ) : (
    <Entypo name="eye" size={20} color="black" />
  );

  return (
    <View>
      {textLabel}
      <TextInput
        style={[styles.passwordInput, defaultFontStyle]}
        placeholder={placeholder}
        secureTextEntry={!isToggled}
        {...props}
      />
      <TouchableOpacity style={styles.passwordToggle} onPress={() => toggle()}>
        {buttonIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    marginBottom: 10,
  },

  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },

  passwordInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    height: 50,
    borderRadius: 10,
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 45,
  },

  passwordToggle: {
    height: 50,
    width: 35,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderColor: "#000",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
