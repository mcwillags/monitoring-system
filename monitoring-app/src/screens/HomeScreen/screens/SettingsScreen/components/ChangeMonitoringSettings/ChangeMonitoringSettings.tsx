import { StyleSheet, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector, useTextField } from '@hooks';

import { MonitoringSettings } from '@models';

import { changeMonitoringSettings } from '@store/user/user.action.creators';
import { selectIsMonitoring } from '@store/user/user.selectors';

import {
  createToastError,
  defaultFontStyle,
  generateAuthError,
  validateMonitoringSettings,
} from '@utils';

import { formStyles } from '@common/styles';
import { AppButton, AppTextInput } from '@common/components';


export const ChangeMonitoringSettings = ({
  maxTemperatureLevel,
  maxHeartRateLevel,
  minOxygenLevel,
}: MonitoringSettings) => {
  const dispatch = useAppDispatch();
  const isMonitoring = useAppSelector(selectIsMonitoring);
  const heartRate = useTextField(String(maxHeartRateLevel), {
    numeric: true,
    required: true,
    minLength: 2,
    maxLength: 3,
  });
  const oxygen = useTextField(String(minOxygenLevel), {
    numeric: true,
    required: true,
    minLength: 2,
    maxLength: 3,
  });
  const temperature = useTextField(String(maxTemperatureLevel), {
    float: true,
    required: true,
    minLength: 2,
    maxLength: 5,
  });

  const handleChangeMonitoringSettings = () => {
    if (!isValid) return;
    if (isMonitoring) {
      createToastError('Не можливо змінити дан під час моніторингу');
      return;
    }

    const body = validateMonitoringSettings({
      oxygen: oxygen.value,
      heartRate: heartRate.value,
      temperature: temperature.value,
    });

    if (body === null) {
      createToastError('Неправильно введені моніторингові дані');
      return;
    }

    dispatch(changeMonitoringSettings(body));
  };

  const heartRateErrorItem = generateAuthError(heartRate.touched, heartRate.error);
  const oxygenErrorItem = generateAuthError(oxygen.touched, oxygen.error);
  const temperatureErrorItem = generateAuthError(temperature.touched, temperature.error);

  const isValid = heartRate.isValid && oxygen.isValid && temperature.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={[styles.formHeader, defaultFontStyle]}>Змінити налаштування моніторингу.</Text>

      <View>
        <View style={styles.formItem}>
          <AppTextInput
            {...heartRate}
            label={'Введіть максимальний рівень пульсу'}
            placeholder={'Рівень пульсу'}
          />
          {heartRateErrorItem}
        </View>
        <View style={styles.formItem}>
          <AppTextInput
            {...oxygen}
            label={'Введіть мінімальний рівень кисню'}
            placeholder={'Рівень кисню'}
          />
          {oxygenErrorItem}
        </View>
        <View style={styles.formItem}>
          <AppTextInput
            {...temperature}
            label={'Введіть максимальний рівень температури'}
            placeholder={'Рівень температури'}
          />
          {temperatureErrorItem}
        </View>

        <View>
          <AppButton
            onPress={handleChangeMonitoringSettings}
            isDisabled={!isValid}
            text="Змінити показники"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...formStyles,
});
