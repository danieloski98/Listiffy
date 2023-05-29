import React from 'react'
import { BusinessModel } from '../../../models/BusinessModel';
import { Image, Pressable } from "react-native"
import { View, Text } from '../..';
import { Feather } from '@expo/vector-icons'
import { Colors } from 'react-native-ui-lib';

interface IProps {
    onSelect: (id: string) => void;
    details: BusinessModel;
    checked?: boolean;
}

export const Chip = ({
    label,
    onPress,
    height = 45,
    checked
}: {
    label: string,
    onPress: () => void,
    height?: number
    checked?: boolean;
}) => {
    return (
        <Pressable onPress={onPress} style={{ paddingHorizontal: 10, paddingBottom: 2, height: 38, borderRadius: 45, borderWidth: 1, borderColor: checked? Colors.brandColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: checked ? Colors.brandColor:'#FFFFFF' }}>
            <Text variant='body' color={checked ? 'white':'black'}>{label}</Text>
            <Feather name={checked ? 'check':'plus'} size={15} color={checked ? 'white':Colors.black} style={{ marginTop: 3, marginLeft: 5 }} />
        </Pressable>
    )
}

const BusinessChip = ({ onSelect, details, checked }: IProps) => {
    const handlePress = () => {
        onSelect(details.id);
    }
    
  return (
    <View style={{ width: '100%', height: 70, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center' }}>
        {/* IMAGE CONTAINER */}
        <View  style={{ width: 60, height: 60, borderRadius: 50, overflow: 'hidden', }}>
            {details.logo && <Image source={{ uri: details.logo }} resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: 50}} />}
            {details.logo === null && (
                <View style={{ width:60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderWidth: 1, borderColor: Colors.brandColor, borderStyle: 'dashed' }}>
                    <Feather name="briefcase" size={25} color={Colors.brandColor} />
                </View>
            )}
        </View>

        {/* TEXT CONTAINER */}
        <View marginLeft='s'>
            <Text variant='subheader'>{details.business_name}</Text>
            <Text variant='xs'>@{details.business_name}</Text>
        </View>
      </View>

      {/* BUTTON CONTAINER */}
      <View style={{ flex: 0.7, alignItems: 'flex-end' }}>
        <View style={{ height: 45, width: '60%'}}>
            <Chip label={checked ? 'Following':'Follow'} checked={checked} onPress={handlePress} />
        </View>
      </View>
    </View>
  )
}

export default BusinessChip