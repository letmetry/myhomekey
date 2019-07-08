"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const wsServer = require('ws').Server;
var speech, response, sourceURL, responseObj; 
var arrayOfdevices = [], jsonOfdevices = {"deviceid":"xxxxxxx","location":"aaaaaaaaaaa","locserial":"qqqqqqqqqqqqq","strlocalIP":"xxx.yyy.zzz.111","State":"off"};
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
    console.log("HTTP POST: " + JSON.stringify(clientJson));
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

app.get('/', function (req, res) {
    res.send(`

<style>
body { 
  background-color: #DDDDDD; 
  font: 30px sans-serif; 
  height: 350px;
  background: url(http://media.giphy.com/media/Jrd9E2kuPuOYM/giphy.gif) 50%;
}

#maintext {
  color: #A7DD3C;
  text-shadow: 2px 0 0px #800040, 
    3px 2px 0px rgba(77,0,38,0.5),
    3px 0 3px #FF002B, 5px 0 3px #800015, 
    6px 2px 3px rgba(77,0,13,0.5), 
    6px 0 9px #FF5500, 
    8px 0 9px #802A00, 
    9px 2px 9px rgba(77,25,0,0.5), 
    9px 0 18px #FFD500, 
    11px 0 18px #806A00, 
    12px 2px 18px rgba(77,66,0,0.5), 
    12px 0 30px #D4FF00, 
    14px 0 30px #6A8000, 
    15px 2px 30px rgba(64,77,0,0.5), 
    15px 0 45px #80FF00, 
    17px 0 45px #408000, 
    17px 2px 45px rgba(38,77,0,0.5);
  color: #A7DD3C;
  text-align: center;
  font-family: Impact, Charcoal, sans-serif;
  font-size: 70px;
  letter-spacing: 5.2px;
  word-spacing: 5.2px;
  font-weight: 800;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
}

.ball-wrapper {
    position: fixed;
    width: 120px;
    height: 300px;
    margin-left: -60px;
    left: 50%;
    top: 20%;
}

.ball {
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 70px;
    background: -webkit-linear-gradient(top,  rgba(187,187,187,1) 0%,rgba(119,119,119,1) 99%);
    background: -moz-linear-gradient(top,  rgba(187,187,187,1) 0%,rgba(119,119,119,1) 99%);
    background: linear-gradient(top,  rgba(187,187,187,1) 0%,rgba(119,119,119,1) 99%);
    box-shadow: inset 0 -5px 15px rgba(255,255,255,0.4), inset -2px -1px 40px rgba(0,0,0,0.4), 0 0 1px #000;
    -webkit-animation: jump 1s infinite;
    -moz-animation: jump 1s infinite;
    animation: jump 1s infinite;
}

.ball::after {
    content: "";
    position: absolute;
    width: 60px;
    height: 30px;
    border-radius: 40px / 20px;
    left: 30px;
    top: 10px;
    background: -webkit-linear-gradient(top,  rgba(232,232,232,1) 0%,rgba(232,232,232,1) 1%,rgba(255,255,255,0) 100%);
    background: -moz-linear-gradient(top,  rgba(232,232,232,1) 0%,rgba(232,232,232,1) 1%,rgba(255,255,255,0) 100%);
    background: linear-gradient(top,  rgba(232,232,232,1) 0%,rgba(232,232,232,1) 1%,rgba(255,255,255,0) 100%);
}

.ball-shadow {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 50px;
    height: 65px;
    border-radius: 30px / 40px;
    margin-left: -25px;
    background: rgba(20, 20, 20, 0.1);
    box-shadow: 0px 0 20px 35px rgba(20,20,20,.1);
    -webkit-transform: scaleY(0.3);
    -moz-transform: scaleY(0.3);
    transform: scaleY(0.3);
    -webkit-animation: shrink 1s infinite;
    -moz-animation: shrink 1s infinite;
    animation: shrink 1s infinite;
}

/**
 *	animation
 */

@-webkit-keyframes jump {
    0% {
	top: 0;
	-webkit-animation-timing-function: ease-in;
    }
    40% {}
    50% {
	top: 140px;
	height: 120px;
	-webkit-animtion-timing-function: ease-out;
    }
    55% {
	top: 160px;
	height: 100px;
	border-radius: 70px/60px;
	-webkit-animation-timing-function: ease-in;
    }
    65% {
	top: 110px;
	height: 120px;
	border-radius: 50%;
	-webkit-animation-timing-function: ease-out;
    }
    95% {
	top: 0;
	-webkit-animation-timing-function: ease-in;
    }
    100% {
	top: 0;
	-webkit-animation-timing-function: ease-in;
    }
}

@-moz-keyframes jump {
    0% {
	top: 0;
	-moz-animation-timing-function: ease-in;
    }
    40% {}
    50% {
	top: 140px;
	height: 120px;
	-moz-animtion-timing-function: ease-out;
    }
    55% {
	top: 160px;
	height: 100px;
	border-radius: 70px/60px;
	-moz-animation-timing-function: ease-in;
    }
    65% {
	top: 110px;
	height: 120px;
	border-radius: 50%;
	-moz-animation-timing-function: ease-out;
    }
    95% {
	top: 0;
	-moz-animation-timing-function: ease-in;
    }
    100% {
	top: 0;
	-moz-animation-timing-function: ease-in;
    }
}


@-webkit-keyframes shrink {
    0% {
	bottom: 0;
	margin-left: -30px;
	width: 60px;
	height: 75px;
	background: rgba(20, 20, 20, .1);
	box-shadow: 0px 0 20px 35px rgba(20,20,20,.1);
	border-radius: 30px / 40px;
	-webkit-animation-timing-function: ease-in;
    }
    50% {
	bottom: 30px;
	margin-left: -10px;
	width: 20px;
	height: 5px;
	background: rgba(20, 20, 20, .3);
	box-shadow: 0px 0 20px 35px rgba(20,20,20,.3);
	border-radius: 20px / 20px;
	-webkit-animation-timing-function: ease-out;
    }
    100% {
	bottom: 0;
	margin-left: -30px;
	width: 60px;
	height: 75px;
	background: rgba(20, 20, 20, .1);
	box-shadow: 0px 0 20px 35px rgba(20,20,20,.1);
	border-radius: 30px / 40px;
	-webkit-animation-timing-function: ease-in;
    }
}
@-moz-keyframes shrink {
    0% {
	bottom: 0;
	margin-left: -30px;
	width: 60px;
	height: 75px;
	background: rgba(20, 20, 20, .1);
	box-shadow: 0px 0 20px 35px rgba(20,20,20,.1);
	border-radius: 30px / 40px;
	-moz-animation-timing-function: ease-in;
    }
    50% {
	bottom: 30px;
	margin-left: -10px;
	width: 20px;
	height: 5px;
	background: rgba(20, 20, 20, .3);
	box-shadow: 0px 0 20px 35px rgba(20,20,20,.3);
	border-radius: 20px / 20px;
	-moz-animation-timing-function: ease-out;
    }
    100% {
	bottom: 0;
	margin-left: -30px;
	width: 60px;
	height: 75px;
	background: rgba(20, 20, 20, .1);
	box-shadow: 0px 0 20px 35px rgba(20,20,20,.1);
	border-radius: 30px / 40px;
	-moz-animation-timing-function: ease-in;
    }
    }

     </style>
<div id="maintext">MOMIZ CLOUD</div>
<div class="ball-wrapper">
    <div class="ball"></div>
    <div class="ball-shadow"></div>
</div>
`);
});


var port = process.env.PORT || 8000;
const server = app.listen(port, () =>{
  console.log(`Heroku server up and listening on port ${port}`);
});

const io = new wsServer({server});
io.on('connection',(ws)=>{
   	console.log('HWS socket is connected');
   	ws.on('close',()=>{console.log('HWS socket is disconnected');});
 	ws.on('message',(message)=>{
   		console.log('received:', message.trim());
		try {
    			jsonOfdevices = JSON.parse(message.trim());
		} catch (e) {
    			console.log("not JSON");
		}
		console.log("Stringify Json object: ",JSON.stringify(jsonOfdevices));
		for(var keyofjson in jsonOfdevices){
			console.log('Show keys value: ', jsonOfdevices[keyofjson]);
		}
	});
});

io.on('open',(ws)=>{
   ws.send("HWS Heroku sending data");
});

io.on('message',(message)=>{
   console.log("WS Receive: "+ message);
});

io.on('data',(data)=>{
   console.log("WS Receive: "+ data);
});

setInterval(() => {
  		io.clients.forEach((client) => {client.send(`{"heartbeat":"keepalive"}`);});
		}, 3000);
