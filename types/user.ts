export interface User {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'daily' | 'weekly' | 'monthly';
  includesGym: boolean;
  startDate: string;
  endDate: string;
  price: number;
  status: 'active' | 'expired' | 'pending';
  meals: {
    mealId: string;
    restaurantId: string;
    date: string;
    status: 'scheduled' | 'delivered' | 'cancelled';
  }[];
}