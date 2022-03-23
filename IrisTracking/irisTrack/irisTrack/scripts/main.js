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

  const eyeMovementLx = leftEyeball.center.x;
  const eyeMovementRx = rightEyeball.center.x;
  const eyeMovementLy = leftEyeball.center.y;
  const eyeMovementRy = rightEyeball.center.y;

    //center    Lx=-0.032996, Ly=0.032055, Rx=0.032252, Ry=0.032632
    //left      Lx=-0.034714, Ly=0.031328, Rx=0.032513, Ry=0.032277 / Lx=-0.033870, Ly=0.032289, Rx=0.032224, Ry=0.032100
    //LUp       Lx=-0.034296, Ly=0.032448, Rx=0.032056, Ry=0.034291 / Lx=-0.034527, Ly=0.032433, Rx=0.032122, Ry=0.034233
    //UP        Lx=-0.033346, Ly=0.032845, Rx=0.032045, Ry=0.034288 / Lx=-0.033698, Ly=0.033179, Rx=0.031758, Ry=0.034155
    //RUp       Lx=-0.032982, Ly=0.033106, Rx=0.032267, Ry=0.034227 / Lx=-0.032750, Ly=0.033133, Rx=0.032028, Ry=0.034348
    //R         Lx=-0.032556, Ly=0.032359, Rx=0.032670, Ry=0.032388 / Lx=-0.032290, Ly=0.032201, Rx=0.032692, Ry=0.032346
    //RD        Lx=-0.032556, Ly=0.032359, Rx=0.032670, Ry=0.032388 / Lx=-0.032290, Ly=0.032201, Rx=0.032692, Ry=0.032346

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
