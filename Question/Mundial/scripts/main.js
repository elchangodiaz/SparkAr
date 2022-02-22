import { match } from 'assert';
import { fstat } from 'fs';
import { prependListener } from 'process';

//REQUIRED MODULES
const Scene = require('Scene');
const CameraInfo = require('CameraInfo');
const Reactive = require('Reactive');
const Diagnostics = require('Diagnostics');
const Patches = require('Patches'); // To exchange data between to Patch Editor and Script
const Time = require('Time');
const FaceTracking2D = require('FaceTracking2D');
const FaceTracking = require('FaceTracking');
// const {equipos} = require('./json.js');
const {fechas} = require('./json.js');

// CONSTANTS
const y = true;
const n = false;
const delay = 1200;

//DATABSE SIMULATION
const c0 = new Map();
c0.set(0, "humano");c0.set(1, "animado");c0.set(2, "mascota");c0.set(3, "verde");c0.set(4, "inventor");c0.set(5, "Deportista");


//Enable async
(async function () {

  //SCENE OBJECTS
  const [face2D, faceTracker, questionTxt, recording, sendTrue, sendFalse ] = await Promise.all([
    FaceTracking2D.face(0),
    FaceTracking.face(0),
    Scene.root.findFirst('questionTxt'),
    Patches.outputs.getBoolean("recording"),
    Patches.outputs.getPulse("sendTrue"),
    Patches.outputs.getPulse("sendFalse")
  ]);

  //SETUP
  var posX = face2D.boundingBox.x;
  var posY = face2D.boundingBox.y;
  questionTxt.text = 'Quiniela Quatar 2022';
  questionTxt.height = 100;
  questionTxt.width = 250;
  Diagnostics.watch("face x: ", posX);
  Diagnostics.watch("face y: ", posY);
  let i = 0;
  let j = 0;
  
  let eleccion = [];
  const fifaDate = new Date();

 //START RECORDING FUNCTION
  // recording.monitor().subscribe(function(recordingEvent){
  //   if(recordingEvent.newValue){
      Time.setTimeout(starFilter, delay);
  //  }
  // });
 
  function starFilter(){

    var firstRound = getTeams();
    questionTxt.text = firstRound[0] + "    -    " + firstRound[1];   
    Diagnostics.watch("i : ", i);

    //Send Message to everyone: 0 == UP
    sendTrue.subscribe( function(e) {
      getTrueFalse(true);
    });

    //Send Message to everyone: 1 == DOWN
    sendFalse.subscribe( function(e) {
      getTrueFalse(false);
    });

  }

  function getDate(){
    var dateGame = fifaDate.getDate() + "." + fifaDate.getMonth();
    //var dateGame = fifaDate.getTime();
    //Diagnostics.log("getDate " + dateGame.toString())
    //return dateGame;
    return "22/5";
  }

  function getGames(){
    var todayGame = getDate();
    Diagnostics.log(todayGame.toString());
    for(i=0; i<15; i++){
      if((fechas["fecha_" + i].dia) == todayGame){
        Diagnostics.log("getGames " + fechas["fecha_" + i].juegos)
        return fechas["fecha_" + i].juegos; 
      }
    }
    if(todayGame < (fechas["fecha_0"].dia)){
      Diagnostics.log("getGames " + fechas["fecha_0"].juegos)
      return fechas["fecha_0"].juegos; 
    }
    if(todayGame > (fechas["fecha_14"].dia)){
      Diagnostics.log("************ " + fechas["fecha_14"].dia)
      Diagnostics.log("getGames " + fechas["fecha_14"].juegos)
      return fechas["fecha_14"].juegos; 
    }
  }

  function getTeams(){
    var games = getGames();
    var arr = [];
    var teams = [];
    for(i=0; i<games.length; i++){
      let arr = games[i].split("-");
      for(j=0; j<2; j++){
        teams.push(arr[j]);
      }
    }
    Diagnostics.log("teams " + teams);
    return teams;
  }

  function getTrueFalse(b){
    if(b){
      Diagnostics.log('Elegi TRUE');
      eleccion.push(true);
      i++;
      changeMessage(i);
    }
    else{
      Diagnostics.log('Elegi FALSE');
      eleccion.push(false);
      i++;
      changeMessage(i);
    }
  }

  //FUINCTION MESSAGE
  function changeMessage(i){
    if(i<5){
    questionTxt.text = 'Es ' + c0.get(i) + '?';   
    Diagnostics.watch("i : ", i);
    } else if(i=5 & i<6){
      const song = getElecction(eleccion.toString());
      questionTxt.text = 'Pensaste en ' + song + '?';
      Diagnostics.log('RESULTADO');
      Diagnostics.log(eleccion.toString());
    }
  }

    function getElecction(eleccionS){
        for(let i=1; i<33; i++){
          if(dataJson["cancion_" + i].eleccion == eleccionS)
            return dataJson["cancion_" + i].title;
        }   
    }

})(); 
