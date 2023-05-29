import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import VendorList from './VendorList';
import SubHeaderText from '../../generalComponents/SubHeader';
import VendorResults from './VendorResults';
import HashtagResults from './HashtagResults';

const Results = () => {
  const [accounts, setAccounts] = '';
  const [hashtags, setHahtags] = '';
  const arr = [1];
  if (arr.length > 0) {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            width: 350,
            bottom: 10,
            // backgroundColor: 'green',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text>
              <SubHeaderText text={'Accounts'} />
            </Text>
            <View
              style={{ height: 4, width: '100%', backgroundColor: 'grey' }}
            ></View>
          </View>
          <View>
            <Text>
              <SubHeaderText text={'Hashtags'} />
            </Text>
            <View
              style={{ height: 4, width: '100%', backgroundColor: 'grey' }}
            ></View>
          </View>
        </View>

        {accounts || <Text> Search accounts</Text> }
        
        {/* {hashtags ? <HashtagResults/> : <Text>Search for hashtags</Text>} */}
      </>
    );
  }
  return (
    <View>
      <Text>No Results</Text>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({});
