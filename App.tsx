import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { Provider, useDispatch } from "react-redux";
import { Store, persistor } from "./src/Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { NativeBaseProvider } from "native-base";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={Store}>
          <NativeBaseProvider>
            <PersistGate loading={null} persistor={persistor}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </PersistGate>
          </NativeBaseProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
