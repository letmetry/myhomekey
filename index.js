"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const wsServer = require('ws').Server;
var speech, response, sourceURL, responseObj; 
var arrayOfdevices = [], jsonOfdevices ={"mem_ID":"","state": "on","location": "master_bedroom","device": "light","media": "DF","query": "","Time":""};
const app = express();


function json2json(serverjson){
    for(var jsonkey in serverjson){
      if(jsonOfdevices[jsonkey]){
        jsonOfdevices[jsonkey] = serverjson[jsonkey]
      };
    };
    jsonOfdevices["c"]= Math.floor(Date.now()/1000)
};

function json2array(jsonData){
    var arrayObj = [];
    for(var jsonObj in jsonData) arrayObj.push(jsonData[jsonObj]);
    return arrayObj;
};

function searchIn(Searchwithin,searchLocation,searchLocationArrayID, searchDevice,searchDeviceArrayID){
    found = Searchwithin.find((elements)=>{ if((elements[searchLocationArrayID]==searchLocation)&&(elements[searchDeviceArrayID]==searchDevice))return elements[0]});
    if(found) return found;
    else return -1;
};

function searchIndex(Searchwithin,searchLocation,searchLocationArrayID, searchDevice,searchDeviceArrayID){
    for(var i=0;i<Searchwithin.length;i++){
        if((Searchwithin[i][searchLocationArrayID]==searchLocation)&&(Searchwithin[i][searchDeviceArrayID]==searchDevice)){
            return i;
        };
    };
};

function array2json(arrayObj,jsonObj){
    var count = 0;
    for(var jsonkey in jsonObj){
       jsonObj[jsonkey] = arrayObj[count];
        ++count;
    };
    return jsonObj;
};

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.post('/df', (req, res)=> {
  //var speech = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.media ? req.body.queryResult.parameters.location : 'Seems like some problem. Speak again.';
  speech = req.body && req.body.queryResult.parameters ? req.body.queryResult.parameters.location : 'Seems like some problem. Speak again.';
  console.log(JSON.stringify(req.body.queryResult.parameters));
  response = 'response is ' + speech;
  sourceURL = '';
  responseObj = {
                      "fulfillmentText": response
                      ,"fulfillmentMessages": [{"text" : { "text" : [response] }}]
                      ,"source": sourceURL
                    };
  return res.json(responseObj);
});

app.post('/client', (req, res)=> {// MCU request
    let clientJson = req;
    console.log(JSON.stringify(clientJson));
  responseObj = {
                      "fulfillmentText": response
                      ,"fulfillmentMessages": [{"text" : { "text" : [response] }}]
                      ,"source": sourceURL
                    };
  return res.json(responseObj);    
});

app.post('/papp', (req, res)=> {//portable device app request
    let pappJson = req;
    console.log(JSON.stringify(pappJson));
  responseObj = {
                      "fulfillmentText": response
                      ,"fulfillmentMessages": [{"text" : { "text" : [response] }}]
                      ,"source": sourceURL
                    };
  return res.json(responseObj);    
});


var port = process.env.PORT || 8000;
const server = app.listen(port, () =>{
  console.log(`Heroku server up and listening on port ${port}`);
});

const io = new wsServer({server});
io.on('connection',(ws)=>{
   console.log('socket is connected');
   ws.on('close',()=>{console.log('socket is disconnected');});
});
