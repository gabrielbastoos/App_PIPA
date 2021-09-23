import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import * as screen from "../constants/dimensions";
import axios from 'axios';


export default function SecondPage() {

	const [results, setResults] = useState([])
  const [percentageVariable, setPercentageVariable] = useState(0)
	
  async function getApiDados(){
		try {
			//const url = "http://app-pipa.herokuapp.com/status"
      const url = "https://pipaa.free.beeceptor.com"
			const response = await axios.get(url)
      console.log(response.data.sensors);
			setResults(response.data.sensors);
      setPercentageVariable(results.volume/100);
		} catch (e) {
		alert("Erro ao obter os dados")
		}
	};

	useEffect (() => {
		getApiDados();
	}, []);



  const data = {
    label: [''],
    porcentagem: [percentageVariable],
    percentText:percentageVariable*100,
    
  };

  //tableHead: ['Sensor Cisterna Topo', 'Sensor Cisterna Fundo', 'Sensor Caixa Topo', 'Sensor Caixa Fundo'],
	//
	//tableData: [
	//  [results.sc1?"1":"0", results.sc2?"1":"0", results.scx1?"1":"0",results.scx2?"1":"0"]

	//const Volume = {
	//tableHead: ['Volume'],
	//tableData: [
	//  [results.volume + ' %']

	
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

const styles = StyleSheet.create ({
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
    marginLeft:screen.width*0.18,
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