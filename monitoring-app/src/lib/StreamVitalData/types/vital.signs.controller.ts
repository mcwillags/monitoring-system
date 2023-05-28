export interface DataWorkerConfig {
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
  badCaseProbability: number;
  changeStep: number[];
  badCaseChangeStep: number[];
  defaultValueRange: number;
  badCaseParam: BadCaseParam;
  interval: number;
  isDecimal?: boolean;
}

export interface ValueReturnType {
  name: string;
  value: number;
}
export enum BadCaseParam {
  INCREASING = 'INCREASING',
  DECREASING = 'DECREASING',
}