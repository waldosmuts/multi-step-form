export interface FormValues {
  name: string;
  email: string;
  phone: string;
  plan: 'arcade' | 'advanced' | 'pro';
  billing: 'monthly' | 'yearly';
  addons: {
    online: boolean;
    storage: boolean;
    profile: boolean;
  };
}
