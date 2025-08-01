import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { providers } from '../data/providers';
import ProviderCard from '../components/ProviderCard';
import CategoryFilter from '../components/CategoryFilter';

/**
 * The home screen displays a location header, search bar,
 * horizontal category filter and a list of featured providers.
 * Users can filter providers by search term and category.  When
 * a provider card is pressed the user is taken to the provider
 * profile screen.
 */
export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(null);
  // Derive a list of unique categories from the provider data
  const categories = Array.from(new Set(providers.map((p) => p.category)));

  // Filter providers based on search term and selected category
  const filteredProviders = providers.filter((p) => {
    const matchCategory = category ? p.category === category : true;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wellnest</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={16} color="#fff" />
          <Text style={styles.location}>London, UK</Text>
        </View>
      </View>
      <TextInput
        style={styles.search}
        placeholder="Search providers"
        value={search}
        onChangeText={setSearch}
      />
      <CategoryFilter
        categories={categories}
        selectedCategory={category}
        onSelect={setCategory}
      />
      <FlatList
        data={filteredProviders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProviderCard
            provider={item}
            onPress={() => navigation.navigate('ProviderProfile', { provider: item })}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#1E90FF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 4,
  },
  search: {
    height: 45,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});