import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firebase from '@react-native-firebase/app';

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp({
    // Ensure these details are securely stored and retrieved when needed
    apiKey: 'AIzaSyBGBURgVp4TytMK1vZcoJ5P2uiWvvTttRI',
    authDomain: 'cakeorderapp-af504.firebaseapp.com',
    projectId: 'cakeorderapp-af504',
    storageBucket: 'cakeorderapp-af504.appspot.com',
    messagingSenderId: '1075822182947',
    appId: '1:1075822182947:android:2207099f0538506355a796',
    databaseURL: 'https://cakeorderapp-af504-default-rtdb.firebaseio.com',
  });
}

// Configure Google Sign-in method for enhanced security
GoogleSignin.configure({
  webClientId: '1075822182947-d5n02ad6o68uhksjrfo4mp43ce8u9n3i.apps.googleusercontent.com',
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle user login using email and password
  const onLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('MenuDrawer', {
        screen: 'MenuScreen',
        params: { userName: userCredential.user.email },
      });
    } catch (error) {
      Alert.alert('Login failed', error.message, [
        { text: 'Retry', onPress: () => onLogin() },  // Provide option to retry
        { text: 'Cancel', style: 'cancel' }
      ]);
    }
  };

  // Function to handle user registration
  const onRegister = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('MenuDrawer', { userName: userCredential.user.email });
    } catch (error) {
      Alert.alert('Registration failed', error.message, [
        { text: 'Retry', onPress: () => onRegister() },  // Provide option to retry
        { text: 'Cancel', style: 'cancel' }
      ]);
    }
  };

  // Function to handle Google sign-in
  const onGoogleButtonPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      Alert.alert('Success', 'Logged in with Google!');
      navigation.navigate('MenuDrawer', { userName: userCredential.user.email });
    } catch (error) {
      Alert.alert('Google Sign-In failed', error.message, [
        { text: 'Retry', onPress: () => onGoogleButtonPress() },  // Provide option to retry
        { text: 'Cancel', style: 'cancel' }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <StatusBar backgroundColor="#c2185b" barStyle="light-content" />
        <Text style={styles.headerText}>OrderCake</Text>
        <Image
          source={require('../../assets/chocolate-cake.png')}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#c2185b" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#c2185b" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={onGoogleButtonPress}>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#c2185b',
    marginVertical: 10,
  },
  logo: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#c2185b',
    width: '80%',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#c2185b',
    width: '80%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  googleButton: {
    backgroundColor: '#dd4b39',
    width: '80%',
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default LoginScreen;
