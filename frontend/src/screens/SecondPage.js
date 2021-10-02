import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, {useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, SafeAreaView,Image, TouchableOpacity,ScrollView,RefreshControl, Button } from 'react-native';
import { ProgressChart, LineChart } from "react-native-chart-kit";
import { DataTable} from 'react-native-paper';
import {Badge} from 'react-native-elements';
import * as screen from "../constants/dimensions";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
var count = 1;

export default function SecondPage({navigation}) {

  const [admin, setAdmin] = useState(false)
  const [name, setName] = useState("")
  const [uuid, setUuid] = useState("")
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
    await AsyncStorage.clear()
  } 
  catch(e) {
    console.log(e)
  }
}

	//const [results, setResults] = useState([])
  const [data, setData] = useState({})
  const [sensorLevel, setsensorLevel] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadingOne, setLoadingOne] = useState(true)
  const [statusBomba, setStatusBomba] = useState(false)
  const [textoBotao, setTextoBotao] = useState("Ligar a bomba")
  const [colorBotao,setColorBotao] = useState("green")
  const [listaVolumes,setListaVolumes] = useState([])
  const [listaDatas,setListaDatas] = useState([])
  //const [consumo,setConsumo] = useState(200)

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
      //while(uuid == ""){
      //}
			const url = "http://app-pipa.herokuapp.com/sensor/status/pipa_001"//+uuid
			const response = await axios.get(url)
      console.log(response.data.data)
      if(response.data.data.volume>100){
        var data = {
          label:[''],
          porcentagem: [1],
          percentText:100.00,
          
        };
      }
      else{
        var data = {
          label:[''],
          porcentagem: [2900/100],
          //porcentagem: [response.data.data.volume/100],
          percentText:response.data.data.volume,
          
        };
      }
      var sensorLevel = {
        CurrentDay: response.data.data.updatedAt.split("T")[0].substring(8,10),
        CurrentMonth: response.data.data.updatedAt.split("T")[0].substring(5,7),
        CLow: response.data.data.sc2?"1":"0",
        CHigh: response.data.data.sc1?"1":"0",
        CxLow: response.data.data.scx2?"1":"0",
        CxHigh: response.data.data.scx1?"1":"0",
        
      };
      setsensorLevel(sensorLevel);
      console.log(sensorLevel.CurrentDay)
      setData(data)
      //console.log(data)
      setLoading(false);
		} catch (e) {
		alert("Erro ao obter os dados")
    console.log(navigation.navigate("Home"))
		}
	};

  async function getListaVolumes(){
		try {
      //while(uuid == ""){
      //}
      //console.log(uuid)
      const url = "http://app-pipa.herokuapp.com/sensor/pipa_001"//+uuid
  
			const response = await axios.get(url)

      //console.log(response.data.data)
      
      var lista_volumes = [];
      let lista_datas = [];
      // var quantasVezesLigouBomba = 0;
      // var bomba_state = false;

      console.log(response.data.data.length)
      for (let index = 0; index < response.data.data.length; index++) {
      //for (let index = 0; index < 100; index++) {
        lista_volumes[index] = response.data.data[index].volume;
        lista_datas[index] = response.data.data[index].updatedAt.split("T")[1].substring(0,2)+"h";       
        // if(index>1){
        //   if((response.data.data[index].volume > response.data.data[index-1].volume) && bomba_state == false){
        //     bomba_state = true
        //     quantasVezesLigouBomba+=1;
        //   }
        //   else if ((response.data.data[index].volume < response.data.data[index-1].volume) && bomba_state == true) (
        //     bomba_state = false
        //   )
       // }
      }
      //console.log("quantasVezesLigouBomba:"+quantasVezesLigouBomba)
      setListaVolumes(lista_volumes)
      setListaDatas(lista_datas)
      setLoadingOne(false)
		} catch (e) {
		alert("Erro ao obter lista de volumes")
		}
	};


  const volumeLineChart = {
    labels: listaDatas,
    datasets: [
      {
        data: listaVolumes,
        color: (opacity = 1) => `rgba(0, 0, 128, ${opacity})`, // optional
        strokeWidth: 2, // optional
        withDots: false,
      }
    ],

  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false));
  }, []);

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
    getListaVolumes();
		getApiDados();
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
    });
    
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

    //getListaVolumes();
    // var data = {
    //   label:[''],
    //   porcentagem: [0.5],
    //   percentText:50,
      
    // };
    // setData(data)
    // setLoading(false)
   // console.log(data)
	}, []);

  //definindo notificacao push
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
  //definindo mensagem da notificacao
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      //sound: 'default',
      title: 'CAIXA COM MENOS DE 30%',
      body: 'Sua caixa está com menos de 30%, recomendamos verificar a cisterna e ligar a bomba.',
      //data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  console.log("contador antes!!!!  " + count);

  //verificacao para enviar notificao para o usuario, podemos pensar em outra solucao... mas acho que vai ser necessario colocar o contador
  if((data.porcentagem<=30) && (count%100)==0){
    console.log("TESTANDO!!!!!!!!!!!!!!!!!!!!!!");
    //sendPushNotification(expoPushToken);

  }
  count = count +1; 
  console.log("contador depois !!!!" + count);
  console.log("contador com resto!!!!!!!" + (count%100))
  

  
	if((loading == false) && (loadingOne == false)){
    return (
      <SafeAreaView style={styles.container}>
         <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>   
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
            <ScrollView horizontal={true}>
              <LineChart
                data={volumeLineChart}
                width={screen.width*8}
                height={220}
                chartConfig={lineChartConfig}
              />
            </ScrollView>
  
            <Text style={styles.nivelText}>Nível Atual</Text>   
            <View style={styles.linhaCampos}></View> 
            <View style={styles.linhaCampoNivel}></View>
              <DataTable
              style={{
                marginBottom:screen.height*0.04}}>
                <DataTable.Header>
                <DataTable.Title></DataTable.Title>
                  <DataTable.Title>Baixo</DataTable.Title>
                  <DataTable.Title>Topo</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>Cisterna</DataTable.Cell>
                  <DataTable.Cell>
                     <Badge 
                     value={sensorLevel.CLow=="1"?"Detectado":"Não-detectado"} 
                     status={sensorLevel.CLow=="1"?"success":"error"}/>
                  </DataTable.Cell>
                  <DataTable.Cell>
                  <Badge 
                     value={sensorLevel.CHigh=="1"?"Detectado":"Não-detectado"} 
                     status={sensorLevel.CHigh=="1"?"success":"error"}/>
                  </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Caixa d'água</DataTable.Cell>
                  <DataTable.Cell>
                  <Badge 
                     value={sensorLevel.CxLow=="1"?"Detectado":"Não-detectado"} 
                     status={sensorLevel.CxLow=="1"?"success":"error"}/>
                  </DataTable.Cell>
                  <DataTable.Cell>
                  <Badge 
                     value={sensorLevel.CxHigh=="1"?"Detectado":"Não-detectado"} 
                     status={sensorLevel.CxHigh=="1"?"success":"error"}/>
                  </DataTable.Cell>
                </DataTable.Row>


              </DataTable>
              <Text style={styles.consumoText}>Consumo diário</Text>   
            <View style={styles.linhaCampos}></View> 
            <View style={styles.linhaCampoEscura}></View>
            <Text style={{  
              fontSize:14,
              color:"red",
              marginLeft:screen.width*0.4,
              marginTop:screen.height*0.05,
              //marginBottom:screen.height*0.05
              }}> Em breve!</Text>
            <Text style={styles.consumo}>Consumo no dia {parseInt(sensorLevel.CurrentDay)-1}/{sensorLevel.CurrentMonth}:</Text>
            <Text style={{
              fontWeight:"bold",
              fontSize:20,
              marginLeft:screen.width*0.52,
              marginTop:-screen.height*0.035
              }}>?</Text>
            <Text style={{  
              fontSize:14,
              marginLeft:screen.width*0.58,
              marginTop:-screen.height*0.035,
              marginBottom:screen.height*0.1
              }}> litros</Text> 
        </ScrollView >
    
  </SafeAreaView>      
    );
  }
  else{
    return(
      <View style={styles.container}>
        <Text style={{
          fontSize:25,
          marginTop:screen.height*0.3,
          marginLeft:screen.width*0.3
        }}>Carregando...</Text>
        <Image
          style={{width: screen.width, height: 200}}
          source={require("../../assets/images/loading.gif")}/>
      </View>
      )
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
  consumo:{
    fontSize:14,
    marginLeft:screen.width*0.08,
    marginTop:screen.height*0.05,
    flex:1
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
  consumoText:{
    marginTop: screen.height * 0.01,
    marginLeft:screen.width*0.58,
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
  barPercentage: 1,
  decimalPlaces:0, // optional, defaults to 2dp
  useShadowColorFromDataset: true, // optional
  
};




