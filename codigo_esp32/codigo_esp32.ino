#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <Ultrasonic.h>
#include <PubSubClient.h>
#include "constants_h.h"
   

WiFiClientSecure espClient;
PubSubClient MQTT(espClient); // Instancia o Cliente MQTT passando o objeto espClient


long microsec;
float cmMsec;

Ultrasonic ultrasonic(TRIGGER_PIN, ECHO_PIN);

void VerificaConexoesWiFIEMQTT(void)
{
  if (!MQTT.connected())
    reconnectMQTT(); //se não há conexão com o Broker, a conexão é refeita

  //reconectWiFi(); //se não há conexão com o WiFI, a conexão é refeita
}
void reconectWiFi() 
{
    //se já está conectado a rede WI-FI, nada é feito. 
    //Caso contrário, são efetuadas tentativas de conexão
    
    if (WiFi.status() == WL_CONNECTED)
        return;
         
    WiFi.begin(ssid, password); // Conecta na rede WI-FI
    WiFi.mode(WIFI_STA);
    while (WiFi.waitForConnectResult() != WL_CONNECTED) {
        Serial.println("Connection Failed! Rebooting...");
        delay(5000);
        ESP.restart();
    }
   
    Serial.println();
    Serial.print("Conectado com sucesso na rede ");
    Serial.print(ssid);
    Serial.println("IP obtido: ");
    Serial.println(WiFi.localIP());
}

void reconnectMQTT()
{
  while (!MQTT.connected())
  {
    Serial.print("* Tentando se conectar ao Broker MQTT: ");
    Serial.println(BROKER_MQTT);
    if (MQTT.connect(ID_MQTT,brokerUser,brokerPassword))
    {
      Serial.println("Conectado com sucesso ao broker MQTT!");
      MQTT.subscribe(TOPICO_SUBSCRIBE);
    }
    else
    {
      Serial.println("Falha ao reconectar no broker.");
      Serial.println("Havera nova tentatica de conexao em 2s");
      delay(2000);
    }
  }
}
void mqtt_callback(char* topic, byte* payload, unsigned int length)
{
  String msg;
  
  //obtem a string do payload recebido
  for (int i = 0; i < length; i++)
  {
    char c = (char)payload[i];
    msg += c;
  }
  Serial.println(msg);
  //toma ação dependendo da string recebida:
  //verifica se deve colocar nivel alto de tensão na saída LED_INTERNO:
  //IMPORTANTE: o Led já contido na placa é acionado com lógica invertida (ou seja,
  //enviar HIGH para o output faz o Led apagar / enviar LOW faz o Led acender)
  if (msg.equals(uuid))
  {
    digitalWrite(ledInterno, LOW);
    char teste[120];
    // for (int i = 0; i < qtdMedicoes; i++)
    // {
      microsec = ultrasonic.timing();
    //  microsec += ultrasonic.timing();
    //   delay(100);
    // }

    //microsec=microsec/qtdMedicoes;
    delay(100);
    cmMsec = ultrasonic.convert(microsec, Ultrasonic::CM);
    
    int cisternaBaixo = 0;
    int cisternaAlto = !(digitalRead(sensorB2));
    delay(10);
    int caixadaguaAlto = !(digitalRead(sensorB1));
    delay(10);
    int caixadaguaBaixo = !(digitalRead(sensorA1));

    if(cisternaAlto == 1){
      cisternaBaixo = 1;
     }
    if(100*(1-(cmMsec-altura_da_tampa)/altura_da_caixa) <= 10.00){
      caixadaguaBaixo = 0;
      }
     else{
      caixadaguaBaixo = 1;
      }
    //100*cmMsec/altura_da_caixa
    sprintf(teste, "{\"client\":\"%s\",\"wifi_db\":%d,\"sensors\":{\"sc1\":%d,\"sc2\":%d,\"scx1\":%d,\"scx2\":%d,\"volume\":%.2f}}", uuid, WiFi.RSSI(),cisternaAlto, cisternaBaixo, caixadaguaAlto, caixadaguaBaixo,100*(1-(cmMsec-altura_da_tampa)/altura_da_caixa));
   
    MQTT.publish(TOPICO_PUBLISH, teste);
    //EstadoSaida = '1';
    //msg = "";
  }
  else if(msg.equals(uuid_status)){
    long wifi = WiFi.RSSI();
    char jsonAlive[60];
    sprintf(jsonAlive,"{\"client\":\"%s\",\"wifi_db\":%d,\"status\":\"online\"}", uuid, WiFi.RSSI());
    MQTT.publish(TOPICO_ALIVE, jsonAlive);
  }
  else
  {
    digitalWrite(ledInterno, HIGH);
    MQTT.publish(TOPICO_PUBLISH, "Parâmetro recebido incorreto");
    //EstadoSaida = '0';
    //msg = "";
  }


}

void setup() {
  espClient.setCACert(test_root_ca);
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);   //informa qual broker e porta deve ser conectado
  MQTT.setCallback(mqtt_callback);            //atribui função de callback (função chamada quando qualquer informação de um dos tópicos subescritos chega)
  pinMode(sensorA1, INPUT);
  pinMode(sensorB1, INPUT);
  pinMode(sensorB2, INPUT);
  pinMode(ledInterno,OUTPUT);

  Serial.begin(115200);
  Serial.println("Booting");
  
  reconectWiFi();

  // Port defaults to 3232
  // ArduinoOTA.setPort(3232);

  // Hostname defaults to esp3232-[MAC]
  // ArduinoOTA.setHostname("myesp32");

  // No authentication by default
  // ArduinoOTA.setPassword("admin");

  // Password can be set with it's md5 value as well
  // MD5(admin) = 21232f297a57a5a743894a0e4a801fc3
  // ArduinoOTA.setPasswordHash("21232f297a57a5a743894a0e4a801fc3");

  ArduinoOTA
  .onStart([]() {
    String type;
    if (ArduinoOTA.getCommand() == U_FLASH)
      type = "sketch";
    else // U_SPIFFS
      type = "filesystem";

    // NOTE: if updating SPIFFS this would be the place to unmount SPIFFS using SPIFFS.end()
    Serial.println("Start updating " + type);
  })
  .onEnd([]() {
    Serial.println("\nEnd");
  })
  .onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  })
  .onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });

  ArduinoOTA.begin();

  Serial.println("Ready");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {

  VerificaConexoesWiFIEMQTT();
  //keep-alive da comunicação com broker MQTT
  MQTT.loop();

  ArduinoOTA.handle();
    
}
