export interface IOpeningHours {
  day: string;
  startHour: string;
  endHour: string;
}

export interface BusinessModel {
  id: string;
  business_name: string;
  business_description: string;
  rating: number;
  services: Array<string>;
  opening_hours: Array<IOpeningHours>;
  address: string;
  logo: string;
  state: string;
  lga: string;
  country: string;
  isPhysical: boolean;
  company_email: string;
  phone: string;
  instagram_username: string;
  twitter_username: string;
  whatsapp_number: string;
  website: string;
  docUploaded: boolean;
  verified: boolean;
  created_at: string;
}
