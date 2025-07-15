import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

interface Booking {
  id: string;
  service: string;
  icon: string;
  provider: string;
  services: string;
  date: string;
  time: string;
  location: string;
  status: 'completed' | 'cancelled';
  price: string;
  rating: number | null;
}

const bookingHistory: Booking[] = [
  {
    id: 'BK001',
    service: 'Hair Care',
    icon: '✂️',
    provider: 'Mike Johnson',
    services: 'Classic Haircut + Beard Trim',
    date: 'Dec 20, 2024',
    time: '2:00 PM',
    location: '123 Main St, NY',
    status: 'completed',
    price: '$53.46',
    rating: 5,
  },
  {
    id: 'BK002',
    service: 'Hair Care',
    icon: '✂️',
    provider: 'David Rodriguez',
    services: 'Modern Haircut',
    date: 'Dec 15, 2024',
    time: '11:00 AM',
    location: '123 Main St, NY',
    status: 'completed',
    price: '$30.80',
    rating: 5,
  },
  {
    id: 'BK003',
    service: 'Hair Care',
    icon: '✂️',
    provider: 'Mike Johnson',
    services: 'Hot Towel Shave',
    date: 'Dec 10, 2024',
    time: '4:00 PM',
    location: '123 Main St, NY',
    status: 'completed',
    price: '$38.50',
    rating: 4,
  },
  {
    id: 'BK004',
    service: 'Hair Care',
    icon: '✂️',
    provider: 'James Wilson',
    services: 'Scissor Cut + Styling',
    date: 'Dec 5, 2024',
    time: '9:00 AM',
    location: '123 Main St, NY',
    status: 'cancelled',
    price: '$42.00',
    rating: null,
  },
  {
    id: 'BK005',
    service: 'Hair Care',
    icon: '✂️',
    provider: 'Alex Thompson',
    services: 'Trendy Cut + Color Touch-up',
    date: 'Nov 28, 2024',
    time: '1:00 PM',
    location: '123 Main St, NY',
    status: 'completed',
    price: '$55.90',
    rating: 5,
  },
];

const HistoryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'cancelled'>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'price-desc' | 'price-asc'>(
    'date-desc',
  );

  const filteredHistory = bookingHistory
    .filter(booking => {
      const matchesSearch =
        booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'price-desc') {
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      } else if (sortBy === 'price-asc') {
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      }
      return 0;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#22c55e';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const totalSpent = bookingHistory
    .filter(booking => booking.status === 'completed')
    .reduce((sum, booking) => sum + parseFloat(booking.price.replace('$', '')), 0);

  const renderStars = (rating: number) => {
    return Array.from({length: 5}, (_, i) => (
      <Text key={i} style={[styles.star, {color: i < rating ? '#fbbf24' : '#d1d5db'}]}>
        ★
      </Text>
    ));
  };

  const FilterButton: React.FC<{title: string; isActive: boolean; onPress: () => void}> = ({
    title,
    isActive,
    onPress,
  }) => (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.activeFilterButton]}
      onPress={onPress}>
      <Text style={[styles.filterButtonText, isActive && styles.activeFilterButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking History</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>↓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Summary Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{bookingHistory.length}</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${totalSpent.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>

        {/* Search and Filters */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search bookings..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.filtersRow}>
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Status:</Text>
              <View style={styles.filterButtons}>
                <FilterButton
                  title="All"
                  isActive={statusFilter === 'all'}
                  onPress={() => setStatusFilter('all')}
                />
                <FilterButton
                  title="Completed"
                  isActive={statusFilter === 'completed'}
                  onPress={() => setStatusFilter('completed')}
                />
                <FilterButton
                  title="Cancelled"
                  isActive={statusFilter === 'cancelled'}
                  onPress={() => setStatusFilter('cancelled')}
                />
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sort by:</Text>
              <View style={styles.filterButtons}>
                <FilterButton
                  title="Newest"
                  isActive={sortBy === 'date-desc'}
                  onPress={() => setSortBy('date-desc')}
                />
                <FilterButton
                  title="Oldest"
                  isActive={sortBy === 'date-asc'}
                  onPress={() => setSortBy('date-asc')}
                />
                <FilterButton
                  title="Price ↓"
                  isActive={sortBy === 'price-desc'}
                  onPress={() => setSortBy('price-desc')}
                />
                <FilterButton
                  title="Price ↑"
                  isActive={sortBy === 'price-asc'}
                  onPress={() => setSortBy('price-asc')}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Booking History List */}
        <View style={styles.bookingsList}>
          {filteredHistory.map(booking => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingIcon}>{booking.icon}</Text>
                  <View style={styles.bookingDetails}>
                    <Text style={styles.providerName}>{booking.provider}</Text>
                    <Text style={styles.serviceName}>{booking.services}</Text>
                    <Text style={styles.bookingId}>ID: {booking.id}</Text>
                  </View>
                </View>
                <View
                  style={[styles.statusBadge, {backgroundColor: getStatusColor(booking.status)}]}>
                  <Text style={styles.statusText}>{booking.status}</Text>
                </View>
              </View>

              <View style={styles.bookingContent}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>📅</Text>
                  <Text style={styles.infoText}>
                    {booking.date} at {booking.time}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>📍</Text>
                  <Text style={styles.infoText}>{booking.location}</Text>
                </View>

                {booking.rating && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>⭐</Text>
                    <View style={styles.ratingContainer}>
                      <View style={styles.starsContainer}>{renderStars(booking.rating)}</View>
                      <Text style={styles.ratingText}>({booking.rating}/5)</Text>
                    </View>
                  </View>
                )}

                <View style={styles.bookingFooter}>
                  <View style={styles.actionButtons}>
                    {booking.status === 'completed' && (
                      <>
                        <TouchableOpacity style={styles.actionButton}>
                          <Text style={styles.actionButtonText}>Book Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                          <Text style={styles.actionButtonText}>Receipt</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                  <Text style={styles.price}>{booking.price}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {filteredHistory.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📅</Text>
            <Text style={styles.emptyStateTitle}>No bookings found</Text>
            <Text style={styles.emptyStateText}>Try adjusting your search or filters</Text>
          </View>
        )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  downloadButton: {
    padding: 8,
  },
  downloadButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Add padding to prevent content from being hidden by bottom navigation
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  searchContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  filtersRow: {
    gap: 16,
  },
  filterSection: {
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  activeFilterButton: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#6b7280',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  bookingsList: {
    padding: 16,
    gap: 16,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bookingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  bookingDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  serviceName: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  bookingId: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  bookingContent: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 12,
    color: '#6b7280',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#374151',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default HistoryScreen;
