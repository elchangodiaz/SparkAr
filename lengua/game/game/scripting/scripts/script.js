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
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const M = require('Materials');
const T = require('Textures');
const S = require('Shaders');
const R = require('Reactive');
const Time = require('Time');
export const Diagnostics = require('Diagnostics');


(async function() {
    const [material0, cameraTexture] = await Promise.all([
        M.findFirst('material0'),  //get('material0');
        T.findFirst('cameraTexture0')   //get('cameraTexture0')
]);




function modulate(time, lum)
{
    const ct = R.mul(Time.ms, 0.001);    // -> signal 3

    const curve = R.abs(R.sin(ct)); // -signal 4
    const modulationColor = R.pack4(curve,1,0,1); // signal 5
    const lum4 = R.pack4(lum, lum, lum, 1);
    const finalModulation = R.add(modulationColor, lum4);
    return finalModulation;
}

function luminance(color)
{
    return R.dot(color, R.pack4(0.2125, 0.7154, 0.0721, 0));
/*
    esto es la linea de arriba pero con producto punto
    //color x, y , z
    const r = R.mul(color.x, 0.2125);
    const g = R.mul(color.y, 0.7154);
    const b = R.mul(color.z, 0.0721);

    const rg = R.add(r,g);
    const rgb = R.add(rg, b);

    return rgb;
*/
}    

function main()
{

    //printa('hola');
    const uvs = S.vertexAttribute({"variableName" : S.VertexAttribute.TEX_COORDS}); // --> signal 1

    const color = S.textureSampler(cameraTexture.signal , uvs); //-> signal 2
    const lum = luminance(color);

    const modulationColor = modulate(Time.ms, lum);
    //const finalColor = R.pack4(lum, lum, lum, 1) //gray scale
    const finalColor = R.mul(color, modulationColor); // signal 6
    const textureSlot = S.DefaultMaterialTextures.DIFFUSE;
    material0.setTextureSlot(textureSlot, finalColor); //set signal6 -> material

}

main();

})();
// Use export keyword to make a symbol available in scripting debug console


