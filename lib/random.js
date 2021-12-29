/*jslint node: true */
"use strict";
const Class = require('./definitions')

                    
// Seed math

exports.random = x => {
    return x * Math.random();
};

exports.randomAngle = () => {
    return Math.PI * 2 * Math.random();
};

exports.randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

exports.irandom = i => {
    let max = Math.floor(i);
    return Math.floor(Math.random() * (max + 1)); //Inclusive
};

exports.irandomRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Inclusive
};

exports.gauss = (mean, deviation) => {
    let x1, x2, w;
    do {
        x1 = 2*Math.random() - 1;
        x2 = 2*Math.random() - 1;
        w = x1 * x1 + x2 * x2;
    } while (0 == w || w >= 1);

    w = Math.sqrt(-2 * Math.log(w) / w);
    return mean + deviation * x1 * w;
};

exports.gaussInverse = (min, max, clustering) => {
    let range = max - min;
    let output = exports.gauss(0, range / clustering);

    while (output < 0) {
        output += range;
    }
    
    while (output > range) {
        output -= range;
    }
    
    return output + min;
};

exports.gaussRing = (radius, clustering) => {
    let r = exports.random(Math.PI * 2);
    let d = exports.gauss(radius, radius*clustering);
    return {
        x: d * Math.cos(r),
        y: d * Math.sin(r),
    };
};

exports.chance = prob => {
    return exports.random(1) < prob;
};

exports.dice = sides => {
    return exports.random(sides) < 1;
};

exports.choose = arr => {
    return arr[exports.irandom(arr.length - 1)];
};

exports.chooseN = (arr, n) => {
    let o = [];
    for (let i=0; i<n; i++) {
        o.push(arr.splice(exports.irandom(arr.length - 1), 1)[0]);
    }
    return o;
};

exports.chooseChance = (...arg) => {
    let totalProb = 0;
    arg.forEach(function(value) { totalProb += value; });
    let answer = exports.random(totalProb);
    for (let i=0; i<arg.length; i++) {
        if (answer<arg[i]) return i;
        answer -= arg[i];
    }
};
exports.chooseBot2Team = () => {
    return exports.choose([-1, -1, -1]);
};
exports.chooseBot4Team = () => {
    return exports.choose([-1, -1, -1, -2, -2, -2, -3, -3, -3, -4, -4, -4]);
};
exports.chooseBotLetterClan = () => {
    return exports.choose([
        'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z'
        ]);
  };
exports.chooseBotNumberClan = () => {
    return exports.choose([
'1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
'21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
'31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
'41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
'51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
'61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
'71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
'81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
'91', '92', '93', '94', '95', '96', '97', '98', '99', '100',
      ]);
  };
exports.chooseBotNameClan = () => {
    return exports.choose([
      'StayMadKid', 'Hunter', 'Killer', 'Bad',
      'no gg', 'lol', '', 'cope', 'copeHarderKid',
      'skill issue', 'urmom', 'gg',
     ]);
 };    
exports.chooseBotName = () => {
    return exports.choose([
        'Rickroller',
        'lol',
        'stickbuggedlol',
        'laggy',
        'lol',
        'VN!',
        'Sub to Marcusicoi',
        'cHaoS',
        'Help me get 1M',
        'U GO DIE!!!',
        'Dev',
        '',
        'Noob dont kill me',
        'hmm...',
        'kittycat',
        'corruptX',
        'Diep.io',
        'Little Useless Tank',
        'Pet',
        'SPIN=TEAM!',
        'Gustav',
        'Alice',
        'Bob',
        'Darget',
        'Flagerises',
        'Icocelesis',
        'Arlichromak',
        'Rogesulosis',
        'Carparkserisis',
        'Laperiscolos',
        'Lachacer',
        'Quarunnteral',
        'Isocelesis',
        'Zegisis',
        'Quadanglesis',
        'Oscar',
        'Visalia',
        'Bullasgesis',
        'Trapezer',
        'Glovengersis',
        'Lopesiquencesis',
        'Oxyensis',
        'Dicsergrapheris',
        'Makesiclosis',
        'Galosphesis',
        'Specerisitsis',
        'Splasis',
        'Cognesisquenceris',
        'Arasiclesis',
        'Plasesisequengarcis',
        'Honasis',
        'Plequeserguensis',
        'Glitasergrapis',
        'Molequeheninkis',
        'DEEZ_NUTZ',
        'joe',
        'Nagerisigleroinerlasis',
        'Huseriserpropsersis',
        'Tylperguquencesis',
        'Qualangsisperghaperisis',
        'Crux',
        'Plasabition',
        '6ix9ine',
        'pewds',
        'Flagersisperisestion',
        'Marcusicoi',
        'mineCwaft',
        'Pleaquesequencesis',
        'amongus',
        '[MG]',
        'vnSucks',
        'T-Series',
        'gay',
        'how to flush toilets',
        'fEzTi',
        "sjfueidiendkwjdk",
        "subscribe........",
        "TEAM",
        "average arrasicoi enjoyer",
        "TOKEN PLS",
        "arras.io",
        "spin2team",
        "sus",
        "no kill pls",
        "Sinbadx",
        "Sindbadx",
        "xXProPlayer" + exports.chooseBotNumberClan() + "Xx",
        "xXNoobPlayer" + exports.chooseBotNumberClan() + "Xx",
        "[" + exports.chooseBotLetterClan() + "-" + exports.chooseBotNumberClan() + "] " + exports.chooseBotNameClan(),
        "[F-22] " + exports.chooseBotNameClan(),
        exports.chooseBotNameClan(),
        "[L-39] " + exports.chooseBotNameClan(),
        "[P-47] " + exports.chooseBotNameClan(),
        "[o7] " + exports.chooseBotNameClan(),
        "[F-22/L-39] " + exports.chooseBotNameClan(),
        "[666] " + exports.chooseBotNameClan(),
        "2not1",
        exports.chooseBotNumberClan() + "not" + exports.chooseBotNumberClan(),
        "ragnarok is an eternal",
        "Corrupt X",
        "iX",
        "iXplode",
        "Corrupt " + exports.chooseBotLetterClan(),
    ]);
};
exports.chooseBossName = (code, n) => {
    switch (code) {
    case 'a':
    return exports.chooseN([''/*
        'Archimedes',
        'Akilina',
        'Anastasios',
        'Athena',
        'Alkaios',
        'Amyntas',
        'Aniketos',
        'Artemis',
        'Anaxagoras',
        'Apollon',*/
    ], n);
    case 'castle':
    return exports.chooseN([''/*
        'Berezhany',
        'Lutsk',
        'Dobromyl',
        'Akkerman',
        'Palanok',
        'Zolochiv',
        'Palanok',
        'Mangup',
        'Olseko',
        'Brody',
        'Isiaslav',
        'Kaffa',
        'Bilhorod',*/
    ], n);
    default: return 'God';
    }
};
