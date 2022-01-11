//modules
const Random = require('Random');
const { unprojectWithDepth } = require('Scene');
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');


const randomNum = Random.random();

const assetR = Scene.root.find('red');
const assetB = Scene.root.find('blue');
const assetG = Scene.root.find('green');
const assetY = Scene.root.find('yellow');

const myArray = [assetR,assetB,assetG,assetY];
var hideStates = [1,1,1,1];
//initial visibility
//hide(myArray, hideStates);
//Main event
function showRandomPlane(randomNum){

    if(randomNum >= 0 && randomNum <= 0.25){
        Diagnostics.log('red')
    }
    else if(randomNum >= 0 && randomNum <= 0.25){
        Diagnostics.log('red')
    } else if(randomNum >= 0 && randomNum <= 0.25){
        Diagnostics.log('red')
    } else if(randomNum >= 0 && randomNum <= 0.25){
        Diagnostics.log('red')
    } else if(randomNum >= 0 && randomNum <= 0.25){
        Diagnostics.log('red')
    } 
}




function planeSelector(hideStates){
    for (var i = 0; i < myArray.length; i++){

    }
}

