import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import VendorList from './VendorList'

const VendorResults = () => {
  return (
      <>
        <VendorList vendor={'Tunde '} username={'TundeTheBrand'}/>
        <VendorList vendor={'Ayomide Clotheirs'} username={'Ayowears'}/>
        <VendorList vendor={'SmTech'} username={'@samtechy'}/>
      </>
  )
}

export default VendorResults

const styles = StyleSheet.create({})