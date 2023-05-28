import { PermissionsAndroid } from 'react-native';
import * as ExpoDevice from "expo-device";

export const requestAndroid31Permissions = async () => {
  const bluetoothScanPermissions = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    {
      title: 'Allow application to scan bluetooth devices',
      message: 'App requires Bluetooth Scanning',
      buttonPositive: 'Allow',
      buttonNegative: 'Cancel',
    }
  );

  const bluetoothConnectPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    {
      title: 'Connect Permission',
      message: 'App requires Bluetooth Connecting',
      buttonPositive: 'Allow',
      buttonNegative: 'Cancel',
    }
  );

  const bluetoothFineLocationPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.FINE_LOCATION,
    {
      title: 'Fine Location',
      message: 'App requires fine location',
      buttonPositive: 'Allow',
      buttonNegative: 'Cancel',
    }
  );

  return (
    bluetoothScanPermissions === 'granted' &&
    bluetoothConnectPermission === 'granted' &&
    bluetoothFineLocationPermission === 'granted'
  );
};

export const isAndroidDeviceBelow31 = (ExpoDevice.platformApiLevel ?? -1) < 31;