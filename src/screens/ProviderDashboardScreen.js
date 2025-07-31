import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

/**
 * Displays a provider's dashboard with their profile summary and
 * upcoming bookings.  Bookings are live‑updated from Firestore
 * using onSnapshot to listen for changes in real time.  Each
 * booking shows the client's name, date/time and price.
 */
export default function ProviderDashboardScreen() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;
    // Listen to bookings where providerId matches the signed‑in provider
    const q = query(collection(db, 'bookings'), where('providerId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Sort by date ascending
      data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
      setBookings(data);
    });
    return unsubscribe;
  }, [user]);

  const renderItem = ({ item }) => {
    const dateObj = new Date(item.dateTime);
    return (
      <View style={styles.bookingCard}>
        <Text style={styles.bookingClient}>{item.userName}</Text>
        <Text style={styles.bookingDate}>{dateObj.toLocaleString()}</Text>
        <Text style={styles.bookingPrice}>£{item.price.toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Provider</Text>
        <Text style={styles.summaryValue}>{user?.name}</Text>
        <Text style={styles.summaryLabel}>Credit</Text>
        <Text style={styles.summaryValue}>£{user?.credit?.toFixed(2) || '0.00'}</Text>
      </View>
      <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
      {bookings.length === 0 ? (
        <Text style={styles.noBookings}>You have no bookings yet.</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryLabel: {
    color: '#999',
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noBookings: {
    color: '#666',
    fontSize: 16,
  },
  bookingCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  bookingClient: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bookingPrice: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '600',
  },
});