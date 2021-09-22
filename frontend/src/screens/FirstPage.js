import React, {useState} from 'react';
import {SafeAreaView, StyleSheet,TouchableOpacity, Text, TextInput, Image, View } from 'react-native';
import * as screen from "../constants/dimensions";

export default function FirstPage({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  
  return (
    <SafeAreaView style={styles.container}>           
      
      <View style={styles.header}>
        <Image source={require("../../assets/images/pipaLogo.png")}
          style={styles.titleImage}
          resizeMode={"contain"}
        />
      </View>

      <Text style={styles.loginText}>E-mail</Text>
      <TextInput 
      style={styles.usernameInput} 
      placeholder={"exemplo@email.com"}
      autoCapitalize={"none"}
      autoCorrect={false}
      value={email}
      onChangeText={(email) => setEmail(email)}
      />

      <Text style={styles.passwordText}>Senha</Text>
      <TextInput 
      style={styles.passwordInput} 
      placeholder={"*******"}
      secureTextEntry={true}
      autoCapitalize={"none"}
      autoCorrect={false}
      value={password}
      onChangeText={(password) => setPassword(password)}
      />     
      <TouchableOpacity style={styles.submitButton} onPress={() => console.log(navigation.navigate("SecondPage"))}> 
        <Text style={styles.submitButtonText}>Acessar</Text>
      </TouchableOpacity>
    
    </SafeAreaView>  
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  header: {
    marginTop: screen.height * 0.08,
    alignItems: "flex-end"
  },

  titleImage: {
    width: screen.width * 1,
    height: 150,
    marginRight: screen.width * 0.04

  }, 
  
  loginText: {
    top:100,
    right: -20,
    fontSize: 20,
    color: "red"
  },

  usernameInput: {
    borderWidth: 1,
    width: screen.width * 0.9,
    height: screen.height*0.05,
    alignSelf: "center",
    marginVertical: screen.height* 0.02,
    backgroundColor: "#F5F5F5",
    borderRadius: screen.width *0.02,
    color: "#333",
    fontSize: screen.height * 0.025,
    paddingHorizontal: screen.width *0.03,
    top: 90
  },  
  
  passwordText: {
    right: -20,
    fontSize: 20,
    color: "red",
    top:120
  },

  passwordInput: {
    borderWidth: 1,
    width: screen.width * 0.9,
    height: screen.height*0.05,
    alignSelf: "center",
    marginVertical: screen.height* 0.02,
    backgroundColor: "#F5F5F5",
    borderRadius: screen.width *0.02,
    color: "#333",
    fontSize: screen.height * 0.025,
    paddingHorizontal: screen.width *0.03,
    top:110
  },  

submitButtonText: {
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: screen.width *0.04,
},

submitButton:{
  width: screen.width *0.7,
  height: screen.height * 0.07,
  backgroundColor: "#6495ED",
  alignSelf: "center",
  borderRadius: screen.width *0.03,
  alignItems: "center",
  justifyContent: "center",
  position: 'absolute',
  top: 600
},


});