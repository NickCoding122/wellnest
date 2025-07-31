import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

/**
 * Screen that displays detailed information about a selected
 * provider.  Shows an image header, category, rating, price and
 * bio.  A button at the bottom allows customers to proceed to
 * booking an appointment.  Providers cannot book themselves.
 */
export default function ProviderProfileScreen({ route, navigation }) {
  const { provider } = route.params;
  const { user } = useContext(AuthContext);
  const isProvider = user?.role === 'provider';

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: provider.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{provider.name}</Text>
        <View style={styles.row}>
          <Ionicons name="star" size={18} color="#f1c40f" />
          <Text style={styles.rating}>{provider.rating.toFixed(1)}</Text>
          <Text style={styles.category}> • {provider.category}</Text>
        </View>
        <Text style={styles.price}>Starting at £{provider.price.toFixed(2)}</Text>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{provider.bio}</Text>
      </View>
      {!isProvider && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Booking', { provider })}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    color: '#333',
  },
  category: {
    marginLeft: 4,
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E90FF',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  bio: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});