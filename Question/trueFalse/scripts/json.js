const Scene = require('Scene');

export const Diagnostics = require('Diagnostics');
export var dataJson;

(async function () {



  dataJson = {
    "cancion_1": {
        "title": "azul",
        "file": "file1",
        "eleccion": "true,true,true,true,true",
        "1": true,
        "2": true,
        "3": true,
        "4": true,
        "5": true
    }, 
    "cancion_2": {
        "title": "verde",
        "file": "file1",
        "eleccion": "false,true,true,true,true",
        "1": false,
        "2": true,
        "3": true,
        "4": true,
        "5": true
    }, 
    "cancion_3": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,false,true,true,true",
        "1": true,
        "2": false,
        "3": true,
        "4": true,
        "5": true
    },
    "cancion_4": {
        "title": "song1",
        "file": "file1",
        "eleccion": "true,true,false,true,true",
        "1": true,
        "2": true,
        "3": false,
        "4": true,
        "5": true
    },  
    "cancion_5": {
        "title": "song2",
        "file": "file1",
        "eleccion": "true,true,true,false,true",
        "1": true,
        "2": true,
        "3": true,
        "4": false,
        "5": true
    }, 
    "cancion_6": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,true,true,true,false",
        "1": true,
        "2": true,
        "3": true,
        "4": true,
        "5": false
    }, 
    "cancion_7": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,false,true,true,true",
        "1": false,
        "2": false,
        "3": true,
        "4": true,
        "5": true
    },
    "cancion_8": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,true,false,true,true",
        "1": false,
        "2": true,
        "3": false,
        "4": true,
        "5": true
    },  
    "cancion_9": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,true,true,false,true",
        "1": false,
        "2": true,
        "3": true,
        "4": false,
        "5": true
    }, 
    "cancion_10": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,true,true,true,false",
        "1": false,
        "2": true,
        "3": true,
        "4": true,
        "5": false
    }, 
    "cancion_11": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,fasle,false,true,true",
        "1": true,
        "2": false,
        "3": false,
        "4": true,
        "5": true
    },
    "cancion_12": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,false,true,false,true",
        "1": true,
        "2": false,
        "3": true,
        "4": false,
        "5": true
    },  
    "cancion_13": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,false,true,true,false",
        "1": true,
        "2": false,
        "3": true,
        "4": true,
        "5": false
    }, 
    "cancion_14": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,true,false,false,true",
        "1": true,
        "2": true,
        "3": false,
        "4": false,
        "5": true
    }, 
    "cancion_15": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,true,false,true,false",
        "1": true,
        "2": true,
        "3": false,
        "4": true,
        "5": false
    },
    "cancion_16": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,true,true,false,false",
        "1": true,
        "2": true,
        "3": true,
        "4": false,
        "5": false
    },  
    "cancion_17": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,false,false,true,true",
        "1": false,
        "2": false,
        "3": false,
        "4": true,
        "5": true
    }, 
    "cancion_18": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,false,true,false,true",
        "1": false,
        "2": false,
        "3": true,
        "4": false,
        "5": true
    }, 
    "cancion_19": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,false,true,true,false",
        "1": false,
        "2": false,
        "3": true,
        "4": true,
        "5": false
    },
    "cancion_20": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,true,false,false,true",
        "1": false,
        "2": true,
        "3": false,
        "4": false,
        "5": true
    },  
    "cancion_21": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,true,false,true,false",
        "1": false,
        "2": true,
        "3": false,
        "4": true,
        "5": false
    }, 
    "cancion_22": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,true,true,false,false",
        "1": false,
        "2": true,
        "3": true,
        "4": false,
        "5": false
    }, 
    "cancion_23": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,false,false,false,true",
        "1": true,
        "2": false,
        "3": false,
        "4": false,
        "5": true
    },
    "cancion_24": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,false,false,true,false",
        "1": true,
        "2": false,
        "3": false,
        "4": true,
        "5": false
    },  
    "cancion_25": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,false,true,false,false",
        "1": true,
        "2": false,
        "3": true,
        "4": false,
        "5": false
    }, 
    "cancion_26": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,true,false,false,false",
        "1": true,
        "2": true,
        "3": false,
        "4": false,
        "5": false
    }, 
    "cancion_27": {
        "title": "song",
        "file": "file1",
        "eleccion": "true,false,false,false,false",
        "1": true,
        "2": false,
        "3": false,
        "4": false,
        "5": false
    },
    "cancion_28": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,true,false,false,false",
        "1": false,
        "2": true,
        "3": false,
        "4": false,
        "5": false
    },  
    "cancion_29": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,false,true,false,false",
        "1": false,
        "2": false,
        "3": true,
        "4": false,
        "5": false
    }, 
    "cancion_30": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,false,false,true,false",
        "1": false,
        "2": false,
        "3": false,
        "4": true,
        "5": false
    }, 
    "cancion_31": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,false,false,false,true",
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": true
    },
    "cancion_32": {
        "title": "song",
        "file": "file1",
        "eleccion": "false,false,false,false,false",
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false
    },  
}

})();
