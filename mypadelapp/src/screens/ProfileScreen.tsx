import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({navigation}) => {
  const userMock = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234 567 8900',
    memberSince: 'January 2024',
    totalBookings: 12,
    favoriteCourtCount: 3,
  };

  const menuItems = [
    {
      id: 1,
      title: 'Personal Information',
      icon: 'person',
      onPress: () => Alert.alert('Feature', 'Personal Information coming soon!'),
    },
    {
      id: 2,
      title: 'Payment Methods',
      icon: 'payment',
      onPress: () => Alert.alert('Feature', 'Payment Methods coming soon!'),
    },
    {
      id: 3,
      title: 'Favorite Courts',
      icon: 'favorite',
      onPress: () => Alert.alert('Feature', 'Favorite Courts coming soon!'),
    },
    {
      id: 4,
      title: 'Notifications',
      icon: 'notifications',
      onPress: () => Alert.alert('Feature', 'Notifications settings coming soon!'),
    },
    {
      id: 5,
      title: 'Help & Support',
      icon: 'help',
      onPress: () => Alert.alert('Feature', 'Help & Support coming soon!'),
    },
    {
      id: 6,
      title: 'Privacy Policy',
      icon: 'privacy-tip',
      onPress: () => Alert.alert('Feature', 'Privacy Policy coming soon!'),
    },
    {
      id: 7,
      title: 'Terms of Service',
      icon: 'description',
      onPress: () => Alert.alert('Feature', 'Terms of Service coming soon!'),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', onPress: () => console.log('User logged out')},
      ]
    );
  };

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}>
      <View style={styles.menuItemLeft}>
        <Icon name={item.icon} size={24} color="#666" />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/80x80/00A86B/FFFFFF?text=JD'}}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Icon name="camera-alt" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{userMock.name}</Text>
        <Text style={styles.userEmail}>{userMock.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userMock.totalBookings}</Text>
          <Text style={styles.statLabel}>Total Bookings</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userMock.favoriteCourtCount}</Text>
          <Text style={styles.statLabel}>Favorite Courts</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </View>
      </View>

      <View style={styles.membershipContainer}>
        <View style={styles.membershipHeader}>
          <Icon name="card-membership" size={24} color="#00A86B" />
          <Text style={styles.membershipTitle}>Membership</Text>
        </View>
        <Text style={styles.membershipText}>
          Member since {userMock.memberSince}
        </Text>
        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map(renderMenuItem)}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color="#d32f2f" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Padel Booking App v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00A86B',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 20,
    marginTop: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A86B',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  membershipContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },
  membershipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  membershipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  membershipText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  upgradeButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuContainer: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});

export default ProfileScreen;