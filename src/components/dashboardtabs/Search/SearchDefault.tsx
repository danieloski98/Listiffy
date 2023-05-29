import { View, Text, Image } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons'
import SubHeaderText from '../../generalComponents/SubHeader';
import RegularText from '../../generalComponents/Regular';
import Categories from './Categories';
import SearchResult from './SearchResult';

const SearchDefault = () => {
  return (
    <>
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: 180,
            justifyContent: 'space-around',
            paddingBottom: 10,
          }}
        >
          <Feather name="clock" size={20} />
          <SubHeaderText text={'Recent Searches'} />
        </View>
        <RegularText color="grey" text={'Baking'} />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: 220,
          justifyContent: 'flex-start',
          paddingTop: 25,
        }}
      >
        <Image
          source={require('../../../../assets/icons/fire.png')}
          style={{ height: 25, width: 25, marginRight: 10 }}
        />
        <SubHeaderText text={'Popular Categories'} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 130,
          flexWrap: 'wrap',
          paddingTop: 10,
        }}
      >
        <Categories />
      </View>

      <View style={{ height: 388, width: 348 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: 220,
            justifyContent: 'flex-start',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 250,
            }}
          >
            <Feather name="trending-up" size={20} />
            <SubHeaderText text="Top Searches this month" />
          </View>
        </View>
        <View>
          <SearchResult />
        </View>
      </View>
    </>
  );
};

export default SearchDefault;
