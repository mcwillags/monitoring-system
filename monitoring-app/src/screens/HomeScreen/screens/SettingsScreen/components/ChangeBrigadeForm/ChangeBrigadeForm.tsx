import { StyleSheet, Text, View } from 'react-native';

import {useAppDispatch, useAppSelector, useTextField} from '@hooks';

import {changeUserBrigade} from "@store/user/user.action.creators";
import {selectConnectionRoomCode, selectIsMonitoring} from "@store/user/user.selectors";

import {disconnectFromRoom} from "@src/sockets";

import { formStyles } from '@common/styles';
import { AppButton, AppTextInput } from '@common/components';

import {createToastError, defaultFontStyle, generateAuthError} from '@utils';

interface ChangeBrigadeFormProps {
  brigadeNumber: string;
}

export const ChangeBrigadeForm = ({ brigadeNumber }: ChangeBrigadeFormProps) => {
  const dispatch = useAppDispatch();
  const isMonitoring = useAppSelector(selectIsMonitoring);
  const connectionRoomCode = useAppSelector(selectConnectionRoomCode);
  const brigadeNumberInput = useTextField(brigadeNumber, {
    required: true,
    noSpaces: true,
    maxLength: 70,
  });

  const handleChangeBrigade = () => {
    if (!brigadeNumberInput.isValid) return;
    if (isMonitoring) {
      createToastError("Не можливо змінити дані під час моніторингу");
      return;
    }

    if (connectionRoomCode) {
      disconnectFromRoom(connectionRoomCode)
    }

    dispatch(changeUserBrigade({
      brigadeNumber: brigadeNumberInput.value
    }))
  };

  const brigadeNumberErrorItem = generateAuthError(
    brigadeNumberInput.touched,
    brigadeNumberInput.error
  );

  return (
    <View style={styles.formContainer}>
      <Text style={[styles.formHeader, defaultFontStyle]}>Змінити номер бригади.</Text>
      <View>
        <View style={styles.formItem}>
          <AppTextInput
            label={'Введіть номер бригади'}
            placeholder={'Номер бригади'}
            {...brigadeNumberInput}
          />
          {brigadeNumberErrorItem}
        </View>

        <View>
          <AppButton
            onPress={handleChangeBrigade}
            isDisabled={!brigadeNumberInput.isValid}
            text="Змінити номер бригади"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...formStyles,
});
