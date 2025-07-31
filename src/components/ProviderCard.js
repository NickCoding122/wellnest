import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Card component representing a service provider.  Displays the
 * provider's image, name, category, price and rating.  When
 * pressed it calls the onPress callback so that the parent can
 * navigate to the provider profile screen.
 */
export default function ProviderCard({ provider, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: provider.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{provider.name}</Text>
        <Text style={styles.category}>{provider.category}</Text>
        <View style={styles.row}>
          <Ionicons name="star" size={16} color="#f1c40f" />
          <Text style={styles.rating}>{provider.rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.price}>£{provider.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E90FF',
  },
});