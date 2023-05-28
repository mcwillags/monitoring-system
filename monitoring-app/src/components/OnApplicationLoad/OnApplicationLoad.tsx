import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

import { useAppDispatch } from '@hooks';
import { authUser } from '@store/user/user.action.creators';

import { BubbleProgress } from '@components';

import { RootStackParamList } from '@routes';


type OnApplicationLoadProps = NativeStackScreenProps<RootStackParamList>;

export const OnApplicationLoad = ({}: OnApplicationLoadProps) => {
  useFonts({
    'Jakarta-regular': require('@assets/fonts/PlusJakartaSans-Regular.ttf'),
    'Jakarta-semi': require('@assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'Jakarta-bold': require('@assets/fonts/PlusJakartaSans-Bold.ttf'),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const proceed = async () => {
      await new Promise((res) => setTimeout(res, 200));
      dispatch(authUser());
    };

    proceed();
  }, []);

  return <BubbleProgress />;
};
