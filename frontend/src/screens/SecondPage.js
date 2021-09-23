import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import * as screen from "../constants/dimensions";
import axios from 'axios';


export default function SecondPage() {

	const [results, setResults] = useState([])
	
	const getApiDados = async () => {
		try {
			const url = "http://app-pipa.herokuapp.com/status"
			const response = await axios.get(url)
			setResults(response.data.data);
		} catch (e) {
		alert("errrrrrrrro!!!!!")
		}
	};

	useEffect (() => {
		getApiDados();
	}, []);

  const data = {
    label: [''],
    data: [0.5] //ao colocar valor de results.volume recebo erro 
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
        <Text style={styles.subtittleText}>Volume atual</Text>        
        <Text style={styles.percentNumber}>{data.data}%</Text>
          <ProgressChart
            data={data}
            width={screen.width * 0.4}
            height={screen.height * 0.18}
            strokeWidth={16}
            radius={55}
            chartConfig={chartConfig}
            hideLegend={true}
          />     
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
    marginTop: screen.height * 0.11,
    marginLeft: screen.width * 0.05,
    alignItems: "flex-end",
    fontSize: screen.height * 0.035,
    borderBottomWidth: 0.5,    
    borderBottomColor: '#888888' ,
    fontFamily: 'serif',
    top: 0
  },
  
  subtittleText: {
    marginTop: screen.height * 0.03,
    marginLeft: screen.width * 0.06,
    alignItems: "flex-end",
    color: '#707070',
    fontSize: screen.height * 0.020,
    fontFamily: 'sans-serif-light'
  },
  percentNumber: {
    top:87,
    left:60,
    fontSize:20,
    color:"green"
  }

})
const chartConfig = {
  backgroundGradientFrom: "black",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "black",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  
  
  
};