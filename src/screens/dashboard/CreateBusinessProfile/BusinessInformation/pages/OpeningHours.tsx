import React from 'react'
import { View , Text, CustomButton} from '../../../../../components'
import { ScrollView } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { OPENING_HOUR, useAccountSetupState } from '../state';


const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]

const Days = ({ day, selected = false, toggle }: { day: string, selected: boolean, toggle: (data: OPENING_HOUR) => void }) => {
    const [time, setTime] = React.useState(new Date());
    const [showTimePicker, setShowTimePicker] = React.useState(false);
    const [start, setStart] = React.useState(`${new Date().getHours()}:${new Date().getMinutes()}`);
    const [end, setEnd] = React.useState(`${new Date().getHours()}:${new Date().getMinutes()}`)
    const [selectedTime, setSelectedTime] = React.useState<'start'|'end'>('start');

    const handlePicker = React.useCallback((selected: 'start'|'end') => {
        setSelectedTime(selected);
        setShowTimePicker(true);
    }, []);

    const handleSelected = React.useCallback((time: Date) => {
        console.log(time);
        if (selectedTime === 'start') {
            setStart(`${time.getHours()}:${time.getMinutes()}`);
            setShowTimePicker(false);
            return;
        } else {
            setEnd(`${time.getHours()}:${time.getMinutes()}`);
            setShowTimePicker(false);
            return;
        }
    }, [selectedTime]);
    return (
       <View width='100%' >
         <View height={50} flexDirection='row' alignItems='center' paddingHorizontal='s' marginBottom='m' width='100%' borderRadius={15} borderWidth={1} borderColor='darkGrey' justifyContent='space-between'>
            <Pressable onPress={() => toggle({ day, startHour: start, endHour: end })} style={{ width: 20, height: 20, backgroundColor: selected ? Colors.brandColor : 'transparent', borderWidth: 1, borderColor: selected? Colors.brandColor : 'black', borderRadius: 10 }}  />
            <View flex={1} width='100%' alignItems='center'>
                <Text variant='body'>{day}</Text>
            </View>
            <View flexDirection='row' alignItems='center' justifyContent='space-evenly' flex={1} width='100%'>
                <Text variant='body' onPress={() => handlePicker('start')}>{start}</Text>
                <Text variant='body'>-</Text>
                <Text variant='body' onPress={() => handlePicker('end')}>{end}</Text>
            </View>
        </View>
        {
            showTimePicker && (
                <DateTimePicker 
                    value={time}
                    onChange={(e, time) => handleSelected(time as Date)}
                    mode='time'
                    display='inline'
                    is24Hour={false}
                />
            )
        }
       </View>
    )
}

const OpeningHours = () => {
    const { selectedDays, setSelectedDays, opening_hours, setOpening_hours, setStage, stage} = useAccountSetupState((state) => state);

    const toggle = React.useCallback((data: OPENING_HOUR) => {
        if (selectedDays.includes(data.day)) {
            setSelectedDays(selectedDays.filter(item => item !== data.day));
            setOpening_hours(opening_hours.filter(item => item.day !== data.day));
            return;
        } else {
            setSelectedDays([...selectedDays, data.day]);
            setOpening_hours([...opening_hours, data]);
            return;
        }
    }
    , [selectedDays, opening_hours]);
  return (
    <View flex={1} padding='m' width="100%">
      <Text variant='subheader'>Choose opening hours</Text>
      <Text variant='body'>Set your business hours for each day</Text>

       <View style={{ flex: 1 }}>
       <ScrollView  contentContainerStyle={{ paddingTop: 30, flex: 1  }}>
        {DAYS.map((item, index) => (
            <Days day={item} toggle={toggle} key={index} selected={selectedDays.includes(item)} />
        ))}
       </ScrollView>
       </View>

       <View paddingBottom='m'>
        <CustomButton label='Next' onPress={() => { console.log(opening_hours); setStage(stage + 1)}} />
       </View>

    </View>
  )
}

export default OpeningHours