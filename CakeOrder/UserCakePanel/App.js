import React from 'react';
import {StyleSheet, View} from 'react-native';
import LoginScreen from './components/screens/LoginScreen'; // Adjust the path as necessary
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MenuDrawer from './components/screens/MenuDrawer'; // Adjust the path as per your project structure

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MenuDrawer" // Ensure this matches what you use in navigation.navigate
          component={MenuDrawer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
