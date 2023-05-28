import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from '../constants';
import { HomeScreen, LoginScreen, RegisterScreen } from '@screens';
import { OnApplicationLoad } from '@components';
import { useAppSelector } from '@hooks';
import { selectIsAuth, selectTokenAuthDone } from '@store/user/user.selectors';

type ScreenNamesKeys = keyof typeof screenNames;
type ScreenNamesValues = (typeof screenNames)[ScreenNamesKeys];

export type RootStackParamList = {
  [Key in ScreenNamesValues]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigationStack = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const tokenAuthDone = useAppSelector(selectTokenAuthDone);

  return (
    <>
      <Stack.Navigator>
        {!tokenAuthDone && (
          <Stack.Screen
            name={screenNames.APP_LOAD}
            component={OnApplicationLoad}
            options={{ headerShown: false }}
          />
        )}
        {!isAuth && <Stack.Screen name={screenNames.LOGIN} component={LoginScreen} />}
        {!isAuth && <Stack.Screen name={screenNames.REGISTER} component={RegisterScreen} />}
        {isAuth && <Stack.Screen name={screenNames.HOME} component={HomeScreen} />}
      </Stack.Navigator>
    </>
  );
};
