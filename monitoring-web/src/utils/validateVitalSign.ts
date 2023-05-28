import { MonitoredData, ValidatedMonitoredData } from '@models';

interface CriticalParams {
  warningRange: number;
  dangerRange: number;
  normalValue: number;
}

const DEFAULT_CRITICAL_LEVEL_RANGE: Record<DefaultVitalSignsKeys, CriticalParams> = {
  heartRateLevel: { normalValue: 75, warningRange: 30, dangerRange: 15 },
  oxygenLevel: { normalValue: 98, warningRange: 6, dangerRange: 3 },
  temperatureLevel: { normalValue: 36.6, warningRange: 2, dangerRange: 1.2 },
};

const normalSettings = {
  backgroundColor: '#d0f4e8',
  dangerLevel: 0,
};

const warningSettings = {
  backgroundColor: '#f4f0d0',
  dangerLevel: 0.5,
};

const dangerSettings = {
  backgroundColor: '#e14b60',
  dangerLevel: 1,
};

type DefaultVitalSignsKeys = keyof Omit<MonitoredData, 'name' | 'badgeNumber'>;

export const validatedMonitoredData = (monitoredData: MonitoredData): ValidatedMonitoredData => {
  const validated: Omit<ValidatedMonitoredData, 'dangerLevel'> = {
    ...monitoredData,
    oxygenLevel: {
      ...monitoredData.oxygenLevel,
      ...createValidatedDecreasingSign(
        'oxygenLevel',
        monitoredData.oxygenLevel.value,
        monitoredData.oxygenLevel.minOxygenLevel,
      ),
    },
    temperatureLevel: {
      ...monitoredData.temperatureLevel,
      ...createValidatedIncreasingSign(
        'temperatureLevel',
        monitoredData.temperatureLevel.value,
        monitoredData.temperatureLevel.maxTemperatureLevel,
      ),
    },
    heartRateLevel: {
      ...monitoredData.heartRateLevel,
      ...createValidatedIncreasingSign(
        'heartRateLevel',
        monitoredData.heartRateLevel.value,
        monitoredData.heartRateLevel.maxHeartRateLevel,
      ),
    },
  };

  const dangerLevel =
    validated.temperatureLevel.dangerLevel +
    validated.heartRateLevel.dangerLevel +
    validated.oxygenLevel.dangerLevel;

  return {
    ...validated,
    dangerLevel,
  };
};

export const createValidatedDecreasingSign = (
  label: DefaultVitalSignsKeys,
  value: number,
  criticalValue: number,
) => {
  const { warningRange, dangerRange } = DEFAULT_CRITICAL_LEVEL_RANGE[label];

  if (criticalValue + dangerRange >= value) return dangerSettings;
  if (criticalValue + warningRange >= value) return warningSettings;
  return normalSettings;
};

export const createValidatedIncreasingSign = (
  label: DefaultVitalSignsKeys,
  value: number,
  criticalValue: number,
) => {
  const { warningRange, dangerRange } = DEFAULT_CRITICAL_LEVEL_RANGE[label];

  if (criticalValue - dangerRange <= value) return dangerSettings;
  if (criticalValue - warningRange <= value) return warningSettings;
  return normalSettings;
};
