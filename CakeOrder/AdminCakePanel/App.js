import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrderPage from './screens/OrderPage';
import AdminPanel from './screens/AdminPanel';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OrderPage">
        <Stack.Screen name="OrderPage" component={OrderPage} />
        <Stack.Screen name="AdminPanel" component={AdminPanel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
