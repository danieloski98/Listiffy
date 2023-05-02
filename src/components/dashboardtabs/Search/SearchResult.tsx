import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import RegularText from '../../generalComponents/Regular'

const SearchResult = () => {
  return (
   
      <>
       <View style={{flexDirection:'row', justifyContent:'space-between', padding:10, width:'100%', backgroundColor:'transparent'}}>
                      <RegularText text="Barber" />
                      <RegularText color='#1CBE8E' text='1600'/>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', padding:10, width:'100%', backgroundColor:'transparent'}}>
                      <RegularText text="Baking" />
                      <RegularText color='#1CBE8E' text='1600'/>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', padding:10, width:'100%', backgroundColor:'transparent'}}>
                      <RegularText text="Photography" />
                      <RegularText color='#1CBE8E' text='1600'/>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', padding:10, width:'100%', backgroundColor:'transparent'}}>
                      <RegularText text="#parties" />
                      <RegularText color='#1CBE8E' text='1600'/>
                  </View>
      </>
  )
}

export default SearchResult

const styles = StyleSheet.create({})