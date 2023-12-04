import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './screens/Home';
import Form from './screens/Form';
import { AppStateProvider } from './src/utils/appContext';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <NavigationContainer initialRouteName="Home">
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Form" component={Form} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
