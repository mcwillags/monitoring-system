import { useMemo, useState } from 'react';

import { StreamVitalData } from '@lib/StreamVitalData';
import { DataWorkerConfig } from '@lib/StreamVitalData/types';

type ReturnDataType<TKeys extends string> = Record<TKeys, number>;
type ConfigType<TKeys extends string> = Record<TKeys, Omit<DataWorkerConfig, 'name'>>;

interface UseMonitoring<TKeys extends string> {
  data: ReturnDataType<TKeys>;
  startStreamingData: () => void;
  stopStreamingData: () => void;
}

export const useMonitoringData = <TKeys extends string>(
  configs: ConfigType<TKeys>,
  interval: number
): UseMonitoring<TKeys> => {
  const [data, setData] = useState<ReturnDataType<TKeys>>(() => {
    const initialValues = Object.keys(configs).reduce((acc, key) => {
      const typedKey = key as TKeys;
      return {
        ...acc,
        [typedKey]: configs[typedKey].value,
      };
    }, {});

    return initialValues as ReturnDataType<TKeys>;
  });

  const handleValueChange = (data: { name: TKeys; value: number }[]) => {
    setData(
      data.reduce((acc, { name, value }) => {
        return { ...acc, [name]: value };
      }, {}) as ReturnDataType<TKeys>
    );
  };

  const steamDataController = useMemo(() => {
    const data = Object.keys(configs).reduce<DataWorkerConfig[]>((acc, key) => {
      return [...acc, { ...configs[key as TKeys], name: key }];
    }, []);

    return new StreamVitalData(data, interval, handleValueChange);
  }, []);

  const startStreamingData = () => {
    steamDataController.startStreaming();
  };
  const stopStreamingData = () => {
    steamDataController.stopStreaming();
  };

  return {
    data,
    startStreamingData,
    stopStreamingData,
  };
};
