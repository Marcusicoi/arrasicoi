/*jslint node: true */
"use strict";
const Class = require('./lib/definitions.js');
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
      "O'Chunks = a guy",
      "subscribe........",
      "green circle be like"
    ]);
};
exports.chooseBotTank = () => {
  return exports.choose([
    
    Class.basic, Class.anni, Class.factory, Class.overdrive, Class.tripletwin, Class.destroy,
            Class.rifle, Class.penta, Class.spread, Class.bird, Class.mortar, Class.fighter,
           Class.booster, Class.shot, Class.cyc, Class.autwin, Class.overlord, exports.stream,
            Class.falcon, Class.artillery, Class.basinv, Class.triple, Class.overtrap, Class.overgunner,
           Class.single, Class.ninja, Class.manage, Class.autiper, Class.clone, Class.dual, Class.musk,
            Class.pbasic, Class.gilor, Class.corp, Class.trapper, Class.engineer, Class.hepta, Class.term,
            Class.decent, Class.twin4, Class.achine, Class.accor, Class.skimmest, Class.skimmer, Class.anger,
            Class.seek, Class.flatt, Class.infern, Class.thewn, Class.steamroll, Class.anni, Class.lance, 
            Class.death, Class.excali, Class.tlance, Class.mgrow, Class.amgrow, Class.grow, Class.agrow,
            Class.m2grow, Class.am2grow, Class.ggrow, Class.twinfern, Class.fsnipe, Class.tlance, Class.seek,
            Class.sotap, Class.trual, Class.autogunner, Class.minitrap, Class.crop, Class.quint, Class.direcow,
            Class.dsnipe, Class.basicep, Class.twinicep, Class.drive, Class.ppound, Class.dpound, Class.fpound,
            Class.swas, Class.sswas, Class.tswas, Class.mswas
         ]);
  };
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
