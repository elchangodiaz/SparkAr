const S = require('Shaders');
const M = require('Materials');
const T = require('Textures');
const R = require('Reactive');

const Time = require('Time');

(async function() {

    const [defaultMat, cameraTex] = await Promise.all([
        M.findFirst('material0'),
        T.findFirst('cameraTexture0')
    ]);

function main(){

    //Cpu code

    
    const seconds = R.mul(Time.ms, 0.001);
    const curve = R.abs(R.sin(seconds));
    const uv_curve = R.mul(R.sin(seconds), 0.1);
    
    //Vertex shader / Pixel shader (Fragment shaders)
    const uv = S.vertexAttribute({"variableName" : S.VertexAttribute.TEX_COORDS}); //vertex shader

    // Interpolators
    // uv (vertex shader) -> uv (fragment shader)

    const fuv = S.fragmentStage(uv);

    //Fragment shader

    const color = S.textureSampler(cameraTex.signal, uv); //Fragment shader
    const left_color = R.add(color, R.pack4(curve,0,0,1));
    const right_color = R.add(color, R.pack4(0,0,curve,1));

    const anim_uv = R.add(fuv, uv_curve);
    const split = R.step(anim_uv.x, 0.5); //x <0.5 ? 0 : 1
    const ss = R.smoothStep(anim_uv.x, 0.3, 0.6);
    //const uv_color = R.pack4(uv.x,uv.y,0,1);
    const uv_color = R.pack4(ss,ss,ss,1);

    //mix (Lerp)
    //a,b,t [0-1]
    //a*(1-t) + b*t
      // 0 -> a * 1 + b*0
      // a
      // 1 -> a * 0 + b * 1
      //b
      // 0.5 -> a * 0.5 + b * 0.5
      
    const blend_color = R.mix(left_color, right_color, ss);

    const final_color = blend_color;

     // Define the texture slot of the material to update
    const textureSlot = S.DefaultMaterialTextures.DIFFUSE;
    defaultMat.setTextureSlot(textureSlot, final_color); // Fragment Shader -> output
}

main();

})();