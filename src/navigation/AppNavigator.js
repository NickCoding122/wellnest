import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProviderProfileScreen from '../screens/ProviderProfileScreen';
import BookingScreen from '../screens/BookingScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProviderDashboardScreen from '../screens/ProviderDashboardScreen';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

/**
 * The main navigation configuration for signed‑in users.  It uses
 * a bottom tab navigator with nested stack navigators for the
 * Home and Dashboard flows.  Icons from Ionicons are used for
 * clarity on the tab bar.
 */
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ProviderProfile"
        component={ProviderProfileScreen}
        options={{ title: 'Provider' }}
      />
      <HomeStack.Screen
        name="Booking"
        component={BookingScreen}
        options={{ title: 'Book Appointment' }}
      />
    </HomeStack.Navigator>
  );
}

const DashboardStack = createNativeStackNavigator();

function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Dashboard"
        component={ProviderDashboardScreen}
        options={{ title: 'Dashboard' }}
      />
    </DashboardStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'Wallet') {
            iconName = 'wallet';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'DashboardTab') {
            iconName = 'briefcase';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {user?.role === 'provider' && (
        <Tab.Screen
          name="DashboardTab"
          component={DashboardStackScreen}
          options={{ title: 'Dashboard' }}
        />
      )}
    </Tab.Navigator>
  );
}