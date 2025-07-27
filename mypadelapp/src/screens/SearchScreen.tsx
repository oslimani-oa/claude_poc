import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: 'all',
    rating: 'all',
    distance: 'all',
  });

  const searchResultsMock = [
    {
      id: 1,
      name: 'Padel Club Central',
      distance: '0.5 km',
      rating: 4.5,
      price: 25,
      location: 'Downtown',
      amenities: ['Parking', 'Shower', 'Equipment Rental'],
    },
    {
      id: 2,
      name: 'Sports Complex Elite',
      distance: '1.2 km',
      rating: 4.8,
      price: 30,
      location: 'North District',
      amenities: ['Parking', 'Cafeteria', 'Pro Shop'],
    },
    {
      id: 3,
      name: 'Padel Arena Pro',
      distance: '2.1 km',
      rating: 4.3,
      price: 20,
      location: 'West Side',
      amenities: ['Parking', 'Shower'],
    },
  ];

  const filterOptions = {
    priceRange: [
      {label: 'All Prices', value: 'all'},
      {label: 'Under $20', value: 'under20'},
      {label: '$20-$30', value: '20-30'},
      {label: 'Over $30', value: 'over30'},
    ],
    rating: [
      {label: 'All Ratings', value: 'all'},
      {label: '4+ Stars', value: '4plus'},
      {label: '4.5+ Stars', value: '4.5plus'},
    ],
    distance: [
      {label: 'All Distances', value: 'all'},
      {label: 'Within 1km', value: '1km'},
      {label: 'Within 5km', value: '5km'},
    ],
  };

  const renderCourtCard = ({item}) => (
    <TouchableOpacity
      style={styles.courtCard}
      onPress={() => navigation.navigate('CourtDetails', {court: item})}>
      <View style={styles.courtHeader}>
        <Text style={styles.courtName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      <Text style={styles.location}>{item.location} • {item.distance}</Text>
      <View style={styles.amenitiesContainer}>
        {item.amenities.slice(0, 2).map((amenity, index) => (
          <View key={index} style={styles.amenityTag}>
            <Text style={styles.amenityText}>{amenity}</Text>
          </View>
        ))}
        {item.amenities.length > 2 && (
          <Text style={styles.moreAmenities}>+{item.amenities.length - 2} more</Text>
        )}
      </View>
      <Text style={styles.price}>${item.price}/hour</Text>
    </TouchableOpacity>
  );

  const renderFilterSection = (title, options, selectedValue, onSelect) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterOption,
              selectedValue === option.value && styles.filterOptionSelected,
            ]}
            onPress={() => onSelect(option.value)}>
            <Text
              style={[
                styles.filterOptionText,
                selectedValue === option.value && styles.filterOptionTextSelected,
              ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courts, locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="clear" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filtersContainer}>
        {renderFilterSection(
          'Price Range',
          filterOptions.priceRange,
          selectedFilters.priceRange,
          (value) => setSelectedFilters({...selectedFilters, priceRange: value})
        )}
        {renderFilterSection(
          'Rating',
          filterOptions.rating,
          selectedFilters.rating,
          (value) => setSelectedFilters({...selectedFilters, rating: value})
        )}
        {renderFilterSection(
          'Distance',
          filterOptions.distance,
          selectedFilters.distance,
          (value) => setSelectedFilters({...selectedFilters, distance: value})
        )}
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>
          {searchResultsMock.length} courts found
        </Text>
        <FlatList
          data={searchResultsMock}
          renderItem={renderCourtCard}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  filterSection: {
    marginBottom: 15,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  filterOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 10,
  },
  filterOptionSelected: {
    backgroundColor: '#00A86B',
  },
  filterOptionText: {
    color: '#666',
    fontSize: 14,
  },
  filterOptionTextSelected: {
    color: 'white',
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  courtCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  courtName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    color: '#666',
  },
  location: {
    color: '#666',
    marginBottom: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amenityTag: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  amenityText: {
    color: '#00A86B',
    fontSize: 12,
  },
  moreAmenities: {
    color: '#666',
    fontSize: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00A86B',
  },
});

export default SearchScreen;