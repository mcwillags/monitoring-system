import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppDispatch, useTextField } from '@hooks';

import { UserCredentials } from '@models';
import { loginUser } from '@store/user/user.action.creators';

import { formStyles } from '@common/styles';
import { AppTextInput, AppButton, AppLink, AppPasswordInput } from '@common/components';

import { defaultFontStyle, generateAuthError } from '@utils';

import { RootStackParamList, screenNames } from '@routes';


type LoginScreenProps = NativeStackScreenProps<RootStackParamList>;
export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const email = useTextField('', {
    required: true,
    minLength: 6,
    maxLength: 50,
    email: true,
    noSpaces: true,
  });
  const password = useTextField('', { required: true, minLength: 6, maxLength: 70 });

  const dispatch = useAppDispatch();

  const handleFormSubmit = () => {
    const userCredentials: UserCredentials = {
      email: email.value,
      password: password.value,
    };

    dispatch(loginUser(userCredentials));
  };

  const redirectToRegister = () => {
    navigation.navigate(screenNames.REGISTER);
  };

  const emailErrorItem = generateAuthError(email.touched, email.error);
  const passwordErrorItem = generateAuthError(password.touched, password.error);
  const isFormValid = password.isValid && email.isValid;

  return (
    <ScrollView>
      <View style={styles.loginContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={[styles.welcomeHeader, defaultFontStyle]}>З поверненням!</Text>
          <Text style={[styles.welcomeText, defaultFontStyle]}>
            Введіть ваші дані щоб продовжити.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formItem}>
            <AppTextInput {...email} label={'Введіть пошту'} placeholder={'Пошта'} />
            {emailErrorItem}
          </View>
          <View style={styles.formItem}>
            <AppPasswordInput {...password} label={'Введіть пароль'} placeholder={'Пароль'} />
            {passwordErrorItem}
          </View>

          <View style={styles.formItem}>
            <AppButton text={'Продовжити'} onPress={handleFormSubmit} isDisabled={!isFormValid} />
          </View>

          <View style={styles.formItem}>
            <Text style={[styles.formLink, defaultFontStyle]}>Не зареєстровані?</Text>
            <AppLink onPress={redirectToRegister} text={'Створити профіль'} center />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flex: 1,
  },

  ...formStyles,
});
