import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import VendorList from './VendorList';
import SubHeaderText from '../../generalComponents/SubHeader';
import VendorResults from './VendorResults';
import HashtagResults from './HashtagResults';
import Split from './Split';

const Results = () => {
  const [accounts, setAccounts] = React.useState(true);
  // const [hashtags, setHahtags] = '';
  const arr = [1];
  if (arr.length > 0) {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            // height: 50,
            width: 350,
            bottom: 10,
            // backgroundColor: 'red',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          

        </View>
        {
          <Split/>
          }
        {/* {accounts ? <Split/> : <Text> Testing</Text>  } */}
        {/* {setAccounts ? <Split/> : <Text>TryOut Accounts</Text> } */}
        {/* {accounts || <Text> Search accounts here</Text>} */}
        
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

