import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@hooks';

import {
  selectMonitoringSettings,
  selectMonitoringSettingsLoading,
  selectUserBrigadeNumber,
} from '@store/user/user.selectors';
import { getMonitoringSettings, logOut } from '@store/user/user.action.creators';

import { formStyles } from '@common/styles';
import { AppButton } from '@common/components';

import {HorizontalLine, BubbleProgress, KeyboardAvoidingWrapper} from '@components';
import { ChangeBrigadeForm, ChangeMonitoringSettings, ChangePasswordForm } from './components';


export const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const isMonitoringSettingsLoading = useAppSelector(selectMonitoringSettingsLoading);
  const monitoringSettings = useAppSelector(selectMonitoringSettings);
  const userBrigadeNumber = useAppSelector(selectUserBrigadeNumber);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleRequestMonitoringSettings = () => {
    dispatch(getMonitoringSettings());
  };

  const monitoringSettingsForm = isMonitoringSettingsLoading ? (
    <BubbleProgress />
  ) : monitoringSettings !== null ? (
    <ChangeMonitoringSettings {...monitoringSettings} />
  ) : (
    <AppButton onPress={handleRequestMonitoringSettings} text="Загрузити моніторингові показники" />
  );

  const brigadeNumberForm = userBrigadeNumber ? (
    <ChangeBrigadeForm brigadeNumber={userBrigadeNumber} />
  ) : (
    <View>
      <Text>Не вдалось отримати номер бригати</Text>
    </View>
  );

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.pageContainer}>

        <View style={styles.formContainer}>{monitoringSettingsForm}</View>

        <HorizontalLine />

        <View style={styles.formContainer}>{brigadeNumberForm}</View>

        <HorizontalLine />

        <View style={styles.formContainer}>
          <ChangePasswordForm />
        </View>

        <HorizontalLine />

        <View>
          <AppButton onPress={handleLogout} text={'Вийти'} color={'#9a4141'} />
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  ...formStyles,
  pageContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 25,
    flex: 1,
  },
  formContainer: {
    paddingVertical: 20,
  },

  last: {
    marginBottom: 25,
  },
});
