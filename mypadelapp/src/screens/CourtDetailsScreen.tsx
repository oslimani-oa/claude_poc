import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const CourtDetailsScreen = ({navigation, route}) => {
  const {court} = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const courtDetailsMock = {
    ...court,
    images: [
      'https://via.placeholder.com/400x200/00A86B/FFFFFF?text=Court+1',
      'https://via.placeholder.com/400x200/007B4F/FFFFFF?text=Court+2',
      'https://via.placeholder.com/400x200/005F3F/FFFFFF?text=Facilities',
    ],
    description: 'Premium padel court with professional lighting and high-quality artificial grass. Perfect for both beginners and advanced players.',
    amenities: ['Parking', 'Shower', 'Equipment Rental', 'Cafeteria', 'Pro Shop'],
    openHours: {
      weekdays: '6:00 AM - 11:00 PM',
      weekends: '7:00 AM - 10:00 PM',
    },
    rules: [
      'Maximum 4 players per court',
      'Proper sports attire required',
      'No outside food or drinks',
      'Court shoes mandatory',
    ],
    reviews: [
      {
        id: 1,
        userName: 'Sarah M.',
        rating: 5,
        comment: 'Excellent court conditions and great facilities!',
        date: '2024-01-20',
      },
      {
        id: 2,
        userName: 'Mike R.',
        rating: 4,
        comment: 'Good court, but parking can be challenging during peak hours.',
        date: '2024-01-18',
      },
    ],
  };

  const renderImageCarousel = () => (
    <View style={styles.imageContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setSelectedImageIndex(index);
        }}>
        {courtDetailsMock.images.map((image, index) => (
          <Image key={index} source={{uri: image}} style={styles.courtImage} />
        ))}
      </ScrollView>
      <View style={styles.imageIndicators}>
        {courtDetailsMock.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === selectedImageIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );

  const renderAmenities = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Amenities</Text>
      <View style={styles.amenitiesGrid}>
        {courtDetailsMock.amenities.map((amenity, index) => (
          <View key={index} style={styles.amenityItem}>
            <Icon name="check-circle" size={20} color="#00A86B" />
            <Text style={styles.amenityText}>{amenity}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderReviews = () => (
    <View style={styles.section}>
      <View style={styles.reviewsHeader}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={20} color="#FFD700" />
          <Text style={styles.overallRating}>{court.rating}</Text>
          <Text style={styles.reviewCount}>({courtDetailsMock.reviews.length})</Text>
        </View>
      </View>
      {courtDetailsMock.reviews.map((review) => (
        <View key={review.id} style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewerName}>{review.userName}</Text>
            <View style={styles.reviewRating}>
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="star"
                  size={14}
                  color={i < review.rating ? '#FFD700' : '#ddd'}
                />
              ))}
            </View>
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
          <Text style={styles.reviewDate}>{review.date}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderImageCarousel()}
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.courtName}>{courtDetailsMock.name}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={20} color="#FFD700" />
              <Text style={styles.rating}>{courtDetailsMock.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.location}>
            <Icon name="location-on" size={16} color="#666" />
            {courtDetailsMock.location} • {courtDetailsMock.distance}
          </Text>
          
          <Text style={styles.description}>{courtDetailsMock.description}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${courtDetailsMock.price}/hour</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Opening Hours</Text>
            <View style={styles.hoursContainer}>
              <View style={styles.hoursItem}>
                <Text style={styles.hoursLabel}>Weekdays:</Text>
                <Text style={styles.hoursValue}>{courtDetailsMock.openHours.weekdays}</Text>
              </View>
              <View style={styles.hoursItem}>
                <Text style={styles.hoursLabel}>Weekends:</Text>
                <Text style={styles.hoursValue}>{courtDetailsMock.openHours.weekends}</Text>
              </View>
            </View>
          </View>

          {renderAmenities()}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Court Rules</Text>
            {courtDetailsMock.rules.map((rule, index) => (
              <View key={index} style={styles.ruleItem}>
                <Text style={styles.ruleBullet}>•</Text>
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>

          {renderReviews()}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking', {court: courtDetailsMock})}>
          <Text style={styles.bookButtonText}>Book Court</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  courtImage: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  courtName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    color: '#666',
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  priceContainer: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A86B',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  hoursContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  hoursLabel: {
    fontSize: 16,
    color: '#666',
  },
  hoursValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  amenitiesGrid: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  amenityText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ruleBullet: {
    fontSize: 16,
    color: '#00A86B',
    marginRight: 10,
  },
  ruleText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  overallRating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 16,
    color: '#666',
  },
  reviewItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 14,
    color: '#999',
  },
  bottomBar: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bookButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CourtDetailsScreen;