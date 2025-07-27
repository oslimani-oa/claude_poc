import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
  const nearbyCourtsMock = [
    {
      id: 1,
      name: 'Padel Club Central',
      distance: '0.5 km',
      rating: 4.5,
      price: 25,
      nextAvailable: '2:00 PM',
    },
    {
      id: 2,
      name: 'Sports Complex Elite',
      distance: '1.2 km',
      rating: 4.8,
      price: 30,
      nextAvailable: '4:30 PM',
    },
    {
      id: 3,
      name: 'Padel Arena Pro',
      distance: '2.1 km',
      rating: 4.3,
      price: 20,
      nextAvailable: '6:00 PM',
    },
  ];

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
      <Text style={styles.distance}>{item.distance} away</Text>
      <View style={styles.courtFooter}>
        <Text style={styles.price}>${item.price}/hour</Text>
        <Text style={styles.available}>Next: {item.nextAvailable}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Find Your Perfect</Text>
        <Text style={styles.titleText}>Padel Court</Text>
      </View>

      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate('Search')}>
        <Icon name="search" size={20} color="#999" />
        <Text style={styles.searchPlaceholder}>Search courts near you...</Text>
      </TouchableOpacity>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="location-on" size={24} color="#00A86B" />
          <Text style={styles.actionText}>Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="access-time" size={24} color="#00A86B" />
          <Text style={styles.actionText}>Quick Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="favorite" size={24} color="#00A86B" />
          <Text style={styles.actionText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Courts</Text>
        <FlatList
          data={nearbyCourtsMock}
          renderItem={renderCourtCard}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 18,
    color: '#666',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#999',
    fontSize: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minWidth: 80,
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
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
  distance: {
    color: '#666',
    marginBottom: 10,
  },
  courtFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00A86B',
  },
  available: {
    color: '#666',
  },
});

export default HomeScreen;