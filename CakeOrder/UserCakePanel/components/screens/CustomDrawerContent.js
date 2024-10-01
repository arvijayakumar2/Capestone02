import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = props => {
  const logout = async () => {
    // Here you would clear any stored tokens or user details in async storage
    await AsyncStorage.clear(); // Clearing AsyncStorage completely
    props.navigation.navigate('LoginScreen'); // Navigate to Login Screen after logout
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('../../assets/user.png')} // Replace with your user avatar image
          style={styles.profilePic}
        />
        <Text style={styles.userName}>Vijayakumar</Text> 
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f6f6f6', // Light grey background for the header
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40, // Making the image rounded
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#ff6347', // Tomato color for the logout button
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#ffffff', // White color text
  },
});

export default CustomDrawerContent;
