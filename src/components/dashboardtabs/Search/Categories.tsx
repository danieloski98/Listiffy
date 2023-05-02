import { View, Text } from 'react-native'
import React from 'react'

import Category from '../../generalComponents/Category'

const Categories = () => {
  return (
      <>
         <Category category="Agriculture"/>
                  <Category category="Engineering"/>
                  <Category category="Health"/>
                  <Category category="Computer"/>
                  <Category category="Software"/>
                  <Category category="Beauty & Spa"/>
      </>
  )
}

export default Categories