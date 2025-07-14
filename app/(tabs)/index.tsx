import React, {useMemo, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {MaterialIcons} from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {LinearGradient} from 'expo-linear-gradient';

const {width, height} = Dimensions.get('window');

const barbers = [
  { 
    id: 1,
    name: 'Mike Johnson',
    specialties: ['Classic Cuts', 'Beard Styling', 'Hot Towel Shave'],
    rating: 4.9,
    reviews: 127,
    experience: '5 years',
    priceRange: '$25-45',
    image: 'https://via.placeholder.com/120x120',
    available: true,
    nextAvailable: 'Today 2:00 PM',
    location: {
      address: '456 Broadway, New York, NY',
      distance: 0.8,
      travelTime: 12,
      coordinates: {lat: 40.7589, lng: -73.9851},
    },
  },
  {
    id: 2,
    name: 'David Rodriguez',
    specialties: ['Modern Styles', 'Fade Cuts', 'Hair Washing'],
    rating: 4.8,
    reviews: 89,
    experience: '3 years',
    priceRange: '$20-40',
    image: 'https://via.placeholder.com/120x120',
    available: true,
    nextAvailable: 'Today 4:00 PM',
    location: {
      address: '789 5th Avenue, New York, NY',
      distance: 1.2,
      travelTime: 18,
      coordinates: {lat: 40.7614, lng: -73.9776},
    },
  },
  {
    id: 3,
    name: 'James Wilson',
    specialties: ['Scissor Cuts', 'Styling', 'Consultation'],
    rating: 4.7,
    reviews: 156,
    experience: '7 years',
    priceRange: '$30-50',
    image: 'https://via.placeholder.com/120x120',
    available: false,
    nextAvailable: 'Tomorrow 10:00 AM',
    location: {
      address: '321 Madison Ave, New York, NY',
      distance: 2.1,
      travelTime: 25,
      coordinates: {lat: 40.7505, lng: -73.9934},
    },
  },
  {
    id: 4,
    name: 'Alex Thompson',
    specialties: ['Trendy Cuts', 'Color Touch-ups', 'Beard Trim'],
    rating: 4.9,
    reviews: 203,
    experience: '6 years',
    priceRange: '$28-48',
    image: 'https://via.placeholder.com/120x120',
    available: true,
    nextAvailable: 'Today 6:00 PM',
    location: {
      address: '654 Park Ave, New York, NY',
      distance: 1.5,
      travelTime: 20,
      coordinates: {lat: 40.7682, lng: -73.9712},
    },
  },
  {
    id: 5,
    name: 'Carlos Martinez',
    specialties: ['Buzz Cuts', 'Military Cuts', 'Quick Trim'],
    rating: 4.6,
    reviews: 78,
    experience: '4 years',
    priceRange: '$15-35',
    image: 'https://via.placeholder.com/120x120',
    available: true,
    nextAvailable: 'Today 3:00 PM',
    location: {
      address: '987 Lexington Ave, New York, NY',
      distance: 3.2,
      travelTime: 35,
      coordinates: {lat: 40.7831, lng: -73.9712},
    },
  },
  {
    id: 6,
    name: 'Robert Kim',
    specialties: ['Asian Hair Cuts', 'Perms', 'Hair Treatment'],
    rating: 4.8,
    reviews: 142,
    experience: '8 years',
    priceRange: '$35-55',
    image: 'https://via.placeholder.com/120x120',
    available: true,
    nextAvailable: 'Today 5:00 PM',
    location: {
      address: '234 East 86th St, New York, NY',
      distance: 4.1,
      travelTime: 42,
      coordinates: {lat: 40.7794, lng: -73.9441},
    },
  },
];

const Badge = ({children, variant = 'default', style}) => (
  <View
    style={[
      styles.badge,
      variant === 'default' && styles.badgeDefault,
      variant === 'secondary' && styles.badgeSecondary,
      variant === 'outline' && styles.badgeOutline,
      style,
    ]}>
    <Text
      style={[
        styles.badgeText,
        variant === 'default' && styles.badgeTextDefault,
        variant === 'secondary' && styles.badgeTextSecondary,
        variant === 'outline' && styles.badgeTextOutline,
      ]}>
      {children}
    </Text>
  </View>
);

const Button = ({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  style,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      variant === 'default' && styles.buttonDefault,
      variant === 'outline' && styles.buttonOutline,
      variant === 'ghost' && styles.buttonGhost,
      size === 'sm' && styles.buttonSm,
      disabled && styles.buttonDisabled,
      style,
    ]}
    onPress={onPress}
    disabled={disabled}>
    <Text
      style={[
        styles.buttonText,
        variant === 'default' && styles.buttonTextDefault,
        variant === 'outline' && styles.buttonTextOutline,
        variant === 'ghost' && styles.buttonTextGhost,
        size === 'sm' && styles.buttonTextSm,
        disabled && styles.buttonTextDisabled,
      ]}>
      {children}
    </Text>
  </TouchableOpacity>
);

const FilterModal = ({visible, onClose, filters, setFilters, onClearFilters}) => {
  const calculateActiveFilters = () => {
    let count = 0;
    if (filters.maxDistance < 5) count++;
    if (filters.maxTravelTime < 60) count++;
    if (filters.availability !== 'all') count++;
    if (filters.rating !== 'all') count++;
    if (filters.priceRange !== 'all') count++;
    if (filters.sortBy !== 'distance') count++;
    return count;
  };

  const SelectOption = ({label, value, selectedValue, onSelect}) => (
    <TouchableOpacity
      style={[styles.selectOption, selectedValue === value && styles.selectOptionSelected]}
      onPress={() => onSelect(value)}>
      <Text
        style={[
          styles.selectOptionText,
          selectedValue === value && styles.selectOptionTextSelected,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const SelectGroup = ({label, options, selectedValue, onSelect}) => (
    <View style={styles.selectGroup}>
      <Text style={styles.selectLabel}>{label}</Text>
      <View style={styles.selectContainer}>
        {options.map(option => (
          <SelectOption
            key={option.value}
            label={option.label}
            value={option.value}
            selectedValue={selectedValue}
            onSelect={onSelect}
          />
        ))}
      </View>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filter Barbers</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* Distance Filter */}
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterLabel}>Maximum Distance</Text>
              <Text style={styles.filterValue}>{filters.maxDistance} miles</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={5}
              value={filters.maxDistance}
              onValueChange={value =>
                setFilters({...filters, maxDistance: Math.round(value * 2) / 2})
              }
              step={0.5}
              minimumTrackTintColor="#3B82F6"
              maximumTrackTintColor="#E5E7EB"
              thumbStyle={styles.sliderThumb}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>0.5 mi</Text>
              <Text style={styles.sliderLabel}>5 mi</Text>
            </View>
          </View>

          {/* Travel Time Filter */}
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterLabel}>Maximum Travel Time</Text>
              <Text style={styles.filterValue}>{filters.maxTravelTime} min</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={5}
              maximumValue={60}
              value={filters.maxTravelTime}
              onValueChange={value =>
                setFilters({...filters, maxTravelTime: Math.round(value / 5) * 5})
              }
              step={5}
              minimumTrackTintColor="#3B82F6"
              maximumTrackTintColor="#E5E7EB"
              thumbStyle={styles.sliderThumb}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>5 min</Text>
              <Text style={styles.sliderLabel}>60 min</Text>
            </View>
          </View>

          {/* Availability Filter */}
          <SelectGroup
            label="Availability"
            selectedValue={filters.availability}
            onSelect={value => setFilters({...filters, availability: value})}
            options={[
              {label: 'All Barbers', value: 'all'},
              {label: 'Available Now', value: 'available'},
              {label: 'Busy', value: 'busy'},
            ]}
          />

          {/* Rating Filter */}
          <SelectGroup
            label="Minimum Rating"
            selectedValue={filters.rating}
            onSelect={value => setFilters({...filters, rating: value})}
            options={[
              {label: 'All Ratings', value: 'all'},
              {label: '4.0+ Stars', value: '4+'},
              {label: '4.5+ Stars', value: '4.5+'},
              {label: '4.8+ Stars', value: '4.8+'},
            ]}
          />

          {/* Price Range Filter */}
          <SelectGroup
            label="Price Range"
            selectedValue={filters.priceRange}
            onSelect={value => setFilters({...filters, priceRange: value})}
            options={[
              {label: 'All Prices', value: 'all'},
              {label: 'Budget ($15-25)', value: 'budget'},
              {label: 'Mid-range ($26-35)', value: 'mid'},
              {label: 'Premium ($36+)', value: 'premium'},
            ]}
          />

          {/* Sort By */}
          <SelectGroup
            label="Sort By"
            selectedValue={filters.sortBy}
            onSelect={value => setFilters({...filters, sortBy: value})}
            options={[
              {label: 'Closest Distance', value: 'distance'},
              {label: 'Shortest Travel Time', value: 'time'},
              {label: 'Highest Rating', value: 'rating'},
              {label: 'Lowest Price', value: 'price'},
            ]}
          />

          {/* Clear Filters */}
          {calculateActiveFilters() > 0 && (
            <Button variant="outline" onPress={onClearFilters} style={styles.clearButton}>
              Clear All Filters
            </Button>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const BarberCard = ({barber, onPress}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardContent}>
      <Image source={{uri: barber.image}} style={styles.avatar} />
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <View style={styles.cardLeft}>
            <Text style={styles.barberName}>{barber.name}</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color="#FFC107" />
              <Text style={styles.rating}>{barber.rating}</Text>
              <Text style={styles.reviews}>({barber.reviews} reviews)</Text>
            </View>
            <Text style={styles.experience}>{barber.experience} experience</Text>
          </View>
          <View style={styles.cardRight}>
            <Badge variant={barber.available ? 'default' : 'secondary'}>
              {barber.available ? 'Available' : 'Busy'}
            </Badge>
            <Text style={styles.priceRange}>{barber.priceRange}</Text>
          </View>
        </View>

        <View style={styles.specialtiesContainer}>
          <Text style={styles.specialtiesLabel}>Specialties:</Text>
          <View style={styles.specialties}>
            {barber.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" style={styles.specialtyBadge}>
                {specialty}
              </Badge>
            ))}
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              📍 {barber.location.distance} mi • {barber.location.travelTime} min away
            </Text>
            <Text style={styles.address}>{barber.location.address}</Text>
            <Text style={styles.nextAvailable}>
              Next available: <Text style={styles.nextAvailableTime}>{barber.nextAvailable}</Text>
            </Text>
          </View>
          <Button size="sm" disabled={!barber.available}>
            View Services
          </Button>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    maxDistance: 5,
    maxTravelTime: 60,
    availability: 'all',
    rating: 'all',
    priceRange: 'all',
    sortBy: 'distance',
  });

  const calculateActiveFilters = () => {
    let count = 0;
    if (filters.maxDistance < 5) count++;
    if (filters.maxTravelTime < 60) count++;
    if (filters.availability !== 'all') count++;
    if (filters.rating !== 'all') count++;
    if (filters.priceRange !== 'all') count++;
    if (filters.sortBy !== 'distance') count++;
    return count;
  };

  const filteredAndSortedBarbers = useMemo(() => {
    return barbers
      .filter(barber => {
        const matchesSearch =
          barber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          barber.specialties.some(specialty =>
            specialty.toLowerCase().includes(searchQuery.toLowerCase()),
          );

        const matchesDistance = barber.location.distance <= filters.maxDistance;
        const matchesTravelTime = barber.location.travelTime <= filters.maxTravelTime;
        const matchesAvailability =
          filters.availability === 'all' ||
          (filters.availability === 'available' && barber.available) ||
          (filters.availability === 'busy' && !barber.available);

        const matchesRating =
          filters.rating === 'all' ||
          (filters.rating === '4+' && barber.rating >= 4.0) ||
          (filters.rating === '4.5+' && barber.rating >= 4.5) ||
          (filters.rating === '4.8+' && barber.rating >= 4.8);

        const matchesPriceRange = (() => {
          if (filters.priceRange === 'all') return true;
          const minPrice = parseInt(barber.priceRange.split('-')[0].replace('$', ''));
          if (filters.priceRange === 'budget') return minPrice <= 25;
          if (filters.priceRange === 'mid') return minPrice > 25 && minPrice <= 35;
          if (filters.priceRange === 'premium') return minPrice > 35;
          return true;
        })();

        return (
          matchesSearch &&
          matchesDistance &&
          matchesTravelTime &&
          matchesAvailability &&
          matchesRating &&
          matchesPriceRange
        );
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'distance':
            return a.location.distance - b.location.distance;
          case 'time':
            return a.location.travelTime - b.location.travelTime;
          case 'rating':
            return b.rating - a.rating;
          case 'price':
            const aPrice = parseInt(a.priceRange.split('-')[0].replace('$', ''));
            const bPrice = parseInt(b.priceRange.split('-')[0].replace('$', ''));
            return aPrice - bPrice;
          default:
            return 0;
        }
      });
  }, [searchQuery, filters]);

  const clearAllFilters = () => {
    setFilters({
      maxDistance: 5,
      maxTravelTime: 60,
      availability: 'all',
      rating: 'all',
      priceRange: 'all',
      sortBy: 'distance',
    });
  };

  const handleBarberPress = barber => {
    Alert.alert('Barber Selected', `You selected ${barber.name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.userInfo}>
            <Image
              source={{uri: 'https://i.postimg.cc/GpQSC9Ww/import-placeholder.png'}}
              style={styles.userAvatar}
            />
            <View>
              <Text style={styles.greeting}>Good morning!</Text>
              <Text style={styles.userName}>John Doe</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notificationButton}>
              <MaterialIcons name="notifications" size={20} color="#666" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <MaterialIcons name="person" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <View style={styles.location}>
            <MaterialIcons name="location-on" size={16} color="#666" />
            <Text style={styles.locationText}>123 Main St, New York, NY</Text>
            <TouchableOpacity>
              <Text style={styles.changeLocation}>Change</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.mapButton}>
            <MaterialIcons name="map" size={16} color="#3B82F6" />
            <Text style={styles.mapButtonText}>View Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* App Title */}
      <LinearGradient colors={['#3B82F6', '#8B5CF6']} style={styles.titleContainer}>
        <Text style={styles.appTitle}>✂️ Hair Care Pro</Text>
        <Text style={styles.appSubtitle}>Professional barbers at your doorstep</Text>
      </LinearGradient>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search barbers or specialties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
            <MaterialIcons name="filter-list" size={16} color="#666" />
            <Text style={styles.filterButtonText}>Filters</Text>
            {calculateActiveFilters() > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{calculateActiveFilters()}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortButtonText}>
              {filters.sortBy === 'distance'
                ? 'Closest'
                : filters.sortBy === 'time'
                  ? 'Fastest'
                  : filters.sortBy === 'rating'
                    ? 'Top Rated'
                    : 'Cheapest'}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Active Filters */}
        {calculateActiveFilters() > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.activeFilters}>
            {filters.maxDistance < 5 && (
              <Badge variant="secondary" style={styles.activeFilterBadge}>
                Within {filters.maxDistance} miles
              </Badge>
            )}
            {filters.maxTravelTime < 60 && (
              <Badge variant="secondary" style={styles.activeFilterBadge}>
                Under {filters.maxTravelTime} min
              </Badge>
            )}
            {filters.availability !== 'all' && (
              <Badge variant="secondary" style={styles.activeFilterBadge}>
                {filters.availability === 'available' ? 'Available Now' : 'Busy'}
              </Badge>
            )}
            {filters.rating !== 'all' && (
              <Badge variant="secondary" style={styles.activeFilterBadge}>
                {filters.rating} Rating
              </Badge>
            )}
            {filters.priceRange !== 'all' && (
              <Badge variant="secondary" style={styles.activeFilterBadge}>
                {filters.priceRange.charAt(0).toUpperCase() + filters.priceRange.slice(1)} Price
              </Badge>
            )}
          </ScrollView>
        )}
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredAndSortedBarbers.length} barber{filteredAndSortedBarbers.length !== 1 ? 's' : ''}{' '}
          found
          {searchQuery && ` for "${searchQuery}"`}
        </Text>
      </View>

      {/* Barbers List */}
      <ScrollView style={styles.barbersList} showsVerticalScrollIndicator={false}>
        {filteredAndSortedBarbers.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="search" size={48} color="#ccc" />
            <Text style={styles.emptyStateTitle}>No barbers found</Text>
            <Text style={styles.emptyStateText}>Try adjusting your search or filters</Text>
            <Button onPress={clearAllFilters} variant="outline" style={styles.emptyStateButton}>
              Clear Filters
            </Button>
          </View>
        ) : (
          filteredAndSortedBarbers.map(barber => (
            <BarberCard key={barber.id} barber={barber} onPress={() => handleBarberPress(barber)} />
          ))
        )}
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
        onClearFilters={clearAllFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  userName: {
    fontSize: 12,
    color: '#6B7280',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  changeLocation: {
    fontSize: 14,
    color: '#3B82F6',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
  },
  mapButtonText: {
    fontSize: 14,
    color: '#3B82F6',
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#DBEAFE',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  filterBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    minWidth: 120,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  activeFilters: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  activeFilterBadge: {
    marginRight: 8,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  barbersList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  emptyStateButton: {
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e7e7e7',
  },
  cardInfo: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardLeft: {
    flex: 1,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  barberName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  reviews: {
    fontSize: 14,
    color: '#6B7280',
  },
  experience: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceRange: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  specialtiesContainer: {
    marginBottom: 12,
  },
  specialtiesLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  specialtyBadge: {
    marginRight: 4,
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  locationInfo: {
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  nextAvailable: {
    fontSize: 14,
    color: '#6B7280',
  },
  nextAvailableTime: {
    fontWeight: '500',
    color: '#111827',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
    color: '#6B7280',
  },
  navLabelActive: {
    fontSize: 12,
    color: '#3B82F6',
  },
  // Badge styles
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeDefault: {
    backgroundColor: '#3B82F6',
  },
  badgeSecondary: {
    backgroundColor: '#F3F4F6',
  },
  badgeOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  badgeTextDefault: {
    color: '#FFFFFF',
  },
  badgeTextSecondary: {
    color: '#374151',
  },
  badgeTextOutline: {
    color: '#374151',
  },
  // Button styles
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDefault: {
    backgroundColor: '#3B82F6',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonSm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonTextDefault: {
    color: '#FFFFFF',
  },
  buttonTextOutline: {
    color: '#374151',
  },
  buttonTextGhost: {
    color: '#374151',
  },
  buttonTextSm: {
    fontSize: 12,
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  filterSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  filterValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#3B82F6',
    width: 20,
    height: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  selectGroup: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12,
  },
  selectContainer: {
    gap: 8,
  },
  selectOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  selectOptionSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  selectOptionText: {
    fontSize: 14,
    color: '#374151',
  },
  selectOptionTextSelected: {
    color: '#3B82F6',
    fontWeight: '500',
  },
  clearButton: {
    marginTop: 24,
    marginBottom: 32,
  },
});
