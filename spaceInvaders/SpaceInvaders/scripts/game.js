/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// Spark AR Studio extension for VS Code - https://fb.me/spark-vscode-plugin
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const FaceTracking = require('FaceTracking');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;
let i;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

(async function () {  // Enables async/await in JS [part 1]

  // To access scene objects

  // To access class properties
  // const directionalLightIntensity = directionalLight.intensity;
  const [ship, shoot] = await Promise.all([
    Scene.root.findFirst('ship'),
    await Scene.root.findFirst('shoot'),
  ]);

  shoot.width = 0.02;
  shoot.height = 0.02;

  ship.x = FaceTracking.face(0).cameraTransform.x;
  shoot.x = ship.x;

  shoot.y = -0.1;

  for(i=0;i<10;i++){
    shoot.y.add(0.1)
    console.log(i);
    await delay(1000);
    i++;
  }

  // To log messages to the console
  Diagnostics.watch("X : ", FaceTracking.face(0).cameraTransform.x);

})(); // Enables async/await in JS [part 2]


