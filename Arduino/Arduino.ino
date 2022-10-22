// An IR LED must be connected to Arduino PWM pin 3.

#include <IRremote.h>

IRsend irsend;

void setup()
{
    Serial.begin(9600);
}

void loop() {
  char recv[10];
  memset(recv, 0, 10);

  // シリアルから読み込み
  recvStr(recv); 

  if(strcmp("on", recv) == 0){
    // 全灯
    irsend.sendNEC(0x41B6659A, 32);
    //Serial.println("on");
  }
  else if (strcmp("nl", recv) == 0){
    // 常夜灯
    irsend.sendNEC(0x41B63DC2, 32);
    //Serial.println("nl");
  }
  else if (strcmp("off", recv) == 0){
    // 消灯
    irsend.sendNEC(0x41B67D82, 32);
    //Serial.println("off");
  }
  else if (strcmp("data", recv) == 0){
    int ad0 = analogRead(0);
    int ad1 = analogRead(1);
  
    Serial.print(ad0);
    Serial.print(",");
    Serial.println(ad1 / 1024.0 * 5 * 100);
  }

  delay(1000);
}

void recvStr(char *buf){
  int i = 0;
  while(Serial.available() > 0){
    buf[i] = Serial.read();
    i++;
  }
}
