import { leftEyeball } from 'IrisTracking';

const Scene = require('Scene');
const FaceTracking = require('FaceTracking');
const IrisTracking = require('IrisTracking');

export const Diagnostics = require('Diagnostics');

(async function () { 

  const [face,ojoDPlane, ojoIPlane] = await Promise.all([
    FaceTracking.face(0),
    Scene.root.findFirst('ojoD'),
    Scene.root.findFirst('ojoI')
  ]);
  
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



  


})(); 
