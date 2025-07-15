import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {FontAwesome, Ionicons, MaterialIcons} from '@expo/vector-icons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface Service {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: number;
}

interface Location {
  address: string;
  distance: string;
  travelTime: string;
  coordinates: {lat: number; lng: number};
}

interface Barber {
  name: string;
  specialties: string[];
  rating: number;
  reviews: number;
  experience: string;
  image: string;
  bio: string;
  location: Location;
  services: Service[];
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

const barberData: Record<number, Barber> = {
  1: {
    name: 'Mike Johnson',
    specialties: ['Classic Cuts', 'Beard Styling', 'Hot Towel Shave'],
    rating: 4.9,
    reviews: 127,
    experience: '5 years',
    image: 'https://placeholder.pics/svg/120',
    bio: 'Professional barber with 5 years of experience. Specializes in classic cuts and modern styling. Certified in hot towel shaves and beard grooming.',
    location: {
      address: '456 Broadway, New York, NY',
      distance: '0.8 miles',
      travelTime: '12 min',
      coordinates: {lat: 40.7589, lng: -73.9851},
    },
    services: [
      {
        id: 1,
        name: 'Classic Haircut',
        description: 'Traditional scissor cut with styling',
        duration: '45 min',
        price: 25,
      },
      {
        id: 2,
        name: 'Fade Cut',
        description: 'Modern fade with scissor work on top',
        duration: '50 min',
        price: 30,
      },
      {
        id: 3,
        name: 'Beard Trim & Style',
        description: 'Professional beard shaping and styling',
        duration: '30 min',
        price: 20,
      },
      {
        id: 4,
        name: 'Hot Towel Shave',
        description: 'Traditional straight razor shave with hot towel',
        duration: '40 min',
        price: 35,
      },
      {
        id: 5,
        name: 'Hair Wash & Style',
        description: 'Shampoo, conditioning, and styling',
        duration: '25 min',
        price: 15,
      },
      {
        id: 6,
        name: 'Full Service Package',
        description: 'Haircut + Beard trim + Hot towel treatment',
        duration: '75 min',
        price: 45,
      },
    ],
  },
  2: {
    name: 'David Rodriguez',
    specialties: ['Modern Styles', 'Fade Cuts', 'Hair Washing'],
    rating: 4.8,
    reviews: 89,
    experience: '3 years',
    image: 'https://placeholder.pics/svg/120',
    bio: 'Modern stylist specializing in contemporary cuts and fades. Expert in the latest trends and techniques.',
    location: {
      address: '789 5th Avenue, New York, NY',
      distance: '1.2 miles',
      travelTime: '18 min',
      coordinates: {lat: 40.7614, lng: -73.9776},
    },
    services: [
      {
        id: 1,
        name: 'Modern Haircut',
        description: 'Contemporary styling with modern techniques',
        duration: '40 min',
        price: 28,
      },
      {
        id: 2,
        name: 'Skin Fade',
        description: 'Precision skin fade with blend',
        duration: '45 min',
        price: 32,
      },
      {
        id: 3,
        name: 'Textured Cut',
        description: 'Textured styling for modern look',
        duration: '50 min',
        price: 35,
      },
      {
        id: 4,
        name: 'Buzz Cut',
        description: 'Clean, professional buzz cut',
        duration: '20 min',
        price: 18,
      },
      {
        id: 5,
        name: 'Hair Styling',
        description: 'Professional styling and finishing',
        duration: '20 min',
        price: 12,
      },
    ],
  },
  3: {
    name: 'James Wilson',
    specialties: ['Scissor Cuts', 'Styling', 'Consultation'],
    rating: 4.7,
    reviews: 156,
    experience: '7 years',
    image: 'https://via.placeholder.com/120x120',
    bio: 'Expert stylist with 7 years of experience specializing in precision scissor cuts and personalized styling consultations. Known for attention to detail and client satisfaction.',
    location: {
      address: '321 Madison Ave, New York, NY',
      distance: '2.1 miles',
      travelTime: '25 min',
      coordinates: {lat: 40.7505, lng: -73.9934},
    },
    services: [
      {
        id: 1,
        name: 'Precision Scissor Cut',
        description: 'Expert scissor cutting with detailed styling',
        duration: '55 min',
        price: 35,
      },
      {
        id: 2,
        name: 'Style Consultation',
        description: 'Personalized styling consultation and cut',
        duration: '60 min',
        price: 50,
      },
      {
        id: 3,
        name: 'Classic Styling',
        description: 'Traditional styling with modern techniques',
        duration: '40 min',
        price: 30,
      },
      {
        id: 4,
        name: 'Hair Texture Enhancement',
        description: 'Specialized cutting for texture and volume',
        duration: '50 min',
        price: 40,
      },
      {
        id: 5,
        name: 'Maintenance Cut',
        description: 'Quick touch-up and styling',
        duration: '30 min',
        price: 25,
      },
    ],
  },
  4: {
    name: 'Alex Thompson',
    specialties: ['Trendy Cuts', 'Color Touch-ups', 'Beard Trim'],
    rating: 4.9,
    reviews: 203,
    experience: '6 years',
    image: 'https://via.placeholder.com/120x120',
    bio: 'Trendsetting barber with 6 years of experience in modern cuts and color techniques. Specializes in contemporary styles and beard grooming.',
    location: {
      address: '654 Park Ave, New York, NY',
      distance: '1.5 miles',
      travelTime: '20 min',
      coordinates: {lat: 40.7682, lng: -73.9712},
    },
    services: [
      {
        id: 1,
        name: 'Trendy Haircut',
        description: 'Latest fashion-forward cuts and styling',
        duration: '45 min',
        price: 32,
      },
      {
        id: 2,
        name: 'Color Touch-up',
        description: 'Subtle color enhancement and highlights',
        duration: '60 min',
        price: 48,
      },
      {
        id: 3,
        name: 'Beard Trim & Shape',
        description: 'Professional beard trimming and shaping',
        duration: '25 min',
        price: 20,
      },
      {
        id: 4,
        name: 'Modern Fade',
        description: 'Contemporary fade with trendy finishing',
        duration: '40 min',
        price: 28,
      },
      {
        id: 5,
        name: 'Complete Makeover',
        description: 'Full haircut, color touch-up, and beard trim',
        duration: '90 min',
        price: 75,
      },
    ],
  },
  5: {
    name: 'Carlos Martinez',
    specialties: ['Buzz Cuts', 'Military Cuts', 'Quick Trim'],
    rating: 4.6,
    reviews: 78,
    experience: '4 years',
    image: 'https://via.placeholder.com/120x120',
    bio: 'Efficient barber with 4 years of experience specializing in clean, professional cuts. Expert in military-style cuts and quick, precise trimming.',
    location: {
      address: '987 Lexington Ave, New York, NY',
      distance: '3.2 miles',
      travelTime: '35 min',
      coordinates: {lat: 40.7831, lng: -73.9712},
    },
    services: [
      {
        id: 1,
        name: 'Classic Buzz Cut',
        description: 'Clean, professional buzz cut',
        duration: '15 min',
        price: 15,
      },
      {
        id: 2,
        name: 'Military Style Cut',
        description: 'Precise military regulation haircut',
        duration: '20 min',
        price: 18,
      },
      {
        id: 3,
        name: 'Quick Trim',
        description: 'Fast, efficient hair trimming',
        duration: '25 min',
        price: 20,
      },
      {
        id: 4,
        name: 'Crew Cut',
        description: 'Traditional crew cut with clean finish',
        duration: '30 min',
        price: 25,
      },
      {
        id: 5,
        name: 'Beard Line-up',
        description: 'Clean beard edges and neckline',
        duration: '15 min',
        price: 12,
      },
      {
        id: 6,
        name: 'Full Service Basic',
        description: 'Haircut and beard line-up combo',
        duration: '35 min',
        price: 30,
      },
    ],
  },
  6: {
    name: 'Robert Kim',
    specialties: ['Asian Hair Cuts', 'Perms', 'Hair Treatment'],
    rating: 4.8,
    reviews: 142,
    experience: '8 years',
    image: 'https://via.placeholder.com/120x120',
    bio: 'Specialist in Asian hair textures with 8 years of experience. Expert in perms, treatments, and cuts designed specifically for Asian hair types.',
    location: {
      address: '234 East 86th St, New York, NY',
      distance: '4.1 miles',
      travelTime: '42 min',
      coordinates: {lat: 40.7794, lng: -73.9441},
    },
    services: [
      {
        id: 1,
        name: 'Asian Hair Cut',
        description: 'Specialized cutting for Asian hair textures',
        duration: '50 min',
        price: 38,
      },
      {
        id: 2,
        name: 'Digital Perm',
        description: 'Modern perm technique for natural curls',
        duration: '120 min',
        price: 85,
      },
      {
        id: 3,
        name: 'Hair Treatment',
        description: 'Deep conditioning and repair treatment',
        duration: '45 min',
        price: 35,
      },
      {
        id: 4,
        name: 'Texture Styling',
        description: 'Styling focused on Asian hair texture',
        duration: '35 min',
        price: 30,
      },
      {
        id: 5,
        name: 'Scalp Treatment',
        description: 'Therapeutic scalp care and massage',
        duration: '30 min',
        price: 25,
      },
      {
        id: 6,
        name: 'Complete Hair Care',
        description: 'Cut, treatment, and styling package',
        duration: '90 min',
        price: 95,
      },
    ],
  },
};

const reviews: Review[] = [
  {
    id: 1,
    name: 'John Smith',
    rating: 5,
    comment: 'Excellent service! Mike really knows his craft. The hot towel shave was amazing.',
    date: '2 days ago',
    service: 'Hot Towel Shave',
  },
  {
    id: 2,
    name: 'Alex Johnson',
    rating: 5,
    comment: "Best haircut I've had in years. Very professional and attention to detail.",
    date: '1 week ago',
    service: 'Classic Haircut',
  },
  {
    id: 3,
    name: 'Michael Brown',
    rating: 4,
    comment: 'Great fade cut. Will definitely book again!',
    date: '2 weeks ago',
    service: 'Fade Cut',
  },
];

// Define the navigation stack param list
type RootStackParamList = {
  BarberProfile: {id: string};
  Booking: {barberId: number; serviceIds: number[]};
  // Add other screens as needed
};

type BarberProfileRouteProp = RouteProp<RootStackParamList, 'BarberProfile'>;
type BarberProfileNavigationProp = StackNavigationProp<RootStackParamList, 'BarberProfile'>;

const BarberProfileScreen: React.FC = () => {
  const route = useRoute<BarberProfileRouteProp>();
  const navigation = useNavigation<BarberProfileNavigationProp>();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'services' | 'reviews'>('services');

  // Get barberId from route params
  const barberId = parseInt(route.params.id);
  const barber = barberData[barberId];

  if (!barber) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Barber not found</Text>
      </SafeAreaView>
    );
  }

  const toggleService = (serviceId: number) => {
    setSelectedServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId],
    );
  };

  const selectedServicesData = barber.services.filter(service =>
    selectedServices.includes(service.id),
  );

  const totalPrice = selectedServicesData.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServicesData.reduce(
    (sum, service) => sum + parseInt(service.duration),
    0,
  );

  const handleBooking = () => {
    if (selectedServices.length > 0) {
      navigation.navigate('Booking', {
        barberId,
        serviceIds: selectedServices,
      });
    }
  };

  const handleCall = () => {
    Alert.alert('Call', `Calling ${barber.name}...`);
  };

  const handleMessage = () => {
    Alert.alert('Message', `Messaging ${barber.name}...`);
  };

  const handleViewMap = () => {
    Alert.alert('Map', 'Opening map...');
  };

  const renderStars = (rating: number, size: number = 16) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={size}
          color={i <= rating ? '#FFC107' : '#E0E0E0'}
        />,
      );
    }
    return stars;
  };

  const renderSpecialtyBadge = (specialty: string, index: number) => (
    <View key={index} style={styles.badge}>
      <Text style={styles.badgeText}>{specialty}</Text>
    </View>
  );

  const renderService = (service: Service) => (
    <TouchableOpacity
      key={service.id}
      style={[styles.serviceCard, selectedServices.includes(service.id) && styles.selectedService]}
      onPress={() => toggleService(service.id)}>
      <View style={styles.serviceContent}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
          <View style={styles.serviceDuration}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.durationText}>{service.duration}</Text>
          </View>
        </View>
        <View style={styles.servicePrice}>
          <Text style={styles.priceText}>${service.price}</Text>
          {selectedServices.includes(service.id) && (
            <View style={styles.selectedBadge}>
              <Text style={styles.selectedBadgeText}>Selected</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderReview = (review: Review) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View>
          <Text style={styles.reviewName}>{review.name}</Text>
          <Text style={styles.reviewDate}>
            {review.date} • {review.service}
          </Text>
        </View>
        <View style={styles.reviewRating}>{renderStars(review.rating, 12)}</View>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{barber.name}</Text>
        </View>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#FF4444' : '#666'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{uri: barber.image}} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.barberName}>{barber.name}</Text>
              <View style={styles.ratingRow}>
                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={16} color="#FFC107" />
                  <Text style={styles.ratingText}>{barber.rating}</Text>
                </View>
                <Text style={styles.reviewCount}>({barber.reviews} reviews)</Text>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.experience}>{barber.experience}</Text>
              </View>
              <Text style={styles.bio}>{barber.bio}</Text>
            </View>
          </View>

          {/* Location Section */}
          <View style={styles.locationSection}>
            <View style={styles.locationHeader}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.locationTitle}>Location & Travel Time</Text>
            </View>
            <View style={styles.locationCard}>
              <Text style={styles.address}>{barber.location.address}</Text>
              <View style={styles.locationDetails}>
                <Text style={styles.locationDetail}>📍 {barber.location.distance} away</Text>
                <Text style={styles.locationDetail}>🚗 {barber.location.travelTime} drive</Text>
              </View>
              <TouchableOpacity style={styles.mapButton} onPress={handleViewMap}>
                <Ionicons name="map-outline" size={16} color="#007AFF" />
                <Text style={styles.mapButtonText}>View on Map</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <Ionicons name="call-outline" size={16} color="#007AFF" />
              <Text style={styles.actionButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleMessage}>
              <MaterialIcons name="message" size={16} color="#007AFF" />
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>
          </View>

          {/* Specialties */}
          <View style={styles.specialtiesSection}>
            <Text style={styles.specialtiesTitle}>Specialties:</Text>
            <View style={styles.specialtiesContainer}>
              {barber.specialties.map(renderSpecialtyBadge)}
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'services' && styles.activeTab]}
            onPress={() => setActiveTab('services')}>
            <Text style={[styles.tabText, activeTab === 'services' && styles.activeTabText]}>
              Services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}>
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'services' ? (
            <View style={styles.servicesContainer}>{barber.services.map(renderService)}</View>
          ) : (
            <View style={styles.reviewsContainer}>{reviews.map(renderReview)}</View>
          )}
        </View>

        {/* Bottom Spacing */}
        <View style={{height: selectedServices.length > 0 ? 150 : 50}} />
      </ScrollView>

      {/* Selected Services Summary */}
      {selectedServices.length > 0 && (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Selected Services ({selectedServices.length})</Text>
            <TouchableOpacity onPress={() => setSelectedServices([])}>
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.summaryServices}>
            {selectedServicesData.map(service => (
              <View key={service.id} style={styles.summaryService}>
                <Text style={styles.summaryServiceName}>{service.name}</Text>
                <Text style={styles.summaryServicePrice}>${service.price}</Text>
              </View>
            ))}
          </View>
          <View style={styles.summaryFooter}>
            <View>
              <Text style={styles.totalPrice}>Total: ${totalPrice}</Text>
              <Text style={styles.totalDuration}>~{totalDuration} minutes</Text>
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  notFound: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#FFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
  },
  profileInfo: {
    flex: 1,
  },
  barberName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontWeight: '600',
  },
  reviewCount: {
    color: '#666',
  },
  separator: {
    color: '#666',
  },
  experience: {
    color: '#666',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  locationSection: {
    marginTop: 16,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  locationCard: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
  },
  address: {
    fontSize: 14,
    fontWeight: '600',
  },
  locationDetails: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  locationDetail: {
    fontSize: 12,
    color: '#666',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  mapButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  specialtiesSection: {
    marginTop: 16,
  },
  specialtiesTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  tabContent: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
  servicesContainer: {
    paddingVertical: 16,
    gap: 12,
  },
  serviceCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
  },
  selectedService: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  serviceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  serviceDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  durationText: {
    fontSize: 12,
    color: '#666',
  },
  servicePrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  selectedBadgeText: {
    color: '#FFF',
    fontSize: 12,
  },
  reviewsContainer: {
    paddingVertical: 16,
    gap: 12,
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    color: '#007AFF',
    fontSize: 14,
  },
  summaryServices: {
    gap: 4,
    marginBottom: 12,
  },
  summaryService: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryServiceName: {
    fontSize: 14,
  },
  summaryServicePrice: {
    fontSize: 14,
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalDuration: {
    fontSize: 12,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BarberProfileScreen;
