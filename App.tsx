import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { authService, AppUser } from './src/services/firebase';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { styles } from './src/theme/styles';

function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication changes (works for both Firebase and Mock simulation)
    const unsubscribe = authService.onAuthState((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading Session...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.rootContainer}>
        {user ? (
          <DashboardScreen user={user} />
        ) : (
          <LoginScreen />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default App;
