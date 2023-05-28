import { View } from 'react-native';

import {useAppDispatch, useAppSelector} from '@hooks';
import { selectIsMonitoring } from '@store/user/user.selectors';
import {setIsMonitoring} from "@store/user/user.slice";

import { AppButton } from '@common/components';


interface MonitoringControlsProps {
  startMonitoring: () => void;
  stopMonitoring: () => void;
}

export const MonitoringControls = ({
  stopMonitoring,
  startMonitoring,
}: MonitoringControlsProps) => {
  const isMonitoring = useAppSelector(selectIsMonitoring);
  const dispatch = useAppDispatch();

  const handleStartMonitoring = () => {
    startMonitoring();
    dispatch(setIsMonitoring(true));
  }

  const handleStopMonitoring = () => {
    stopMonitoring();
    dispatch(setIsMonitoring(false));
  }

  const buttonItem = isMonitoring ? (
    <AppButton color="#d93030" onPress={handleStopMonitoring} text="Перестати відстежувати показники" />
  ) : (
    <AppButton onPress={handleStartMonitoring} text="Почати відстежувати показники" />
  );

  return <View>{buttonItem}</View>;
};
