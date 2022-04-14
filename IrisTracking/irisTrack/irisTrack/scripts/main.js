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
const Reactive = require('Reactive');


export const Diagnostics = require('Diagnostics');

let status = 'ready';
let intervalTimer = null;
let randomNum;
let i;
let j = 0;
let level = 0;
const delay = 1000;
let imgSel;
let eyesWatched;

let leftEye;
let rightEye;

(async function () { 

  const [face,indicatorPlane, ojoDPlane, ojoIPlane, miraCImg, miraUImg, miraURImg, miraULImg, 
         miraDImg, miraDLImg, miraDRImg, miraLImg, miraRImg, repiteMovImg, displayMat, tap] = await Promise.all([
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
    Textures.findFirst('RepiteMov'),
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
    //Diagnostics.log(status);
    startGame();
  }

  function startGame(){
    setImgCenter();
    startLevel();
  }

  function startLevel(){
    if(level==0 || imgs.length<level){
      upLevel();
    }
    for(i=0;i<level;i++){
      Time.setTimeout(setImage, delay*(i*2));
      Time.setTimeout(setImgCenter, delay*(i+i+1));
    }
    Time.setTimeout(stop, delay*((level-1)*2));
  }

  function upLevel(){
    level++
    //Diagnostics.log("level: " + level);
    return level;
  }

  function setImage(){
    randomNum = getRandomInt(0, imgs.length);
    imgSel = imgs[randomNum];
    setMaterial();
    setSequence();
    removeElement(randomNum);
  }

  function setImgCenter(){
    displayMat.diffuse = miraCImg;
    //Diagnostics.log("center");
  }

  function setImgRepite(){
    displayMat.diffuse = repiteMovImg;
  }

  function setMaterial(){
    displayMat.diffuse = imgSel;
    //Diagnostics.log(imgSel.name);
  }

  function setSequence(){
    sequence.push(imgs[randomNum]);
  }
  
  function stop(){
    //Time.setTimeout(setImgCenter, delay);
    status = 'finished';
    //Diagnostics.log(status);
    Time.setTimeout(setImgRepite, delay+1000);
    Time.setTimeout(watchEyes, delay);
    eyesWatched = watchEyes();
    Diagnostics.log("---------");
    
  }

  function watchEyes(){
      switch(sequence[j].name){
        case "MiraUImg":
          leftEyesPos();
          rightEyesPos();
          break;
        case "MiraDImg":
          leftEyesPos();
          rightEyesPos();
          break;  
        case "MiraRImg":
          leftEyesPos();
          rightEyesPos();
          break;
        case "MiraLImg":
          leftEyesPos();
          rightEyesPos();
          break;
        case "MiraURImg":
          leftEyesPos();
          rightEyesPos();
          break;
        case "MiraULImg":
          leftEyesPos();
          rightEyesPos();
          break;
        case "MiraDRImg":
          leftEyesPos();
          rightEyesPos();
          break;
        case "MiraDLImg":
          leftEyesPos();
          rightEyesPos();
          break;
        default:
          //Diagnostics.log("default");
          break;                
      }
      status = 'finished';
      Diagnostics.log(sequence[j].name);
  }
  

  function leftEyesPos(){
    if(eyeMovementLx.pinLastValue()<-0.030000 && eyeMovementLx.pinLastValue()>-0.035000 && eyeMovementLy.pinLastValue()>0.032000 && eyeMovementLy.pinLastValue()<0.035000){
      leftEye = "center";
      Diagnostics.log(leftEye);
    } else
    if(eyeMovementLx.pinLastValue()<-0.030000 && eyeMovementLx.pinLastValue()>-0.035000 && eyeMovementLy.pinLastValue()>0.036000){
      leftEye =  "up";
      Diagnostics.log(leftEye);
    } else
    if(eyeMovementLx.pinLastValue()<-0.030000 && eyeMovementLx.pinLastValue()>-0.035000 && eyeMovementLy.pinLastValue()<0.029000){
      leftEye =  "down";
      Diagnostics.log(leftEye);
    } else
    if(eyeMovementLx.pinLastValue()<-0.036000 && eyeMovementLy.pinLastValue()>0.030000 && eyeMovementLy.pinLastValue()<0.035000){
      leftEye =  "left";
      Diagnostics.log(leftEye);
    }else
    if(eyeMovementLx.pinLastValue()>-0.029000 && eyeMovementLy.pinLastValue()>0.032000 && eyeMovementLy.pinLastValue()<0.035000){
      leftEye =  "right";
      Diagnostics.log(leftEye);
    } else
    if(eyeMovementLx.pinLastValue()>-0.031500 && eyeMovementLy.pinLastValue()>0.036000){
      leftEye =  "upRight";
      Diagnostics.log(leftEye);
    } else
    if(eyeMovementLx.pinLastValue()<-0.036000 && eyeMovementLy.pinLastValue()>0.036000){
      leftEye =  "upLeft";
      Diagnostics.log(leftEye);
    } else
    if(eyeMovementLx.pinLastValue()>-0.029000 && eyeMovementLy.pinLastValue()<0.029000){
      leftEye =  "downRight";
      Diagnostics.log(leftEye);
    } else
    if(eyeMovementLx.pinLastValue()<-0.036000 && eyeMovementLy.pinLastValue()<0.029000){
      leftEye =  "downLeft";
      Diagnostics.log(leftEye);
    }else
    Diagnostics.log("no match");
  }


  function rightEyesPos(){
    if(eyeMovementRx.pinLastValue()>0.030000 && eyeMovementRx.pinLastValue()<0.035000 && eyeMovementRy.pinLastValue()>0.032000 && eyeMovementRy.pinLastValue()<0.035000){
      rightEye = "center";
      Diagnostics.log(rightEye.toString);
    } else
    if(eyeMovementRx.pinLastValue()>0.030000 && eyeMovementRx.pinLastValue()<0.035000 && eyeMovementRy.pinLastValue()>0.036000){
      rightEye = "up";
      Diagnostics.log(rightEye.toString);
    } else
    if(eyeMovementRx.pinLastValue()>0.030000 && eyeMovementRx.pinLastValue()<0.035000 && eyeMovementRy.pinLastValue()<0.029000){
      rightEye = "down";
      Diagnostics.log(rightEye.toString);
    } else
    if(eyeMovementRx.pinLastValue()<0.030000 && eyeMovementRy.pinLastValue()>0.030000 && eyeMovementRy.pinLastValue()<0.035000){
      rightEye = "left";
      Diagnostics.log(rightEye.toString);
    }else
    if(eyeMovementRx.pinLastValue()>0.036000 && eyeMovementRy.pinLastValue()>0.032000 && eyeMovementRy.pinLastValue()<0.035000){
      rightEye = "right";
      Diagnostics.log(rightEye.toString);
    } else
    if(eyeMovementRx.pinLastValue()>0.034000 && eyeMovementRy.pinLastValue()>0.036000){
      rightEye = "upRight";
      Diagnostics.log(rightEye.toString);
    } else
    if(eyeMovementRx.pinLastValue()<0.028000 && eyeMovementRy.pinLastValue()>0.036000){
      rightEye = "upLeft";
      Diagnostics.log(rightEye.toString);
    } else
    if(eyeMovementRx.pinLastValue()>0.036000 && eyeMovementRy.pinLastValue()<0.029000){
      rightEye = "downRight";
      Diagnostics.log(rightEye.toString);
    } else
    if(eyeMovementRx.pinLastValue()<0.039000 && eyeMovementRy.pinLastValue()<0.029000){
      rightEye = "downLeft";
      Diagnostics.log(rightEye.toString);
    } else
    Diagnostics.log("no match");
  }

  // const eyeMovementLx = leftEyeball.iris.x;
  // const eyeMovementRx = rightEyeball.iris.x;
  // const eyeMovementLy = leftEyeball.iris.y;
  // const eyeMovementRy = rightEyeball.iris.y;



  
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
    
    //D         Lx=-0.034382, Ly=0.027386, Rx=0.034028, Ry=0.026945
    //          Lx=-0.033525, Ly=0.026900, Rx=0.033840, Ry=0.027389


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
        //Diagnostics.log("eliminacion");
        imgs.splice(i,1);
      }
    }
  }


})(); 
