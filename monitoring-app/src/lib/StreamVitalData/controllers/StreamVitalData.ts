import {BadCaseParam, DataWorkerConfig, ValueReturnType} from '../types';
import { getRandomValue, probabilityRunner } from '../utils';

const DEFAULT_BAD_CASE_ITERATIONS = 8;

class DataWorker {
  private name: string;
  private value: number;
  private isRunning: boolean;
  private readonly minValue: number;
  private readonly maxValue: number;
  private readonly defaultValue: number;
  private readonly badCaseParam: BadCaseParam;
  private readonly badCaseProbability: number;
  private readonly changeStep: number[];
  private readonly badCaseChangeStep: number[];
  private readonly defaultValueRange: number;
  private readonly interval: number;
  private readonly isDecimal: boolean;

  private streamBadCaseIterations = 0;

  private isBadCaseHappening: boolean;
  private isRecovering: boolean;

  constructor({
    value,
    minValue,
    maxValue,
    changeStep,
    badCaseChangeStep,
    defaultValueRange,
    badCaseProbability,
    badCaseParam,
    interval,
    name,
    isDecimal = false,
  }: DataWorkerConfig) {
    this.name = name;

    this.value = value;
    this.defaultValue = value;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.defaultValueRange = defaultValueRange;

    this.badCaseParam = badCaseParam;
    this.changeStep = changeStep;
    this.badCaseProbability = badCaseProbability;
    this.badCaseChangeStep = badCaseChangeStep;

    this.isBadCaseHappening = false;
    this.isRecovering = false;

    this.interval = interval;
    this.isDecimal = isDecimal;
    this.isRunning = false;
  }

  streamValue(): ValueReturnType {
    if (this.isBadCaseHappening) {
      return this.streamBadCase();
    }

    if (this.isRecovering) {
      return this.streamRecovering();
    }

    return probabilityRunner(
      this.badCaseProbability,
      () => {
        this.isBadCaseHappening = true;
        this.streamBadCaseIterations = DEFAULT_BAD_CASE_ITERATIONS;
        return this.streamBadCase();
      },
      () => {
        return this.streamDefault();
      }
    );
  }

  changeActualValue(change: number): ValueReturnType {
    this.value += change;

    if (this.value >= this.maxValue) this.value = this.maxValue;
    if (this.value <= this.minValue) this.value = this.minValue;

    return { name: this.name, value: this.value };
  }

  streamDefault() {
    const defaultValueChange = getRandomValue(this.changeStep);

    return probabilityRunner(
      40,
      () => {
        return this.changeActualValue(-defaultValueChange);
      },
      () => {
        return this.changeActualValue(defaultValueChange);
      }
    );
  }

  streamBadCase() {
    const defaultChangeStep = getRandomValue(this.changeStep, this.isDecimal);
    const badCaseChangeStep = getRandomValue(this.badCaseChangeStep, this.isDecimal);

    let changeValue;

    if (this.badCaseParam === 'DECREASING') {
      changeValue = probabilityRunner(
        15,
        () => {
          return defaultChangeStep;
        },
        () => {
          return -badCaseChangeStep;
        }
      );
    } else {
      changeValue = probabilityRunner(
        15,
        () => {
          return -defaultChangeStep;
        },
        () => {
          return badCaseChangeStep;
        }
      );
    }

    this.streamBadCaseIterations--;

    if (this.streamBadCaseIterations <= 0) {
      this.isBadCaseHappening = false;
      this.isRecovering = true;
    }

    return this.changeActualValue(changeValue);
  }

  streamRecovering() {
    const defaultChangeStep = getRandomValue(this.changeStep, this.isDecimal);
    const badCaseChangeStep = getRandomValue(this.badCaseChangeStep, this.isDecimal);

    if (this.badCaseParam === BadCaseParam.DECREASING && this.isOverflowing()) {
      return this.changeActualValue(-defaultChangeStep);
    }

    if (this.badCaseParam === BadCaseParam.INCREASING && this.isUnderflowing()) {
      return this.changeActualValue(defaultChangeStep);
    }

    let changeValue;

    if (this.badCaseParam === BadCaseParam.DECREASING) {
      changeValue = probabilityRunner(
        15,
        () => -defaultChangeStep,
        () => badCaseChangeStep
      );
    } else {
      changeValue = probabilityRunner(
        15,
        () => defaultChangeStep,
        () => -badCaseChangeStep
      );
    }

    if (this.isDefaultRange()) {
      this.isRecovering = false;
    }

    return this.changeActualValue(changeValue);
  }

  isDefaultRange() {
    return (
      this.defaultValue - this.defaultValueRange < this.value &&
      this.value <= this.defaultValue + this.defaultValueRange
    );
  }

  isOverflowing() {
    return this.value > this.defaultValue + this.defaultValueRange;
  }

  isUnderflowing() {
    return this.value < this.defaultValue - this.defaultValueRange;
  }
}

export class StreamVitalData {
  private workers: DataWorker[];
  private readonly callback: (data: ValueReturnType[]) => void;
  private readonly interval: number;
  private intervalID: NodeJS.Timeout | undefined;
  private isStreaming: boolean;

  constructor(configs: DataWorkerConfig[], interval: number, callback: (data: any) => void) {
    this.workers = configs.map((config) => new DataWorker(config));
    this.callback = callback;
    this.intervalID = undefined;
    this.isStreaming = false;
    this.interval = interval;
  }

  startStreaming() {
    if (this.isStreaming) return;

    this.isStreaming = true;
    this.sendNewData();
  }

  stopStreaming() {
    clearTimeout(this.intervalID);
    if (!this.isStreaming) return;

    this.isStreaming = false;
  }

  sendNewData() {
    if (!this.isStreaming) {
      clearTimeout(this.intervalID);
      return;
    }

    const data = this.workers.reduce<ValueReturnType[]>((acc, worker) => {
      return [...acc, worker.streamValue()];
    }, []);

    this.callback(data);

    this.intervalID = setTimeout(() => {
      this.sendNewData();
    }, this.interval);
  }
}
