import {Typography, Colors} from 'react-native-ui-lib';

export function InitFunction() {
    Colors.loadColors({
        brandColor: '#1CBE8E',
        accentColor: '#FFCB00',
        gradient: 'linear-gradient(90deg, #9568F3 1.79%, #1CBE8E 99.93%)',
        'lightGreen': '#EBF6F3',
    });
    Typography.loadTypographies({
        header: {
            fontSize: 28,
            fontWeight: '500',
            fontFamily: 'coolvetica'
        },
        light: {
            fontSize: 16,
            fontFamily: 'NotoSansLight'
        },
         regular: {
            fontSize: 16,
            fontFamily: 'NotoSans-Regular'
        },
         semibold: {
            fontSize: 20,
            fontFamily: 'NotoSans-SemiBold'
        },
    });
}