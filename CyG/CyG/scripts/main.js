const Scene = require('Scene');
const Time = require('Time');
const Patches = require('Patches');
const Instruction = require('Instruction');
const Materials = require('Materials');
const Textures = require('Textures')
const FaceTracking = require('FaceTracking');
const FaceGestures = require('FaceGestures');
const Audio = require('Audio');
const Reactive = require('Reactive');

export const Diagnostics = require('Diagnostics');

let randInterval = null;
let status = 'ready';
let randomNum;
const delay = 10;
let i;

(async function () {  // Enables async/await in JS [part 1]

  const [display,smileImg,kissImg,closeEyeRImg,closeEyeLImg,openMouthImg,tongueImg,eyebrowsFImg,eyebrowsRImg,title,tap,face,inicioAudio,smileAudio,kissAudio,rEyeAudio,
        lEyeAudio,surpricedAudio,tongueAudio,eyebrowsFAudio,eyebrowsRisedAudio] = await Promise.all([
    Materials.findFirst('display'),
    Textures.findFirst('smileImg'),
    Textures.findFirst('kissImg'),
    Textures.findFirst('closeEyeRImg'),
    Textures.findFirst('closeEyeLImg'),
    Textures.findFirst('openMouthImg'),
    Textures.findFirst('tongueImg'),
    Textures.findFirst('eyebrowsFImg'),
    Textures.findFirst('eyebrowsRImg'),
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
  
  const imgs = [smileImg, kissImg, closeEyeRImg, closeEyeLImg, openMouthImg, tongueImg, eyebrowsFImg, eyebrowsRImg];

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
    //Diagnostics.log(imgs[randomNum].name)
    switch (imgs[randomNum].name){
      case "smileImg":
        Patches.inputs.setBoolean('stickVisible', smile);
        smileAudio.setPlaying(true);
        smileAudio.reset();
        break;
      case "kissImg":
        Patches.inputs.setBoolean('stickVisible', kiss);
        kissAudio.setPlaying(true);
        kissAudio.reset();
        break;
      case "closeEyeRImg":
        var boolrEye = Reactive.and(rEye,lEye.not())
        Patches.inputs.setBoolean('stickVisible', boolrEye);
        rEyeAudio.setPlaying(true);
        rEyeAudio.reset();
        break;
      case "closeEyeLImg":
        var boollEye = Reactive.and(lEye,rEye.not());
        Patches.inputs.setBoolean('stickVisible', boollEye);
        lEyeAudio.setPlaying(true);
        lEyeAudio.reset();
        break;
      case "openMouthImg":
        Patches.inputs.setBoolean('stickVisible', surprised);
        surpricedAudio.setPlaying(true);
        surpricedAudio.reset();
        break;
      case "tongueImg":
        Patches.inputs.setBoolean('stickVisible', mouth);
        tongueAudio.setPlaying(true);
        tongueAudio.reset();
        break;
      case "eyebrowsFImg":
        Patches.inputs.setBoolean('stickVisible', eyebrowsFrowned);
        eyebrowsFAudio.setPlaying(true);
        eyebrowsFAudio.reset();
        break;
      case "eyebrowsRImg":
        Patches.inputs.setBoolean('stickVisible', eyebrowsRised);
        eyebrowsRisedAudio.setPlaying(true);
        eyebrowsRisedAudio.reset();
        break;  
      default:
        Diagnostics.log("default");
        break;                  
    }
    removeElement(randomNum);
    Instruction.bind(true, 'tap_to_reply');
  }

  function reset(){
    Instruction.bind(true, 'tap_to_start');
    display.diffuse = title;
    Patches.inputs.setBoolean('stickVisible', false);
    status = 'ready';
    if(imgs.length===0){
      inicioAudio.reset();
    }
  };


  function getRandomInt(min, max) {
    min = 0;
    if(imgs.length===0){
      imgs.push(smileImg, kissImg, closeEyeRImg, closeEyeLImg, openMouthImg, tongueImg, eyebrowsFImg);
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
  
})(); // Enables async/await in JS [part 2]
