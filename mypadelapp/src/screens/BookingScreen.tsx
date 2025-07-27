import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookingScreen = ({navigation, route}) => {
  const {court} = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [duration, setDuration] = useState(1);

  const timeSlotsMock = [
    {id: 1, time: '08:00', available: true},
    {id: 2, time: '09:00', available: true},
    {id: 3, time: '10:00', available: false},
    {id: 4, time: '11:00', available: true},
    {id: 5, time: '12:00', available: true},
    {id: 6, time: '13:00', available: false},
    {id: 7, time: '14:00', available: true},
    {id: 8, time: '15:00', available: true},
    {id: 9, time: '16:00', available: true},
    {id: 10, time: '17:00', available: false},
    {id: 11, time: '18:00', available: true},
    {id: 12, time: '19:00', available: true},
    {id: 13, time: '20:00', available: true},
    {id: 14, time: '21:00', available: true},
  ];

  const durationOptions = [
    {value: 1, label: '1 hour'},
    {value: 1.5, label: '1.5 hours'},
    {value: 2, label: '2 hours'},
  ];

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + Math.floor(duration);
    const endMinutes = minutes + (duration % 1) * 60;
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };

  const calculateTotalPrice = () => {
    return court.price * duration;
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTimeSlot) {
      Alert.alert('Error', 'Please select a date and time slot.');
      return;
    }

    const endTime = calculateEndTime(selectedTimeSlot, duration);
    const totalPrice = calculateTotalPrice();

    Alert.alert(
      'Confirm Booking',
      `Date: ${selectedDate}\nTime: ${selectedTimeSlot} - ${endTime}\nDuration: ${duration} hour(s)\nTotal: $${totalPrice}`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Booking confirmed!', [
              {text: 'OK', onPress: () => navigation.navigate('Bookings')},
            ]);
          },
        },
      ]
    );
  };

  const renderTimeSlots = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Available Time Slots</Text>
      {selectedDate ? (
        <View style={styles.timeSlotsGrid}>
          {timeSlotsMock.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.timeSlot,
                !slot.available && styles.timeSlotUnavailable,
                selectedTimeSlot === slot.time && styles.timeSlotSelected,
              ]}
              onPress={() => slot.available && setSelectedTimeSlot(slot.time)}
              disabled={!slot.available}>
              <Text
                style={[
                  styles.timeSlotText,
                  !slot.available && styles.timeSlotTextUnavailable,
                  selectedTimeSlot === slot.time && styles.timeSlotTextSelected,
                ]}>
                {slot.time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.placeholderText}>Please select a date first</Text>
      )}
    </View>
  );

  const renderDurationSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Duration</Text>
      <View style={styles.durationContainer}>
        {durationOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.durationOption,
              duration === option.value && styles.durationOptionSelected,
            ]}
            onPress={() => setDuration(option.value)}>
            <Text
              style={[
                styles.durationOptionText,
                duration === option.value && styles.durationOptionTextSelected,
              ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderBookingSummary = () => (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Booking Summary</Text>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Court:</Text>
        <Text style={styles.summaryValue}>{court.name}</Text>
      </View>
      
      {selectedDate && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Date:</Text>
          <Text style={styles.summaryValue}>{selectedDate}</Text>
        </View>
      )}
      
      {selectedTimeSlot && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Time:</Text>
          <Text style={styles.summaryValue}>
            {selectedTimeSlot} - {calculateEndTime(selectedTimeSlot, duration)}
          </Text>
        </View>
      )}
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Duration:</Text>
        <Text style={styles.summaryValue}>{duration} hour(s)</Text>
      </View>
      
      <View style={styles.summaryDivider} />
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryTotalLabel}>Total:</Text>
        <Text style={styles.summaryTotalValue}>${calculateTotalPrice()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.courtInfo}>
            <Text style={styles.courtName}>{court.name}</Text>
            <Text style={styles.courtLocation}>{court.location}</Text>
            <Text style={styles.courtPrice}>${court.price}/hour</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: '#00A86B',
                },
              }}
              minDate={new Date().toISOString().split('T')[0]}
              theme={{
                selectedDayBackgroundColor: '#00A86B',
                todayTextColor: '#00A86B',
                arrowColor: '#00A86B',
              }}
            />
          </View>

          {renderTimeSlots()}
          {renderDurationSelector()}
          {renderBookingSummary()}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.bookButton,
            (!selectedDate || !selectedTimeSlot) && styles.bookButtonDisabled,
          ]}
          onPress={handleBooking}
          disabled={!selectedDate || !selectedTimeSlot}>
          <Text style={styles.bookButtonText}>
            Confirm Booking - ${calculateTotalPrice()}
          </Text>
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
  content: {
    padding: 20,
  },
  courtInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courtName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  courtLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  courtPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A86B',
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
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '22%',
    backgroundColor: 'white',
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  timeSlotSelected: {
    backgroundColor: '#00A86B',
  },
  timeSlotUnavailable: {
    backgroundColor: '#f5f5f5',
    elevation: 0,
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  timeSlotTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  timeSlotTextUnavailable: {
    color: '#ccc',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationOption: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  durationOptionSelected: {
    backgroundColor: '#00A86B',
  },
  durationOptionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  durationOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00A86B',
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
  bookButtonDisabled: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;