import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MenuScreen from './MenuScreen'; // Adjust the path as necessary
import OrderStatusScreen from './OrderStatusScreen'; // Ensure the path is correct
import CustomDrawerContent from './CustomDrawerContent'; // Path to your custom drawer content component
import CartScreen from './CartScreen '; // Adjust the path for the cart screen

const Drawer = createDrawerNavigator();

function MenuDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="MenuScreen">
      <Drawer.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{title: 'Menu'}}
      />
      <Drawer.Screen
        name="Orders"
        component={OrderStatusScreen}
        options={{title: 'Orders'}}
      />
      <Drawer.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Cart'}}
      />
      {/* Add other screens as needed */}
    </Drawer.Navigator>
  );
}

export default MenuDrawer;
