import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
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
		alert("erro")
		}
	};

	useEffect (() => {
		getApiDados();
	}, []);

	const CONTENT = {
		tableHead: ['Sensor Cisterna Topo', 'Sensor Cisterna Fundo', 'Sensor Caixa Topo', 'Sensor Caixa Fundo'],
	  
		tableData: [
		  [results.sc1?"1":"0", results.sc2?"1":"0", results.scx1?"1":"0",results.scx1?"1":"0"]
		],
	  };

	const Volume = {
		tableHead: ['Volume'],
		tableData: [
		  [results.volume + ' %']
		],
	  };
	
	return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={CONTENT.tableHead}
          flexArr={[1, 1, 1, 1]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={CONTENT.tableData}
            flexArr={[1, 1, 1]}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
		<Text>{"\n\n\n"}</Text>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={Volume.tableHead}
          flexArr={[1]}
          style={styles.headVolume}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapperVolume}>
          <Rows
            data={Volume.tableData}
            flexArr={[1]}
            style={styles.rowVolume}
            textStyle={styles.textVolume}
          />
        </TableWrapper>
      </Table>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, paddingTop: 100, backgroundColor: '#fff' },
  head: { height: 65, backgroundColor: '#6495ED', width: screen.width * 0.92 , },
  headVolume: { height: 45, backgroundColor: '#00FFFF' },
  wrapper: { flexDirection: 'row' },
  wrapperVolume: { flexDirection: 'row' },
  row: { height: 28, width: screen.width * 0.92 },
  rowVolume: { height: 28 },
  text: { textAlign: 'center' },
  textVolume: { textAlign: 'center' }
});