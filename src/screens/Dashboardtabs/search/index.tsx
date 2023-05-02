import { View, Text, StatusBar, TextInput, Image } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { CustomButton } from '../../../components';
import Category from '../../../components/generalComponents/Category';
import HeaderText from '../../../components/generalComponents/HeaderText';
import RegularText from '../../../components/generalComponents/Regular';
import SubHeaderText from '../../../components/generalComponents/SubHeader';
import Categories from '../../../components/dashboardtabs/Search/Categories';
import SearchResult from '../../../components/dashboardtabs/Search/SearchResult';
import VendorList from '../../../components/dashboardtabs/Search/VendorList';

const Search = () => {
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
          // backgroundColor:'green'
        }}>
      
          <View
            style={{
              display: 'flex',
              flex:1,
              flexDirection: 'column',
              // backgroundColor: 'red',
              // justifyContent: 'center',
              alignItems:'center'
            }} >
         
            <View
              style={{
                height: 44,
                width: 325,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#949494',
                marginTop: 60,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 10,
                marginLeft: 50,
                marginRight: 50,
              }}
            >
              <Feather
                name="search"
                size={20}
                color="grey"
                style={{ paddingLeft: 5, paddingRight: 10 }}
              />
              <TextInput placeholder="Search services, profiles and hashtags...!" />
            </View>

          
            <View style={{ minHeight: 308, width: 348, paddingTop: 30 }}>

             {/* Vendor List  */}
                      <VendorList vendor='Fifi Cakes' username='@fificakes'/>
                      <VendorList vendor='Genesis' username='@genesisfoods'/>
                     
                      
             {/* Recent searches  */}
                      <View>
                          <View style={{flexDirection:'row', width:180,  justifyContent:'space-around', paddingBottom:10}}>
                              <Feather name='clock' size={20}/>
                              <SubHeaderText text={'Recent Searches'}/>
                          </View>
                        <RegularText color='grey' text={'Baking'}/>
                      </View>
                      
             {/* Popular Categories result */}
                        <View style={{ display: 'flex', flexDirection: 'row', width:220, justifyContent:'flex-start', paddingTop:25 }}>
                          <Image source={require('../../../../assets/icons/fire.png')} style={{height:25, width:25, marginRight:10}} />
                          <SubHeaderText text={'Popular Categories'}/>
                        </View>
                        <View style={{flexDirection: 'row', width:'100%', height:130,  flexWrap:'wrap', paddingTop:10}}>
                          <Categories/>
                      </View>
               {/* Top searches  */}
               <View style={{ height:388, width:348}}>
                <View style={{ display: 'flex', flexDirection: 'row', width:220, justifyContent:'flex-start'}}>
                  
                  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:250}}>
                    <Feather name='trending-up' size={20} />
                    <SubHeaderText text="Top Searches this month"/>
                    </View>
                  </View>
                    
                {/* Top Searches  */}
                  <View >
                    <SearchResult/>
                  </View>
              </View>

              </View>     
        </View>
            
           
                  
                  
       
      </View>
    </>
  );
};

export default Search;
