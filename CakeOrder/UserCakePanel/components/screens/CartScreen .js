import React from 'react';
import {View, Text, FlatList, Button, StyleSheet, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

// Screen to handle items added to cart and place orders
const CartScreen = ({route, navigation}) => {
  const {cartItems} = route.params;

  // Function to place an order
  const placeOrder = async () => {
    try {
      if (!cartItems.length) {
        Alert.alert("Error", "No items in the cart.");
        return;
      }
      // Validate cart items before sending to the database
      const validItems = cartItems.filter(item => item.price && item.name);
      if (validItems.length !== cartItems.length) {
        Alert.alert("Error", "Some items in the cart are invalid.");
        return;
      }

      // Add new order to Firestore
      await firestore()
        .collection('orders')
        .add({
          items: validItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
          })),
          total: validItems.reduce(
            (total, item) => total + parseFloat(item.price),
            0,
          ),
          status: 'placed',
          timestamp: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Success', 'Your order has been placed!', [
        {text: 'OK', onPress: () => navigation.popToTop()},
      ]);
    } catch (error) {
      Alert.alert(
        'Error',
        'Could not place the order. Please try again later.',
        [{text: 'Retry', onPress: () => placeOrder()}] // Retry mechanism
      );
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.name} - ${item.price}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="Place Order" onPress={placeOrder} color="#6200ee" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
});

export default CartScreen;