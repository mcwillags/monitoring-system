import { MonitoringSettings } from '@models';

interface MonitoringInputData {
  oxygen: string;
  heartRate: string;
  temperature: string;
}

const heartRateValidator = { minValue: 60, maxValue: 200 };
const oxygenValidator = { minValue: 82, maxValue: 100 };
const temperatureValidator = { minValue: 30, maxValue: 45 };

export const validateMonitoringSettings = ({
  oxygen,
  heartRate,
  temperature,
}: MonitoringInputData): MonitoringSettings | null => {
  const data = {
    maxHeartRateLevel: Number(heartRate),
    minOxygenLevel: Number(oxygen),
    maxTemperatureLevel: Number(temperature),
  };

  const isDataCorrect = Object.values(data).every((item) => item !== null);

  if (!isDataCorrect) return null;

  if (
    data.maxHeartRateLevel < heartRateValidator.minValue ||
    data.maxHeartRateLevel > heartRateValidator.maxValue
  )
    return null;
  if (
    data.minOxygenLevel < oxygenValidator.minValue ||
    data.minOxygenLevel > oxygenValidator.maxValue
  )
    return null;
  if (
    data.maxTemperatureLevel < temperatureValidator.minValue ||
    data.maxTemperatureLevel > temperatureValidator.maxValue
  )
    return null;

  return data as MonitoringSettings;
};
