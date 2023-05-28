import { StyleSheet, Text, View } from 'react-native';

import { useAppDispatch, useTextField } from '@hooks';

import { changePassword } from '@store/user/user.action.creators';

import { formStyles } from '@common/styles';
import { AppButton, AppPasswordInput } from '@common/components';

import { defaultFontStyle, generateAuthError } from '@utils';

export const ChangePasswordForm = () => {
  const dispatch = useAppDispatch();

  const password = useTextField('', { required: true, minLength: 6, maxLength: 70 });
  const newPassword = useTextField('', { required: true, minLength: 6, maxLength: 70 });

  const passwordErrorItem = generateAuthError(password.touched, password.error);
  const newPasswordErrorItem = generateAuthError(newPassword.touched, newPassword.error);

  const isValid = password.isValid && newPassword.isValid;

  const handleChangePassword = () => {
    if (!isValid) return;

    dispatch(
      changePassword({
        password: password.value,
        newPassword: newPassword.value,
      })
    );
  };

  return (
    <View>
      <Text style={[styles.formHeader, defaultFontStyle]}>Змінити пароль.</Text>
      <View style={styles.formItem}>
        <AppPasswordInput {...password} label={'Введіть пароль'} placeholder={'Пароль'} />
        {passwordErrorItem}
      </View>
      <View style={styles.formItem}>
        <AppPasswordInput
          {...newPassword}
          label={'Введіть новий пароль'}
          placeholder={'Новий пароль'}
        />
        {newPasswordErrorItem}
      </View>

      <View>
        <AppButton isDisabled={!isValid} onPress={handleChangePassword} text="Змінити пароль" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...formStyles,
});
