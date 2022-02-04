
const Scene = require('Scene');
const Patches = require('Patches'); // To exchange data between to Patch Editor and Script
const Reactive = require('Reactive');


export const Diagnostics = require('Diagnostics');

(async function () {  

  const [camera, true_btn, false_btn,question,true_true, true_false, false_false, false_true] = await Promise.all([
    Scene.root.findFirst("Camera"),
    Scene.root.findFirst('true_btn_p'),
    Scene.root.findFirst('false_btn_p'),
    Scene.root.findFirst('question'),
    Scene.root.findFirst('true_true'),
    Scene.root.findFirst('true_false'),
    Scene.root.findFirst('false_false'),
    Scene.root.findFirst('false_true'),
  ]);

  const focalPlane = camera.focalPlane;
  const btn_pos_y = focalPlane.height.div(-2);
  const btn_pos_x = focalPlane.width.div(2);

  question.height = 0.1;
  question.width = 0.2;

  true_btn.width = 0.05;
  true_btn.height = 0.05;

  false_btn.width = 0.05;
  false_btn.height = 0.05;

  true_true.width = 0.05;
  true_true.height = 0.05;

  true_false.width = 0.05;
  true_false.height = 0.05;

  false_false.width = 0.05;
  false_false.height = 0.05;

  false_true.width = 0.05;
  false_true.height = 0.05;

  // Landscape Mode
  Patches.inputs.setPoint("true_btn_pos", Reactive.point(btn_pos_x.div(-1).add(true_btn.width), btn_pos_y.add(true_btn.height), 0.0));
  Patches.inputs.setPoint("false_btn_pos", Reactive.point(btn_pos_x.add(false_btn.width.div(-1)), btn_pos_y.add(false_btn.height), 0.0)); 


  Diagnostics.watch("width: ", focalPlane.width);
  Diagnostics.watch("height: ", focalPlane.height);

  Diagnostics.watch("y: ", btn_pos_y);
  Diagnostics.watch("x: ", btn_pos_x);
  Diagnostics.watch("SS: ", screenScale);


})();
