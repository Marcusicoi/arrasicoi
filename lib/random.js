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
'[PH] Phillipines',
'[VN] Vietnam',
'[UK] UnitedKingdom',
'[US] UnitedStates',
'T-Series',
'[CH] China',
'[IN1] Indonesia',
'[IN2] India',
'[RS] Russia',
'justinbieber',
'gay',
'[SL] SriLanka',
'[CB] Cambondia',
'[MI] Icoi',
      'how to flush toilets',
      'fEzTi',
      "sjfueidiendkwjdk",
      "subscribe........",
      "green circle be like"
    ]);
};
exports.chooseBotTeam = () => {return exports.choose([-1, -1, -1, -2, -2, -2, -3, -3, -3, -4, -4, -4])};
exports.chooseBossName = (code, n) => {
    switch (code) {
    case 'a':
    return exports.chooseN([
        'Archimedes',
        'Akilina',
        'Anastasios',
        'Athena',
        'Alkaios',
        'Amyntas',
        'Aniketos',
        'Artemis',
        'Anaxagoras',
        'Apollon',
    ], n);
    case 'castle':
    return exports.chooseN([
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
        'Bilhorod',
    ], n);
    default: return 'God';
    }
};
