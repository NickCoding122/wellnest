import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * The root component of the Wellnest application.  This component
 * provides global authentication context and decides whether to
 * display authentication flows or the main application based on
 * the current user state.  It also wraps the app in a
 * NavigationContainer so that React Navigation can manage screen
 * transitions.
 */
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthProvider>
  );
}

import { useContext } from 'react';
import { AuthContext } from './src/context/AuthContext';

/**
 * A helper component that chooses between the authentication
 * navigator and the main application navigator based on the
 * authentication state stored in the AuthContext.  When a user
 * object is present it renders the main application; otherwise
 * it renders the login/signup flow.
 */
function RootNavigator() {
  const { user, loadingAuthState } = useContext(AuthContext);

  // While checking the auth state we render nothing to avoid
  // flashing the wrong screen.  In a real application you might
  // display a splash screen here.
  if (loadingAuthState) {
    return null;
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}