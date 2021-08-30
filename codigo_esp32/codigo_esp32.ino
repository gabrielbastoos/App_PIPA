#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <Ultrasonic.h>
#include <PubSubClient.h>

#define TOPICO_SUBSCRIBE "NODEMCU_PIPA"    //tópico MQTT de escuta
#define TOPICO_PUBLISH  "NODEJS_PIPA"   //tópico MQTT de envio de informações para Broker
//IMPORTANTE: recomendamos fortemente alterar os nomes
//            desses tópicos. Caso contrário, há grandes
//            chances de você controlar e monitorar o NodeMCU
//            de outra pessoa.
#define ID_MQTT  "NODEMCU"     //id mqtt (para identificação de sessão)
//IMPORTANTE: este deve ser único no broker (ou seja,
//            se um client MQTT tentar entrar com o mesmo
//            id de outro já conectado ao broker, o broker
//            irá fechar a conexão de um deles).

const char* test_root_ca= \
     "-----BEGIN CERTIFICATE-----\n" \
     "MIIDSjCCAjKgAwIBAgIQRK+wgNajJ7qJMDmGLvhAazANBgkqhkiG9w0BAQUFADA/\n" \
     "MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT\n" \
     "DkRTVCBSb290IENBIFgzMB4XDTAwMDkzMDIxMTIxOVoXDTIxMDkzMDE0MDExNVow\n" \
     "PzEkMCIGA1UEChMbRGlnaXRhbCBTaWduYXR1cmUgVHJ1c3QgQ28uMRcwFQYDVQQD\n" \
     "Ew5EU1QgUm9vdCBDQSBYMzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB\n" \
     "AN+v6ZdQCINXtMxiZfaQguzH0yxrMMpb7NnDfcdAwRgUi+DoM3ZJKuM/IUmTrE4O\n" \
     "rz5Iy2Xu/NMhD2XSKtkyj4zl93ewEnu1lcCJo6m67XMuegwGMoOifooUMM0RoOEq\n" \
     "OLl5CjH9UL2AZd+3UWODyOKIYepLYYHsUmu5ouJLGiifSKOeDNoJjj4XLh7dIN9b\n" \
     "xiqKqy69cK3FCxolkHRyxXtqqzTWMIn/5WgTe1QLyNau7Fqckh49ZLOMxt+/yUFw\n" \
     "7BZy1SbsOFU5Q9D8/RhcQPGX69Wam40dutolucbY38EVAjqr2m7xPi71XAicPNaD\n" \
     "aeQQmxkqtilX4+U9m5/wAl0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNV\n" \
     "HQ8BAf8EBAMCAQYwHQYDVR0OBBYEFMSnsaR7LHH62+FLkHX/xBVghYkQMA0GCSqG\n" \
     "SIb3DQEBBQUAA4IBAQCjGiybFwBcqR7uKGY3Or+Dxz9LwwmglSBd49lZRNI+DT69\n" \
     "ikugdB/OEIKcdBodfpga3csTS7MgROSR6cz8faXbauX+5v3gTt23ADq1cEmv8uXr\n" \
     "AvHRAosZy5Q6XkjEGB5YGV8eAlrwDPGxrancWYaLbumR9YbK+rlmM6pZW87ipxZz\n" \
     "R8srzJmwN0jP41ZL9c8PDHIyh8bwRLtTcm1D9SZImlJnt1ir/md2cXjbDaJWFBM5\n" \
     "JDGFoqgCWjBH4d1QB7wCCZAA62RjYJsWvIjJEubSfZGL+T0yjWW06XyxV3bqxbYo\n" \
     "Ob8VZRzI9neWagqNdwvYkQsEjgfbKbYK7p2CNTUQ\n" \
     "-----END CERTIFICATE-----\n";

     
const char* BROKER_MQTT = "d0b5f4bcb08a43189a9bd4e2bef485db.s1.eu.hivemq.cloud";

int BROKER_PORT = 8883; // Porta do Broker MQTT

WiFiClientSecure espClient;
PubSubClient MQTT(espClient); // Instancia o Cliente MQTT passando o objeto espClient


long microsec;
float cmMsec;

int altura_da_caixa = 70;

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
    if (MQTT.connect(ID_MQTT,"pipauser","P1p4_mqtt"))
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
    char teste[60];
    microsec = ultrasonic.timing();
    cmMsec = ultrasonic.convert(microsec, Ultrasonic::CM);
    delay(100);
    int sensorB2_leitura = digitalRead(sensorB2);
    delay(10);
    int sensorB1_leitura = digitalRead(sensorB1);
    delay(10);
    int sensorA1_leitura = digitalRead(sensorA1);
    //100*cmMsec/altura_da_caixa
    sprintf(teste, "{\"s1\":%d,\"s2\":%d,\"s3\":%d,\"s4\":%d,\"volume\":%f}", sensorA1_leitura, sensorB1_leitura, sensorB2_leitura, sensorB2_leitura,100*cmMsec/altura_da_caixa);
   
    MQTT.publish(TOPICO_PUBLISH, teste);
    //EstadoSaida = '1';
    //msg = "";
  }

  //verifica se deve colocar nivel alto de tensão na saída LED_INTERNO:
  else if (msg.equals("D"))
  {
    digitalWrite(ledInterno, HIGH);
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
