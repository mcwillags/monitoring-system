import { Device } from 'react-native-ble-plx';

export type ScanForPeripheralsCallback = (isConnected: boolean) => void;

export type DisconnectFromDeviceCallback = (error: string) => void;

export interface BluetoothLowEnergyApi {
  scanForPeripherals: (callback?: ScanForPeripheralsCallback) => Promise<void>;
  connectToBluetooth: () => void;
  stopScanning: () => void;
  requestPermissions: () => Promise<boolean>;
  connectToDevice: (device: Device) => void;
  disconnectFromDevice: (device: Device, callback?: DisconnectFromDeviceCallback) => void;
  devicesToConnect: Device[];
  monitorForService: (device: Device) => void;
  connectedDevice: Device | null;
  isScanning: boolean;
}
