import { Controller, Get, OnApplicationBootstrap, BeforeApplicationShutdown } from '@nestjs/common';
const { Telegraf } = require('telegraf')

@Controller()
export class AppController implements OnApplicationBootstrap {
  bot;
  connections: {id, firstName, lastName}[];
  constructor() {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    this.connections = [];
  } 

  onApplicationBootstrap() {
    this.bot.command('stop', (msg, next) => {
      const chat = this.connections.find(connection =>  connection.id == msg.chat.id );
      if(chat){
        this.connections.splice(this.connections.indexOf(chat), 1)
        msg.reply("disconnected");
          console.log(`Removed chat ${chat.firstName} ${chat.lastName} (${chat.id})`);
      }
      else{
        next();
      }
    });
    this.bot.command('start', (msg) => {
      const chat = this.connections.find(connection =>  connection.id == msg.chat.id );
      if(!chat){
        const chatInfo = {
          id: msg.chat.id,
          firstName: msg.from.first_name,
          lastName: msg.from.last_name
      };
        this.connections.push(chatInfo);
        msg.reply("connected");
        console.log(`Added chat ${chatInfo.firstName} ${chatInfo.lastName} (${chatInfo.id})`);
      }
    });
    this.bot.on('text', (ctx) =>ctx.reply("if you need help use /help"))
    this.bot.startPolling();
  }
}
