let discord = require('discord.js');
let client = new discord.client();
const server = require('server.js');
client.login("ODg2MjEyNjUxNTI3NjAyMTk3.YTyT2Q.c0IXrsuCXl4yu5HEG82e1FH1Qts")

client.on("broadcast", message => {
  if (message.content 