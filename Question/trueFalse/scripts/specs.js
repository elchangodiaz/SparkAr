
const Scene = require('Scene');

export const Diagnostics = require('Diagnostics');

(async function () {  

  const [true_btn, false_btn,question,true_true, true_false, false_false, false_true] = await Promise.all([
    Scene.root.findFirst('true_btn_p'),
    Scene.root.findFirst('false_btn_p'),
    Scene.root.findFirst('question'),
    Scene.root.findFirst('true_true'),
    Scene.root.findFirst('true_false'),
    Scene.root.findFirst('false_false'),
    Scene.root.findFirst('false_true'),
  ]);

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

})();
