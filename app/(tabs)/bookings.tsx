import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface Booking {
  id: number;
  service: string;
  icon: string;
  provider: string;
  services: string;
  date: string;
  time: string;
  location: string;
  status: string;
  price: string;
  rating?: number;
}

const upcomingBookings: Booking[] = [
  {
    id: 1,
    service: 'Hair Care',
    icon: '✂️',
    provider: 'Mike Johnson',
    services: 'Classic Haircut + Beard Trim',
    date: 'Dec 28, 2024',
    time: '2:00 PM',
    location: '123 Main St, NY',
    status: 'confirmed',
    price: '$53.46',
  },
  {
    id: 2,
    service: 'Hair Care',
    icon: '✂️',
    provider: 'David Rodriguez',
    services: 'Modern Haircut + Styling',
    date: 'Dec 30, 2024',
    time: '4:00 PM',
    location: '123 Main St, NY',
    status: 'confirmed',
    price: '$42.80',
  },
];

const pastBookings: Booking[] = [
  {
    id: 3,
    service: 'Hair Care',
    icon: '✂️',
    provider: 'Mike Johnson',
    services: 'Hot Towel Shave',
    date: 'Dec 20, 2024',
    time: '11:00 AM',
    location: '123 Main St, NY',
    status: 'completed',
    price: '$38.50',
    rating: 5,
  },
  {
    id: 4,
    service: 'Hair Care',
    icon: '✂️',
    provider: 'David Rodriguez',
    services: 'Skin Fade',
    date: 'Dec 15, 2024',
    time: '9:00 AM',
    location: '123 Main St, NY',
    status: 'completed',
    price: '$35.20',
    rating: 4,
  },
];

interface BookingsScreenProps {
  navigation: any; // You can use proper navigation types from @react-navigation/native
}

const Bookings: React.FC<BookingsScreenProps> = ({navigation}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return {backgroundColor: '#dcfce7', color: '#166534'};
      case 'completed':
        return {backgroundColor: '#dbeafe', color: '#1e40af'};
      case 'cancelled':
        return {backgroundColor: '#fee2e2', color: '#dc2626'};
      default:
        return {backgroundColor: '#f3f4f6', color: '#374151'};
    }
  };

  const showDropdownMenu = (booking: Booking) => {
    Alert.alert(
      'Booking Options',
      `What would you like to do with ${booking.provider}'s booking?`,
      [
        {text: 'Reschedule', onPress: () => console.log('Reschedule')},
        {text: 'Contact Provider', onPress: () => console.log('Contact')},
        {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'destructive'},
        {text: 'Close', style: 'cancel'},
      ],
    );
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        <Text style={styles.ratingText}>Your rating: </Text>
        {[...Array(5)].map((_, i) => (
          <Text key={i} style={[styles.star, {color: i < rating ? '#fbbf24' : '#d1d5db'}]}>
            ★
          </Text>
        ))}
      </View>
    );
  };

  const renderBookingCard = (booking: Booking, isPast: boolean = false) => (
    <View key={booking.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.providerInfo}>
          <Text style={styles.icon}>{booking.icon}</Text>
          <View style={styles.providerDetails}>
            <Text style={styles.providerName}>{booking.provider}</Text>
            <Text style={styles.serviceDescription}>{booking.services}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.badge, getStatusColor(booking.status)]}>
            <Text style={[styles.badgeText, {color: getStatusColor(booking.status).color}]}>
              {booking.status}
            </Text>
          </View>
          {!isPast && (
            <TouchableOpacity style={styles.menuButton} onPress={() => showDropdownMenu(booking)}>
              <Ionicons name="ellipsis-vertical" size={16} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#6b7280" />
          <Text style={styles.detailText}>
            {booking.date} at {booking.time}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color="#6b7280" />
          <Text style={styles.detailText}>{booking.location}</Text>
        </View>

        <View style={styles.actionRow}>
          <View style={styles.actionButtons}>
            {isPast ? (
              <>
                <TouchableOpacity style={styles.outlineButton}>
                  <Text style={styles.outlineButtonText}>Book Again</Text>
                </TouchableOpacity>
                {!booking.rating && (
                  <TouchableOpacity style={styles.outlineButton}>
                    <Text style={styles.outlineButtonText}>Rate Service</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.outlineButton}>
                  <Ionicons name="call-outline" size={16} color="#374151" />
                  <Text style={styles.outlineButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.outlineButton}>
                  <Ionicons name="chatbubble-outline" size={16} color="#374151" />
                  <Text style={styles.outlineButtonText}>Message</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <Text style={styles.price}>{booking.price}</Text>
        </View>

        {booking.rating && renderStars(booking.rating)}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="calendar-outline" size={48} color="#9ca3af" />
      <Text style={styles.emptyTitle}>No upcoming bookings</Text>
      <Text style={styles.emptyDescription}>Book a service to see it here</Text>
      <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('/home')}>
        <Text style={styles.browseButtonText}>Browse Services</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      {/*<View style={styles.header}>*/}
      {/*  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>*/}
      {/*    <Ionicons name="arrow-back" size={20} color="#000" />*/}
      {/*  </TouchableOpacity>*/}
      {/*  <Text style={styles.headerTitle}>My Bookings</Text>*/}
      {/*</View>*/}

      {/* Tabs */}
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
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'upcoming'
          ? upcomingBookings.length === 0
            ? renderEmptyState()
            : upcomingBookings.map(booking => renderBookingCard(booking, false))
          : pastBookings.map(booking => renderBookingCard(booking, true))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#f3f4f6',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
  },
  activeTabText: {
    color: '#111827',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 12,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  menuButton: {
    padding: 4,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    gap: 4,
  },
  outlineButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#6b7280',
  },
  star: {
    fontSize: 16,
    marginLeft: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  browseButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  browseButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default Bookings;
