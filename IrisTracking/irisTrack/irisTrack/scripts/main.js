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
const Audio = require('Audio');


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
let isLooking = false;
let lookingUp = false;
let lookingDown = false;
let lookingLeft = false;
let lookingRight = false;
let lookingCenterX = false;
let lookingCenterY = false;

let leftEye;
let rightEye;

(async function () { 

  const [face,indicatorPlane, ojoDPlane, ojoIPlane, miraCImg, miraUImg, miraURImg, miraULImg, 
         miraDImg, miraDLImg, miraDRImg, miraLImg, miraRImg, repiteMovImg, displayMat, tap,
        correctAudio, incorrectAudio] = await Promise.all([
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
    Patches.outputs.getPulse('tap'),
    Audio.getAudioPlaybackController('correctController'),
    Audio.getAudioPlaybackController('incorrectController')
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

  Diagnostics.watch("LeyeMovex", eyeMovementLx);
  Diagnostics.watch("LeyeMovey", eyeMovementLy);
  Diagnostics.watch("ReyeMovex", eyeMovementRx);
  Diagnostics.watch("ReyeMovey", eyeMovementRy);
  Diagnostics.watch("isLooking ", isLooking);
  Diagnostics.watch("up: " , lookingUp);
  Diagnostics.watch("down: " , lookingDown);
  Diagnostics.watch("left: " , lookingLeft);
  Diagnostics.watch("right: " , lookingRight);
  Diagnostics.watch("centerx: " , lookingCenterX);
  Diagnostics.watch("centery: " , lookingCenterY);


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
    return level;
  }

  function setImage(){
    randomNum = getRandomInt(0, imgs.length);
    imgSel = imgs[randomNum];
    setMaterial();
    setSequence(randomNum);
    removeElement(randomNum);
  }

  function setSequence(ranNum){
    sequence.push(imgs[ranNum]);
  }
  
  function stop(){
    Time.setTimeout(setImgRepite, delay+1000);
    Time.setTimeout(watchEyes, delay+2000);
  }

  function watchEyes(){
    let selection = sequence[j].name;
    Diagnostics.log(selection);
      switch(selection){
        case "MiraUImg":
          isLooking = Reactive.and(lookUp(), lookCenterX()).monitor().subscribe(function (lookGoodUp){
            correctLook();
          });
          break;
        case "MiraDImg":
          isLooking = Reactive.and(lookDown(), lookCenterX()).monitor().subscribe(function (lookGoodDown){
            correctLook();
          });
          break;  
        case "MiraRImg":
          isLooking = Reactive.and(lookRigt(), lookCenterY()).monitor().subscribe(function (lookGoodRight){
            correctLook();
          });
          break;
        case "MiraLImg":
          isLooking = Reactive.and(lookLeft(), lookCenterY()).monitor().subscribe(function (lookGoodLeft){
            correctLook();
          });
          break;
        case "MiraURImg":
          isLooking = Reactive.and(lookUp(), lookRigt()).monitor().subscribe(function (lookGoodUpR){
            correctLook();
          });
          break;
        case "MiraULImg":
          isLooking = Reactive.and(lookUp(), lookLeft()).monitor().subscribe(function (lookGoodUpL){
            correctLook();
          });
          break;
        case "MiraDRImg":
          isLooking = Reactive.and(lookDown(), lookRigt()).monitor().subscribe(function (lookGoodDownR){
            correctLook();
          });
          break;
        case "MiraDLImg":
          isLooking = Reactive.and(lookDown(), lookLeft()).monitor().subscribe(function (lookGoodDownL){
            correctLook();
          });
          break;
        default:
          break;                
      }
      Diagnostics.log("fin");
  }

  function correctLook(){
    correctAudio.setPlaying(true);
    correctAudio.reset();
    lightOn();
    Time.setTimeout(lightOff, 1500);
    clearSequence();
    isLooking.unsubscribe();
    if(j<sequence.length){
      watchEyes();
    }
    if(sequence.length===0){
      Time.setTimeout(reset,2000);
    }
  }


  function lookUp(){
    lookingUp = Reactive.and(eyeMovementLy.ge(0.036000), eyeMovementRy.ge(0.036000));
    return lookingUp;
  }

  function lookDown(){
    lookingDown = Reactive.and(eyeMovementLy.le(0.03300), eyeMovementRy.le(0.03300));
    return lookingDown;
  }

  function lookLeft(){
    lookingLeft = Reactive.and(eyeMovementLx.le(-0.036000), eyeMovementRx.le(0.030000));
    return lookingLeft;
  }

  function lookRigt(){
    lookingRight = Reactive.and(eyeMovementLx.ge(-0.029000), eyeMovementRx.ge(0.036000));
    return lookingRight;
  }

  function lookCenterX(){
    lookingCenterX = Reactive.and(eyeMovementLx.le(-0.030000), eyeMovementLx.ge(-0.035000), eyeMovementRx.ge(0.030000), eyeMovementRx.le(0.035000));
    return lookingCenterX;  
  }

  function lookCenterY(){
    lookingCenterY = Reactive.and(eyeMovementLy.ge(0.033000), eyeMovementLy.le(0.035500), eyeMovementRy.ge(0.033000), eyeMovementRy.le(0.035500));
    return lookingCenterY;  
  }
  
  function setImgCenter(){
    displayMat.diffuse = miraCImg;
  }

  function setImgRepite(){
    displayMat.diffuse = repiteMovImg;
  }

  function setMaterial(){
    displayMat.diffuse = imgSel;
  }

  function lightOff(){
    Patches.inputs.setBoolean('flash', false);
  }

  function lightOn(){
    Patches.inputs.setBoolean('flash', true);
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
        imgs.splice(i,1);
      }
    }
  }

    
  function clearSequence(){
    sequence.shift();    
  }


})(); 
