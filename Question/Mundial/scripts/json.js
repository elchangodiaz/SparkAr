const Scene = require('Scene');

export const Diagnostics = require('Diagnostics');
export var equipos;
export var fechas;

(async function () {

  equipos = {
    "1": {
        "equipo" : "Rusia",
        "bandera" : "filebandera"
    },
    "2": {
        "equipo" : "Arabia Saudi",
        "bandera" : "filebandera"
    },
    "3": {
        "equipo" : "Egipto",
        "bandera" : "filebandera"
    },
    "4": {
        "equipo" : "Uruguay",
        "bandera" : "filebandera"
    },
    "5": {
        "equipo" : "Rusia",
        "bandera" : "filebandera"
    },
    "6": {
        "equipo" : "Arabia Saudi",
        "bandera" : "filebandera"
    },
    "7": {
        "equipo" : "Egipto",
        "bandera" : "filebandera"
    },
    "8": {
        "equipo" : "Uruguay",
        "bandera" : "filebandera"
    },
    "9": {
        "equipo" : "Rusia",
        "bandera" : "filebandera"
    },
    "10": {
        "equipo" : "Arabia Saudi",
        "bandera" : "filebandera"
    },
    "11": {
        "equipo" : "Egipto",
        "bandera" : "filebandera"
    },
    "12": {
        "equipo" : "Uruguay",
        "bandera" : "filebandera"
    },
    "13": {
        "equipo" : "Rusia",
        "bandera" : "filebandera"
    },
    "14": {
        "equipo" : "Arabia Saudi",
        "bandera" : "filebandera"
    },
    "15": {
        "equipo" : "Egipto",
        "bandera" : "filebandera"
    },
    "16": {
        "equipo" : "Uruguay",
        "bandera" : "filebandera"
    },
    "17": {
        "equipo" : "Rusia",
        "bandera" : "filebandera"
    },
    "18": {
        "equipo" : "Arabia Saudi",
        "bandera" : "filebandera"
    },
    "19": {
        "equipo" : "Egipto",
        "bandera" : "filebandera"
    },
    "20": {
        "equipo" : "Uruguay",
        "bandera" : "filebandera"
    },
    "21": {
        "equipo" : "Rusia",
        "bandera" : "filebandera"
    },
    "22": {
        "equipo" : "Arabia Saudi",
        "bandera" : "filebandera"
    },
    "23": {
        "equipo" : "Egipto",
        "bandera" : "filebandera"
    },
    "24": {
        "equipo" : "Uruguay",
        "bandera" : "filebandera"
    },
    "25": {
        "equipo" : "Rusia",
        "bandera" : "filebandera"
    },
    "26": {
        "equipo" : "Arabia Saudi",
        "bandera" : "filebandera"
    },
    "27": {
        "equipo" : "Egipto",
        "bandera" : "filebandera"
    },
    "28": {
        "equipo" : "Uruguay",
        "bandera" : "filebandera"
    },
    "29": {
        "equipo" : "Rusia",
        "bandera" : "filebandera"
    },
    "30": {
        "equipo" : "Arabia Saudi",
        "bandera" : "filebandera"
    },
    "31": {
        "equipo" : "Egipto",
        "bandera" : "filebandera"
    },
    "32": {
        "equipo" : "Uruguay",
        "bandera" : "filebandera"
    }
  }
 
//[1-2, 3-4], [1-3, 4-2], [4-1, 2-3]

fechas = {
    "fecha_0":{
        "dia": "14/5",
        "juegos": ["1-2"]
    },
    "fecha_1":{
        "dia": "15/5",
        "juegos": ["3-4","5-6","7-8"]
    },
    "fecha_2":{
        "dia": "16/5",
        "juegos": ["9-10","11-12","13-14","15-16"]
    },
    "fecha_3":{
        "dia": "17/5",
        "juegos": ["17-18","19-20","21-22"]
    },
    "fecha_4":{
        "dia": "18/5",
        "juegos": ["23-24","25-26","27-28"]
    },
    "fecha_5":{
        "dia": "19/5",
        "juegos": ["29-30","31-22","1-3"]
    },
    "fecha_6":{
        "dia": "20/5",
        "juegos": ["4-2","5-7","8-6"]
    },
    "fecha_7":{
        "dia": "21/5",
        "juegos": ["9-11","12-10","13-15"]
    },
    "fecha_8":{
        "dia": "22/5",
        "juegos": ["16-14","17-19","20-18"]
    },
    "fecha_9":{
        "dia": "23/5",
        "juegos": ["21-23","24-22","25-27"]
    },
    "fecha_10":{
        "dia": "24/5",
        "juegos": ["28-26","29-31","32-30"]
    },
    "fecha_11":{
        "dia": "25/5",
        "juegos": ["4-1","2-3","8-5","6-7"]
    },
    "fecha_12":{
        "dia": "26/5",
        "juegos": ["12-9","10-11","16-13","14-15"]
    },
    "fecha_13":{
        "dia": "27/5",
        "juegos": ["20-17","18-19","24-21","22-23"]
    },
    "fecha_14":{
        "dia": "28/5",
        "juegos": ["28-25","26-27","32-29","30-31"]
    }
}



// fechas = {
//     "fecha_0":{
//         "dia": "14256000000",
//         "juegos": ["1-2"]
//     },
//     "fecha_1":{
//         "dia": "14342400000",
//         "juegos": ["3-4","5-6","7-8"]
//     },
//     "fecha_2":{
//         "dia": "14428800000",
//         "juegos": ["9-10","11-12","13-14","15-16"]
//     },
//     "fecha_3":{
//         "dia": "14515200000",
//         "juegos": ["17-18","19-20","21-22"]
//     },
//     "fecha_4":{
//         "dia": "14601600000",
//         "juegos": ["23-24","25-26","27-28"]
//     },
//     "fecha_5":{
//         "dia": "14688000000",
//         "juegos": ["29-30","31-22","1-3"]
//     },
//     "fecha_6":{
//         "dia": "14774400000",
//         "juegos": ["4-2","5-7","8-6"]
//     },
//     "fecha_7":{
//         "dia": "14860800000",
//         "juegos": ["9-11","12-10","13-15"]
//     },
//     "fecha_8":{
//         "dia": "14947200000",
//         "juegos": ["16-14","17-19","20-18"]
//     },
//     "fecha_9":{
//         "dia": "15033600000",
//         "juegos": ["21-23","24-22","25-27"]
//     },
//     "fecha_10":{
//         "dia": "15120000000",
//         "juegos": ["28-26","29-31","32-30"]
//     },
//     "fecha_11":{
//         "dia": "15206400000",
//         "juegos": ["4-1","2-3","8-5","6-7"]
//     },
//     "fecha_12":{
//         "dia": "15292800000",
//         "juegos": ["12-9","10-11","16-13","14-15"]
//     },
//     "fecha_13":{
//         "dia": "15379200000",
//         "juegos": ["20-17","18-19","24-21","22-23"]
//     },
//     "fecha_14":{
//         "dia": "15465600000",
//         "juegos": ["28-25","26-27","32-29","30-31"]
//     }
// }

})();
