import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AccountSetupState {
    stage: number;
    business_name: string;
    services: Array<string>;
    opening_hours: Array<{
        day: string,
        startHour: string,
        endHour: string
      }>;
    address: string;
    state: string;
    lga: string;
    country: string,
    isPhysical: boolean;
    company_email: string;
    phone: string;
    instagram_username: string;
    twitter_username: string;
    whatsapp_number: string;
    website: string;

    // setter
    setStage: (stage: number) => void;
    setBusinessName: (name: string) => void
    setService: (service: string) => void;
    setOpening_hours: (opening_hours: any) => void;
    setAddress: (addres: string) => void;
    setState: (state: string) => void;
    setLga: (lga: string) => void;
    setCountry: (country: string) => void;
    setIsPhysical: (isPhysical: boolean) => void;
    setCompanyEmail: (company_email: string) => void;
    setPhone: (phone: string) => void;
    setInstagramUsername: (instagram_username: string) => void;
    setTwitterUsername: (twitter_username: string) => void;
    setWhatsappNumber: (whatsapp_number: string) => void;
    setWebsite: (website: string) => void;

}


export const useAccountSetupState = create<AccountSetupState>()(
    (set) => ({
        stage: 0,
        business_name: '',
        services: [],
        opening_hours: [],
        address: '',
        state: '',
        lga: '',
        country: '',
        isPhysical: false,
        company_email: '',
        phone: "",
        instagram_username: '',
        twitter_username: '',
        whatsapp_number: '',
        website: '',
        setStage: (stage) => set((state) => ({ ...state, stage })),
        setBusinessName: (business_name: string) => set((state) => ({ ...state, business_name })),
        setService: (service: string) => set((state) => ({ ...state, services: [...state.services, service] })),
        setOpening_hours: (opening_hours: any) => set((state) => ({ ...state, opening_hours })),
        setAddress: (address: string) => set((state) => ({ ...state, address })),
        setState: (sta: string) => set((state) => ({ ...state, sta })),
        setLga: (lga: string) => set((state) => ({ ...state, lga })),
        setCountry: (country: string) => set((state) => ({ ...state, country })),
        setIsPhysical: (isPhysical: boolean) => set((state) => ({ ...state, isPhysical })), 
        setCompanyEmail: (company_email: string) => set((state) => ({ ...state, company_email })),
        setPhone: (phone: string) => set((state) => ({ ...state, phone })),
        setInstagramUsername: (instagram_username: string) => set((state) => ({ ...state, instagram_username })),
        setTwitterUsername: (twitter_username: string) => set((state) => ({ ...state, twitter_username })),
        setWhatsappNumber: (whatsapp_number: string) => set((state) => ({ ...state, whatsapp_number })),
        setWebsite: (website: string) => set((state) => ({ ...state, website })),

    }));



    ;
    
    
