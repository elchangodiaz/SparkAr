import { match } from 'assert';
import { fstat } from 'fs';
import { prependListener } from 'process';



const Scene = require('Scene');
const CameraInfo = require('CameraInfo');
const Reactive = require('Reactive');
const Diagnostics = require('Diagnostics');
const Patches = require('Patches'); // To exchange data between to Patch Editor and Script
const Time = require('Time');
const FaceTracking2D = require('FaceTracking2D');
const FaceTracking = require('FaceTracking');



var y = true;
var n = false;
const delay = 800;

const c1 = new Map();
const c2 = new Map();
const c3 = new Map();
const c4 = new Map();
const c5 = new Map();
const c6 = new Map();

c1.set(0, "humano");c1.set(1, "youtuber");c1.set(2, "movie");c1.set(3, "original");c1.set(4, "inventor");c1.set(5, "indian");
c1.set("name","Iron man");c1.set("humano", y);c1.set("youtuber",n);c1.set("movie", y);c1.set("original",n);c1.set("inventor",y);c1.set("indian",n);
c2.set("name","Einstein");c2.set("human",y);c2.set("youtuber",n);c2.set("movie",n);c2.set("original",y);c2.set("inventor",y);c2.set("indian",n);
c4.set("name","PewDiePie");c4.set("human",y);c4.set("youtuber",y);c4.set("movie",n);c4.set("original",y);c4.set("inventor",n);c4.set("indian",n);
c3.set("name","Carry Minati");c3.set("human",y);c3.set("youtuber",y);c3.set("movie",n);c3.set("original",y);c3.set("inventor",n);c3.set("indian",y);
c5.set("name","Nemo");c5.set("human",n);c5.set("youtuber",n);c5.set("movie",y);c5.set("original",n);c5.set("inventor",n);c5.set("indian",n);
c6.set("name","Narendra modi");c6.set("human",y);c6.set("youtuber",n);c6.set("movie",n);c6.set("original",y);c6.set("inventor",n);c6.set("indian",y);

var database = [c1, c2, c3, c4, c5, c6];

(async function () {

  const [face2D, faceTracker, questionTxt, recording, true_sel, false_sel ] = await Promise.all([
    FaceTracking2D.face(0),
    FaceTracking.face(0),
    Scene.root.findFirst('questionTxt'),
    Patches.outputs.getBoolean("recording"),
    Patches.outputs.getPulse("true"),
    Patches.outputs.getPulse("false")
  ]);

  var posX = face2D.boundingBox.x;
  var posY = face2D.boundingBox.y;

  questionTxt.text = 'Piensa en un Personaje';

  questionTxt.height = 100;
  questionTxt.width = 250;

  let i = 0;

  Diagnostics.watch("face x: ", posX);
  Diagnostics.watch("face y: ", posY);


  const gameTopicChannel = Multipeer.getMessageChannel("GameTopic");
 
  recording.monitor().subscribe(function(recordingEvent){
    if(recordingEvent.newValue){
      questionTxt.text = 'Es ' + c1.get(i) + '?';
      Time.setTimeout(onTimeout, delay+400); 
    }
  });

})(); 
