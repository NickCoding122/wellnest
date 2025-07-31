import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

/**
 * Screen for booking an appointment with a provider.  Allows the
 * user to pick a date and time using the native date/time
 * picker and confirm the booking.  When confirmed it creates a
 * booking document in Firestore and deducts the price from the
 * user's credit balance.  Booking is disabled for providers.
 */
export default function BookingScreen({ route, navigation }) {
  const { provider } = route.params;
  const { user, updateCredit } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helpers to open pickers
  const openDatePicker = () => setShowDatePicker(true);
  const openTimePicker = () => setShowTimePicker(true);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      // Keep time part from previous date
      const newDate = new Date(date);
      newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      setDate(newDate);
    }
  };
  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  // Format date/time for display
  const formatDate = (d) => {
    return d.toLocaleDateString();
  };
  const formatTime = (d) => {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const confirmBooking = async () => {
    if (!user || user.role === 'provider') return;
    setLoading(true);
    try {
      // Check credit
      if (user.credit < provider.price) {
        Alert.alert('Insufficient credit', 'You do not have enough credit for this booking.');
        setLoading(false);
        return;
      }
      // Create booking document
      await addDoc(collection(db, 'bookings'), {
        providerId: provider.id,
        providerName: provider.name,
        userId: user.uid,
        userName: user.name || user.email,
        dateTime: date.toISOString(),
        price: provider.price,
        status: 'confirmed',
      });
      // Deduct credit from user
      const newCredit = user.credit - provider.price;
      await updateCredit(user.uid, newCredit, user.role);
      Alert.alert('Booking Confirmed', 'Your appointment has been booked successfully.');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'An error occurred while booking. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book an appointment with {provider.name}</Text>
      <View style={styles.pickerRow}>
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity onPress={openDatePicker} style={styles.pickerButton}>
          <Text style={styles.pickerText}>{formatDate(date)}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickerRow}>
        <Text style={styles.label}>Time:</Text>
        <TouchableOpacity onPress={openTimePicker} style={styles.pickerButton}>
          <Text style={styles.pickerText}>{formatTime(date)}</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}
      <TouchableOpacity
        style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
        onPress={confirmBooking}
        disabled={loading || user?.role === 'provider'}
      >
        <Text style={styles.buttonText}>Confirm Booking (£{provider.price.toFixed(2)})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    width: 60,
  },
  pickerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  pickerText: {
    fontSize: 16,
  },
  button: {
    marginTop: 30,
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