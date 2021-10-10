import React, {useState} from 'react';
import {SafeAreaView, StyleSheet,TouchableOpacity, Text, TextInput, Image, View, KeyboardAvoidingView } from 'react-native';
import * as screen from "../constants/dimensions";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import CryptoES from "crypto-es";
import * as env from "../constants/envFile";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FirstPage({navigation}) {

const storeData = async (response) => {
  try {
    await AsyncStorage.setItem("user_name",response.data.data.userName)
    await AsyncStorage.setItem("admin",response.data.data.admin?"true":"false")
    await AsyncStorage.setItem("uuid",response.data.data['uuid'])
    navigation.navigate("SecondPage")
  }
  catch (e) {
    console.log("Error:"+e)
  }
  }

async function Login(){
    const url = "http://app-pipa.herokuapp.com/user/login"
    const passwordEncrypted = CryptoES.AES.encrypt(password,env.secret).toString();

    var userData = {
      email:email,
      password:passwordEncrypted
    }
    if(userData.email == ""){
      alert("Preencha o email e senha corretamente")
      return
    }
    //console.log(userData)
    await axios.post(url,userData)
    .then((response) => {
      //console.log(response.data.data)
      storeData(response);
    })
    .catch(function (error) {
      console.log(error.response.status);
      if(error.response.status == 404){
          alert("Usuário não cadastrado")
      }
      else{
        alert("Erro ao obter os dados")
      }
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [icon,setIconName] = React.useState('eye')
  //const [value, onChangeText] = React.useState(props.value);
  const [visible, setVisibility] = React.useState(false);
 

  return (
    <SafeAreaView style={styles.container}>           
      <KeyboardAvoidingView behavior={'position'}>
      <View style={styles.header}>
        <Image source={require("../../assets/icon.png")}
          style={styles.titleImage}
          resizeMode={"contain"}
        />
      </View>
      <Text style={styles.acesseText}>Acesse</Text>

      <Text style={styles.acesseInfoText}>Para acessar os seus dispositivos, faça o login</Text>

      <Text style={styles.loginText}>E-mail</Text>
      <TextInput 
      style={styles.usernameInput} 
      placeholder={"exemplo@email.com"}
      autoCapitalize={"none"}
      autoCorrect={false}
      value={email}
      onChangeText={(email) => setEmail(email)}
      />
      <View style={styles.linhaCampos}></View>
      <Text style={styles.passwordText}>Senha</Text>
      <TextInput 
      style={styles.passwordInput} 
      placeholder={"•••••••••••"}
      secureTextEntry={true}
      autoCapitalize={"none"}
      autoCorrect={false}
      secureTextEntry={!visible}
      value={password}
      onChangeText={(password) => setPassword(password)}
      />     
      <View style={styles.linhaCampos}></View>
      <Icon
          name={icon}
          color={'#9e9e9e'}
          onPress={() => {
            setVisibility(!visible)
            setIconName(visible ? 'eye' : 'eye-slash')
          }}
          style={styles.icons}
        />
      <TouchableOpacity style={styles.submitButton} onPress={() => Login()}> 
        <Text style={styles.submitButtonText}>Acessar</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>

        <Text 
        onPress={() => navigation.navigate("Cadastro")}
        style={styles.cadastreText}
        >Cadastre-se</Text>
      <Text 
      style={styles.esqueceuText}
      onPress={() => console.log("pagina não desenvolvida")}
      >Esqueceu a senha?</Text>
    </SafeAreaView>  
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  acesseText:{
    //marginTop:screen.height*0.08,
    marginLeft:screen.width*0.08,
    //fontFamily:"Quicksand",
    fontWeight:"bold",
    fontSize:26,
    color:"#35424a"
  },
  acesseInfoText:{
    marginTop:screen.height*0.02,
    marginLeft:screen.width*0.08,
    marginBottom:screen.width*0.02,
    //fontFamily:"Quicksand",
    fontSize:16,
    color:"#989eb1"
  },

  header: {
    marginTop: screen.height * 0.08,
    alignItems: "flex-end"
  },

  titleImage: {
    width: screen.width * 1,
    height: 150,
    //marginRight: screen.width * 0.04

  }, 
  
  loginText: {
    marginLeft:screen.width*0.08,
    marginTop:screen.height*0.02,
    fontSize: 14,
    color: "#f85f6a"
  },
  linhaCampos: {
    borderBottomColor: "#e8e4e3",
    marginLeft:screen.width*0.08,
    marginRight:screen.width*0.2,
    marginTop:screen.width*0.02,
    borderBottomWidth: 2,

  },
  usernameInput: {
    marginTop:screen.height*0.01,
    marginLeft:screen.width*0.08,
    marginRight:screen.width*0.2,
    paddingHorizontal: 1,
   // fontFamily:"Arial",
    fontWeight:"bold",
    fontSize:16,
    borderRadius:10,
    color:"#35424a",
  },  
  
  passwordText: {
    marginLeft:screen.width*0.08,
    marginTop:screen.height*0.02,
    fontSize: 14,
    color: "#f85f6a"
  },
  cadastreText: {
    marginLeft:screen.width*0.65,
    marginTop:screen.height*0.07,
    fontSize: 16,
    fontWeight:"bold",
    color: "#f85f6a"
  },
  esqueceuText:{
    marginTop:-screen.height*0.03,
    marginLeft:screen.width*0.08,
    width:screen.width*0.38,
    //marginBottom:screen.width*0.02,
    //fontFamily:"Quicksand",
    fontSize:16,
    color:"#989eb1"
  },
  passwordInput: {
    marginTop:screen.height*0.01,
    marginLeft:screen.width*0.08,
    marginRight:screen.width*0.2,
    paddingHorizontal: 1,
   // fontFamily:"Arial",
    fontWeight:"bold",
    fontSize:16,
    borderRadius:10,
    color:"#35424a",
  },  

submitButtonText: {
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: 17,
},
  icons: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: screen.height*0.06,
    width: screen.height*0.05,
    marginLeft:screen.width*0.72,
    marginTop:-screen.width*0.1
  },

submitButton:{
  marginTop:screen.height*0.05,
  //marginBottom:screen.height,
  width: screen.width *0.7,
  height: screen.height * 0.07,
  backgroundColor: "#0c59cf",
  alignSelf: "center",
  borderRadius: screen.width *0.03,
  alignItems: "center",
  justifyContent: "center",
  //position: 'absolute',
  //top: 600
},


});