import React from 'react';
import {SafeAreaView, StyleSheet,TouchableOpacity, Text, View } from 'react-native';
import * as screen from "../constants/dimensions";

export default function FirstPage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text>PIPA PROJECT!</Text>    
        </View>
    <TouchableOpacity style={styles.submitButton} onPress={() => console.log(navigation.navigate("SecondPage"))}> 
      <Text style={styles.submitButtonText}>ENTRAR</Text>
    </TouchableOpacity>
    
    </SafeAreaView>  
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: screen.height * 0.4,
    alignItems: "center",
  },

  submitButton:{
    width: screen.width *0.2,
    height: screen.height * 0.05,
    backgroundColor: "#FF4500",
    alignSelf: "center",
    borderRadius: screen.width *0.02,
    alignItems: "center",
    justifyContent: "center",
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: screen.width *0.04,
  }
});