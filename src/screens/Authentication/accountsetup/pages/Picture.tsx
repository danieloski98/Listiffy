import React from 'react'
import { useAccountSetupState } from '../state'
import { View, Text } from '../../../../components';
import Button from '../../../../components/generalComponents/Button';
import { Colors } from 'react-native-ui-lib';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';

const Picture = () => {
    const { stage, fullname, setPickerModal, avatar, setStage } = useAccountSetupState((state) => state);
    const [image, setImage] = React.useState('');

    // modal controllers
    const [showPickerModal, setShowPickerModal] = React.useState(false);

    console.log(fullname);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>Set a profile picture</Text>
        <Text variant='body'>Show your style using a pitcure or avatar</Text>

        {/* SPACER */}
        <View style={{ height: 20 }} />

        <View style={{ width: '100%', height: 150, alignItems: 'center'}}>
            <View style={{ width: 150, height: 150, borderRadius: 100, borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.brandColor, padding: 10 }}>
                {avatar === '' && (
                    <Pressable onPress={() => setPickerModal(true)} style={{ width: '100%', height: '100%', borderRadius: 100, backgroundColor: '#E1FFEB', justifyContent: 'center', alignItems: 'center' }}>
                        <Feather name='camera' size={25} color='black' />
                    </Pressable>
                )}
                {avatar !== '' && (
                    <Pressable onPress={() => setPickerModal(true)} style={{ width: '100%', height: '100%', borderRadius: 100, backgroundColor: '#E1FFEB', overflow: 'hidden', }}>
                        <Image source={{ uri: avatar }} resizeMode='cover' style={{ width: '100%', height: '100%'}} />
                    </Pressable>
                )}
            </View>
        </View>

        
      </View>
      {avatar !== '' && <Button label='Next' onPress={() => setStage(stage + 1)} backgroundColor='black' />}
    </View>
  )
}

export default Picture