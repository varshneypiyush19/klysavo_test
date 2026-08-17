import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { authService, AppUser, RandomData, generateRandomData } from '../firebase';
import { styles } from '../theme/styles';

interface DashboardProps {
  user: AppUser;
}

const DashboardScreen = ({ user }: DashboardProps) => {
  const [data, setData] = useState<RandomData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Initialize and refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    // Add a tiny delay to simulate a fresh data fetch / query animation
    await new Promise(resolve => setTimeout(resolve, 600));
    setData(generateRandomData());
    setRefreshing(false);
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.dashboardContainer}>
        
        {/* Welcome Section */}
        <View style={styles.welcomeCard}>
          <View>
            <Text style={styles.welcomeHeading}>Welcome Back,</Text>
            <Text style={styles.welcomeUser}>{user.displayName || user.email}</Text>
            <Text style={styles.sessionBadge}>
              {user.isMock ? '🔴 Local Session' : '🟢 Verified Firebase User'}
            </Text>
          </View>
          <Pressable 
            onPress={() => authService.logout()}
            style={({ pressed, hovered }: any) => [
              styles.logoutBtn,
              hovered && styles.logoutBtnHovered,
              pressed && styles.logoutBtnPressed
            ]}
          >
            <Text style={styles.logoutBtnText}>Logout</Text>
          </Pressable>
        </View>

        {/* Stats Title */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>System Metrics</Text>
            <Text style={styles.sectionSubtitle}>Random server data compiled in real-time</Text>
          </View>
          
          <Pressable 
            onPress={handleRefresh}
            disabled={refreshing}
            style={({ pressed, hovered }: any) => [
              styles.refreshBtn,
              hovered && styles.refreshBtnHovered,
              pressed && styles.refreshBtnPressed,
              refreshing && styles.refreshBtnDisabled
            ]}
          >
            {refreshing ? (
              <ActivityIndicator size="small" color="#8b5cf6" />
            ) : (
              <Text style={styles.refreshBtnText}>🔄 Refresh</Text>
            )}
          </Pressable>
        </View>

        {/* Metrics Grid */}
        <View style={styles.statsGrid}>
          {data.map((item) => (
            <View key={item.id} style={styles.statCard}>
              <Text style={styles.statCategory}>{item.category.toUpperCase()}</Text>
              <Text style={styles.statTitle}>{item.title}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statTimestamp}>Updated at {item.timestamp}</Text>
            </View>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

export default DashboardScreen;
