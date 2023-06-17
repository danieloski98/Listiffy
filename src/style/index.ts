import {Typography, Colors, ThemeManager} from 'react-native-ui-lib';

export function InitFunction() {
    Colors.loadColors({
        brandColor: '#1CBE8E',
        accentColor: '#FFCB00',
        gradient: 'linear-gradient(90deg, #9568F3 1.79%, #1CBE8E 99.93%)',
        'lightGreen': '#EBF6F3',
        buttonGreen: '#19AD80',
        bodyTextGrey: '#6F6F6F',
    });
    Typography.loadTypographies({
        header: {
            fontSize: 28,
            fontWeight: '500',
            fontFamily: 'satoshi-bold',
            color: 'black',
        },
        light: {
            fontSize: 17,
            fontFamily: 'satoshi-light',
            color: Colors.bodyTextGrey
        },
         regular: {
            fontSize: 18,
            fontFamily: 'satoshi-regular',
            color: Colors.bodyTextGrey

        },
        medium: {
            fontSize: 20,
            fontFamily: 'satoshi-medium',
            color: 'black'
        },
         semibold: {
            fontSize: 20,
            fontFamily: 'satoshi-medium',
            color: 'black'
        },
    });
}