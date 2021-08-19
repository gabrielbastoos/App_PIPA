#include <WiFi.h>
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <Ultrasonic.h>
#include <PubSubClient.h>

#define TOPICO_SUBSCRIBE "PIPATOPIC"     //tópico MQTT de escuta
#define TOPICO_PUBLISH  "nodemcuPIPA"    //tópico MQTT de envio de informações para Broker
//IMPORTANTE: recomendamos fortemente alterar os nomes
//            desses tópicos. Caso contrário, há grandes
//            chances de você controlar e monitorar o NodeMCU
//            de outra pessoa.
#define ID_MQTT  "clientId-ZMjPkCVLXN"     //id mqtt (para identificação de sessão)
//IMPORTANTE: este deve ser único no broker (ou seja,
//            se um client MQTT tentar entrar com o mesmo
//            id de outro já conectado ao broker, o broker
//            irá fechar a conexão de um deles).



const char* BROKER_MQTT = "broker.hivemq.com"; //URL do broker MQTT que se deseja utilizar
int BROKER_PORT = 1883; // Porta do Broker MQTT
WiFiClient espClient;
PubSubClient MQTT(espClient); // Instancia o Cliente MQTT passando o objeto espClient


long microsec;
float cmMsec;

int altura_da_caixa = 100;

int ledInterno = 2;

const char* ssid = "Wifi";
const char* password = "w1f1gabriel";

int TRIGGER_PIN = 26;
int ECHO_PIN    = 27;

int sensorA1 = 35;
int sensorB1 = 32;
int sensorB2 = 33;


Ultrasonic ultrasonic(TRIGGER_PIN, ECHO_PIN);

void VerificaConexoesWiFIEMQTT(void)
{
  if (!MQTT.connected())
    reconnectMQTT(); //se não há conexão com o Broker, a conexão é refeita

  reconectWiFi(); //se não há conexão com o WiFI, a conexão é refeita
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
    if (MQTT.connect(ID_MQTT))
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
  if (msg.equals("L"))
  {
    digitalWrite(ledInterno, LOW);
    char teste[40];
    //S1%iS2%iS3%iS4%i
    //digitalRead(sensorA1),digitalRead(sensorB1),digitalRead(sensorB2),digitalRead(sensorB2),  
    int sensorB2_leitura = digitalRead(sensorB2);
    int sensorB1_leitura = digitalRead(sensorB1);
    int sensorA1_leitura = digitalRead(sensorA1);
    sprintf(teste, "S1_%dS2_%dS3_%dS4_%d_PERCENT_%f", sensorA1_leitura, sensorB1_leitura, sensorB2_leitura, sensorB2_leitura, 100*cmMsec/altura_da_caixa);
    MQTT.publish(TOPICO_PUBLISH, teste);
    //EstadoSaida = '1';
  }

  //verifica se deve colocar nivel alto de tensão na saída LED_INTERNO:
  if (msg.equals("D"))
  {
    digitalWrite(ledInterno, HIGH);
    //EstadoSaida = '0';
  }

}

void setup() {

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
  microsec = ultrasonic.timing();
  cmMsec = ultrasonic.convert(microsec, Ultrasonic::CM);
  ArduinoOTA.handle();
}
