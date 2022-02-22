const Scene = require('Scene');

const TouchGesture = require('TouchGestures');

export const Diagnostics = require('Diagnostics');

(async function () {  // Enables async/await in JS [part 1]

   Diagnostics.log('Console message logged from the script.');

   const textNode = await Scene.root.findFirst('2dText0');
   const scoreText = await Scene.root.findFirst('scoreText');

   textNode.text = 'Click me!';

   let i = 0;

   TouchGesture.onTap(textNode).subscribe(function(){
    i++;
    scoreText.text = `Score ${i}`;
   })

})(); // Enables async/await in JS [part 2]
