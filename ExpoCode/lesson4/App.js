import WelcomeScreen from './components/authentication/welcome_screen';
import HomeScreen from './components/authentication/home_screen';
import SignInScreen from './components/authentication/signin_screen';
import SignUpScreen from './components/authentication/signup_screen';

import './config/firebase';
import { useAuthentication } from './hooks/use_authentication';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Asyncstorage has been extracted from react-native core']);


import { createTheme, ThemeProvider } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const theme = createTheme({
  lightColors: {
    primary: 'darkturquoise',
  },
  darkColors: {
    primary: '#000',
  },
});

export default function App() {
  const {user} = useAuthentication();
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {user ?
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome"  component={WelcomeScreen}/>
        </Stack.Navigator>
      :
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home"     component={HomeScreen}/>
          <Stack.Screen name="Sign In"  component={SignInScreen}/>
          <Stack.Screen name="Sign Up"  component={SignUpScreen}/>
        </Stack.Navigator>
      }
      </NavigationContainer>
    </ThemeProvider>
  );
}

