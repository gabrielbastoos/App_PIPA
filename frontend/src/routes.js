import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstPage from './screens/FirstPage';
import SecondPage from './screens/SecondPage';
 
const Stack = createNativeStackNavigator();

export default function(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={FirstPage}/>
                <Stack.Screen name="SecondPage" component={SecondPage}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}