import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


interface IProps {
    category: string;
   
}
const Category = ({category}:IProps) => {
  return (
    <View style={{height:38, borderRadius:40,  borderWidth:1, justifyContent:'center', alignItems:'center', borderColor:'#1CBE8E', backgroundColor:'##85DBC2', margin:2, padding:4, marginBottom:10}}>
          <Text style={{ color: '#1CBE8E', paddingLeft:10, paddingRight:10 }}>{category}</Text>
 </View>
  )
}

export default Category

const styles = StyleSheet.create({})