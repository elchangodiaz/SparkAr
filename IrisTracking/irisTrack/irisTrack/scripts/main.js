const Scene = require('Scene');
const FaceTracking = require('FaceTracking');
const IrisTracking = require('IrisTracking');

export const Diagnostics = require('Diagnostics');

(async function () { 

  const [face,centerPlane, irisPlane] = await Promise.all([
    FaceTracking.face(0),
    Scene.root.findFirst('plane0'),
    Scene.root.findFirst('plane1')
  ]);
  
  


})(); 
