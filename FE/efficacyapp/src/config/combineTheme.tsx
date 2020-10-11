import {DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import {DarkTheme as PaperDarkTheme, configureFonts} from 'react-native-paper';
import {myColors} from 'constants/colors';

export const CustomTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: myColors.darkBlue,
    primary: myColors.blue,
    accent: myColors.deepBlue,
    error: myColors.red,
  },
  fonts: configureFonts({
    default: {
      regular: {
        fontFamily: 'Poppins-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Poppins-Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Poppins-Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Poppins-Thin',
        fontWeight: 'normal',
      },
    },
  }),
};
