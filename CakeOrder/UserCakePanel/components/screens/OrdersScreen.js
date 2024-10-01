import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const OrdersScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore().collection('orders')
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        const orders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orders);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.items.map(item => item.name).join(', ')}</Text>
      <Text>Date: {item.timestamp?.toDate().toDateString()}</Text>
      <Text>Total: ${item.total}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  itemContainer: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9c2ff',
  },
  title: {
    fontSize: 24,
  },
});

export default OrdersScreen;
