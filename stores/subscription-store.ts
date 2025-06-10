import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subscription } from '@/types/user';
import { Meal } from '@/types/meal';

interface SubscriptionState {
  subscription: Subscription | null;
  selectedPlan: 'daily' | 'weekly' | 'monthly' | null;
  includesGym: boolean;
  selectedMeals: Meal[];
  isLoading: boolean;
  error: string | null;
  
  setSelectedPlan: (plan: 'daily' | 'weekly' | 'monthly' | null) => void;
  toggleGymAccess: () => void;
  addMeal: (meal: Meal) => void;
  removeMeal: (mealId: string) => void;
  clearSelection: () => void;
  createSubscription: () => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      subscription: null,
      selectedPlan: null,
      includesGym: false,
      selectedMeals: [],
      isLoading: false,
      error: null,
      
      setSelectedPlan: (plan) => {
        set({ selectedPlan: plan });
      },
      
      toggleGymAccess: () => {
        set((state) => ({ includesGym: !state.includesGym }));
      },
      
      addMeal: (meal) => {
        set((state) => {
          // Check if meal is already selected
          const exists = state.selectedMeals.some(m => m.id === meal.id);
          if (exists) return state;
          
          return {
            selectedMeals: [...state.selectedMeals, meal],
          };
        });
      },
      
      removeMeal: (mealId) => {
        set((state) => ({
          selectedMeals: state.selectedMeals.filter(meal => meal.id !== mealId),
        }));
      },
      
      clearSelection: () => {
        set({
          selectedPlan: null,
          includesGym: false,
          selectedMeals: [],
        });
      },
      
      createSubscription: async () => {
        const { selectedPlan, includesGym, selectedMeals } = get();
        
        if (!selectedPlan || selectedMeals.length === 0) {
          set({ error: 'Please select a plan and at least one meal' });
          return;
        }
        
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Calculate dates
          const startDate = new Date();
          const endDate = new Date();
          
          switch (selectedPlan) {
            case 'daily':
              endDate.setDate(endDate.getDate() + 1);
              break;
            case 'weekly':
              endDate.setDate(endDate.getDate() + 7);
              break;
            case 'monthly':
              endDate.setDate(endDate.getDate() + 30);
              break;
          }
          
          // Calculate price
          let price = 0;
          switch (selectedPlan) {
            case 'daily':
              price = 19.99;
              break;
            case 'weekly':
              price = 99.99;
              break;
            case 'monthly':
              price = 349.99;
              break;
          }
          
          if (includesGym) {
            price += selectedPlan === 'daily' ? 9.99 : selectedPlan === 'weekly' ? 39.99 : 99.99;
          }
          
          // Create subscription
          const newSubscription: Subscription = {
            id: Math.random().toString(36).substring(2, 11),
            userId: '1', // Mock user ID
            plan: selectedPlan,
            includesGym,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            price,
            status: 'active',
            meals: selectedMeals.map(meal => ({
              mealId: meal.id,
              restaurantId: meal.restaurantId,
              date: new Date().toISOString(),
              status: 'scheduled',
            })),
          };
          
          set({
            subscription: newSubscription,
            isLoading: false,
            // Clear selection after successful subscription
            selectedPlan: null,
            includesGym: false,
            selectedMeals: [],
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to create subscription',
          });
        }
      },
      
      cancelSubscription: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({
            subscription: null,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to cancel subscription',
          });
        }
      },
    }),
    {
      name: 'subscription-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);