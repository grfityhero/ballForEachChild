import React from 'react';
import 'react-native-gesture-handler';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import Home from './Components/Home/Home';
import MyAnswer from './Components/MyAnswer/MyAnswer';
import MonthElected from './Components/MonthElected/MonthElected';
import Sabbath from './Components/Sabbath/Sabbath';
import Settings from './Components/Settings/Settings';
import Video from './Components/Video/Video';
import Chat from './Components/Chat/Chat';


const Stack = createStackNavigator();


const App = () => {


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name={'MyAnswer'} component={MyAnswer} />
            <Stack.Screen name={'MonthElected'} component={MonthElected} />
            <Stack.Screen name={'Sabbath'} component={Sabbath} />
            <Stack.Screen name={'Settings'} component={Settings} />
            <Stack.Screen name={'Video'} component={Video} />
            <Stack.Screen name={'Chat'} component={Chat} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;
