import 'react-native-gesture-handler';
import React from 'react';
import {Provider as PaperProvider, DarkTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from 'storage/store';

import Routes from 'config/routes';
import {myColors} from 'constants/colors';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider
          theme={{
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              primary: myColors.blue,
              accent: myColors.deepBlue,
              error: myColors.red,
            },
          }}>
          <Routes />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
