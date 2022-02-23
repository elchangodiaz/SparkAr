const Scene = require('Scene');
const Time = require('Time');
const Animation = require('Animation');
const Random = require('Random');
const Patches = require('Patches');
const Instruction = require('Instruction');
const Materials = require('Materials');
const Textures = require('Textures')


export const Diagnostics = require('Diagnostics');

const delay = 1200;

let randInterval = null;

(async function () {  // Enables async/await in JS [part 1]

  const [display,smileImg,kissImg,closeEyeRImg,closeEyeLImg,openMouthImg,tongueImg] = await Promise.all([
    Materials.findFirst('display'),
    Textures.findFirst('smileImg'),
    Textures.findFirst('kissImg'),
    Textures.findFirst('closeEyeRImg'),
    Textures.findFirst('closeEyeLImg'),
    Textures.findFirst('openMouthImg'),
    Textures.findFirst('tongueImg')
  ]);
  
  const imgs = [smileImg, kissImg, closeEyeRImg, closeEyeLImg, openMouthImg, tongueImg];


   //START RECORDING FUNCTION
  // recording.monitor().subscribe(function(recordingEvent){
  //   if(recordingEvent.newValue){
    Time.setTimeout(starFilter, delay);
    //  }
    // });

  function starFilter(){
    Diagnostics.log("Start Filter");
    loopAnim();
  }

  function loopAnim(){
    let randomNum = getRandomInt(0, imgs.length);
    Diagnostics.log(randomNum.toString());
    let imgSel = imgs[randomNum];
    Diagnostics.log(imgSel.name);
    display.diffuse = imgSel;
  }

  function getRandomInt(min, max) {
    min = 0;
    max = imgs.length;
    return Math.floor(Math.random() * (max - min)) + min;
}
  
})(); // Enables async/await in JS [part 2]
