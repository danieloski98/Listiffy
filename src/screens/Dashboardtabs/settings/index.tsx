import React from 'react'
import { View, Text } from '../../../components'
import { Styles} from './style'
import { Colors, Switch } from 'react-native-ui-lib'
import { useDetails } from '../../../State/Details'
import { useProfileState } from '../profile/state'
import { ActivityIndicator, Pressable } from 'react-native'
import { useQuery } from 'react-query'
import httpClient from '../../../utils/axios'
import BusinessProfileSetupTracker from '../../../components/dashboardtabs/Settings/BusinessProfileSetupTracker'
import { ScrollView } from 'react-native-gesture-handler'
import { Feather, Ionicons } from '@expo/vector-icons'
import AnalyticCard from '../../../components/dashboardtabs/Settings/AnalyticCard'
import { useNavigation } from '@react-navigation/native'


function SettingChip({
  label,
  showIcon,
  icon,
  route,
  color = Colors.black,
}: {
  label: string,
  showIcon: boolean,
  icon: JSX.Element,
  route: string,
  color?: any
}) {
  const navigation = useNavigation<any>();
  const { id } = useDetails((state) => state)

  return (
    <Pressable onPress={() => navigation.navigate(route, { id })} style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: '#F7F7F7', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </View>
      <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 17 }}>
        <Text variant='body' fontSize={17} style={{ color: color }}>{label}</Text>

        {showIcon && (
          <Feather name="chevron-right" size={20} color={Colors.black} />
        )}
      </View>
    </Pressable>
  )
}

const Settings = () => {
  const { id } = useDetails((state) => state);
  const { setShowModal, isBusiness, setSwitchModal } = useProfileState((state) => state);

  const { isLoading, data } = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`), {
    refetchOnMount: true,
    staleTime: 500,
    cacheTime: 500,
  });


    const handleCheck = React.useCallback(() => {
      if (isLoading) {
        return;
      }
      if (isBusiness) {
       setSwitchModal(true);
      } else if (data?.data && data?.data.data.step === 2 && data?.data.data.completionRate ===100) {
        setSwitchModal(true);
      } else {
        setShowModal(true);
      }
    }
    , [isBusiness, isLoading, data]);
  
  return (
    <View flex={1} paddingHorizontal='l'>
      <View style={Styles.parent}>
        <Text variant='body'>Business Profile</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isLoading && <ActivityIndicator color={Colors.brandColor} size='small' />}
          {!isLoading && <Switch offColor={Colors.grey} onColor={Colors.brandColor} value={isBusiness} onValueChange={handleCheck} />}
        </View>
     </View>

     <BusinessProfileSetupTracker />
     {isBusiness && (
        <View flexDirection={`row`} width={`100%`}>

            <AnalyticCard icon={<Feather name="bar-chart" size={20} color='white' />} backgroundColor='#FFF6D2' borderColor='#FFEEAA' title='Insights' text='30 days views' rate='300' />
            <View width={10}  />
            <AnalyticCard icon={<Feather name="dollar-sign" size={20} color='white' />} backgroundColor='rgba(29, 221, 72, 0.13)' borderColor='rgba(29, 221, 72, 0.15)' title='Promotions' text='conversion Rate' rate='30%' />

        </View>
     )}
     <ScrollView style={{ marginTop: 18 }}>

      <View style={{ width: '100%', backgroundColor: 'white' , borderRadius: 10, paddingVertical: 20, paddingHorizontal: 20 }}>

        <SettingChip label='Bookmarks' icon={<Feather name='bookmark' size={20} color={Colors.grey} />} route='bookmarks' showIcon={true} />
        <SettingChip label='Preference' icon={<Ionicons name='star-outline' size={20} color={Colors.grey} />} route='bookmarks' showIcon={true} />
        <SettingChip label='Account Setting & Security' icon={<Ionicons name='person-circle-outline' size={20} color={Colors.grey} />} route='bookmarks' showIcon={true} />
        <SettingChip label='Tickets & Support' icon={<Ionicons name='call-outline' size={20} color={Colors.grey} />} route='bookmarks' showIcon={true} />
        <SettingChip label='Help Center' icon={<Feather name='help-circle' size={20} color={Colors.grey} />} route='bookmarks' showIcon={true} />
        <SettingChip label='Log Out' icon={<Ionicons name='log-out-outline' size={20} color={Colors.red30} />} color={Colors.red30} route='bookmarks' showIcon={false} />


      </View>

     </ScrollView>
    </View>
  )
}

export default Settings