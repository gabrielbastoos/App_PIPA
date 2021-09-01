import React from 'react';
import {SafeAreaView, StyleSheet,TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import * as screen from "../constants/dimensions";

export default function FirstPage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
          <ImageBackground style={styles.imgBack} 
          source={require("../../assets/images/pipaLogo.png")}
          resizeMode = 'contain'>
          </ImageBackground>
    <TouchableOpacity style={styles.submitButton} onPress={() => console.log(navigation.navigate("SecondPage"))}> 
      <Text style={styles.submitButtonText}>ENTRAR</Text>
    </TouchableOpacity>
    
    </SafeAreaView>  
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f2ff"
  },
  
  imgBack: {
    width: screen.width,
    height: screen.height * 0.6,
    flex: 1 
},

  submitButton:{
    width: screen.width *0.2,
    height: screen.height * 0.05,
    backgroundColor: "#6495ED",
    alignSelf: "center",
    borderRadius: screen.width *0.1,
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    top: 400

    
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: screen.width *0.04,
  }
});