export interface MonitoredData {
  badgeNumber: string;
  name: string;
  oxygenLevel: {
    minOxygenLevel: number;
    value: number;
  };
  heartRateLevel: {
    maxHeartRateLevel: number;
    value: number;
  };
  temperatureLevel: {
    maxTemperatureLevel: number;
    value: number;
  };
}

export interface ValidatedMonitoredData {
  badgeNumber: string;
  name: string;
  oxygenLevel: {
    minOxygenLevel: number;
    value: number;
    backgroundColor: string;
    dangerLevel: number;
  };
  heartRateLevel: {
    maxHeartRateLevel: number;
    value: number;
    backgroundColor: string;
    dangerLevel: number;
  };
  temperatureLevel: {
    maxTemperatureLevel: number;
    value: number;
    backgroundColor: string;
    dangerLevel: number;
  };

  dangerLevel: number;
}