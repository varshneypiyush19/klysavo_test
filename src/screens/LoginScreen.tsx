import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { styles } from '../theme/styles';
import { authService } from '../firebase';

const LoginScreen = () => {
  const { width } = useWindowDimensions();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Input focus states for borders
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Dynamic layout check (centered card on web/tablet, full screen card on mobile)
  const isWebOrTablet = Platform.OS === 'web' || width > 600;

  const handleAuth = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await authService.signUpWithEmail(email, password);
      } else {
        await authService.signInWithEmail(email, password);
      }
    } catch (err: any) {
      // Map Firebase error codes to readable alerts
      const msg = err.message || '';
      if (msg.includes('auth/invalid-credential')) {
        setError('Incorrect email or password.');
      } else if (msg.includes('auth/email-already-in-use')) {
        setError('This email is already registered.');
      } else if (msg.includes('auth/weak-password')) {
        setError('Password must be at least 6 characters.');
      } else if (msg.includes('auth/invalid-email')) {
        setError('Please enter a valid email address.');
      } else {
        setError(msg || 'An authentication error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      <View style={[styles.loginCard, isWebOrTablet && styles.loginCardDesktop]}>
        
        {/* Logo/Header */}
        <View style={styles.headerContainer}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>🚀</Text>
          </View>
          <Text style={styles.appTitle}>Klysavo Universal</Text>
          <Text style={styles.appSubtitle}>
            {isSignUp ? 'Create your new account' : 'Sign in to access your data'}
          </Text>
        </View>

        {/* Mock Mode Alert Banner */}
        {authService.isMockMode() && (
          <View style={styles.infoBanner}>
            <Text style={styles.infoBannerTitle}>💡 Sandbox Mode Active</Text>
            <Text style={styles.infoBannerBody}>
              Type any email/password, or use:{"\n"}
              <Text style={styles.codeText}>demo@example.com</Text> / <Text style={styles.codeText}>password123</Text>
            </Text>
          </View>
        )}

        {/* Error Callout */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}> {error}</Text>
          </View>
        )}

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={[styles.inputField, emailFocused && styles.inputFieldFocused]}
            placeholder="Enter your email..."
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={(text) => { setEmail(text); setError(null); }}
            autoCapitalize="none"
            keyboardType="email-address"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={[styles.inputField, passwordFocused && styles.inputFieldFocused]}
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            value={password}
            onChangeText={(text) => { setPassword(text); setError(null); }}
            secureTextEntry
            autoCapitalize="none"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />

          {/* Submit Button */}
          <Pressable
            onPress={handleAuth}
            disabled={loading}
            style={({ pressed, hovered }: any) => [
              styles.actionButton,
              hovered && styles.actionButtonHovered,
              pressed && styles.actionButtonPressed,
              loading && styles.actionButtonDisabled
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.actionButtonText}>
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Text>
            )}
          </Pressable>
        </View>

        {/* Bottom Switch Link */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          </Text>
          <Pressable onPress={() => { setIsSignUp(!isSignUp); setError(null); }}>
            <Text style={styles.switchLink}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Text>
          </Pressable>
        </View>

      </View>
    </ScrollView>
  );
}

export default LoginScreen;
