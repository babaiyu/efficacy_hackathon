import 'react-native-gesture-handler';
import React from 'react';
import {Provider as PaperProvider, Text} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from 'storage/store';

import Routes from 'config/routes';
import {CustomTheme} from 'config/combineTheme';
import { View } from 'react-native';

function App() {
  return (
    // <View>
    //   <Text>Ini</Text>
    // </View>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={CustomTheme}>
          <Routes />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
