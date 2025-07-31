import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

/**
 * Displays the current user's wallet balance.  At this stage the
 * wallet is simple: users receive a £20 signup bonus and their
 * balance decreases when they book appointments.  You can extend
 * this screen to include top‑up functionality and transaction
 * history in the future.
 */
export default function WalletScreen() {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Wallet</Text>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Credit</Text>
        <Text style={styles.balance}>£{user?.credit?.toFixed(2) || '0.00'}</Text>
      </View>
      <Text style={styles.info}>
        Use your credit to book appointments.  Your balance is
        automatically deducted when you confirm a booking.
      </Text>
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
  balanceCard: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  balance: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
});