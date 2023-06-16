import React from "react";
import { View, Text } from "../../..";

import { Feather, Ionicons } from '@expo/vector-icons'
import { Colors } from "react-native-ui-lib";

interface Items {
  heading:
    | "Bio"
    | "Address"
    | "Email"
    | "Phone"
    | "Instagram"
    | "Twitter"
    | "Whatsapp"
    | "Website";
  icon: React.ReactNode;
  content: string;
}

interface IProps {
  business_description: string;
  address: string;
  isPhysical: boolean;
  company_email: string;
  phone: string;
  instagram_username: string;
  twitter_username: string;
  whatsapp_number: string;
  website: string;
}

const ItemCard = ({ icon, heading, content }: Items) => (
  <View flex={1} marginVertical='s'>
    <View flexDirection="row" height={40} alignItems='center'>
      {icon}
      <Text variant="medium" marginLeft='m' style={{ fontSize: 18 }}>{heading}</Text>
    </View>
    <Text variant="body">{content}</Text>
  </View>
);

const About = ({ business_description, address, isPhysical, company_email, phone, instagram_username, twitter_username, whatsapp_number, website }: IProps) => {
  return (
    <View flex={1}>
      <ItemCard icon={<Feather name='book-open' size={20} color={Colors.$grey} />} content={business_description ? business_description: 'Not Avaliable'} heading='Bio' />

      <ItemCard icon={<Feather name='map-pin' size={20} color={Colors.$grey} />} content={address && !isPhysical ? address: 'Not Avaliable'} heading='Address' />

      <ItemCard icon={<Feather name='mail' size={20} color={Colors.$grey} />} content={company_email  ? company_email: 'Not Avaliable'} heading='Email' />

      <ItemCard icon={<Feather name='phone' size={20} color={Colors.$grey} />} content={phone  ? phone: 'Not Avaliable'} heading='Phone' />

      <ItemCard icon={<Feather name='instagram' size={20} color={Colors.$grey} />} content={instagram_username  ? instagram_username: 'Not Avaliable'} heading='Instagram' />

      <ItemCard icon={<Feather name='twitter' size={20} color={Colors.$grey} />} content={twitter_username  ? twitter_username: 'Not Avaliable'} heading='Twitter' />

      <ItemCard icon={<Feather name='message-circle' size={20} color={Colors.$grey} />} content={whatsapp_number  ? whatsapp_number: 'Not Avaliable'} heading='Whatsapp' />

      <ItemCard icon={<Feather name='globe' size={20} color={Colors.$grey} />} content={website  ? website: 'Not Avaliable'} heading='Website' />

    </View>
  )
};

export default About;
