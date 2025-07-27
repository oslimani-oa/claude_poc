import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookingsScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingBookingsMock = [
    {
      id: 1,
      courtName: 'Padel Club Central',
      date: '2024-01-25',
      time: '2:00 PM - 3:00 PM',
      price: 25,
      status: 'confirmed',
      location: 'Downtown',
    },
    {
      id: 2,
      courtName: 'Sports Complex Elite',
      date: '2024-01-27',
      time: '4:30 PM - 5:30 PM',
      price: 30,
      status: 'confirmed',
      location: 'North District',
    },
  ];

  const pastBookingsMock = [
    {
      id: 3,
      courtName: 'Padel Arena Pro',
      date: '2024-01-20',
      time: '6:00 PM - 7:00 PM',
      price: 20,
      status: 'completed',
      location: 'West Side',
      canReview: true,
    },
    {
      id: 4,
      courtName: 'Padel Club Central',
      date: '2024-01-18',
      time: '3:00 PM - 4:00 PM',
      price: 25,
      status: 'completed',
      location: 'Downtown',
      canReview: false,
    },
  ];

  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => console.log('Booking cancelled')},
      ]
    );
  };

  const handleReschedule = (bookingId) => {
    Alert.alert('Reschedule', 'Reschedule feature coming soon!');
  };

  const handleReview = (bookingId) => {
    Alert.alert('Review', 'Review feature coming soon!');
  };

  const renderUpcomingBooking = ({item}) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.courtName}>{item.courtName}</Text>
        <View style={[styles.statusBadge, styles.confirmedBadge]}>
          <Text style={styles.statusText}>Confirmed</Text>
        </View>
      </View>
      
      <Text style={styles.location}>{item.location}</Text>
      
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Icon name="event" size={16} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="access-time" size={16} color="#666" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="attach-money" size={16} color="#666" />
          <Text style={styles.detailText}>${item.price}</Text>
        </View>
      </View>

      <View style={styles.bookingActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.rescheduleButton]}
          onPress={() => handleReschedule(item.id)}>
          <Text style={styles.rescheduleButtonText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={() => handleCancelBooking(item.id)}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPastBooking = ({item}) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.courtName}>{item.courtName}</Text>
        <View style={[styles.statusBadge, styles.completedBadge]}>
          <Text style={styles.statusText}>Completed</Text>
        </View>
      </View>
      
      <Text style={styles.location}>{item.location}</Text>
      
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Icon name="event" size={16} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="access-time" size={16} color="#666" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="attach-money" size={16} color="#666" />
          <Text style={styles.detailText}>${item.price}</Text>
        </View>
      </View>

      <View style={styles.bookingActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.bookAgainButton]}
          onPress={() => navigation.navigate('Search')}>
          <Text style={styles.bookAgainButtonText}>Book Again</Text>
        </TouchableOpacity>
        {item.canReview && (
          <TouchableOpacity
            style={[styles.actionButton, styles.reviewButton]}
            onPress={() => handleReview(item.id)}>
            <Text style={styles.reviewButtonText}>Review</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const currentBookings = activeTab === 'upcoming' ? upcomingBookingsMock : pastBookingsMock;
  const renderItem = activeTab === 'upcoming' ? renderUpcomingBooking : renderPastBooking;

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}>
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}>
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {currentBookings.length > 0 ? (
        <FlatList
          data={currentBookings}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Icon name="event-busy" size={64} color="#ccc" />
          <Text style={styles.emptyStateTitle}>
            No {activeTab} bookings
          </Text>
          <Text style={styles.emptyStateText}>
            {activeTab === 'upcoming' 
              ? 'Book your first Padel court to get started!'
              : 'Your completed bookings will appear here.'}
          </Text>
          {activeTab === 'upcoming' && (
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={() => navigation.navigate('Search')}>
              <Text style={styles.bookNowButtonText}>Book Now</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#00A86B',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#00A86B',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  bookingCard: {
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
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  courtName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confirmedBadge: {
    backgroundColor: '#e8f5e8',
  },
  completedBadge: {
    backgroundColor: '#e3f2fd',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  location: {
    color: '#666',
    marginBottom: 15,
  },
  bookingDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 8,
    color: '#666',
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  rescheduleButton: {
    backgroundColor: '#f0f0f0',
  },
  rescheduleButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ffebee',
  },
  cancelButtonText: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  bookAgainButton: {
    backgroundColor: '#e8f5e8',
  },
  bookAgainButtonText: {
    color: '#00A86B',
    fontWeight: 'bold',
  },
  reviewButton: {
    backgroundColor: '#fff3e0',
  },
  reviewButtonText: {
    color: '#f57c00',
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  bookNowButton: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  bookNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookingsScreen;