import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { isRealConfig, auth } from './config';

export interface AppUser {
  uid: string;
  email: string;
  displayName?: string;
  isMock: boolean;
}

// Global list of mock users created during local session
const mockUsersTable = new Map<string, string>(); // email -> password
mockUsersTable.set('demo@example.com', 'password123');

// Active mock session state
let activeMockUser: AppUser | null = null;
const mockAuthListeners = new Set<(user: AppUser | null) => void>();

export const authService = {
  isMockMode: () => !isRealConfig,

  onAuthState(callback: (user: AppUser | null) => void) {
    if (isRealConfig && auth) {
      return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          callback({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName:
              firebaseUser.displayName ||
              firebaseUser.email?.split('@')[0] ||
              'User',
            isMock: false,
          });
        } else {
          callback(null);
        }
      });
    } else {
      mockAuthListeners.add(callback);
      // Immediately call with the current session state
      callback(activeMockUser);
      return () => {
        mockAuthListeners.delete(callback);
      };
    }
  },

  async signUpWithEmail(email: string, password: string): Promise<AppUser> {
    const cleanEmail = email.toLowerCase().trim();
    if (isRealConfig && auth) {
      const credential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password,
      );
      return {
        uid: credential.user.uid,
        email: credential.user.email || '',
        displayName: cleanEmail.split('@')[0],
        isMock: false,
      };
    } else {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      if (mockUsersTable.has(cleanEmail)) {
        throw new Error(
          'auth/email-already-in-use: The email address is already in use by another account.',
        );
      }
      mockUsersTable.set(cleanEmail, password);
      const user = {
        uid: `mock-uid-${Math.random().toString(36).substr(2, 9)}`,
        email: cleanEmail,
        displayName: cleanEmail.split('@')[0],
        isMock: true,
      };
      activeMockUser = user;
      mockAuthListeners.forEach(listener => listener(user));
      return user;
    }
  },

  async signInWithEmail(email: string, password: string): Promise<AppUser> {
    const cleanEmail = email.toLowerCase().trim();
    if (isRealConfig && auth) {
      const credential = await signInWithEmailAndPassword(
        auth,
        cleanEmail,
        password,
      );
      return {
        uid: credential.user.uid,
        email: credential.user.email || '',
        displayName: credential.user.displayName || cleanEmail.split('@')[0],
        isMock: false,
      };
    } else {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      const registeredPassword = mockUsersTable.get(cleanEmail);
      if (!registeredPassword || registeredPassword !== password) {
        throw new Error(
          'auth/invalid-credential: The email or password entered is incorrect.',
        );
      }
      const user = {
        uid: `mock-uid-${cleanEmail.replace(/[^a-zA-Z0-9]/g, '')}`,
        email: cleanEmail,
        displayName: cleanEmail.split('@')[0],
        isMock: true,
      };
      activeMockUser = user;
      mockAuthListeners.forEach(listener => listener(user));
      return user;
    }
  },

  async logout(): Promise<void> {
    if (isRealConfig && auth) {
      await signOut(auth);
    } else {
      await new Promise(resolve => setTimeout(resolve, 400));
      activeMockUser = null;
      mockAuthListeners.forEach(listener => listener(null));
    }
  },
};
