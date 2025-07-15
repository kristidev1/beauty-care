import React, {useState} from 'react';
import {
  Alert,
  Image,
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
import {useNavigation} from '@react-navigation/native';

interface NotificationSettings {
  bookingUpdates: boolean;
  promotions: boolean;
  reminders: boolean;
  providerMessages: boolean;
}

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
  color?: string;
}

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState<NotificationSettings>({
    bookingUpdates: true,
    promotions: false,
    reminders: true,
    providerMessages: true,
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
  });

  const handleSave = (): void => {
    setIsEditing(false);
    // Save profile logic here
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleToggleNotification = (key: keyof NotificationSettings): void => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleProfileChange = (key: keyof Profile, value: string): void => {
    setProfile(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const quickActions: QuickAction[] = [
    {id: '1', title: 'Manage Addresses', icon: 'location-on', route: 'Addresses'},
    {id: '2', title: 'Manage Payment Methods', icon: 'credit-card', route: 'PaymentMethods'},
    {id: '3', title: 'Add Payment Methods', icon: 'add-card', route: 'AddPayment'},
    {id: '4', title: 'Subscribe to Mobile App', icon: 'star', route: 'Subscription'},
    {id: '5', title: 'Security & Privacy', icon: 'security', route: 'Security'},
    {id: '6', title: 'Help & Support', icon: 'help', route: 'Support'},
  ];

  const handleQuickAction = (route: string): void => {
    navigation.navigate(route as never);
  };

  const handleSignOut = (): void => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          // Sign out logic here
          console.log('User signed out');
        },
      },
    ]);
  };

  const CustomSwitch: React.FC<{value: boolean; onValueChange: () => void}> = ({
    value,
    onValueChange,
  }) => (
    <TouchableOpacity
      style={[styles.switch, value ? styles.switchActive : styles.switchInactive]}
      onPress={onValueChange}>
      <View
        style={[styles.switchThumb, value ? styles.switchThumbActive : styles.switchThumbInactive]}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image source={{uri: 'https://via.placeholder.com/80x80'}} style={styles.avatar} />
              <TouchableOpacity style={styles.cameraButton}>
                <MaterialIcons name="camera-alt" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {profile.firstName} {profile.lastName}
              </Text>
              <Text style={styles.profileEmail}>{profile.email}</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.rating}>
                  <MaterialIcons name="star" size={16} color="#FFC107" />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.bookingsText}>12 bookings</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Personal Information</Text>
            <TouchableOpacity onPress={() => (isEditing ? handleSave() : setIsEditing(true))}>
              <Text style={styles.editButton}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  value={profile.firstName}
                  onChangeText={text => handleProfileChange('firstName', text)}
                  editable={isEditing}
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  value={profile.lastName}
                  onChangeText={text => handleProfileChange('lastName', text)}
                  editable={isEditing}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={profile.email}
                onChangeText={text => handleProfileChange('email', text)}
                editable={isEditing}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={profile.phone}
                onChangeText={text => handleProfileChange('phone', text)}
                editable={isEditing}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={profile.address}
                onChangeText={text => handleProfileChange('address', text)}
                editable={isEditing}
                multiline
              />
            </View>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Notification Settings</Text>
          </View>
          <Text style={styles.cardDescription}>Manage how you receive notifications</Text>
          <View style={styles.cardContent}>
            <View style={styles.notificationItem}>
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>Booking Updates</Text>
                <Text style={styles.notificationDescription}>
                  Get notified about booking confirmations and changes
                </Text>
              </View>
              <CustomSwitch
                value={notifications.bookingUpdates}
                onValueChange={() => handleToggleNotification('bookingUpdates')}
              />
            </View>
            <View style={styles.notificationItem}>
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>Promotions & Offers</Text>
                <Text style={styles.notificationDescription}>
                  Receive special deals and discounts
                </Text>
              </View>
              <CustomSwitch
                value={notifications.promotions}
                onValueChange={() => handleToggleNotification('promotions')}
              />
            </View>
            <View style={styles.notificationItem}>
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>Appointment Reminders</Text>
                <Text style={styles.notificationDescription}>
                  Get reminded before your appointments
                </Text>
              </View>
              <CustomSwitch
                value={notifications.reminders}
                onValueChange={() => handleToggleNotification('reminders')}
              />
            </View>
            <View style={styles.notificationItem}>
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>Provider Messages</Text>
                <Text style={styles.notificationDescription}>
                  Receive messages from service providers
                </Text>
              </View>
              <CustomSwitch
                value={notifications.providerMessages}
                onValueChange={() => handleToggleNotification('providerMessages')}
              />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Quick Actions</Text>
          </View>
          <View style={styles.cardContent}>
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionItem}
                onPress={() => handleQuickAction(action.route)}>
                <MaterialIcons
                  name={action.icon}
                  size={20}
                  color="#666"
                  style={styles.actionIcon}
                />
                <Text style={styles.actionText}>{action.title}</Text>
                <MaterialIcons name="chevron-right" size={20} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <MaterialIcons name="logout" size={20} color="#DC2626" style={styles.signOutIcon} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Mobile Provider v1.0.0</Text>
        </View>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    color: '#000',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    marginTop: -8,
  },
  cardContent: {
    gap: 16,
  },
  editButton: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e5e7eb',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  separator: {
    fontSize: 14,
    color: '#6b7280',
  },
  bookingsText: {
    fontSize: 14,
    color: '#6b7280',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#f9fafb',
    color: '#6b7280',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  notificationText: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  switch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  switchActive: {
    backgroundColor: '#3b82f6',
  },
  switchInactive: {
    backgroundColor: '#d1d5db',
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  switchThumbInactive: {
    alignSelf: 'flex-start',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  signOutIcon: {
    marginRight: 12,
  },
  signOutText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#6b7280',
  },
});
