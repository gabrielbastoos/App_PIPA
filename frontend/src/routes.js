import React, {useEffect,useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstPage from './screens/FirstPage';
import SecondPage from './screens/SecondPage';
import RegisterPage from './screens/registerPage';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

export default function(){

const [hasToken,setHasToken] = useState(null)
const [loadingToken, setLoadingToken] = useState(true)

async function tryLocalLogin() {
    try {
        const assyncUser = await AsyncStorage.getItem("user_name");
        (assyncUser === null)?setHasToken(false):setHasToken(true)
    } catch (error) {
        setHasToken(false)
        console.log(error)
    }
    finally{
        setLoadingToken(false)
    } 
    }
    useEffect(() => {
        tryLocalLogin()
    },[])    

    if (loadingToken) {
        return null;
      } 
    else {
        return(
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={(hasToken==true)?("SecondPage"):("Home")}>
                    <Stack.Screen name="Home" component={FirstPage}/>
                    <Stack.Screen name="Cadastro" component={RegisterPage}/>
                    <Stack.Screen name="SecondPage" component={SecondPage}/>
                </Stack.Navigator>
            </NavigationContainer>

    );
    }
}