import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AntDesign, Ionicons, FontAwesome5 } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector, useMonitoringData } from '@hooks';

import {
  selectConnectionRoomCode,
  selectIsMonitoring,
  selectMonitoringSettings,
  selectUser,
  selectUserBrigadeNumber,
  selectUserRegion,
} from '@store/user/user.selectors';
import { setConnectionRoomCode } from '@store/user/user.slice';

import {
  requestConnection,
  receiveConnectionCode,
  connectToRoom,
  sendSocketData,
} from '@src/sockets';

import { useConfigs } from '@lib/StreamVitalData/constants';

import { defaultFontStyle, formatTemperature, createToastError } from '@utils';

import { HorizontalLine } from '@components';
import { MonitoredValue, MonitoringControls } from './components';

export const MainScreen = () => {
  const dispatch = useAppDispatch();
  const isMonitoring = useAppSelector(selectIsMonitoring);
  const monitoringSettings = useAppSelector(selectMonitoringSettings);
  const connectionRoomCode = useAppSelector(selectConnectionRoomCode);
  const brigadeNumber = useAppSelector(selectUserBrigadeNumber);
  const region = useAppSelector(selectUserRegion);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!brigadeNumber || !region) return;

    requestConnection(region, brigadeNumber);

    receiveConnectionCode((connectionCode) => {
      if (!connectionCode) return;
      connectToRoom(connectionCode);
      dispatch(setConnectionRoomCode(connectionCode));
    });
  }, [user]);

  const { data, startStreamingData, stopStreamingData } = useMonitoringData(useConfigs, 1750);
  const { oxygen, temperature, heartRate } = data;

  useEffect(() => {
    if (!isMonitoring) return;

    handleSendMessage();
  }, [data]);

  const handleSendMessage = () => {
    if (!monitoringSettings || !user) return;
    if (!connectionRoomCode) {
      createToastError("Couldn't connect to server monitoring service");
      return;
    }

    sendSocketData(user, data, monitoringSettings, connectionRoomCode);
  };

  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <View>
          <Text style={styles.welcomeText}>Вітаємо, {user?.fullName}</Text>
          <Text style={styles.pageHeader}>Моніторинг</Text>
        </View>

        <HorizontalLine />

        <MonitoringControls
          stopMonitoring={stopStreamingData}
          startMonitoring={startStreamingData}
        />

        <HorizontalLine />

        {isMonitoring ? (
          <View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Життєві показники: </Text>
            </View>

            <View style={styles.itemContainer}>
              <MonitoredValue
                icon={<AntDesign name="heart" size={24} color="#d93030" />}
                value={heartRate}
                title="Серцебиття"
                unit="уд / хв"
              />
            </View>

            <View style={styles.itemContainer}>
              <MonitoredValue
                icon={<Ionicons name="water" size={24} color="lightblue" />}
                value={oxygen}
                title="Рівень кисню"
                unit="SpO2"
              />
            </View>

            <View style={styles.itemContainer}>
              <MonitoredValue
                icon={<FontAwesome5 name="temperature-high" size={24} color="#000" />}
                value={temperature}
                title="Рівень температури"
                formatter={formatTemperature}
                unit="oC"
              />
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.infoText}>Ввімкніть моніторинг, для відображення показників</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 25,
  },
  pageHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    ...defaultFontStyle,
  },
  itemContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    marginBottom: 10,
    ...defaultFontStyle,
  },
  subtitleContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    ...defaultFontStyle,
  },
  infoText: {
    fontSize: 18,
    ...defaultFontStyle,
  },
});
