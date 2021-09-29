import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, SafeAreaView,ActivityIndicator, TouchableOpacity } from 'react-native';
import { ProgressChart, LineChart } from "react-native-chart-kit";
import { DataTable } from 'react-native-paper';
import * as screen from "../constants/dimensions";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SecondPage({navigation}) {

  const [admin, setAdmin] = useState(false)
  const [name, setName] = useState("")
  const [uuid, setUuid] = useState("")

const getData = async () => {
  try {
    var name = await AsyncStorage.getItem('user_name');
    setName(name);
    var uuid = await AsyncStorage.getItem('uuid');
    setUuid(uuid);
    var admin = await AsyncStorage.getItem('admin');
    setAdmin(admin);
    
    console.log(name)
    console.log(uuid)
    console.log(admin)
  } 
  catch(e) {
    console.log(e)
  }
}

const clearData = async () => {
  try {
    await AsyncStorage.setItem('user_name',"");
    await AsyncStorage.setItem('uuid',"");
    await AsyncStorage.setItem('admin',"");
  } 
  catch(e) {
    console.log(e)
  }
}

	//const [results, setResults] = useState([])
  const [data, setData] = useState({})
  const [sensorLevel, setsensorLevel] = useState({})
  const [loading, setLoading] = useState(true)
  const [statusBomba, setStatusBomba] = useState(false)
  const [textoBotao, setTextoBotao] = useState("Ligar a bomba")
  const [colorBotao,setColorBotao] = useState("green")

  async function Logout(){
		try {
      clearData();
      console.log(navigation.navigate("Home"))
		} catch (e) {
		alert("Erro ao fazer logout")
		}
	};

  async function getApiDados(){
		try {
			const url = "http://app-pipa.herokuapp.com/status"
			const response = await axios.get(url)
      console.log(response.data.data)
      var data = {
        label:[''],
        porcentagem: [response.data.data.volume/100],
        percentText:response.data.data.volume,
        
      };

      var sensorLevel = {
        CLow: response.data.data.sc1?"1":"0",
        CHigh: response.data.data.sc2?"1":"0",
        CxLow: response.data.data.scx1?"1":"0",
        CxHigh: response.data.data.scx2?"1":"0",
        
      };
      setsensorLevel(sensorLevel);
      setData(data)
      console.log(data)
      setLoading(false);
		} catch (e) {
		alert("Erro ao obter os dados")
		}
	};

  const volumeLineChart = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`, // optional
        strokeWidth: 2, // optional
        withDots: false
      }
    ],

  };

  async function switchBombaStatus(){
		try {
			//const url = "http://app-pipa.herokuapp.com/status"
      var url = "";
      if(statusBomba == false){
        setStatusBomba(true)
        setTextoBotao("Desligar a bomba")
        setColorBotao("red")
        url = "https://maker.ifttt.com/trigger/pipa_on/with/key/fLhyBLORuQKdzCXgvp4N2VQARUa4BpzLwH9VpKWC4Td"
      }
      else{
        setStatusBomba(false)
        setTextoBotao("Ligar a bomba")
        setColorBotao("green")
        url = "https://maker.ifttt.com/trigger/pipa_off/with/key/fLhyBLORuQKdzCXgvp4N2VQARUa4BpzLwH9VpKWC4Td"
      }

			const response = await axios.post(url)
      console.log(response);
		} catch (e) {
		alert("Erro ao obter os dados")
		}
	};


	useEffect (() => {
    getData();
		getApiDados();
    // var data = {
    //   label:[''],
    //   porcentagem: [0.5],
    //   percentText:50,
      
    // };
    //setData(data)
   // console.log(data)
	}, []);




	if(loading == false){
    return (
      <SafeAreaView style={styles.container}>      
        <View>
          <Text style={styles.headerNameText}>Olá {name}!</Text>
              <Text style={styles.botaoSair}
              onPress={() => Logout()}>Sair</Text>
          
          <Text style={styles.headerText}>Monitoramento atual</Text>
          <View style={styles.linhaCampos}></View>
          <Text style={styles.subtittleText}>Volume atual</Text>        
          <Text style={styles.percentNumber}>{data.percentText}%</Text>
            <ProgressChart
              data={data.porcentagem}
              style={{marginLeft:screen.width*0.04}}
              width={screen.width * 0.4}
              height={screen.height * 0.2}
              strokeWidth={16}
              radius={55}
              chartConfig={progressChartConfig}
              hideLegend={true}
            />     
            <TouchableOpacity style={{
                  marginTop:-screen.height*0.15,
                  marginBottom:screen.height*0.1,
                  marginLeft:screen.width*0.55,
                  width: screen.width *0.35,
                  height: screen.height * 0.05,
                  backgroundColor: colorBotao,
                  borderRadius:20,
            }}
            onPress={() => switchBombaStatus()}>
              <Text style={styles.textoBotaoBomba}>{textoBotao}</Text>
            </TouchableOpacity>

            <Text style={styles.graficoText}>Gráfico de volume</Text>   
            <View style={styles.linhaCampos}></View> 
            <View style={styles.linhaCampoEscura}></View> 
              <LineChart
                data={volumeLineChart}
                width={screen.width}
                height={220}
                chartConfig={lineChartConfig}
              />

  
            <Text style={styles.nivelText}>Nível Atual</Text>   
            <View style={styles.linhaCampos}></View> 
            <View style={styles.linhaCampoNivel}></View>
              <DataTable>
                <DataTable.Header>
                <DataTable.Title></DataTable.Title>
                  <DataTable.Title>Baixo</DataTable.Title>
                  <DataTable.Title>Alto</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>Cisterna</DataTable.Cell>
                  <DataTable.Cell>{sensorLevel.CLow}</DataTable.Cell>
                  <DataTable.Cell>{sensorLevel.CHigh}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Caixa d'água</DataTable.Cell>
                  <DataTable.Cell>{sensorLevel.CxLow}</DataTable.Cell>
                  <DataTable.Cell>{sensorLevel.CxHigh}</DataTable.Cell>
                </DataTable.Row>


              </DataTable> 
        </View>
  </SafeAreaView>  
    );
  }
  else{
    return(
      <View style={styles.container}>
        <ActivityIndicator/>
      </View>)
  }
	
}

const styles  = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  headerNameText: {
    marginTop: screen.height * 0.08,
    marginLeft:screen.width*0.08,
    alignItems: "flex-end",
    color: '#abb5be',
    fontSize: 18,
    //fontFamily: 'sans-serif-light'
  },
  botaoSair:{
    marginTop: -(screen.height * 0.04),
    marginBottom:screen.height*0.03,
    marginLeft:screen.width*0.85,
    alignItems: "flex-end",
    color: 'red',
    fontSize: 16,
    //fontFamily: 'sans-serif-light'
  },
  headerText: {
    marginTop: screen.height * 0.01,
    marginLeft:screen.width*0.08,
    alignItems: "flex-end",
    fontSize: 26,

    //fontFamily: 'serif',
  },
  linhaCampos: {
    borderBottomColor: "#e8e4e3",
    marginLeft:screen.width*0.08,
    marginRight:screen.width*0.1,
    marginTop:screen.height*0.02,
    borderBottomWidth: 2,

  },

  textoBotaoBomba:{
    marginVertical:screen.height*0.01,
    color:"white",
    fontSize:14,
    alignSelf:'center'

  },
  linhaCampoEscura: {
    borderBottomColor: "black",
    width:screen.width*0.36,
    marginLeft:screen.width*0.54,
    marginRight:screen.width*0.1,
    marginTop:-screen.height*0.001,
    //marginTop:screen.width*0.02,
    borderBottomWidth: 2,

  },
  subtittleText: {
    marginTop: screen.height * 0.03,
    marginLeft:screen.width*0.08,
    alignItems: "flex-end",
    color: '#abb5be',
    fontSize: 16,
    //fontFamily: 'sans-serif-light'
  },
  graficoText:{
    marginTop: screen.height * 0.01,
    marginLeft:screen.width*0.54,
    marginRight:screen.width*0.06,
    fontSize:16,
    fontWeight:"bold",
  },

  nivelText:{
    marginTop: screen.height * 0.01,
    marginLeft:screen.width*0.68,
    marginRight:screen.width*0.06,
    fontSize:16,
    fontWeight:"bold",
  },

  linhaCampoNivel: {
    borderBottomColor: "black",
    width:screen.width*0.22,
    marginLeft:screen.width*0.68,
    marginRight:screen.width*0.1,
    marginTop:-screen.height*0.001,
    //marginTop:screen.width*0.02,
    borderBottomWidth: 2,

  },
  percentNumber: {
    marginLeft:screen.width*0.16,
    top:screen.height*0.12,
    fontSize:20,
    color:"green"
  }

})
const progressChartConfig = {
  backgroundGradientFrom: "black",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "black",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(127, 225, 173, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  
};

const lineChartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  
};