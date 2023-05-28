import { useEffect } from 'react';

import { useAppDispatch } from '@hooks';

import { getMonitoringSettings } from '@store/user/user.action.creators';

import { HomeTabs } from './tabs';


export const HomeScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMonitoringSettings());
  }, []);

  return <HomeTabs />;
};
