import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, SafeAreaView,ActivityIndicator, TouchableOpacity } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import * as screen from "../constants/dimensions";
import axios from 'axios';


export default function SecondPage() {

	const [results, setResults] = useState([])
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [statusBomba, setStatusBomba] = useState(false)
  const [textoBotao, setTextoBotao] = useState("Ligar a bomba")
  const [colorBotao,setColorBotao] = useState("green")

	
  async function getApiDados(){
		try {
			//const url = "http://app-pipa.herokuapp.com/status"
      const url = "https://pipaa.free.beeceptor.com"
			const response = await axios.get(url)
      console.log(response.data.sensors);
			setResults(response.data.sensors);
      var data = {
        label:[''],
        porcentagem: [results.volume/100],
        percentText:results.volume,
        
      };
      setData(data)
		} catch (e) {
		alert("Erro ao obter os dados")
		}
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
			//setResults(response.data.sensors);
      setData(data)
		} catch (e) {
		alert("Erro ao obter os dados")
		}
	};


	useEffect (() => {
		//getApiDados();
    var data = {
      label:[''],
      porcentagem: [0.5],
      percentText:50,
      
    };
    setData(data)
    setLoading(false)
    console.log(data)
	}, []);



  //tableHead: ['Sensor Cisterna Topo', 'Sensor Cisterna Fundo', 'Sensor Caixa Topo', 'Sensor Caixa Fundo'],
	//
	//tableData: [
	//  [results.sc1?"1":"0", results.sc2?"1":"0", results.scx1?"1":"0",results.scx2?"1":"0"]

	//const Volume = {
	//tableHead: ['Volume'],
	//tableData: [
	//  [results.volume + ' %']

	if(loading == false){
    return (
      <SafeAreaView style={styles.container}>      
        <View>
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
              chartConfig={chartConfig}
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
  
            <Text style={styles.nivelText}>Nível Atual</Text>   
            <View style={styles.linhaCampos}></View> 
            <View style={styles.linhaCampoNivel}></View> 
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

  headerText: {
    marginTop: screen.height * 0.1,
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
    marginLeft:screen.width*0.2,
    top:screen.height*0.12,
    fontSize:20,
    color:"green"
  }

})
const chartConfig = {
  backgroundGradientFrom: "black",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "black",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(127, 225, 173, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  
};