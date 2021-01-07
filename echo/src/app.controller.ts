import { Controller, Get, OnApplicationBootstrap, BeforeApplicationShutdown } from '@nestjs/common';

const amazonEcho = require('node-red-contrib-amazon-echo');

@Controller()
export class AppController implements OnApplicationBootstrap {
  amazonEcho;
  arrayListener: {"name", "callback"}[];
  devices: {id:string,topic:string, name:string}[];//name is name for alexa
  hub: {id:string, port:number, discovery: boolean, processinput: string};//default: port:80, descovery: true, processinput: '0'
  RED: {};
  constructor() {
    this.arrayListener = [];
    this.devices = [{id:'b3205078.57ece', topic:'bedroom', name: 'Bedroom lights'}];
    this.hub = {id: 'edc32c68.2a7ff', port:80, discovery: true, processinput:'0'};
    // function Node(n) {
    //   let id = n.id;
    //   let type = n.type;
    //   let name;
    
    //   if (n.name) {
    //       name = n.name;
    //   }
    // }
    // Node.prototype.context = function() {
    //   return {};
    // }
    // Node.prototype.status = function(data: {
    //   fill:string,//color(red,green)
    //   shape:string,//shape(ring)
    //   text:string//error or positive
    // }){},
    // Node.prototype.on = function(name: string, callback){//input en close
    //   this.arrayListener.push({"name": name, "callback": callback})
    // },
    // Node.prototype.send = function(msg){console.log("send");console.log(msg);}
    this.RED = {
      nodes:{
      createNode: (thes, config) => {
        console.log(thes);
        // thes.prototype.on = (name: string, callback)=>{//input en close
        //   this.arrayListener.push({"name": name, "callback": callback})
        // }
        (function(config){
            function context(){return {};};
            function status(data: {
              fill:string,//color(red,green)
              shape:string,//shape(ring)
              text:string//error or positive
            }){}
            function on(name: string, callback){//input en close
              this.arrayListener.push({"name": name, "callback": callback})
            }
            function send(msg){console.log("send");console.log(msg);}
          }).call(thes,config);
        console.log(thes);
        console.log("hoi");
        // thes= {
        //   context: ()=>{return {};},
        //   status: (data: {
        //     fill:string,//color(red,green)
        //     shape:string,//shape(ring)
        //     text:string//error or positive
        //   })=>{},
        //   on: (name: string, callback)=>{//input en close
        //     this.arrayListener.push({"name": name, "callback": callback})
        //   },
        //   send: (msg)=>{console.log("send");console.log(msg);}
        // };
      },
      registerType: (addonPartName:string, addonPart, callback)=>{
        if(addonPartName=='amazon-echo-device'){
          for(let i = 0; i< this.devices.length; i++){
          addonPart(
            {
              id: this.devices[i].id,
               topic:  this.devices[i].topic,
               name: this.devices[i].name
            }
          );
          }
      }
        if(addonPartName=='amazon-echo-hub'){
          let hub = {
            id: this.hub.id,
            port: this.hub.port,
            discovery: this.hub.discovery,
            processinput: this.hub.processinput,
          };
          addonPart();
        }
      },
      eachNode: (callback)=>{
        let returnvalue: any = [...this.devices];
        for(let i = 0; i< returnvalue.length; i++){
          returnvalue[i].type ='amazon-echo-device'; 
          callback(returnvalue[i]);
        }
      }
    },
    log:{
        error: (error:string)=>{console.log("error");console.log(error);},
        info: (info:string)=>{console.log("info");console.log(info);}
    }
    
    }
  } 

  async onApplicationBootstrap() {
    this.amazonEcho = amazonEcho(this.RED);
  }
  generateId() {//@node-red/util/lib/util.js
    return (1+Math.random()*4294967295).toString(16);
}
}
