import React from 'react'
import { BusinessModel } from '../../../models/BusinessModel';
import { Image, Pressable } from "react-native"
import { View, Text } from '../..';
import { Feather } from '@expo/vector-icons'
import { Colors } from 'react-native-ui-lib';

interface IProps {
    onSelect: (id: string) => void;
    details: BusinessModel;
}

export const Chip = ({
    label,
    onPress,
    height = 45,
}: {
    label: string,
    onPress: () => void,
    height?: number
}) => {
    return (
        <Pressable onPress={onPress} style={{ paddingHorizontal: 10, height, borderRadius: 45, borderWidth: 1, borderColor: Colors.brandColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF7F3' }}>
            <Text variant='body' color='brandColor'>{label}</Text>
            <Feather name="plus" size={15} color={Colors.brandColor} style={{ marginLeft: 10 }} />
        </Pressable>
    )
}

const BusinessChip = ({ onSelect, details }: IProps) => {

    const handlePress = React.useCallback(() => {
        onSelect(details.id);
    }, [])
  return (
    <View style={{ width: '100%', height: 70, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center' }}>
        {/* IMAGE CONTAINER */}
        <View  style={{ width: 60, height: 60, borderRadius: 50, overflow: 'hidden', }}>
            {details.logo !== null || details.logo !== '' && <Image source={{ uri: details.logo }} resizeMode='cover' />}
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
            <Chip label='Follow' onPress={handlePress} />
        </View>
      </View>
    </View>
  )
}

export default BusinessChip