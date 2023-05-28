import { BadCaseParam, DataWorkerConfig } from '../types';

export const defaultOxygenConfig: Omit<DataWorkerConfig, 'name'> = {
  value: 98,
  minValue: 85,
  maxValue: 100,
  interval: 1500,
  changeStep: [0, 2],
  badCaseChangeStep: [0, 2],
  defaultValueRange: 2,
  badCaseParam: BadCaseParam.DECREASING,
  badCaseProbability: 5,
};
export const defaultHeartRateConfig: Omit<DataWorkerConfig, 'name'> = {
  value: 67,
  minValue: 52,
  maxValue: 180,
  interval: 1500,
  changeStep: [0, 2],
  badCaseChangeStep: [3, 12],
  defaultValueRange: 5,
  badCaseParam: BadCaseParam.INCREASING,
  badCaseProbability: 20,
};
export const defaultTemperatureConfig: Omit<DataWorkerConfig, 'name'> = {
  value: 36.6,
  minValue: 32,
  maxValue: 41,
  interval: 1500,
  changeStep: [0, 0.3],
  badCaseChangeStep: [0.3, 1],
  defaultValueRange: 1.2,
  badCaseParam: BadCaseParam.INCREASING,
  badCaseProbability: 15,
  isDecimal: true,
};

export const useConfigs = {
  oxygen: defaultOxygenConfig,
  heartRate: defaultHeartRateConfig,
  temperature: defaultTemperatureConfig,
};
