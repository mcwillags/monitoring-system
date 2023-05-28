import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { tabBarIconHandler } from '../utils';

import { MainScreen, SettingsScreen } from '../../screens';

import { homeRoutes } from '../constants';


const HomeTab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <>
      <HomeTab.Navigator
        initialRouteName={homeRoutes.MAIN}
        screenOptions={({ route }) => ({
          tabBarIcon: tabBarIconHandler(route.name),
        })}>
        <HomeTab.Screen
          name={homeRoutes.MAIN}
          component={MainScreen}
          options={{ headerShown: false, title: 'Головна' }}
        />
        <HomeTab.Screen
          name={homeRoutes.SETTINGS}
          component={SettingsScreen}
          options={{ headerShown: false, title: 'Налашутування' }}
        />
      </HomeTab.Navigator>
    </>
  );
};
