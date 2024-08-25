import { create } from 'zustand';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      console.log('Fetching user info for UID:', uid);
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('User data found:', docSnap.data());
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        console.log('No such document!');
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error('Error fetching user info:', err);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
