import React from 'react';
import {SafeAreaView, StyleSheet,TouchableOpacity, Text, View, KeyboardAvoidingView, TextInput } from 'react-native';
import * as screen from "../constants/dimensions";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import CryptoES from "crypto-es";
import * as env from "../constants/envFile";

export default function RegisterPage({navigation}) {
  
  const [icon,setIconName] = React.useState('eye')
  //const [value, onChangeText] = React.useState(props.value);
  const [visible, setVisibility] = React.useState(false);

  const [credencial, setCredencial] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [uuid, setUUID] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [nome, setNome] = React.useState('');


  async function Cadastrar() {
    try {
      const passwordEncrypted = CryptoES.AES.encrypt(senha,env.secret).toString();

      var C = require("crypto-js");
  
      var Decrypted = C.AES.decrypt(passwordEncrypted, env.secret);
      var result =Decrypted.toString(C.enc.Utf8);
  
      var jsonCadastro = {
        "name": nome,      
        "email":email,
        "password":passwordEncrypted,
        "uuid":uuid,
        "admin":true,
        "createdBy": credencial
      };
      
      if(email == ''){
        alert("Erro ao efetuar cadastro, preencha os campos corretamente")
        return;
      }
  
      console.log(jsonCadastro);
  
      const url = "http://app-pipa.herokuapp.com/user/createUser"
      await axios.post(url,jsonCadastro)
      .then(() => {
        alert("Cadastro realizado com sucesso")
        navigation.navigate("Home")
        })
      .catch(function (error) {
        console.log(error.response.status);
        alert("Erro ao efetuar cadastro")
        // if(error.response.status == 404){
        //     alert("Usuário não cadastrado")
        // }
        // else{
        //   alert("Erro ao obter os dados")
        // }
      });
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView behavior={'position'}>

        <Text style={styles.cadastreText}>Cadastre-se</Text>

        <Text style={styles.fieldCadastroTop}>Credencial de administrador</Text>
        <TextInput 
          style={styles.entradaTexto}
          placeholder={"Digite a credencial"}
          maxLength={40}
          value={credencial}
          onChangeText={(newCredencial) => setCredencial(newCredencial)}
        />
        <View
          style={styles.linhaCampos}
        />

        <Text style={styles.fieldCadastro}>Nome do usuário</Text>
        <TextInput 
          style={styles.entradaTexto}
          placeholder={"Nome Completo"}
          maxLength={40}
          value={nome}
          onChangeText={(newNome) => setNome(newNome)}
        />
        <View
          style={styles.linhaCampos}
        />


        <Text style={styles.fieldCadastro}>UUID do PIPA</Text>
        <TextInput 
          style={styles.entradaTexto}
          placeholder={"Código do sensor"}
          autoCapitalize={'none'}
          maxLength={10}
          value={uuid}
          onChangeText={(newUuid) => setUUID(newUuid)}
        />
        <View
          style={styles.linhaCampos}
        />

        <Text style={styles.fieldCadastro}>E-mail</Text>
        <TextInput 
          style={styles.entradaTexto}
          placeholder={"Digite o e-mail do usuário"}
          autoCapitalize={'none'}
          maxLength={40}
          value={email}
          onChangeText={(newEmail) => setEmail(newEmail)}
        />
        <View
          style={styles.linhaCampos}
        />


        <Text style={styles.fieldCadastro}>Senha</Text>
        <TextInput
          style={styles.entradaTexto}
          value={senha}
          onChangeText={(password) => setSenha(password)}
          autoCapitalize={'none'}
          placeholder={"•••••••••••"}
          secureTextEntry={!visible}
        />
        <View
          style={styles.linhaCampos}
        />
        <Icon
          name={icon}
          color={'#9e9e9e'}
          onPress={() => {
            setVisibility(!visible)
            setIconName(visible ? 'eye' : 'eye-slash')
          }}
          style={styles.icons}
        />

    </KeyboardAvoidingView>

      <TouchableOpacity style={styles.submitButton} 
        onPress={() => 
        {
        Cadastrar();
        }}> 
        
        <Text style={styles.submitButtonText}>Finalizar</Text>

      </TouchableOpacity>

    </SafeAreaView>  
     );
}

const styles = StyleSheet.create({

  icons: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: screen.height*0.06,
    width: screen.height*0.05,
    marginLeft:screen.width*0.72,
    marginTop:-screen.width*0.1
  },

  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  cadastreText:{
    marginTop:screen.height*0.08,
    marginLeft:screen.width*0.08,
    //fontFamily:"Quicksand",
    fontWeight:"bold",
    fontSize:26,
    color:"#35424a"
  },
  linhaCampos: {
    borderBottomColor: "#e8e4e3",
    marginLeft:screen.width*0.08,
    marginRight:screen.width*0.2,
    marginTop:screen.width*0.02,
    borderBottomWidth: 2,

  },
          
  fieldCadastroTop:{
    marginTop:screen.height*0.05,
    marginLeft:screen.width*0.08,
    //fontFamily:"Arial",
    fontWeight:"bold",
    fontSize:14,
    color:"#f85f6a"
  },

  fieldCadastro:{
    marginTop:screen.height*0.03,
    marginLeft:screen.width*0.08,
   // fontFamily:"Arial",
    fontWeight:"bold",
    fontSize:14,
    color:"#f85f6a"
  },

  entradaTexto:{
    marginTop:screen.height*0.02,
    marginLeft:screen.width*0.08,
    marginRight:screen.width*0.2,
    paddingHorizontal: 1,
   // fontFamily:"Arial",
    fontWeight:"bold",
    fontSize:16,
    borderRadius:10,
    color:"#35424a",
  },

  submitButton:{
    width: screen.width *0.7,
    height: screen.height * 0.08,
    backgroundColor: "#0c59cf",
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop:screen.height*0.03
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
  }
});