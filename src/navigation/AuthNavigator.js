import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';

/**
 * Navigation stack for authentication flows.  Users who are not
 * signed in will see these screens.  The stack navigator is used
 * instead of a tab navigator so that back gestures behave
 * naturally on iOS and Android.
 */
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Create Account' }}
      />
    </Stack.Navigator>
  );
}