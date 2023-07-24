// import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './navigation/Navigator';
//import DrawerTabScreens from './navigation/Navigator';

// stripe payment gateway
import { StripeProvider } from '@stripe/stripe-react-native';
import key from './constants/key';


export default function App() {
  return (
    <StripeProvider
      publishableKey={key.publishableKey}
    >
     <NavigationContainer>
       {/* <DrawerTabScreens/> */}
      <StackNavigator/>
      
     </NavigationContainer>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
