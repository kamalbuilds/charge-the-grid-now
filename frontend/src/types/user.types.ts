
export interface User {
  id: string;
  email?: string;
  wallet_address?: string;
  first_name?: string;
  last_name?: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
  is_host: boolean;
  is_driver: boolean;
}

export interface ChargerHost {
  id: string;
  user_id: string;
  total_earnings: number;
  rating: number;
  chargers_count: number;
}

export interface EVDriver {
  id: string;
  user_id: string;
  preferred_payment_method: string;
  favorite_charger_ids: string[];
  total_spent: number;
}
