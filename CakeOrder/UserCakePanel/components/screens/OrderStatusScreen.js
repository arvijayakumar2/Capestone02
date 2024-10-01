import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { ProgressBar } from 'react-native-paper';  // Assuming you're using react-native-paper for UI components

const OrderStatusScreen = ({ route }) => {
  const { orderId, orderProgress } = route.params;  // Assuming these are passed as parameters

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={false}  // You should manage this state based on actual data fetching status
          onRefresh={() => console.log('Refresh orders status')}  // Replace with actual data fetching function
        />
      }>
      <View style={styles.orderContainer}>
        <Text style={styles.orderIdText}>Order Id: {orderId}</Text>
        <Text style={styles.statusText}>Status: {orderProgress.status}</Text>
        <ProgressBar progress={orderProgress.value} color="#6200ee" />
        <Text style={styles.detailText}>{orderProgress.detail}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 3,
  },
  orderIdText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 16,
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
});

export default OrderStatusScreen;
