import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * Horizontal list of service categories.  When a category is
 * selected the onSelect callback is called with the category
 * string.  Passing null or undefined to onSelect clears the
 * filter.
 */
export default function CategoryFilter({ categories, selectedCategory, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      <TouchableOpacity
        style={[styles.chip, !selectedCategory && styles.selectedChip]}
        onPress={() => onSelect(null)}
      >
        <Text style={[styles.chipText, !selectedCategory && styles.selectedText]}>All</Text>
      </TouchableOpacity>
      {categories.map((cat) => {
        const selected = selectedCategory === cat;
        return (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, selected && styles.selectedChip]}
            onPress={() => onSelect(cat)}
          >
            <Text style={[styles.chipText, selected && styles.selectedText]}>{cat}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  chip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  selectedChip: {
    backgroundColor: '#1E90FF',
  },
  selectedText: {
    color: '#fff',
  },
});