import { Alert } from 'react-native';

type AcceptCallback = () => void;

export const createBluetoothAlert = (callback: AcceptCallback) => {
  Alert.alert(
    'Bluetooth is not enabled',
    'This application requires bluetooth connection. Enable bluetooth?',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Enable',
        onPress: callback,
      },
    ]
  );
};
