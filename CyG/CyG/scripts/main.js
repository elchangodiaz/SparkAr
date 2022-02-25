import { resolveTxt } from 'dns';
import { random } from 'Random';

const Scene = require('Scene');
const Time = require('Time');
const Animation = require('Animation');
const Random = require('Random');
const Patches = require('Patches');
const Instruction = require('Instruction');
const Materials = require('Materials');
const Textures = require('Textures')
const FaceTracking = require('FaceTracking');
const FaceGestures = require('FaceGestures');


export const Diagnostics = require('Diagnostics');

let randInterval = null;
let status = 'ready';
let randomNum;

(async function () {  // Enables async/await in JS [part 1]

  const [display,smileImg,kissImg,closeEyeRImg,closeEyeLImg,openMouthImg,tongueImg,title,tap,face,stick] = await Promise.all([
    Materials.findFirst('display'),
    Textures.findFirst('smileImg'),
    Textures.findFirst('kissImg'),
    Textures.findFirst('closeEyeRImg'),
    Textures.findFirst('closeEyeLImg'),
    Textures.findFirst('openMouthImg'),
    Textures.findFirst('tongueImg'),
    Textures.findFirst('titulo'),
    Patches.outputs.getPulse('tap'),
    FaceTracking.face(0),
    Scene.root.findFirst('stick')
  ]);
  
  const imgs = [smileImg, kissImg, closeEyeRImg, closeEyeLImg, openMouthImg, tongueImg];

  const lEye = FaceGestures.hasLeftEyeClosed(face);
  const rEye = FaceGestures.hasRightEyeClosed(face);
  const mouth = FaceGestures.hasMouthOpen(face);
  const smile = FaceGestures.isSmiling(face);
  const kiss = FaceGestures.isKissing(face);
  const surprised = FaceGestures.isSurprised(face);

  Diagnostics.watch("Mouth: ", mouth);
  Diagnostics.watch("Smile: ", smile)
  Diagnostics.watch("Kiss: ", kiss);
  Diagnostics.watch("R Eye: ", rEye);
  Diagnostics.watch("L Eye: ", lEye);
  Diagnostics.watch("Surpriced: ", surprised);

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
    randInterval = Time.setInterval(function(){
      loopAnim();
      Diagnostics.log(randomNum);
    },100);
    beginCountDown();
  }

  function loopAnim(){
    randomNum = getRandomInt(0, imgs.length);
    let imgSel = imgs[randomNum];
    display.diffuse = imgSel;
  }

  function beginCountDown(){
    Time.setTimeout(function(){
      stop();
    }, 3000);
  };
  
  function stop(){
    Time.clearInterval(randInterval);
    doFace();
    status = 'finished';
    Diagnostics.log(status);
  }

  function doFace(){
    Diagnostics.log("make gesture");
    Diagnostics.log(randomNum);
    switch (imgs[randomNum]){
      case imgs[0]:
        Patches.inputs.setBoolean('stickVisible', smile);
        break;
      case imgs[1]:
        Patches.inputs.setBoolean('stickVisible', kiss);
        break;
      case imgs[2]:
        Patches.inputs.setBoolean('stickVisible', rEye);
        break;
      case imgs[3]:
        Patches.inputs.setBoolean('stickVisible', lEye);
        break;
      case imgs[4]:
        Patches.inputs.setBoolean('stickVisible', surprised);
        break;
      case imgs[5]:
        Patches.inputs.setBoolean('stickVisible', mouth);
        break;
      default:
        Diagnostics.log("default");
        break;                  
    }
    Instruction.bind(true, 'tap_to_reply')
  }

  function reset(){
    Instruction.bind(true, 'tap_to_start');
    display.diffuse = title;
    status = 'ready';
  };

  function getRandomInt(min, max) {
    min = 0;
    max = imgs.length;
    return Math.floor(Math.random() * (max - min)) + min;
}
  
})(); // Enables async/await in JS [part 2]
