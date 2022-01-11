const S = require('Shaders');
const M = require('Materials');
const T = require('Textures');
const R = require('Reactive');
const D = require('Diagnostics');
const Scene = require('Scene');
const Time = require('Time');

(async function() {

    const [defaultMat, cameraTex, canvas] = await Promise.all([
        M.findFirst('material0'),
        T.findFirst('cameraTexture0'),
        Scene.root.findFirst("canvas0")
    ]);

    function box_blur(tex, uv, steps, strength){
//Loop Strart, Loop Condition, Loop iteration
        
        const iter_step = Math.floor(steps/2.0);
        const pixelWH = R.pack2(R.mul(R.div(1.0, canvas.width), strength), R.mul(R.div(1.0, canvas.height), strength));
        let blend_color = R.pack4(0,0,0,0);

        D.log(iter_step);
        for(let i = -iter_step; i <= iter_step; i++){
            for(let j = -iter_step; j <= iter_step; j++){
                //D.log('iteration: ' + i + ' ' + j);
                //0 0, 0 1, 0 2, 1 0, 1 1, 1 2, ...

                // -1, -1
                // -1, 0
                // -1, 1 ... 1, 1

                const blurUV = R.add(uv, R.mul(R.pack2(i,j), pixelWH));
                blend_color = R.add(blend_color, S.textureSampler(tex, blurUV));
            }
        }

        const num_samples = 1.0/(steps*steps);
        const final_color = R.mul(blend_color, R.pack4(num_samples, num_samples, num_samples, 1));
        return final_color;
    }

    function main(){


        const uv = S.vertexAttribute({"variableName" : S.VertexAttribute.TEX_COORDS}); //vertex shader
        const fuv = S.fragmentStage(uv);
        const camTex = cameraTex.signal;
        //const color = S.textureSampler(cameraTex.signal, fuv); //Fragment shader

        //const curve = R.mul(5, R.abs(R.sin(R.mul(Time.ms, 0.001))));
        const curve = R.sin(R.mul(Time.ms, 0.001));
        const color = box_blur(camTex, fuv, 9, R.add(1.0, curve));

        const textureSlot = S.DefaultMaterialTextures.DIFFUSE;
        defaultMat.setTextureSlot(textureSlot, color);

    }

    main();
    
    })();

    //       -1              0             1
    //      _____________________________________
    //  -1  |           |           |           |        
    //      |           |           |           |
    //      |           |           |           |
    //      |___________|___________|___________|
    //      |           |           |           |
    //   0  |           |           |           |   
    //      |           |           |           |
    //      |___________|___________|___________|        
    //      |           |           |           |
    //      |           |           |           |
    //   1  |           |           |           |
    //      |___________|___________|___________|
    //                        
    