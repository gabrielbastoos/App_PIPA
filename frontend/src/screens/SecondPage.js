import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import * as screen from "../constants/dimensions";


export default function SecondPage() {
	const [results, setResults] = useState([])
	
	const getApiDados = async () => {
		try {
			const url = "http://app-pipa.herokuapp.com/status"
			const response = await axios.get(url)
			setResults(response.data.data);
		} catch (e) {
		alert("erro")
		}
	};

	useEffect (() => {
		getApiDados();
	}, []);

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text>Status</Text>   
        </View>
		<View style={styles.body}>
			<Text>{results.sc1?"Cheio":"Vazio"}</Text> 
		    <Text>{results.volume}</Text>
    
        </View>
    
    </SafeAreaView>  
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: screen.height * 0.1,
    alignItems: "center",
  },

  body: {
    alignItems: "center",
	marginTop: screen.height * 0.2,
  },


});