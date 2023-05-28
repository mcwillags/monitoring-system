import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { useBluetooth } from '@lib/BluetoothConnection';
import {Ionicons} from "@expo/vector-icons";

interface WearableDeviceProps {
  device: Device;
}

export const WearableDevice = ({ device }: WearableDeviceProps) => {
  const { connectToDevice } = useBluetooth();

  const handleConnectDevice = () => {
    connectToDevice(device);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Ionicons name="watch-sharp" size={24} color="black" />
        <Text style={styles.deviceName}>{device.name}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleConnectDevice} style={styles.linkButton}>
          <Text style={styles.linkButtonText}>Connect to this device</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#6e6e6e",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  linkButton: {
    backgroundColor: '#535bf2',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  deviceName: {
    fontSize: 18,
    marginLeft: 10,
  },

  linkButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
