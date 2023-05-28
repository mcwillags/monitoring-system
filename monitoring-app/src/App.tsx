import { Provider } from 'react-redux';
import { store } from '@store';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigationStack } from '@routes';
import { RootSiblingParent } from 'react-native-root-siblings';

const App = () => {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <NavigationContainer>
          <AppNavigationStack />
        </NavigationContainer>
      </RootSiblingParent>
    </Provider>
  );
};

export default App;
