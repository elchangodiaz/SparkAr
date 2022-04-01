import { leftEyeball } from 'IrisTracking';
import TimeModule from 'Time';

//REGLAS
/*
EL juego solicitara en su primer nivel hacer un movimiento a la vez
en el segundo nivel te solicitara realizar 2 movimientos, regresando al centro entre cada uno
y asi hasta llegar a 5
Los movimientos seran aleatorios sin poder repetirse entre ellos
la instruccion se mostrara al inicio y emitira el sonido de cada movimiento
en caso de acierto emitira sonido exito
en caso de fallar un movimiento se repetira la secuencia a realizar y se indicara el fallo
*/


const Scene = require('Scene');
const FaceTracking = require('FaceTracking');
const IrisTracking = require('IrisTracking');
const Materials = require('Materials');
const Textures = require('Textures');
const Instruction = require('Instruction');
const Patches = require('Patches');
const Time = require('Time');


export const Diagnostics = require('Diagnostics');

let status = 'ready';
let intervalTimer = null;
let randomNum;
let i;
let j;
let level = 0;
const delay = 1000;
let imgSel;

(async function () { 

  const [face,indicatorPlane, ojoDPlane, ojoIPlane, miraCImg, miraUImg, miraURImg, miraULImg, 
         miraDImg, miraDLImg, miraDRImg, miraLImg, miraRImg, displayMat, tap] = await Promise.all([
    FaceTracking.face(0),
    Scene.root.findFirst('indicator'),
    Scene.root.findFirst('ojoD'),
    Scene.root.findFirst('ojoI'),
    Textures.findFirst('MiraCImg'),
    Textures.findFirst('MiraUImg'),
    Textures.findFirst('MiraURImg'),
    Textures.findFirst('MiraULImg'),
    Textures.findFirst('MiraDImg'),
    Textures.findFirst('MiraDLImg'),
    Textures.findFirst('MiraDRImg'),
    Textures.findFirst('MiraLImg'),
    Textures.findFirst('MiraRImg'),
    Materials.findFirst('displayMat'),
    Patches.outputs.getPulse('tap')
  ]);
  
  const imgs = [miraUImg, miraURImg, miraULImg, miraDImg, miraDLImg, miraDRImg, 
                miraLImg, miraRImg];

  let sequence = [];

  const leftEyeball = IrisTracking.leftEyeball(face);
  const rightEyeball = IrisTracking.rightEyeball(face);

  const ojoDPlaneTransform = ojoDPlane.transform;
  const ojoIPlaneTransform = ojoIPlane.transform;

  const leftEyeballIris = leftEyeball.iris;
  
  const rightEyeballIris = rightEyeball.iris;

  ojoDPlaneTransform.x = rightEyeballIris.x;
  ojoDPlaneTransform.y = rightEyeballIris.y;
  ojoDPlaneTransform.z = rightEyeballIris.z;

  ojoIPlaneTransform.x = leftEyeballIris.x;
  ojoIPlaneTransform.y = leftEyeballIris.y; 
  ojoIPlaneTransform.z = leftEyeballIris.z;

  //setear el centro en la cara restando la posicion de ojo.x

  const eyeMovementLx = leftEyeball.iris.x;
  const eyeMovementRx = rightEyeball.iris.x;
  const eyeMovementLy = leftEyeball.iris.y;
  const eyeMovementRy = rightEyeball.iris.y;

  
    //rightball iris
    //center    Lx=-0.033478, Ly=0.033862, Rx=0.034036, Ry=0.028769
    //          Lx=-0.033112, Ly=0.033311, Rx=0.033741, Ry=0.030371

    //LD        Lx=-0.037807, Ly=0.032257, Rx=0.030798, Ry=0.030726
    //          Lx=-0.038351, Ly=0.030807, Rx=0.030726, Ry=0.031211

    //left      Lx=-0.040521, Ly=0.033379, Rx=0.027800, Ry=0.032135 
    //          Lx=-0.040590, Ly=0.032872, Rx=0.028199, Ry=0.031895

    //LUp       Lx=-0.041943, Ly=0.034708, Rx=0.026362, Ry=0.037497 
    //          Lx=-0.042595, Ly=0.036026, Rx=0.026001, Ry=0.038107
    
    //UP        Lx=-0.034335, Ly=0.038400, Rx=0.035107, Ry=0.039782 
    //          Lx=-0.034325, Ly=0.039331, Rx=0.034447, Ry=0.041007

    //RUp       Lx=-0.027771, Ly=0.037121, Rx=0.041424, Ry=0.038363 
    //          Lx=-0.026662, Ly=0.036668, Rx=0.041276, Ry=0.037236

    //R         Lx=-0.027593, Ly=0.032998, Rx=0.039267, Ry=0.031879 
    //          Lx=-0.026632, Ly=0.034631, Rx=0.039550, Ry=0.032752

    //RD        Lx=-0.028621, Ly=0.033784, Rx=0.038274, Ry=0.031781 
    //          Lx=-0.029477, Ly=0.031880, Rx=0.037675, Ry=0.030304
    
    //D         Lx=-0.034382, Ly=0.032926, Rx=0.034028, Ry=0.030991 
    //          Lx=-0.033525, Ly=0.033279, Rx=0.033840, Ry=0.031131

  Diagnostics.watch("LeyeMovex", eyeMovementLx);
  Diagnostics.watch("LeyeMovey", eyeMovementLy);
  Diagnostics.watch("ReyeMovex", eyeMovementRx);
  Diagnostics.watch("ReyeMovey", eyeMovementRy);

  Instruction.bind(true, 'tap_to_start');

  tap.subscribe(function (e){
    if(status === 'ready'){
      starFilter();
    } else
    if(status === 'running'){
      return;
    }else 
    if(status === 'finished'){
      reset();
    }
  })

  function starFilter(){
    status = 'running';
    Diagnostics.log(status);
    startGame();
  }

  function startGame(){
    startLevel();
    
  }

  function startLevel(){
    upLevel();
    for(i=0;i<level;i++){
      Time.setTimeout(setImage, delay*(i+1));
    }
    Time.setTimeout(stop, delay*level);
  }

  function upLevel(){
    level++
    Diagnostics.log("level: " + level);
    return level;
  }

  function setImage(){
    randomNum = getRandomInt(0, imgs.length);
    imgSel = imgs[randomNum];
    setMaterial();
    setSequence();
  }

  function setImgCenter(){
    displayMat.diffuse = miraCImg;
  }

  function setMaterial(){
    displayMat.diffuse = imgSel;
    Diagnostics.log(imgSel.name);
  }

  function setSequence(){
    sequence.push(imgs[randomNum]);
  }
  
  function stop(){
    Time.setTimeout(setImgCenter, delay);
    status = 'finished';
    Diagnostics.log(status);
  }

  function reset(){
    status = 'ready';
  };

  function getRandomInt(min, max) {
    min = 0;
    if(imgs.length===0){
      imgs.push(miraUImg, miraURImg, miraULImg, miraDImg, miraDLImg, miraDRImg, 
        miraLImg, miraRImg);
    }
    max = imgs.length;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function removeElement(e){
    for(i=0;i<imgs.length;i++){
      if(imgs[i]===imgs[e]){
        Diagnostics.log("eliminacion");
        imgs.splice(i,1);
      }
    }
  }


})(); 
