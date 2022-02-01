const Scene = require('Scene');

export const Diagnostics = require('Diagnostics');


(async function () {  

  const dataStore = {
    "question_1": {
        "duration": 38000,
        "minscoreText": 25,
        "1.0": ["k"],
        "2.0": ["k"],
        "3.0": ["k"],
        "4.0": ["k"],


        "8.0": ["k"],
        "8.5": ["k"],
        "9.5": ["k"],
        "10.0": ["k"],

        "12.0": ["k"],
        "12.5": ["k"],
        "13.5": ["k"],
        "14.0": ["k"],

        "16.0": ["k"],
        "16.5": ["k"],
        "17.5": ["k"],
        "18.0": ["k"],


        "20.0": ["k"],
        "21.0": ["k"],
        "21.5": ["k"],
        "23.5": ["k"],
        "24.5": ["k"],
        "25.0": ["k"],

        "28.0": ["k"],
        "28.5": ["k"],
        "29.0": ["k"],
        "29.5": ["k"],
        "30.0": ["k"],

        "33.0": ["k"],
        "33.5": ["k"],
        "34.0": ["k"],
        "34.5": ["k"],
        "35.0": ["k"],

    }, "level_2": {
        "duration": 29000,
        "minscoreText": 22,
        "1.0": ["s"],
        "2.0": ["s"],
        "3.0": ["s"],
        "4.0": ["s"],

        "7.0": ["s"],
        "7.5": ["s"],
        "8.5": ["s"],
        "9.0": ["s"],

        "12.0": ["s"],
        "12.5": ["s"],
        "13.5": ["s"],
        "14.0": ["s"],

        "15.0": ["k"],
        "16.0": ["s"],
        "17.0": ["k"],
        "17.5": ["s"],

        "19.0": ["k"],
        "20.0": ["s"],
        "21.0": ["k"],
        "21.5": ["s"],

        "23.0": ["k"],
        "24.0": ["s"],
        "25.0": ["k"],
        "25.5": ["s"],
    },
    "level_3": {
        "duration": 35000,
        "minscoreText": 22,
        "1.0": ["h"],
        "2.0": ["h"],
        "3.0": ["h"],
        "4.0": ["h"],

        "7.0": ["h"],
        "7.5": ["h"],
        "8.5": ["h"],
        "9.0": ["h"],

        "12.0": ["h"],
        "12.5": ["h"],
        "13.5": ["h"],
        "14.0": ["h"],

        "15.0": ["k"],
        "15.5": ["h"],
        "16.5": ["k"],
        "17.0": ["h"],

        "18.0": ["k"],
        "18.5": ["h"],
        "19.5": ["k"],
        "20.0": ["h"],

        "21.0": ["s"],
        "21.5": ["h"],
        "22.5": ["s"],
        "23.0": ["h"],

        "24.0": ["s"],
        "24.5": ["h"],
        "25.5": ["s"],
        "26.0": ["h"],

        "27.5": ["k"],
        "28.0": ["h"],
        "28.5": ["s"],
        "29.0": ["h"],
        "29.5": ["k"],
        "30.0": ["h"],
        "30.5": ["s"],
        "31.0": ["h"],

    },"level_4": {
        "duration": 25000,
        "minscoreText": 25,
        "1.0": ["k"],
        "1.8": ["k"],
        "2.2": ["s"],
        "3.1": ["k"],
        "3.7": ["k"],
        "4.3": ["k"],
        "4.6": ["s"],

        "6.0": ["k"],
        "6.8": ["k"],
        "7.2": ["s"],
        "8.1": ["k"],
        "8.7": ["k"],
        "9.3": ["k"],
        "9.6": ["s"],

        "11.0": ["k"],
        "11.8": ["k"],
        "12.2": ["s"],
        "13.1": ["k"],
        "13.7": ["k"],
        "14.3": ["k"],
        "14.6": ["s"],

        "16.0": ["k"],
        "16.8": ["k"],
        "17.2": ["s"],
        "18.1": ["k"],
        "18.7": ["k"],
        "19.3": ["k"],
        "19.6": ["s"],

    },"level_5": {
        "duration": 20000,
        "minscoreText": 19,
        "2.0": ["k"],
        "2.5": ["k"],
        "3.0": ["s"],
        "3.5": ["k"],
        "4.1": ["k"],
        "4.5": ["s"],

        "5.5": ["k"],
        "6.0": ["s"],
        "6.8": ["k"],
        "7.3": ["k"],
        "7.7": ["s"],

        "9.0": ["k"],
        "9.5": ["k"],
        "10.0": ["s"],
        "10.5": ["k"],
        "11.1": ["k"],
        "11.5": ["s"],

        "12.5": ["k"],
        "13.0": ["s"],
        "13.8": ["k"],
        "14.3": ["k"],
        "14.7": ["s"],

    },
    
    "level_6": {
        "duration": 14000,
        "minscoreText": 4,
        "1.1": ["wd"],
        "3.8": ["wd"],
        "6.5": ["wd"],
        "9.5": ["wd"],


    },"level_7": {
        "duration": 14000,
        "minscoreText": 25,
        "1.0": ["k"],
        "1.5": ["k"],
        "1.8": ["s"],

        "2.5": ["k"],
        "3.0": ["k"],
        "3.3": ["s"],

        "4.0": ["k"],
        "4.5": ["k"],
        "4.8": ["s"],

        "5.5": ["k"],
        "6.0": ["k"],
        "6.3": ["s"],

        "7.0": ["k"],
        "7.5": ["k"],
        "7.8": ["s"],

        "8.5": ["k"],
        "9.0": ["k"],
        "9.3": ["s"],

    }
}

})();
