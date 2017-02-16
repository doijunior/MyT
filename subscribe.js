const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://test.mosquitto.org')

const TelegramBot = require('node-telegram-bot-api')
const token = '364406164:AAEegb5Ct6mgcuLPc2-3_xOQywSWa-Em9u0'
const MyTtheBot = new TelegramBot(token, {polling: true})

var whosListening = []

MyTtheBot.on('message', (msg) => {
  if(msg.text === "MyT"){
    whosListening.push(msg.chat.id)
    console.log(whosListening)
  }
})

client.on('connect', function(){
  client.subscribe('newMyT')
})

client.on('message', function(topic, message){
  console.log("ó o gás:\n")
  whosListening.forEach(function(v){
    console.log(message.toString()+" sent to "+ v)
    MyTtheBot.sendMessage(v, message)
  })
})
