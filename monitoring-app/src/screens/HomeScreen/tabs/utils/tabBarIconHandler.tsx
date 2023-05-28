import { ReactNode } from 'react';

import { Entypo, Ionicons } from '@expo/vector-icons';

import { homeRoutes } from '../constants';

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const ICON_SIZE = 20;
const DEFAULT_ICON_COLOR = '#000';
const ICON_FOCUSED_COLOR = '#398AD7';

type TabBarIconHandler = (routeName: string) => (props: TabBarIconProps) => ReactNode;

export const tabBarIconHandler: TabBarIconHandler =
  (routeName: string) =>
  ({ focused, size, color }) => {
    switch (routeName) {
      case homeRoutes.MAIN: {
        return focused ? (
          <Entypo name="home" size={ICON_SIZE} color={ICON_FOCUSED_COLOR} />
        ) : (
          <Entypo name="home" size={ICON_SIZE} color={DEFAULT_ICON_COLOR} />
        );
      }

      case homeRoutes.DEVICE_CONNECT: {
        return focused ? (
          <Ionicons name="watch" size={ICON_SIZE} color={ICON_FOCUSED_COLOR} />
        ) : (
          <Ionicons name="watch" size={ICON_SIZE} color={DEFAULT_ICON_COLOR} />
        );
      }

      case homeRoutes.SETTINGS: {
        return focused ? (
          <Ionicons name="settings" size={ICON_SIZE} color={ICON_FOCUSED_COLOR} />
        ) : (
          <Ionicons name="settings" size={ICON_SIZE} color={DEFAULT_ICON_COLOR} />
        );
      }
    }
  };
