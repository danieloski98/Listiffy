import { View, Text, StatusBar, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { CustomButton } from '../../../components';
import Category from '../../../components/generalComponents/Category';
import HeaderText from '../../../components/generalComponents/HeaderText';
import RegularText from '../../../components/generalComponents/Regular';
import SubHeaderText from '../../../components/generalComponents/SubHeader';
import Categories from '../../../components/dashboardtabs/Search/Categories';
import SearchResult from '../../../components/dashboardtabs/Search/SearchResult';
import VendorList from '../../../components/dashboardtabs/Search/VendorList';
import SearchDefault from '../../../components/dashboardtabs/Search/SearchDefault';
import Results from '../../../components/dashboardtabs/Search/Results';

const Search = () => {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  const textRef = React.useRef<TextInput>();

  React.useEffect(() => {
    return () => {
      setIsFocused(false);
      textRef.current?.blur();
    };
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          // alignItems: 'center',
          // backgroundColor: 'green',
          marginBottom: 20,
          paddingBottom:30,
        }}
      >
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'flex-start',
            paddingBottom: 30,
            top: 50,
            // backgroundColor:'yellow'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
             
            
            }}
          >
            {
              isFocused && <Feather name="chevron-left" size={20} color={'black'} /> 
            }
            <View
              style={{
                height: 44,
                width: 325,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: isFocused ? 'green' : '#949494',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 10,
               
              }}
            >
              {isFocused && search === '' && (
                <Feather
                  name="search"
                  size={20}
                  color="grey"
                  style={{ paddingLeft: 5, paddingRight: 10 }}
                />
              )}

              <TextInput
                style={{ flex: 1 }}
                placeholder={search}
                value={search}
                onChangeText={val => setSearch(val)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                ref={textRef as any}
                // value={}
              />
            </View>
          </View>

          {isFocused || (
            <View style={{ minHeight: 308, width: 348, paddingTop: 30 }}>
              <SearchDefault />
            </View>
          )}

          {search.length > 0 && (
            <View style={{alignSelf:'flex-start', left:50, top:30,}}>
              <Results />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default Search;
