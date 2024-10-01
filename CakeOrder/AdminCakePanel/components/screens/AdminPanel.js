import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Alert } from 'react-native';
import { db } from '../firebase';

// Component for managing orders in an admin panel
export default function AdminPanel() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from Firestore on component mount
  useEffect(() => {
    const unsubscribe = db.collection('orders').onSnapshot(snapshot => {
      const fetchedOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    }, error => {
      Alert.alert("Error fetching data", error.message);
    });

    return () => unsubscribe();  // Clean up the subscription
  }, []);

  // Function to update the status of an order
  const updateOrderStatus = (id, newStatus) => {
    db.collection('orders').doc(id).update({ status: newStatus }).catch(error => {
      Alert.alert("Error updating order", error.message);
    });
  };

  // Save changes to an order, ideally should be secured to avoid unauthorized access
  const saveOrderChanges = (id) => {
    // Implement logic to update the database, ensure security rules apply
    console.log('Changes saved for order:', id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderContainer}>
            <Text>Order Id: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Customer Number: {item.phoneNumber}</Text>
            <Text>Customer Address: {item.address}</Text>
            <Text>Order: {item.cakeType}</Text>
            <Button title="Save" onPress={() => saveOrderChanges(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});
