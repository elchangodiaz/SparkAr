import { resolveTxt } from 'dns';
import { random } from 'Random';

const Scene = require('Scene');
const Time = require('Time');
const Patches = require('Patches');
const Instruction = require('Instruction');
const Materials = require('Materials');
const Textures = require('Textures')
const FaceTracking = require('FaceTracking');
const FaceGestures = require('FaceGestures');
const Audio = require('Audio');


export const Diagnostics = require('Diagnostics');

let randInterval = null;
let status = 'ready';
let randomNum;
const delay = 10;

(async function () {  // Enables async/await in JS [part 1]

  const [display,smileImg,kissImg,closeEyeRImg,closeEyeLImg,openMouthImg,tongueImg,eyebrowsFImg,title,tap,face,inicioAudio,smileAudio,kissAudio,rEyeAudio,
        lEyeAudio,surpricedAudio,tongueAudio,eyebrowsFAudio,eyebrowsRisedAudio] = await Promise.all([
    Materials.findFirst('display'),
    Textures.findFirst('smileImg'),
    Textures.findFirst('kissImg'),
    Textures.findFirst('closeEyeRImg'),
    Textures.findFirst('closeEyeLImg'),
    Textures.findFirst('openMouthImg'),
    Textures.findFirst('tongueImg'),
    Textures.findFirst('fruncirCeño'),
    Textures.findFirst('titulo'),
    Patches.outputs.getPulse('tap'),
    FaceTracking.face(0),
    Audio.getAudioPlaybackController('inicioController'),
    Audio.getAudioPlaybackController('sonrisaController'),
    Audio.getAudioPlaybackController('besoController'),
    Audio.getAudioPlaybackController('ojoDController'),
    Audio.getAudioPlaybackController('ojoIController'),
    Audio.getAudioPlaybackController('sorpresaController'),
    Audio.getAudioPlaybackController('lenguaController'),
    Audio.getAudioPlaybackController('fruncirCeñoController'),
    Audio.getAudioPlaybackController('alzarCejaController')
  ]);
  
  const imgs = [smileImg, kissImg, closeEyeRImg, closeEyeLImg, openMouthImg, tongueImg, eyebrowsFImg];

  const lEye = FaceGestures.hasLeftEyeClosed(face);
  const rEye = FaceGestures.hasRightEyeClosed(face);
  const mouth = FaceGestures.hasMouthOpen(face);
  const smile = FaceGestures.isSmiling(face);
  const kiss = FaceGestures.isKissing(face);
  const surprised = FaceGestures.isSurprised(face);
  const eyebrowsFrowned = FaceGestures.hasEyebrowsFrowned(face);
  const eyebrowsRised = FaceGestures.hasEyebrowsRaised(face);

  Diagnostics.watch("Smile: ", smile);
  Diagnostics.watch("Kiss: ", kiss);
  Diagnostics.watch("R Eye: ", rEye);
  Diagnostics.watch("L Eye: ", lEye);
  Diagnostics.watch("Mouth: ", mouth);
  Diagnostics.watch("Surpriced: ", surprised);
  Diagnostics.watch("eyebrowsFrowned: ", eyebrowsFrowned);
  Diagnostics.watch("eyebrowsRised: ", eyebrowsRised);

  Instruction.bind(true, 'tap_to_start');

  inicioAudio.setPlaying(true);
  
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
    status = 'finished';
    Diagnostics.log(status);
    Time.setTimeout(doFace, delay);
  }

  function doFace(){
    loopAnim();
    Diagnostics.log("make gesture");
    Diagnostics.log(randomNum)
    switch (imgs[randomNum]){
      case imgs[0]:
        Patches.inputs.setBoolean('stickVisible', smile);
        smileAudio.setPlaying(true);
        smileAudio.reset();
        break;
      case imgs[1]:
        Patches.inputs.setBoolean('stickVisible', kiss);
        kissAudio.setPlaying(true);
        kissAudio.reset();
        break;
      case imgs[2]:
        Patches.inputs.setBoolean('stickVisible', rEye);
        rEyeAudio.setPlaying(true);
        rEyeAudio.reset();
        break;
      case imgs[3]:
        Patches.inputs.setBoolean('stickVisible', lEye);
        lEyeAudio.setPlaying(true);
        lEyeAudio.reset();
        break;
      case imgs[4]:
        Patches.inputs.setBoolean('stickVisible', surprised);
        surpricedAudio.setPlaying(true);
        surpricedAudio.reset();
        break;
      case imgs[5]:
        Patches.inputs.setBoolean('stickVisible', mouth);
        tongueAudio.setPlaying(true);
        tongueAudio.reset();
        break;
      case imgs[6]:
        Patches.inputs.setBoolean('stickVisible', eyebrowsFrowned);
        eyebrowsFAudio.setPlaying(true);
        eyebrowsFAudio.reset();
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
    Patches.inputs.setBoolean('stickVisible', false);
    status = 'ready';
    inicioAudio.reset();
  };


  function getRandomInt(min, max) {
    min = 0;
    max = imgs.length;
    return Math.floor(Math.random() * (max - min)) + min;
}
  
})(); // Enables async/await in JS [part 2]
