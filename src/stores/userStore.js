import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: { 
      id: 1, // Default user untuk demo
      name: "Richard",
      preferences: ["electronics", "books"],
      purchase_history: [101, 103]
    }
  })
});