import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { Ionicons } from '@expo/vector-icons';
import { useBluetooth } from '@lib/BluetoothConnection';

interface ConnectedDeviceProps {
  device: Device;
}

export const ConnectedDevice = ({ device }: ConnectedDeviceProps) => {
  const { disconnectFromDevice, monitorForService } = useBluetooth();

  const handleDisconnectDevice = () => {
    disconnectFromDevice(device);
  };

  const handleStartMonitoring = () => {
    monitorForService(device);
  }

  return (
    <View>
      <Text style={styles.header}>Connected to: </Text>

      <View style={styles.infoContainer}>
        <Ionicons name="watch-sharp" size={24} color="black" />
        <Text style={styles.deviceName}>{device.name}</Text>
      </View>

      <TouchableOpacity onPress={handleDisconnectDevice} style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Disconnect from this device</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleStartMonitoring} style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Monitor something</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#6e6e6e',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  header: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  deviceName: {
    fontSize: 18,
    marginLeft: 10,
  },
  linkButton: {
    backgroundColor: '#535bf2',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 25,
  },
  linkButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
