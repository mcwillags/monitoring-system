import { createContext, ReactNode, useContext, useState } from 'react';
import {
  BluetoothLowEnergyApi,
  DisconnectFromDeviceCallback,
  ScanForPeripheralsCallback,
} from '../types';
import { Base64, BleManager, Device } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import { isAndroidDeviceBelow31, requestAndroid31Permissions } from '../utils';
import { allowedDevices } from '@lib/DeviceConnection';
import { decode as atob, encode as btoa } from 'base-64';
import aesjs from 'aes-js';

// const bluetoothKey = btoa('\xe9\xd3\xc6\xd1\x84\xaf\x5b\x2f\x3b\x74\x68\x1d\x9e\x35\xee\x62');
// const bluetoothKey = btoa('\xe9\xd3\xc6\xd1\x84\xaf\x5b\x2f\x3b\x74\x68\x1d\x9e\x35\xee\x62');
const bluetoothKey = btoa('\x01\x23\x45\x67\x89\x01\x22\x23\x34\x45\x56\x67\x78\x89\x90\x02');
const iv = btoa('\x03\x02\x04\x05\x06\x07\x08\x09\x08\x03\x02\x04\x05\x06\x08\x05');

const encryptAES = async (key: Uint8Array, encryptInfo: Uint8Array) => {};

const base64ToArrayBuffer = (base64: Base64) => {
  const binaryString: string = atob(base64);
  const length = binaryString.length;

  const bytes = new Uint8Array(length);

  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
};
const concatArrayAndCommand = (command: number[], array: Uint8Array) => {
  const uArray = new Uint8Array([...command, ...array]);

  return uArray;
};

const arrayToBase64 = (array: Uint8Array) => {
  return btoa(String.fromCharCode.apply(null, [...array]));
};

interface BluetoothContextProviderProps {
  children: ReactNode;
}

type DevicesState = Record<string, Device>;

const BluetoothContext = createContext({} as BluetoothLowEnergyApi);

export const useBluetooth = () => {
  return useContext(BluetoothContext);
};

// const bleManager = new BleManager();

export const BluetoothContextProvider = ({ children }: BluetoothContextProviderProps) => {
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [devicesToConnect, setDevicesToConnect] = useState<DevicesState>({});
  const [isScanning, setIsScanning] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS === 'ios') return true;

    if (Platform.OS === 'android' && isAndroidDeviceBelow31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Bluetooth requires Location',
          buttonPositive: 'OK',
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return await requestAndroid31Permissions();
  };

  const connectToBluetooth = async () => {
    await bleManager.enable();
  };

  const isDuplicateDevice = (device: Device) => {
    return Boolean(devicesToConnect[device.id]);
  };

  const scanForPeripherals = async (callback?: ScanForPeripheralsCallback) => {
    if ((await bleManager.state()) === 'PoweredOff' && callback) {
      callback(false);
      return;
    }

    setIsScanning(true);

    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        return;
      }

      if (scannedDevice) {
        if (scannedDevice.name === null) return;
        if (isDuplicateDevice(scannedDevice)) return;
        if (!allowedDevices[scannedDevice.name]) return;

        setDevicesToConnect((prev) => ({ ...prev, [scannedDevice.id]: scannedDevice }));
      }
    });
  };

  const stopScanning = () => {
    setDevicesToConnect({});
    setIsScanning(false);
    bleManager.stopDeviceScan();
  };

  const streamingData = async (device: Device) => {
    const subscription = device.monitorCharacteristicForService(
      '0000180d-0000-1000-8000-00805f9b34fb',
      '00002a37-0000-1000-8000-00805f9b34fb',
      (error, characteristic) => {
        if (error) {
          console.log(`Error:`);
          console.log(error);
          console.log(error.reason);
          return;
        }
        console.log(`Characteristics: `);
        console.log(characteristic);
      }
    );
  };

  const requestKey = (device: Device) => {
    //STEP 3 ------ Requesting band's key, will be watched by our monitor

    device
      .writeCharacteristicWithoutResponseForService(
        '0000fee1-0000-1000-8000-00805f9b34fb',
        '00000009-0000-3512-2118-0009af100700',
        btoa('\x02\x00')
      )
      .catch((e) => {
        console.log(e);
      });
  };

  const monitorForService = async (device: Device) => {
    const isConnected = await bleManager.isDeviceConnected(device.id);

    if (!isConnected) {
      await bleManager.connectToDevice(device.id);
    }

    await device.discoverAllServicesAndCharacteristics();
  };

  const writeToAuthService = (device: Device, value: Base64) => {
    return device.writeCharacteristicWithoutResponseForService(
      '0000fee1-0000-1000-8000-00805f9b34fb',
      '00000009-0000-3512-2118-0009af100700',
      btoa(value)
    );
  };

  const sendAuthKey = (device: Device, key: Base64) => {
    return device.writeCharacteristicWithoutResponseForService(
      '0000fee1-0000-1000-8000-00805f9b34fb',
      '00000009-0000-3512-2118-0009af100700',
      key
    );
  };

  const requestForRandomKey = (device: Device) => {
    return device.writeCharacteristicWithoutResponseForService(
      '0000fee1-0000-1000-8000-00805f9b34fb',
      '00000009-0000-3512-2118-0009af100700',
      btoa('\x02\x00')
    );
  };

  const enableReadingResponses = (device: Device, callback: (deviceKey: Base64) => void) => {
    return device.monitorCharacteristicForService(
      '0000fee1-0000-1000-8000-00805f9b34fb',
      '00000009-0000-3512-2118-0009af100700',
      (error, characteristic) => {
        if (error) {
          console.log(`Error: ${error}`);
          return;
        }

        if (characteristic === null) return;
        console.log('Characteristic: ')
        console.log(characteristic.value);

        if (characteristic.value === null) return;
        if (characteristic.value.length > 4) {
          callback(characteristic.value);
        }
      }
    );
  };

  const sendEncryptedKey = (deviceKey: Base64, bluetoothKey: Base64, device: Device) => {
    const device16BytesString = deviceKey.substring(4);

    const deviceKeyBytes = base64ToArrayBuffer(device16BytesString);
    const bluetoothKeyBytes = base64ToArrayBuffer(bluetoothKey);
    const ivBytes = base64ToArrayBuffer(iv);

    // const encryptor = new aesjs.ModeOfOperation.ecb(bluetoothKeyBytes);
    // const encryptor = new aesjs.ModeOfOperation.cbc(bluetoothKeyBytes, ivBytes);
    const encryptor = new aesjs.AES(bluetoothKeyBytes);
    const encryptedBytes = encryptor.encrypt(deviceKeyBytes);

    const encryptedKey = concatArrayAndCommand([3, 0], encryptedBytes as Uint8Array);

    console.log(arrayToBase64(encryptedKey))

    return device.writeCharacteristicWithoutResponseForService(
      '0000fee1-0000-1000-8000-00805f9b34fb',
      '00000009-0000-3512-2118-0009af100700',
      arrayToBase64(encryptedKey)
    );
  };

  const connectToDevice = async (device: Device) => {
    if (connectedDevice) return;

    stopScanning();

    const newDeviceConnection = await bleManager.connectToDevice(device.id);

    await newDeviceConnection.discoverAllServicesAndCharacteristics();

    await writeToAuthService(newDeviceConnection, '\x01\x00');

    await enableReadingResponses(newDeviceConnection, (deviceKey) => {
      sendEncryptedKey(deviceKey, bluetoothKey, newDeviceConnection);
    });

    await writeToAuthService(newDeviceConnection, '\x82\x00\x02');

    setConnectedDevice(newDeviceConnection);

    const key = concatArrayAndCommand([0, 4, 0], base64ToArrayBuffer(bluetoothKey));

    await sendAuthKey(newDeviceConnection, arrayToBase64(key));

    await requestForRandomKey(newDeviceConnection);
  };

  const disconnectFromDevice = async (device: Device, callback?: DisconnectFromDeviceCallback) => {
    const isDeviceConnected = await device.isConnected();
    const isDeviceConnectedToBLE = await bleManager.isDeviceConnected(device.id);

    console.log(`Device connected: ${isDeviceConnected}`);
    console.log(`Device connected to ble: ${isDeviceConnectedToBLE}`);

    if (!isDeviceConnected) {
      setConnectedDevice(null);
    }

    await bleManager.cancelDeviceConnection(device.id);
    setConnectedDevice(null);
    await device.cancelConnection();
  };

  return (
    <BluetoothContext.Provider
      value={{
        scanForPeripherals,
        stopScanning,
        connectToBluetooth,
        requestPermissions,
        disconnectFromDevice,
        connectToDevice,
        monitorForService,
        isScanning,
        connectedDevice,
        devicesToConnect: Object.values(devicesToConnect),
      }}>
      {children}
    </BluetoothContext.Provider>
  );
};
