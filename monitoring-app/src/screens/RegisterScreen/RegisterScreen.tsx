import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SelectDropdown from 'react-native-select-dropdown';

import { useAppDispatch, useTextField } from '@hooks';

import { CreateUser } from '@models';

import { registerUser } from '@store/user/user.action.creators';

import { formStyles } from '@common/styles';
import { AppButton, AppLink, AppTextInput, AppPasswordInput } from '@common/components';

import {
  createToastError,
  defaultFontStyle,
  generateAuthError,
  requestAvailableRegions,
} from '@utils';

import { RootStackParamList, screenNames } from '@routes';
import { KeyboardAvoidingWrapper } from '@components';

const NO_SELECT_VALUE = 'NO_SELECTED';

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList>;
export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const email = useTextField('', {
    required: true,
    minLength: 6,
    maxLength: 50,
    email: true,
    noSpaces: true,
  });
  const password = useTextField('', { required: true, minLength: 6, maxLength: 70 });
  const fullName = useTextField('', { required: true, maxLength: 70 });
  const badgeNumber = useTextField('', {
    required: true,
    noSpaces: true,
    maxLength: 70,
  });
  const brigadeNumber = useTextField('', {
    required: true,
    noSpaces: true,
    maxLength: 70,
  });
  const [selectedItem, setSelectedItem] = useState(NO_SELECT_VALUE);
  const [regions, setRegions] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const handleFormSubmit = () => {
    if (!isValid) return;

    if (selectedItem === NO_SELECT_VALUE) {
      createToastError('Будь ласка, виберіть регіон');
      return;
    }

    const userInfo: CreateUser = {
      email: email.value,
      password: password.value,
      fullName: fullName.value,
      badgeNumber: badgeNumber.value.toLowerCase(),
      brigadeNumber: brigadeNumber.value.toLowerCase(),
      region: selectedItem,
    };

    dispatch(registerUser(userInfo));
  };

  useEffect(() => {
    const getRegions = async () => {
      const regions = await requestAvailableRegions();

      if (regions !== undefined) {
        setRegions(regions);
      }
    };

    getRegions();
  }, []);

  const redirectToLogin = () => {
    navigation.navigate(screenNames.LOGIN);
  };

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
  };

  const emailErrorItem = generateAuthError(email.touched, email.error);
  const passwordErrorItem = generateAuthError(password.touched, password.error);
  const fullNameErrorItem = generateAuthError(fullName.touched, fullName.error);
  const badgeNumberErrorItem = generateAuthError(badgeNumber.touched, badgeNumber.error);
  const brigadeNumberErrorItem = generateAuthError(brigadeNumber.touched, brigadeNumber.error);

  const isValid =
    email.isValid &&
    password.isValid &&
    fullName.isValid &&
    badgeNumber.isValid &&
    brigadeNumber.isValid &&
    selectedItem !== NO_SELECT_VALUE;

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.registerContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeHeader}>Створити профіль.</Text>
          <Text style={styles.welcomeText}>Створіть профіль, щоб продовжити.</Text>
          <Text style={styles.formLink}>Якщо маєте профіль, тоді</Text>
          <AppLink onPress={redirectToLogin} text={'Можете ввійти в систему.'} center />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formItem}>
            <AppTextInput label={'Введіть пошту'} placeholder={'Пошта'} {...email} />
            {emailErrorItem}
          </View>

          <View style={styles.formItem}>
            <AppPasswordInput label={'Введіть пароль'} placeholder={'Пароль'} {...password} />
            {passwordErrorItem}
          </View>

          <View style={styles.formItem}>
            <AppTextInput
              label={"Введіть ваше повне ім'я"}
              placeholder={"Повне ім'я"}
              {...fullName}
            />
            {fullNameErrorItem}
          </View>

          <View style={styles.formItem}>
            <AppTextInput
              label={'Введіть номер значка'}
              placeholder={'Номер значка'}
              {...badgeNumber}
            />
            {badgeNumberErrorItem}
          </View>

          <View style={styles.formItem}>
            <AppTextInput
              label={'Введіть номер бригади'}
              placeholder={'Номер бригади'}
              {...brigadeNumber}
            />
            {brigadeNumberErrorItem}
          </View>

          <View style={styles.formItem}>
            <SelectDropdown
              data={regions}
              buttonStyle={{ ...styles.selectButton, ...defaultFontStyle }}
              defaultValue={NO_SELECT_VALUE}
              defaultButtonText={'Виберіть область'}
              onSelect={handleSelectItem}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem;
              }}
              rowTextForSelection={(item) => {
                return item;
              }}
            />
          </View>

          <View style={styles.formItem}>
            <AppButton text={'Створити профіль'} onPress={handleFormSubmit} isDisabled={!isValid} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    paddingBottom: 50,
    flex: 1,
  },

  selectButton: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },

  ...formStyles,
});
