import { View, Text, Image } from 'react-native'
import React from 'react'

import RegularText from '../../generalComponents/Regular'


interface IProps {
    vendor: string;
    username: string;

    
}


const VendorList = ({vendor, username, img}: IProps) => {
  return (
      <>
        <View style={{flexDirection:'row', width:170, justifyContent:'flex-start'}}>
                        <Image source={require('../../../../assets/images/avi.png')} style={{height:36, width:36, marginRight:10}} />
                        <View style={{ marginBottom:20}}>
                          <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'flex-start'}}>
                            <RegularText text={vendor} />
                            <Image source={require('../../../../assets/icons/Icon.png')} style={{height:16, width:16}} />
                          </View>
                          <RegularText text={username}/>
                        </View>
                      </View>
      </>
  )
}

export default VendorList