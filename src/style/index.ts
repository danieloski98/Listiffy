import {Typography, Colors, ThemeManager} from 'react-native-ui-lib';

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
            fontFamily: 'satoshi-bold'
        },
        light: {
            fontSize: 16,
            fontFamily: 'satoshi-light'
        },
         regular: {
            fontSize: 16,
            fontFamily: 'satoshi-regular'
        },
         semibold: {
            fontSize: 20,
            fontFamily: 'satoshi-medium'
        },
    });
}