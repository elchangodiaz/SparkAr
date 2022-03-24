import { leftEyeball } from 'IrisTracking';

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
let randInterval = null;
let randomNum;

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
  
  const imgs = [miraCImg, miraUImg, miraURImg, miraULImg, miraDImg, miraDLImg, miraDRImg, 
                miraLImg, miraRImg];

  const leftEyeball = IrisTracking.leftEyeball(face);
  const rightEyeball = IrisTracking.rightEyeball(face);

  const ojoDPlaneTransform = ojoDPlane.transform;
  const ojoIPlaneTransform = ojoIPlane.transform;

  const leftEyeballCenter = leftEyeball.center;
  const leftEyeballIris = leftEyeball.iris;
  const leftEyeballRotation = leftEyeball.rotation;
  
  const rightEyeballCenter = rightEyeball.center;
  const rightEyeballIris = rightEyeball.iris;
  const rightEyeballRotation = rightEyeball.rotation;

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

    //LD        Lx=-0.033583, Ly=0.030841, Rx=0.032967, Ry=0.031911
    //          Lx=-0.034416, Ly=0.030956, Rx=0.033026, Ry=0.031199

    //left      Lx=-0.038325, Ly=0.031379, Rx=0.028632, Ry=0.028100 
    //          Lx=-0.038084, Ly=0.030322, Rx=0.028028, Ry=0.027013

    //LUp       Lx=-0.038768, Ly=0.035259, Rx=0.025277, Ry=0.035062 
    //          Lx=-0.039406, Ly=0.035941, Rx=0.025946, Ry=0.034499
    
    //UP        Lx=-0.034248, Ly=0.036984, Rx=0.034360, Ry=0.036210 
    //          Lx=-0.033542, Ly=0.036376, Rx=0.034342, Ry=0.035782

    //RUp       Lx=-0.027382, Ly=0.035995, Rx=0.038391, Ry=0.035625 
    //          Lx=-0.026434, Ly=0.035386, Rx=0.038421, Ry=0.035248

    //R         Lx=-0.026640, Ly=0.032029, Rx=0.037514, Ry=0.031461 
    //          Lx=-0.027800, Ly=0.032962, Rx=0.038167, Ry=0.032137

    //RD        Lx=-0.033479, Ly=0.031766, Rx=0.033788, Ry=0.031703 
    //          Lx=-0.033231, Ly=0.031721, Rx=0.033722, Ry=0.031722
    
    //D         Lx=-0.033688, Ly=0.031920, Rx=0.033819, Ry=0.031707 
    //          Lx=-0.033886, Ly=0.032059, Rx=0.033568, Ry=0.031719

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
    randInterval = Time.setInterval(function(){
      loopAnim();
    },100);
    beginCountDown();
  }

  function loopAnim(){
    randomNum = getRandomInt(0, imgs.length);
    let imgSel = imgs[randomNum];
    displayMat.diffuse = imgSel;
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
    //Time.setTimeout(doFace, delay);
  }

  function getRandomInt(min, max) {
    min = 0;
    if(imgs.length===0){
      imgs.push(miraCImg, miraUImg, miraURImg, miraULImg, miraDImg, miraDLImg, miraDRImg, 
        miraLImg, miraRImg);
    }
    max = imgs.length;
    return Math.floor(Math.random() * (max - min)) + min;
  }

})(); 
