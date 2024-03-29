import { createTheme } from '@shopify/restyle'

export const colorPallette = {
    brandColor: '#1CBE8E',
    accentColor: '#FFCB00',
    gradient: 'linear-gradient(90deg, #9568F3 1.79%, #1CBE8E 99.93%)',
    'lightGreen': '#EBF6F3',
    whiteAccentColor: '#EFEFEF',
    white: '#ffffff',
    black: '#1A1A1A',
    blackAccentColor: '#707070',
    textInputBackgroundColor: '#F5F5F5',
    darkGrey: '#707070',
    deactivatedColor: '#E61648',
    inputBackground: '#F5F5F5',
    buttonGreen: '#19AD80',
    bodyTextGrey: '#6F6F6F'
}

const theme = createTheme({
    colors: {
        brandColor: colorPallette.brandColor,
        whiteAccentColor: colorPallette.whiteAccentColor,
        white: colorPallette.white,
        black: colorPallette.black,
        textInputBackground: colorPallette.inputBackground,
        darkGrey: colorPallette.darkGrey,
        backgroundColor: colorPallette.white,
        deactivatedColor: colorPallette.deactivatedColor,
        textColor: colorPallette.black,
        accentColor: colorPallette.accentColor,
        gradient: colorPallette.gradient,
        lightGreen: colorPallette.lightGreen,
        bodyTextGrey: colorPallette.bodyTextGrey,
        buttonGrey: colorPallette.buttonGreen,
    },
    spacing: {
        s: 8,
        m: 16,
        l: 20,
        xl: 32
    },
    breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
  textVariants: {
    default: {
      fontFamily: 'satoshi-regular',
      fontSize: 18,
      lineHeight: 24,
      color: 'bodyTextGrey',
    },
    header: {
      fontFamily: 'satoshi-bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'black',
    },
    subheader: {
      fontFamily: 'satoshi-medium',
      fontSize: 28,
      lineHeight: 36,
      color: 'black',
    },
    medium: {
      fontFamily: 'satoshi-medium',
      fontSize: 20,
      lineHeight: 36,
      color: 'black',
    },
    body: {
      fontFamily: 'satoshi-regular',
      fontSize: 18,
      lineHeight: 24,
      color: 'bodyTextGrey',
    },
    xs: {
        fontFamily: 'satoshi-light',
        fontSize: 16,
        lineHeight: 24,
        color: 'bodyTextGrey',
      },
  },
})

export const darkTheme: Theme = {
    ...theme,
    colors: {
        ...theme.colors,
        backgroundColor: colorPallette.black,
        accentColor: colorPallette.blackAccentColor,
        deactivatedColor: colorPallette.deactivatedColor,
        textColor: colorPallette.white,
    },
    textVariants: {
      default: {
        fontFamily: 'satoshi-regular',
        fontSize: 18,
        lineHeight: 24,
        color: 'white',
      },
      header: {
        fontFamily: 'satoshi-bold',
        fontSize: 34,
        lineHeight: 42.5,
        color: 'white',
      },
      medium: {
        fontFamily: 'satoshi-medium',
        fontSize: 20,
        lineHeight: 36,
        color: 'black',
      },
      subheader: {
        fontFamily: 'satoshi-medium',
        fontSize: 28,
        lineHeight: 36,
        color: 'white',
      },
      body: {
        fontFamily: 'satoshi-regular',
        fontSize: 18,
        lineHeight: 24,
        color: 'white',
      },
      xs: {
          fontFamily: 'satoshi-light',
          fontSize: 16,
          lineHeight: 24,
          color: 'white',
        },
  },
}

export default theme;
export type Theme = typeof theme;