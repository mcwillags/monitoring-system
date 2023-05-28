import { ScrollView, StyleSheet, View } from 'react-native';
import { AppButton } from '@common/components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectIsMonitoring } from '@store/user/user.selectors';
import { setIsMonitoring } from '@store/user/user.slice';

export const ConnectionScreen = () => {
  const dispatch = useAppDispatch();
  const isMonitoring = useAppSelector(selectIsMonitoring);
  const handleStartMonitoring = () => {
    dispatch(setIsMonitoring(true));
  };

  const handleStopMonitoring = () => {
    dispatch(setIsMonitoring(false));
  };

  const buttonItem = isMonitoring ? (
    <AppButton color="#d93030" onPress={handleStopMonitoring} text="Перестати відстежувати показники" />
  ) : (
    <AppButton onPress={handleStartMonitoring} text="Почати відстежувати показники" />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>{buttonItem}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },
  devicesContainer: {
    paddingVertical: 20,
  },
  buttonContainer: {},
  devicesHeader: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  deviceItemContainer: {
    marginBottom: 20,
  },
});
