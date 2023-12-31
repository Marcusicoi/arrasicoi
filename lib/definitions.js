// GUN DEFINITIONS
// const resource = require('./server');
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
          data[i] = data[i] * component[i]
        }
    });
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2], 
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
   
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here
    trap:               [36,    1,     0.25,   0.6,    1,      0.75,   1,      5,      1,      1,      1,      15,     3], 
    swarm:              [18,    0.25,  0.05,   0.4,    1,      0.75,   1,      4,      1,      1,      1,      5,      1],  
    drone:              [50,    0.25,  0.1,    0.6,    1,      1,      1,      2,      1,      1,      1,      0.1,    1], 
    factory:            [60,    1,     0.1,    0.7,    1,      0.75,   1,      3,      1,      1,      1,      0.1,    1], 
    basic:              [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      15,     1],     
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    celestial:          [3,     1,     1,      0.75,   2,      1.5,    1.75,   0.5,    0.5,    5,      1.1,    1,      1],
    celestialSkimmer:   [1.15,  1,     1,      1,      5,      8.5,    5,      2.5,    1,      1,      1,      1,      1],
    celestialTrap:      [1,     1,     1,      1,      4.1,    1.5,    3,      1,      1,      1,      1,      1,      1],
    celestialHive:      [1.15,  1,     1,      1,      3,      5,      8.5,    5,      1,      1,      1,      1,      1],
    celestialBee:       [0.9,   1,     1,      1,      4,      2.5,    3,      1.5,    1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05],      
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],    
        single:         [1.05,  1,     0.5,    1,      1,      0.85,   1,      1.05,   1,      1,      1,      1,      1],      
        assin:          [1.35,  5,     2,      1,      1,      1,      1.2,    1.05,   1.8,    1,      1.8,    1,      1],
    sniper:             [1.35,  1,     0.25,   1,      1,      0.8,    1.1,    1.5,    1.5,    1,      1.5,    0.2,    1.15],
        rifle:          [0.8,   0.8,   1.5,    1,      0.8,    0.8,    0.9,    1,      1,      1,      1,      2,      1],
    sniprifle:          [1.5,   0.8,   1.5,    1,      0.8,    1.75,   0.9,    1,      1,      1,      1,      2,      1],
        assass:         [1.65,  1,     0.25,   1,      1.15,   1,      1.1,    1.18,   1.18,   1,      3,      1,      1.3],
        hunter:         [1.5,   0.7,   1,      0.95,   1,      0.9,    1,      1.1,    0.8,    1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    2,      0.5,    1.5,    1,      1,      1,      1.2,    1,      1.1], 
            preda:      [1.4,   1,     1,      0.8,    1.5,    0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],   
            snake:      [0.4,   1,     4,      1,      1.5,    0.4,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],   
            sidewind:   [1.5,   2,     1,      1,      1.5,    0.9,    1,      0.15,   0.5,    1,      1,      1,      1],  
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
    mach:               [0.5,   0.8,   1,      1,      0.7,    0.7,    1,      1,      0.8,    1,      1,      2.5,    1],
        blaster:        [1,     1.2,   1.25,   1.1,    1.5,    1,      0.6,    0.8,    0.33,   0.6,    0.5,    1.5,    0.8], 
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1.1,    1.25,   1.25,   1.1,    1.25,   0.5,    1.1], 
        mini:           [1.25,  0.6,   1,      0.8,    0.55,   0.45,   1.25,   1.33,   1,      1,      1.25,   0.5,    1.1], 
        brush:          [1.35,  0.4,   1,      0.8,    0.5,    0.45,   1,      1.33,   1,      1,      1,    0.00001,  1.1],
            stream:     [1.1,   0.6,   1,      1,      1,      0.65,   1,      1.24,   1,      1,      1,      1,      1],    
            reloader:   [1.5,   0.8,   1,      1,      1,      0.45,   1,      1.24,   1,      1,      1,      1,      1],
        shotgun:        [8,     0.4,   1,      1.5,    1,      0.4,    0.8,    1.8,    0.6,    1,      1.2,    1.2,    1], 
        boom:           [1.2,   1,     0.25,   1,      1.5,    1.5,    1,      2,      1.5,    0.15,   1.5,    0.2,    1.15],
        vulc:           [1.1,   0.01,  1,      0.8,    0.75,   0.35,   0.75,   1.3,    1,      1,      1,      0.4,    1],
    flank:              [1,     1.2,   1,      1,      1.02,   0.81,   0.9,    1,      0.85,   1,      1.2,    1,      1], 
    cyclone:            [1,     1,     1,      1,      1.3,    1.3,    1.1,    1.5,    1.15,   1,      1,      1,      1],
        tri:            [1,     0.9,   1,      1,      0.9,    1,      1,      0.8,    0.8,    0.6,    1,      11,      1],  
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.5,   2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.6,    1.2,    1.1,    1,      0.8,    1.3,    1,      1.25],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],   
            autosnipe:  [1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],   
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2,     1.6,   1,      1,      1,      2,      1,      0.85,   0.8,    1,      1.5,    1,      1.15], 
        destroy:        [2.2,   1.8,   0.5,    1,      1,      1,      1.2,    0.65,   0.5,    1,      2,      1,      3],
          rammer:       [2.5,   1.15,  1,      1,      1,      0.1,    0.1,    1.5,    0.9,    1,      1,      1,      2.15],
        pistol:         [2,     2,     1,      1,      1,      3,      1,      1,      0.8,    1,      1.5,    1,      1.15], 
            anni:       [0.85,  1.25,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],    
          decent:       [0.65,  1,     1,      1,      1.1,    1.1,    1,      1,      1,      1,      1,      1,      1],    
            hive:       [1.5,   0.8,   1,      0.8,    0.7,    0.3,    1,      1,      0.6,    1,      1,      1,      1],
        arty:           [1.2,   0.7,   1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.78125, 0.25, 0.5,   1,      0.5,    1,      1,   1.5/0.78, 0.9/0.78,1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1,      1,      1,      0.7,    0.7,    1,      1,      0.25,   1],   
            skim:       [1.33,  0.8,   0.8,    0.9,    1.35,   0.8,    2,      0.3,    0.3,    1,      1,      1,      1.1],   
    twin:               [1,     0.5,   0.9,    1,      0.9,    0.7,    1,      1,      1,      1,      1,      1.2,    1],
        bent:           [1.1,   1,     0.8,    1,      0.9,    1,      0.8,    1,      1,      1,      0.8,    0.5,    1],    
        triple:         [1.2,   0.667, 0.9,    1,      0.85,   0.85,   0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            quint:      [1.5,   0.667, 0.9,    1,      1,      1,      0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            dual:       [2,     1,     0.8,    1,      1.5,    1,      1,      1.3,    1.1,    1,      1,      1,      1.25], 
        double:         [1,     1,     1,      1,      1,      0.9,    1,      1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.9,    0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.35,   0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.66,  0.8,   2,      1,      1,      0.75,   1,      1.2,    0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
        slowpo:         [1,     1,     0.6,    1.2,    1,      1,      1.25,   1,      1.7,    1,      2,      0.5,    1.5],
           bow:         [1.5,   1,     0.6,    1.2,    0.2,    5,      1.25,   3,      1.7,    1,      2,    0.00001,  1.5],
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.7,    1,      1,      1,      1,      2,      1,      1],       
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1], 
    turret:             [2,     1,     1,      1,      0.8,    0.6,    0.7,    1,      1,      1,      0.1,    1,      1], 
    extinguisher:       [0.5,   0.8,   1,      1.75,   0.7,    0.7,    1,      1,      0.8,    1,      1,      3,    1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.25,   1.15,   1,      1,      0.85,   1,      1,      1,      1.1],
        bees:           [1.3,   1,     1,      1.4,    1,      1.5,    0.5,    3,      1.5,    1,      0.25,   1,      1],   
        carrier:        [1.5,   1,     1,      1,      1,      0.8,    1,      1.3,    1.2,    1.2,    1,      1,      1],
    hexatrap:           [1.3,   1,     1.25,   1,      1,      1,      1,      0.8,    1,      0.5,    1,      1,      1],     
    block:              [1.1,   2,     0.1,    1.5,    2,      1,      1.25,   1.5,    2.5,    1.25,   1,      1,      1.25],
        construct:      [1.3,   1,     1,      0.9,    1,      1,      1,      1,      1.1,    1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1,      0.5,    0.5,    1,      0.75,   0.75,   1.333,  1,      1,      1], 
    over:               [1.25,  1,     1,      0.85,   0.7,    0.8,    1,      1,      0.9,    1,      2,      1,      1], 
        meta:           [1.333, 1,     1,      1,      1,      0.667,  1,      1,      1,      1,      1,      1,      1],   
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1],   
        master:         [3,     1,     1,      0.7,    0.4,    0.7,    1,      1,      1,      0.1,    0.5,    1,      1],
        sunchip:        [5,     1,     1,      1.4,    0.5,    0.4,    0.6,    1,      1,      1,      0.8,    1,      1], 
      rocketeer:        [1,     1,     1,      1.4,    1.5,    0.5,    1,      0.4,    0.35,   1,      3,      6,      1],     
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
    stronger:           [1,     1,     1,      1,      1.5,    2,      1,      1.1,    1,      1,      1,      1,      1],
    lowpower:           [1,     1,     2,      1,      0.5,    0.85,   1,     0.7,     1,      1,      1,      0.5,    0.7], 
    lesspower:          [1,     1,     2,      1,      0.8,    0.8,    0.8,    1,      1,      1,      1,      1,    0.9], 
    halfrecoil:         [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    norecoil:           [1,  0.00001,  1,      1,      0.5,    1,      1,      1,      1,      1,      1,   0.00001,   1],
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tonsmorrecoil:      [1,     5,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    doublereload:       [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],  
    quadrareload:       [0.25,  1,  0.00001,   1,     0.5,     1,      1,      1,      1,      1,      1,   0.00001,   1],
    morereload:         [0.75,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    halfreload:         [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    lessreload:         [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    lowreload:          [3,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1], 
    bitlessspeed:       [1,     1,     1,      1,      1,      1,      1,      0.93,   0.93,   1,      1,      1,      1], 
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1], 
    halfspeed:          [1,     1,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    halfrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1], 
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1], 
    lance:              [0.005, 0,     1,      1,      1,     0.5,     1,      0,      0,      0.003,  1,      0.001,  1], 
//    unknown:            [0,     0,     0,      0,      0,      0,      0,      0,      0,      0,      0,      0,      0],
                    
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    op:                 [0.5,   1.3,   1,      1,      4,      4,      4,      3,      2,      1,      5,      2,      1],       
    protectorswarm:     [5,  0.000001, 1,      1,      100,    1,      1,      1,      1,     0.5,     5,      1,      10], 
    AC:                 [1,     1,     1,      1,     99999,  9999,  99999,     1,     1,      1,      5,      1,      1],
};
const dfltskl = 9;
const unlimited = 99999999999999999999999999999;
// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8, 
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
   // COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    UPGRADES_TIER_4: [],
    UPGRADES_TIER_5: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};

// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};
exports.gfood = {
  TYPE: "food",
  DAMAGE_CLASS: 1,
  HITS_OWN_TYPE: "repel",
  FACING_TYPE: "autospin",
  VARIES_IN_SIZE: true,
  BODY: {
    STEALTH: 30,
    PUSHABILITY: 3
  },
  DAMAGE_EFFECTS: false,
  RATEFFECTS: false,
  HEALTH_WITH_LEVEL: false
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;
exports.decagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 8,
    },
    LABEL: 'Decagon',
    VALUE: 40000,
    SHAPE: 8,
    SIZE: 132,
    COLOR: 6,
    BODY: {
        DAMAGE: 5 * basePolygonDamage,
        DENSITY: 40,
        HEALTH: 450 * basePolygonHealth,
        RESIST: Math.pow(1.25, 5),
        SHIELD: 110 * basePolygonHealth,
        REGEN: 2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    CAN_BE_ON_LEADERBOARD: false
};
exports.nonagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 7,
    },
    LABEL: 'Nonagon',
    VALUE: 40000,
    SHAPE: 9,
    SIZE: 118,
    COLOR: 32,
    BODY: {
        DAMAGE: 4 * basePolygonDamage,
        DENSITY: 40,
        HEALTH: 400 * basePolygonHealth,
        RESIST: Math.pow(1.25, 5),
        SHIELD: 110 * basePolygonHealth,
        REGEN: 1.5,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    CAN_BE_ON_LEADERBOARD: false
};
exports.octagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 6,
    },
    LABEL: 'Octagon',
    VALUE: 20000,
    SHAPE: 8,
    SIZE: 82,
    COLOR: 0,
    BODY: {
        DAMAGE: 3 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 350 * basePolygonHealth,
        RESIST: Math.pow(1.25, 4),
        SHIELD: 70 * basePolygonHealth,
        REGEN: 1,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    CAN_BE_ON_LEADERBOARD: false
};
exports.heptagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Heptagon',
    VALUE: 10000,
    SHAPE: 7,
    SIZE: 58,
    COLOR: 32,
    BODY: {
        DAMAGE: 2.5 * basePolygonDamage,
        DENSITY: 20,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    CAN_BE_ON_LEADERBOARD: false
};
exports.hexagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Hexagon',
    VALUE: 1000,
    SHAPE: 6,
    SIZE: 34,
    COLOR: 1,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 10,
        HEALTH: 100 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 10 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    CAN_BE_ON_LEADERBOARD: false,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13, 
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
  
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 1,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};
exports.lhpenta = {
    PARENT: [exports.gfood],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 30000000,
    SHAPE: 5,
    SIZE: 58,
    COLOR: 0,
    BODY: {
        DAMAGE: 67,
        DENSITY: 12,
        HEALTH: 650,
        RESIST: 1.55,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    CAN_BE_ON_LEADERBOARD: false,
};
exports.lbpenta = {
    PARENT: [exports.gfood],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 5000000,
    SHAPE: 5,
    SIZE: 44,
    COLOR: 0,
    BODY: {
        DAMAGE: 5.5,
        DENSITY: 10.5,
        HEALTH: 550,
        RESIST: 1.35,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    CAN_BE_ON_LEADERBOARD: false,
};
exports.lpenta = {
  PARENT: [exports.gfood],
  LABEL: "Pentagon",
  VALUE: 800000,
  SHAPE: 5,
  SIZE: 17,
  COLOR: 0,
  BODY: {
    DAMAGE: 4,
    DENSITY: 10,
    HEALTH: 400,
    RESIST: 1.25,
    PENETRATION: 1.1
  },
  DRAW_HEALTH: true
};
exports.ltri = {
  PARENT: [exports.gfood],
  LABEL: "Triangle",
  VALUE: 240000,
  SHAPE: 5,
  SIZE: 15,
  COLOR: 0,
  BODY: {
    DAMAGE: 3.5,
    DENSITY: 9.5,
    HEALTH: 350,
    RESIST: 1.25,
    PENETRATION: 1.1
  },
  DRAW_HEALTH: true
};
exports.lsqu = {
  PARENT: [exports.gfood],
  LABEL: "Square",
  VALUE: 60000,
  SHAPE: 5,
  SIZE: 11,
  COLOR: 0,
  BODY: {
    DAMAGE: 3,
    DENSITY: 8.7,
    HEALTH: 300,
    RESIST: 1.25,
    PENETRATION: 1.1
  },
  DRAW_HEALTH: true
};
exports.jewel = {
  PARENT: [exports.gfood],
  LABEL: "Egg",
  VALUE: 500000,
  SHAPE: 6,
  SIZE: 5,
  COLOR: 3,
  BODY: {
    DAMAGE: 2,
    DENSITY: 7,
    HEALTH: 50,
    RESIST: 1.25,
    PENETRATION: 1.1
  },
  DRAW_HEALTH: true
};
exports.ghpenta = {
    PARENT: [exports.gfood],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 1500000,
    SHAPE: 5,
    SIZE: 68,
    COLOR: 14,
    BODY: {
        DAMAGE: 6,
        DENSITY: 12,
        HEALTH: 420,
        RESIST: 2.35,
        PENETRATION: 0.3,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    CAN_BE_ON_LEADERBOARD: false,
    IS_GREEN_SHAPE: true,
};
exports.gbpenta = {
    PARENT: [exports.gfood],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 250000,
    SHAPE: 5,
    SIZE: 44,
    COLOR: 1,
    BODY: {
        DAMAGE: 5,
        DENSITY: 10,
        HEALTH: 160,
        RESIST: 1.35,
        PENETRATION: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    CAN_BE_ON_LEADERBOARD: false,
    IS_GREEN_SHAPE: true,
};
exports.gpenta = {
    PARENT: [exports.gfood],
    LABEL: 'Pentagon',
    FOOD: {
      LEVEL: 3,
    },
    VALUE: 40000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 100,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
    IS_GREEN_SHAPE: true,
};
exports.gtri = {
    PARENT: [exports.gfood],
    LABEL: 'Triangle',
    FOOD: {
      LEVEL: 2,
    },
    VALUE: 12000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
    IS_GREEN_SHAPE: true,
};
exports.gsqu = {
    PARENT: [exports.gfood],
    LABEL: 'Square',
    FOOD: {
      LEVEL: 1,
    },
    VALUE: 3000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    IS_GREEN_SHAPE: true,
    INTANGIBLE: false,
};

exports.gem = {
    PARENT: [exports.gfood],
    LABEL: 'Gem',
    FOOD: {
      LEVEL: 0,
    },
    VALUE: 1000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    IS_GREEN_SHAPE: true,
    INTANGIBLE: false,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: 7,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};

    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
        LABEL: "Gravel",
    };
exports.wall = {
  PARENT: [exports.obstacle],
  COLOR: 16,
  SIZE: 153,
  SHAPE: 4,
  INTANGIBLE: true,
  VARIES_IN_SIZE: false,
  LABEL: "Wall"
};
exports.poisonEffect = {
  LABEL: "Poison",
  TYPE: "bullet",
  ACCEPTS_SCORE: false,
  COLOR: 11,
  SIZE: 5,
  BODY: {
    PENETRATION: 1,
    SPEED: 3.75,
    RANGE: 10,
    DENSITY: 1.25,
    HEALTH: 2,
    DAMAGE: 0,
    PUSHABILITY: 0.3
  },
  FACING_TYPE: "smoothWithMotion",
  CAN_GO_OUTSIDE_ROOM: true,
  HITS_OWN_TYPE: "never",
  // DIE_AT_LOW_SPEED: true,
  DIE_AT_RANGE: true,
};
exports.freezeEffect = {
  LABEL: "Freeze",
  TYPE: "bullet",
  ACCEPTS_SCORE: false,
  COLOR: 0,
  SIZE: 5,
  BODY: {
    PENETRATION: 1,
    SPEED: 3.75,
    RANGE: 10,
    DENSITY: 1.25,
    HEALTH: 2,
    DAMAGE: 0,
    PUSHABILITY: 0.3
  },
  FACING_TYPE: "smoothWithMotion",
  CAN_GO_OUTSIDE_ROOM: true,
  HITS_OWN_TYPE: "never",
  // DIE_AT_LOW_SPEED: true,
  DIE_AT_RANGE: true,
};
// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
    
};
exports.bulet = {
  PARENT: [exports.bullet],
  BODY: {
    SPEED: 5.75
  },
}
exports.miniGrowBullet = {
  PARENT: [exports.bullet], 
  MOTION_TYPE: 'miniGrow',
};
exports.growBullet = {
  PARENT: [exports.bullet],
  MOTION_TYPE: 'grow',
};
exports.megaGrowBullet = {
  PARENT: [exports.bullet],
  MOTION_TYPE: 'megaGrow',
};
exports.gigaGrowBullet = {
  PARENT: [exports.bullet],
  MOTION_TYPE: 'gigaGrow',
};
exports.ultraGrowBullet = {
  PARENT: [exports.bullet],
  MOTION_TYPE: 'ultraGrow',
  BODY: { HEALTH: unlimited }
};
exports.growBulet = {
  PARENT: [exports.bulet],
  MOTION_TYPE: 'grow',
};
exports.flare = {
  PARENT: [exports.bullet],
  SHAPE: 4,
  MOTION_TYPE: 'minifreezeGrow',
  DIE_AT_LOW_SPEED: true,
  DIE_AT_RANGE: false,
  BODY: {
    PENETRATION: 1,
        SPEED: 0.5,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
  //this is inferno's Flame
},
exports.bcb = {
  PARENT: [exports.bullet],
  LABEL: 'Bullet',
  TYPE: 'bullet',
  GUNS: [{
    POSITION: [18, 8, 1, 0, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.lowreload, g.lowpower]),
       TYPE: [exports.bullet, {PERSISTS_AFTER_DEATH: true,}],
        AUTOFIRE: true,
      }, },
     ],
  };
exports.trianglet = {
    LABEL: 'Harmful Triangle',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: [[-0.5,-1],[1.5,0],[-0.5,1]],   
    BODY: {
        PENETRATION: 3,
        SPEED: 2.5,
        RANGE: 30,
        DENSITY: 1,
        HEALTH: 0.5 * wepHealthFactor,
        DAMAGE: 20 * wepDamageFactor,
        PUSHABILITY: 1,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
};
exports.arrow = {
  LABEL: 'Arrow',
  TYPE: 'bullet',
  ACCEPTS_SCORE: false,
  SHAPE: [[1.7,-0.1],[1.9,-0.3],[2.5,0],[1.9,0.3],[1.7,0.1],
          [-0.393,0.1],[-0.8,0.3],[-1.65,0.25],[-1.1,0.1],[-1.3,0.1],
          [-1.3,-0.1],[-1.11,-0.1],[-1.65,-0.25],[-0.8,-0.303],[-0.39,-0.104]],
  BODY: {
      PENETRATION: 2.75,
      SPEED: 50,
      RANGE: 70,
      DENSITY: 1,
      HEALTH: 0.15 * wepHealthFactor,
      DAMAGE: 9 * wepDamageFactor,
      PUSHABILITY: 0,
  },
  FACING_TYPE: 'smoothWithMotion',
  CAN_GO_OUTSIDE_ROOM: true,
  HITS_OWN_TYPE: 'never',
  DIE_AT_RANGE: true,
};

//ghost bullet or poison thing
exports.ghbullet = {
PARENT: [exports.bullet],
  COLOR: 11,
  /*SHAPE: [
    [-0.45, -0.9],
    [0, -1],
    [0.25, -0.97],
    [0.5, -0.87],
    [0.708, -0.708],
    [0.87, -0.5],
    [0.97, -0.25],
    [1, 0],
    [0.97, 0.25],
    [0.87, 0.5],
    [0.708, 0.708],
    [0.5, 0.87],
    [0.25, 0.97],
    [0, 1],
    [-0.45, 0.9],
    [-0.8, 0.7],
    [-1.3, 0.3],
    [-1.8, 0],
    [-1.3, -0.3],
    [-0.8, -0.7] */
  SHAPE: 0,
  
};

exports.grlsquare = {
  PARENT: [exports.bullet],
  COLOR: 12,
  SHAPE: [[-0.2,-0.5],
          [0.2,-0.5],
          [0.2,0.5],
          [-0.2,0.5]
          ],
  };
exports.exllet = {
    LABEL: 'Extinguisher Smoke',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 2.75,
        RANGE: 60,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 3 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
};
exports.lazerbeam = {
    LABEL: 'lazerbeam',
    TYPE: 'bullet',
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    SHAPE: -1,
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 55,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
};

exports.hepullet = {
  PARENT: [exports.bullet],
  LABEL: "bullet",
  TYPE: "bullet",
  BODY: {    
    DAMAGE: -100 * wepDamageFactor,
  }
};
exports.sancullet = {
  PARENT: [exports.hepullet],
  DIE_AT_RANGE: true,
  DIE_AT_LOW_SPEED: false,
  BODY: {
    DAMAGE: -99 * wepDamageFactor,
    RANGE: 100,
  }
};
exports.poisonbullet = {
  PARENT: [exports.bullet],
  LABEL: "bullet",
  TYPE: "bullet",
  ACCEPTS_SCORE: false,
  POISON_TO_APPLY: 0,
  POISON: true,
  SHOWPOISON: true,
};
exports.freezebullet = {
  PARENT: [exports.bullet],
  LABEL: "bullet",
  TYPE: "bullet",
  ACCEPTS_SCORE: false,
  FREEZE_TO_APPLY: 0,
  FREEZED: true,
  SHOWFREEZE: true,
};
exports.bonkbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    INVISIBLE:[2, 2],
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
};
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };

exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };
exports.swasbullet = {
 PARENT: [exports.bullet],
 FACING_TYPE: 'autospin',
 GUNS: [{
   POSITION: [ 12, 8, 1, 0, 0, 90, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
       AUTOFIRE: true,
       TYPE: exports.bee,
        STAT_CALCULATOR: gunCalcNames.swarm,
      }, }, {
   POSITION: [ 12, 8, 1, 0, 0, -90, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
       AUTOFIRE: true,
       TYPE: exports.bee,
        STAT_CALCULATOR: gunCalcNames.swarm,
      }, },
   ],
  };
exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
    exports.block = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };
exports.poisontrap = {
  PARENT: [exports.trap],
  LABEL: "trap",
//TYPE: "bullet",
  COLOR: 1,
  ACCEPTS_SCORE: false,
  POISON_TO_APPLY: 0,
  POISON: true,
  SHOWPOISON: true,
};
    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };
exports.trichase = {
  LABEL: 'Boomerang',
  PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'chase',  
        HITS_OWN_TYPE: 'never',
        SHAPE: 3,
        BODY: {
            SPEED: 1.35,
            RANGE: 130,
        },
    };
exports.shuriken = {
        LABEL: 'Shuriken',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: [[0,-1.4],[0.4,-0.4],[1.4,0],[0.4,0.4],[0,1.4],[-0.4,0.4],[-1.4,-0.004],[-0.464,-0.312],[-0.09,-0.274],[-0.25,-0.16],[-0.316,0.004],[-0.28,0.198],[-0.137,0.34],[0.083,0.373],[0.273,0.29],[0.35,0.09],[0.313,-0.13],[0.156,-0.26],[-0.09,-0.274],[-0.466,-0.31]],        
        BODY: {
            SPEED: 1.5,
            RANGE: 100,
        },
    };
exports.drone = {
  LABEL: "Drone",
  TYPE: "drone",
  ACCEPTS_SCORE: false,
  DANGER: 2,
  CONTROL_RANGE: 0,
  SHAPE: 3,
  MOTION_TYPE: "chase",
  FACING_TYPE: "smoothToTarget",
  CONTROLLERS: [
    "nearestDifferentMaster",
    "canRepel",
    "mapTargetToGoal",
    "hangOutNearMaster"
  ],
  AI: { BLIND: true },
  BODY: {
    PENETRATION: 1.2,
    PUSHABILITY: 0.6,
    ACCELERATION: 0.05,
    HEALTH: 0.6 * wepHealthFactor,
    DAMAGE: 1.25 * wepDamageFactor,
    SPEED: 3.8,
    RANGE: 200,
    DENSITY: 0.03,
    RESIST: 1.5,
    FOV: 0.8
  },
  HITS_OWN_TYPE: "hard",
  DRAW_HEALTH: false,
  CLEAR_ON_MASTER_UPGRADE: true,
  BUFF_VS_FOOD: true
};
exports.autodrone = {
  PARENT: [exports.drone],
  INDEPENDENT: true,
  LABEL: 'Auto-Drone',
  BODY: {
    SPEED: 0.35,
    HEALTH: 3,
    DAMAGE: 2
  }
}
exports.poisondrone = {
  PARENT: [exports.drone],
  LABEL: 'drone', 
  COLOR: 1,
  ACCEPTS_SCORE: false,/*
  POISON_TO_APPLY: 0,
  POISON: true,
  SHOWPOISON: true,*/
}; 
exports.bigdrone = {
  PARENT: [exports.drone],
  
    SIZE: 20,
    
  };
    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
exports.penchip = {
        PARENT: [exports.drone],
        SHAPE: 5,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 3,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: true,
    };
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
exports.invchip = {
  PARENT: [exports.sunchip],
  INVISIBLE: [0.08,0.03],

  };
exports.trichip = {
  PARENT: [exports.sunchip],
  SHAPE: 3,
  };
exports.smolmissile = {
  PARENT: [exports.bullet],
  LABEL: 'Launchile',
  INDEPENDENT: true,
  BODY: {
  RANGE: 100,
  },
  GUNS: [{
    POSITION: [14, 6, 1, 0, 0, 180, 0],
     PROPERTIES: {
      AUTOFIRE: true,
       SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
         STAT_CALCULATOR: gunCalcNames.thruster,
    }, },
  ],
};
exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true, 
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
exports.cmissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
        SPEED: 3,
    },  
    FACING_TYPE: 'autospin',
    GUNS: [ { 
        POSITION: [  14,     6,      1,      0,      0,    180,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, },  {
        POSITION: [  14,     6,      1,      0,      0,     0,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, },
    ],
};
exports.ccmissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    FACING_TYPE: 'autospin',
    GUNS: [ { 
        POSITION: [  14,     6,      1,      0,      0,    180,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.cmissile, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, },  {
        POSITION: [  14,     6,      1,      0,      0,     0,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.cmissile, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, },
    ],
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.hypercmissile = {
        PARENT: [exports.missile],
        BODY: {
          ACCELERATION: 1.5,
          SPEED: 1.5
        },
        FACING_TYPE: 'autospin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      0,      90,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,      0,     180,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      0,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    }; 
exports.snaketer = {
  PARENT: [exports.bullet],
  LABEL: 'Rocketeer Bullet',
  BODY: {
    RANGE: 100
  },
  GUNS: [{
    POSITION: [ 6, 12, 1.2, 8, 0, 180, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
       TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
        AUTOFIRE: true,
         NEGATIVE_RECOIL: false,
          STAT_CALUCLATOR: gunCalcNames.thruster
    }, },
  ],
};
exports.useless = {
  PARENT: [exports.bullet],
  DIE_AT_LOW_SPEED: false,
  DIE_AT_RANGE: true,
  BODY: {
    RANGE: 500,
  },
  COLOR: 36
};
exports.fwbullet = {
  PARENT: [exports.bullet],
  DIE_AT_LOW_SPEED: false,
  DIE_AT_RANGE: true,
  BODY: {
    RANGE: 500,
  },
  TURRETS: [{
    POSITION: [20, 0, 0, 0, 360, 1],
    TYPE: exports.useless,
    },
  ],
};
exports.firework = {
  PARENT: [exports.bullet],
  LABEL: 'Firework',
  BODY: {
    RANGE: 100
  },
  GUNS: [{
    POSITION: [ 6, 12, 1.2, 8, 0, 180, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.bitlessspeed]),
       TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
        AUTOFIRE: true,
         NEGATIVE_RECOIL: false,
          STAT_CALUCLATOR: gunCalcNames.thruster
    }, },
  ],
};
for (let i = 0; i < 15; i++) {
  exports.firework.GUNS.push({
    POSITION: [1, 8, 1, 0, 0, (360 / 15) * i, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.fwbullet, { PERSISTS_AFTER_DEATH: true, }],
        SHOOT_ON_DEATH: true
  }, },
)};
 exports.mswarmb = {
  PARENT: [exports.bullet],
        LABEL: 'Swarmer Bullet',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      0,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     120,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     240,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, 
             ],
  }
    exports.swarmb = {
        PARENT: [exports.bullet],
        LABEL: 'Swarmer Bullet',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };
exports.m2swarmb = {
  PARENT: [exports.bullet],
        LABEL: 'Swarmer Bullet',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      0,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     90,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     180,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     270,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     45,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     135,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     225,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     315,    0.4,  ], 
               PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, },        
             ],
  }
// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
exports.pinkBodyTank = {
  PARENT: [exports.genericTank],
  COLOR: 5,
  BODY: {
    HEALTH: 120,
    SPEED: 50,
    FOV: 3,
    DENSITY: 3,
   }, 
  SKILL: [20, 20, 5, 0, 0, 0, 5, 0, 20, 20],
};
//uh 
let gun = { };

exports.autoTurret = {
  PARENT: [exports.genericTank],
  LABEL: "Turret",
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster",
  ],
  BODY: {
    FOV: 0.8,
  },
  COLOR: 16,
  //CONTROLLERS: ['nearestDifferentMaster'],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [22, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.gunner,
          g.power,
          g.morerecoil,
          g.turret,
        ]),
        TYPE: exports.bullet,
      },
    },
  ],
};
       
exports.arturret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',    
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { 
      POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
            }, },
    ],
};
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8,
    },
    COLOR: 16,
    // CONTROLLERS: ["nearestDifferentMaster"],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfreload]),
                TYPE: exports.trap, 
                STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
exports.megaTrapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8,
    },
    GUNS: [{
        POSITION: [  16,     14,      1,      0,      0,      0,      0,   ],
        }, {
        POSITION: [   6,     15,     1.7,    15,      0,      0,      0,   ], 
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap]),
           TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
        }, },
    ],
};
exports.hexaAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',    
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.morerecoil, g.turret, g.slow]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [  22,    10,      1,      0,      0,      120,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.morerecoil, g.turret, g.slow]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [  22,    10,      1,      0,      0,      240,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.morerecoil, g.turret, g.slow]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [  22,    10,      1,      0,      0,      60,      0.5,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.morerecoil, g.turret, g.slow]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [  22,    10,      1,      0,      0,      180,      0.5,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.morerecoil, g.turret, g.slow]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [  22,    10,      1,      0,      0,      300,      0.5,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.morerecoil, g.turret, g.slow]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.flankAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',    
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lesspower, g.morerecoil, g.turret, g.halfspeed]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [  22,    10,      1,      0,      0,      120,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lesspower, g.morerecoil, g.turret, g.halfspeed]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [  22,    10,      1,      0,      0,      240,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lesspower, g.morerecoil, g.turret, g.halfspeed]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.destroyerAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',    
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  25,    16,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.pound, g.lesspower, g.destroy]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.sniperAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',    
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  28,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.assassinAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',    
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  31,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
        }, }, {
        POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
        },
    ],
};
exports.singleAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',    
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
      PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.single, g.lowpower, g.lessreload]),
        TYPE: exports.bullet,
    }, },  {
    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
    }
  ],
};     
exports.mulgleAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',    
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
      PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.single, g.lowpower, g.lessreload]),
        TYPE: exports.bullet,
    }, },  {
    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
    }, {
    POSITION: [  19,     8,      1,      0,      0,      180,      0,   ], 
      PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.single, g.lowpower, g.lessreload]),
        TYPE: exports.bullet,
    }, },  {
    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      180,      0,   ],                         
    }
  ],
};  
exports.autoDoubleTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,      5,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      180,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
exports.celestialTrapTurret = {
  PARENT: [exports.genericTank],
  LABEL: "Turret",
  INDEPENDENT: true,
  COLOR: 16,
  GUNS: [{
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [16, 14, 1, 0, 0, 0, 0],
      }, {
      POSITION: [4, 14, 1.8, 16, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, [4, 1, 1, 1, 2, 1, 0.25, 1, 1, 1, 10, 1, 1]]),
        TYPE: exports.trap,
        STAT_CALCULATOR: gunCalcNames.trap,
        AUTOFIRE: true
      },
    },
  ],
};
let celestialTrapTurretArray = [];
for (let i = 0; i < 9; i++) {
  celestialTrapTurretArray.push({
    POSITION: [6, 9, 0, i * (360 / 9) + 360 / 9 / 2, 0, 0],
    TYPE: [exports.celestialTrapTurret, {CONTROLERS: ["nearestDifferentMaster"]}]
    },
  );
 };
//Paladin Bullets
exports.paladinSwarmer = {
  PARENT: [exports.genericTank],
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  COLOR: 14,
  BODY: {
    FOV: base.FOV * 4
  },
  LABEL: "Swarmer",
  GUNS: [{
    POSITION: [14, 14, -1.2, 5, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive, g.halfreload, g.celestialHive]),
       TYPE: exports.swarmb
     }, }, {
    POSITION: [15, 12, 1, 5, 0, 0, 0]
    },
  ],
};
exports.paladinSunchip = {
        PARENT: [exports.sunchip],
        SHAPE: 5,
        COLOR: 14,
        CONTROLLERS: ["nearestDifferentMaster"],
        BODY: {
        FOV: 0.5,
        HEALTH: 5,
        DAMAGE: 1
        },
        DRAW_HEALTH: false,
    };
//Freyja Bullets
exports.freyjaCruiserTurret = {
  PARENT: [exports.genericTank],
  LABEL: "",
  DANGER: 6,
  COLOR: 1,
  INDEPENDENT: false,
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  STAT_NAMES: statnames.swarm,
  BODY: {
    FOV: base.FOV * 10
  },
  GUNS: [{
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
        TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
      }, }, {
      POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
        TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
      },
    },
  ],
};
//Zaphkiel Bullets
exports.zaphkielSkimmer = {
  PARENT: [exports.genericTank],
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  COLOR: 2,
  BODY: {
  FOV: base.FOV * 1.15
  },
  LABEL: "Skimmer",
  DANGER: 7,
  INDEPENDENT: false,
  GUNS: [{
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [10, 14, -0.5, 9, 0, 0, 0]
      }, {
      POSITION: [17, 15, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.celestialSkimmer]),
        TYPE: exports.hypermissile,
        STAT_CALCULATOR: gunCalcNames.sustained
      },
    },
  ],
};
//Xerxes (Old Zaphkiel) Bullets
exports.xerxesSkimmer = {
  PARENT: [exports.genericTank],
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  COLOR: 14,
  BODY: {
  FOV: base.FOV * 1.15
  },
  LABEL: "Skimmer",
  DANGER: 7,
  INDEPENDENT: false,
  GUNS: [{
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [10, 14, -0.5, 9, 0, 0, 0]
      }, {
      POSITION: [17, 15, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.celestialSkimmer]),
        TYPE: exports.hypermissile,
        STAT_CALCULATOR: gunCalcNames.sustained
      },
    },
  ],
};
//Theia Bullets
exports.theiaSunchip = {
PARENT: [exports.sunchip],
SHAPE: 4,
COLOR: 13,
CONTROLLERS: ["nearestDifferentMaster"],
BODY: {
FOV: 0.5,
HEALTH: 3,
DAMAGE: 1
},
DRAW_HEALTH: false
};
exports.theiaMissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    COLOR: 13,
    INDEPENDENT: true,
    FACING_TYPE: 'autospin',
    BODY: {
        RANGE: 199,
        HEALTH: 1.5,
    },
    CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     0,     0,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true, 
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.muchmorerecoil, g.morespeed, g.morespeed, g.arty, g.arty, g.celestialSkimmer]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      0,    90,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.muchmorerecoil, g.morespeed, g.morespeed, g.arty, g.arty, g.celestialSkimmer]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, {
        POSITION: [  14,     6,      1,      0,     0,   180,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true, 
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.muchmorerecoil, g.morespeed, g.morespeed, g.arty, g.arty, g.celestialSkimmer]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      0,   270,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.muchmorerecoil, g.morespeed, g.morespeed, g.arty, g.arty, g.celestialSkimmer]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
      ],
};
                exports.theiaMissileShooter = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: '',
                DANGER: 7,
                COLOR: 16,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    15,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,    -1.3,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.celestialSkimmer, g.lowreload]),
                            TYPE: exports.theiaMissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
//Alviss Layers
exports.alvissLaunch = {
PARENT: [exports.genericTank],
BODY: {
FOV: 1.25,
},
LABEL: 'Alviss',
DANGER: 7,
COLOR: 17,
CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [  8,     11,    -0.5,    9,      0,      0,      0,  ], 
      }, {
      POSITION: [  16,     12,      1,     0,      0,      0,      0,  ],
       PROPERTIES: { 
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.arty, g.skim, g.celestialSkimmer]),
          TYPE: exports.smolmissile,
            STAT_CALCULATOR: gunCalcNames.sustained,
      }, },
   ],
 };
exports.alvissEggSwarm = {
  PARENT: [exports.swarm],
  PERSISTS_AFTER_DEATH: true, 
  SHAPE: 0, 
  LABEL: 'Egg Swarmer',
  COLOR: 6,
  BODY: {
    ACCELERATION: 3.5,
    HEALTH: 1,
    DAMAGE: 0.8,
    SPEED: 1
  },
  HITS_OWN_TYPE: 'hardWithBuffer',
};
exports.alvissEggShooter = {
  PARENT: [exports.genericTank],
  LABEL: 'Alviss',
  COLOR: 17,
  BODY: {
    FOV: 1.40
  },
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  GUNS: [{
    POSITION: [7, 6, -1.5, 9, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.celestialHive]),
      TYPE: exports.alvissEggSwarm
      }, },
    ],
  };
//Old Paladin Bullets
        exports.oldPaladinTwin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        COLOR: 10,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
exports.oldPaladinSunchip = {
        PARENT: [exports.sunchip],
        SHAPE: 4,
        COLOR: 10,
        CONTROLLERS: ["nearestDifferentMaster"],
        BODY: {
        FOV: 0.5,
        HEALTH: 5,
        DAMAGE: 1
        },
        DRAW_HEALTH: false,
    };
//ragnarok isn't an eternal????
let EternalTrapTurretArray = [];
for (let i = 0; i < 11; i++) {
  EternalTrapTurretArray.push({
    POSITION: [6, 9, 0, i * (360 / 11) + 360 / 11 / 2, 0, 0],
    TYPE: [exports.celestialTrapTurret, {CONTROLERS: ["nearestDifferentMaster"]}]
    },
  );
 };
//Kronos Bullets
exports.kronosAlphaSkim = {
  PARENT: [exports.bullet],
  LABEL: 'Alphaskimmer',
  DANGER: 8,
  INDEPENDENT: false,
  BODY: {
    HEALTH: 1.5,
    DAMAGE: 1.2,
    SPEED: 0.6
  },
  COLOR: 6,
  GUNS: [{
    POSITION: [14,     9,      1,      0,      0,     90,     0,   ],
    }, {
    POSITION: [   4,     9,     1.5,    14,      0,     90,     0,   ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, g.doublereload, g.power]),
       TYPE: exports.trap, 
        STAT_CALCULATOR: gunCalcNames.trap,
         AUTOFIRE: true,
    }, }, {
    POSITION: [14,     9,      1,      0,      0,     -90,     0,   ],
    }, {
    POSITION: [   4,     9,     1.5,    14,      0,     -90,     0,   ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, g.doublereload, g.power]),
       TYPE: exports.trap, 
        STAT_CALCULATOR: gunCalcNames.trap,
         AUTOFIRE: true,
    }, }, {
    POSITION: [   7,    7.5,    0,     7,      4,      130,      0,   ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.doublereload]),
       TYPE: exports.bullet,
        STAT_CALCULATOR: gunCalcNames.thruster,
         AUTOFIRE: true,               
    }, }, {
    POSITION: [   7,    7.5,    0,     7,     -4,      -130,     0.5,  ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.doublereload]),
       TYPE: exports.bullet,
         STAT_CALCULATOR: gunCalcNames.thruster, 
         AUTOFIRE: true,        
     }, },
    ],
  };
exports.kronosAlphaSkimLauncher = {
  PARENT: [exports.genericTank],
  LABEL: 'AlphaSkimmer',
  //INDEPENDENT: false,
  COLOR: 6,
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  GUNS: [{
    POSITION: [4, 14, 1.9, 15, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.destroy, g.arty, g.arty, g.celestialSkimmer]),
       TYPE: exports.kronosAlphaSkim
    }, }, {
    POSITION: [15, 16, 1.4, 0, 0, 0, 0],
    },
   ],
  };
                exports.kronosCarrier = {
                PARENT: [exports.genericTank],
                LABEL: '',
              /*  DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',*/
                BODY: {
                    FOV: base.FOV * 1.3,
                },
                CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
                COLOR: 16,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.kronosTriplet = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            COLOR: 16,
            LABEL: '',
            CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
//Ragnarok Bullets
let RagnarokTrapTurretArray = [];
for (let i = 0; i < 11; i++) {
    RagnarokTrapTurretArray.push({
    POSITION: [6, 9, 0, i * (360 / 11) + 360 / 11 / 2, 0, 0],
    TYPE: [exports.celestialTrapTurret, {CONTROLERS: ["nearestDifferentMaster"]}]
    },
  );
 };
exports.ragnarokGemDrone = {
  PARENT: [exports.drone],
  COLOR: 0,
  SIZE: 10,
  SHAPE: 6,
  BODY: {
    HEALTH: 4,
    DAMAGE: 4,
    ACCELERATION: 0.3,
    SPEED: 0.5
  },
};
exports.ragnarokTwinTurret = {
PARENT: [exports.genericTank],
LABEL: 'Turret',
COLOR: 16,
//CONTROLLERS: ['nearestDifferentMaster'],
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload, g.stronger]),
         TYPE: exports.bullet,
          STAT_CALCULATOR: gunCalcNames.fixedReload,
      }, }, {
      POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload, g.stronger]),
         TYPE: exports.bullet,
          STAT_CALCULATOR: gunCalcNames.fixedReload,
      }, },
    ],
};

exports.ragnarokSmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.ragnarokAutoSmash = {
  PARENT: [exports.bullet],
  LABEL: '',
  COLOR: 0,
  BODY: {
    HEALTH: 3,
    RANGE: 100,
    ACCELERATION: 1.5,
    SPEED: 1.5,
    FOV: 2
  },
  CONTROLLERS: ["nearestDifferentMaster"],
   TURRETS: [{
     POSITION: [22, 0, 0, 0, 360, 0],
     TYPE: exports.ragnarokSmashBody
     }, {
     POSITION: [11, 0, 0, 0, 360, 1],
     TYPE: exports.ragnarokTwinTurret
     },
   ],
};
exports.ragnarokAutoSmashLauncher = {
  PARENT: [exports.genericTank],
  LABEL: 'Ragnarok',
  COLOR: 16,
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  GUNS: [{
    POSITION: [18, 5, 2.45, 0, 0, 0, 0],
    }, {
    POSITION: [16, 14.5, 1.3, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.lowreload, g.lowreload, g.power]),
       TYPE: exports.ragnarokAutoSmash
    }, }, 
   ],
  };
exports.ragnarokGunCruise = {
  PARENT: [exports.genericTank],
  LABEL: 'Gunner Cruiser',
  COLOR: 16,
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
  POSITION: [  7,    7.5,     0.6,     4,     5.25,    0,     0.5,  ], 
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.battle, g.swarm, g.morespeed]),
     TYPE: exports.swarm,
      STAT_CALCULATOR: gunCalcNames.swarm
  }, }, { 
  POSITION: [  7,    7.5,     0.6,     4,    -5.25,    0,     0.75, ], 
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.battle, g.swarm, g.morespeed]),
     TYPE: exports.swarm,
      STAT_CALCULATOR: gunCalcNames.swarm
  }, }, { 
  POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.fast, g.fast, g.morespeed, g.morespeed, g.morespeed]),
     TYPE: exports.bullet,
  }, }, { 
  POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.fast, g.fast, g.morespeed, g.morespeed, g.morespeed]),
     TYPE: exports.bullet,
  }, }, 
 ],
};
//King Bullets
let KingTrapTurretArray = [];
for (let i = 0; i < 13; i++) {
    KingTrapTurretArray.push({
    POSITION: [6, 9, 0, i * (360 / 13) + 360 / 13 / 2, 0, 0],
    TYPE: [exports.celestialTrapTurret, {CONTROLERS: ["nearestDifferentMaster"]}]
    },
  );
 };
exports.kingJewel = {
  LABEL: "Jewel",
  TYPE: "drone",
  SHAPE: 6,
  SIZE: 5,
  COLOR: 36,
  ACCEPTS_SCORE: false,
  DANGER: 2,
  CONTROL_RANGE: 0,
  MOTION_TYPE: "chase",
  FACING_TYPE: "smoothToTarget",
  CONTROLLERS: [
    "nearestDifferentMaster",
    "canRepel",
    "mapTargetToGoal",
    "hangOutNearMaster"
  ],
  AI: { BLIND: true },
  HITS_OWN_TYPE: "hard",
  DRAW_HEALTH: false,
  CLEAR_ON_MASTER_UPGRADE: true,
  BUFF_VS_FOOD: true,
  BODY: {
    DAMAGE: 3,
    HEALTH: 69,
    REGEN: 10,
    ACCELERATION: 0.35,
    SPEED: 0.35
  },
};
exports.kingAutoJewel = makeAuto(exports.kingJewel, 'Jewel');
                exports.kingOcto = {
                PARENT: [exports.bullet],
                LABEL: 'Octo Tank',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, },
                ],
            };
exports.kingOctoLauncher = {
  PARENT: [exports.genericTank],
  LABEL: 'Launcher',
  CONTROLLERS: ['nearestDifferentMaster', 'onlyAcceptInArc'],
  COLOR: 36,
  GUNS: [{
    POSITION: [  24,    12,      1,      0,      0,      0,      0,   ]
    }, {
    POSITION: [  12,    15,     1.4,     9,      0,      0,      0,   ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.celestialSkimmer, g.celestialSkimmer, g.pound, g.lessreload, g.lessreload]),
       TYPE: [exports.kingOcto, { PERSISTS_AFTER_DEATH: true }],
    }, },
  ],
};
exports.mothershipdrone = {
    PARENT: [exports.drone],
    LABEL: 'Drone',
    BODY: {
      HEALTH: 3,
      DAMAGE: 2,
      SPEED: 3,
      //PENETRATION: 3
    },
 }; 
    exports.athenaCrasher = {
    PARENT: [exports.drone],
   // TYPE: 'crasher',
    LABEL: 'Mega Crasher',
    COLOR: 69,
    SHAPE: 3,
    SIZE: 10,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5.3,
        ACCEL: 0.01,
        HEALTH: 2,
        DAMAGE: 3,
        PENETRATION: 0.01,
        PUSHABILITY: 0,
        DENSITY: 0.01,
        RESIST: 1,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: false,
    DRAW_HEALTH: true,
    GIVE_KILL_MASSAGE: false,
};
let athenaDroneBodyData = [];
for (let i = 0; i < 7; i++) {
  athenaDroneBodyData.push({
    POSITION: [4, 6.5, 1.2, 7.5, 0, i * (360 / 7) + 360 / 7 / 2, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.celestial]),
       TYPE: exports.athenaCrasher,
        MAX_CHILDREN: 2,
    }, },
  );
 };
//Blaze Bullets
exports.blazeGravel = {
  PARENT: [exports.drone],
  LABEL: 'Gravel',
  SHAPE: -7,
  COLOR: 16,
  BODY: {
        SPEED: 5.3,
        ACCEL: 0.01,
        HEALTH: 2,
        DAMAGE: 3,
        PENETRATION: 0.01,
        PUSHABILITY: 0,
        DENSITY: 0.01,
        RESIST: 1,
    },
}; 
//Tyr Bullets
exports.tyrMinion = {
  PARENT: [exports.swarm],
  LABEL: '',
  DANGER: 7,
  COLOR: 6,
  SHAPE: 0,
  BODY: {
    FOV: 2.4,
    SPEED: 4,
    ACCELERATION: 0.9,
    HEALTH: 5,
    SHIELD: 0,
    DAMAGE: 1.7,
    RESIST: 1,
    PENETRATION: 1,
    DENSITY: 0.9,
    RANGE: 200,
 },
 DIE_AT_RANGE: true,
 AI: {
   BLIND: true,
   },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    //CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'canRepel', 'minion', 'mapTargetToGoal'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, },
      ],
   }; 
exports.tyrMinionLauncher = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 17,
    GUNS: [{
      POSITION: [14, 8, -1.5, 0, 0, 0, 0],
      }, {
      POSITION: [3, 13, 1, 14, 0, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.celestialHive]),
         TYPE: exports.tyrMinion,
          MAX_CHILDREN: 2,
      }, },
    ],
  };
//Fiolnir Bullets
exports.fiolnirBeekBullet = {
  PARENT: [exports.bullet],
  TURRETS: [{
    POSITION: [12, 0, 0, 0, 360, 1],
    TYPE: exports.autoTurret,
    SHOOT_SETTINGS: combineStats([g.basic, g.power]),
    },
  ],
};  
exports.fiolnirBeekeeper = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: '',
            CONTROLLERS: ['onlyAcceptInArc', 'nearestDifferentMaster'],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.lessreload]),
                        TYPE: exports.bee,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  12,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.lessreload]),
                        TYPE: exports.bee,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.lessreload, g.lessreload]),
                        TYPE: exports.fiolnirBeekBullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.fiolnirSplitCruiser = {
                PARENT: [exports.genericTank],
                LABEL: '',
              /*  DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',*/
                BODY: {
                    FOV: base.FOV * 1.3,
                },
                CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
                COLOR: 16,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      2,     20,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.battle, g.carrier, g.lowreload]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -20,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.battle, g.carrier, g.lowreload]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
exports.autoBoomerTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 14,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      6.8,     0,      0,      0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     17.8,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
    ],
};
exports.cepturret = {
  PARENT: [exports.genericTank],
  LABEL: 'Turret',
  COLOR: 16,
  GUNS: [{
    POSITION: [20, 10, 1, 0, 0, 180, 0,],
         }, 
        ],
    BODY: {
      FOV: 3,
      CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
       ],
     },
  };
   exports.ringcenter = {
       PARENT: [exports.genericTank],
       LABEL: "",
       COLOR: 16,
       SHAPE: [[0.393,0.91],[-0.02,1.013],[0.205,0.99],[0.4,0.913],[0.213,0.99],[-0.02,1.01],[-0.227,0.98],[-0.44,0.91],[-0.63,0.79],[-0.78,0.64],[-0.92,0.42],[-0.98,0.2],[-1.01,-0.015],[-0.97,-0.27],[-0.9,-0.454],[-0.74,-0.674],[-0.58,-0.8],[-0.43,-0.906],[-0.23,-0.98],[0.01,-1],[0.01,-0.885],[-0.23,-0.86],[-0.43,-0.74],[-0.62,-0.59],[-0.76,-0.4],[-0.835,-0.19],[-0.86,0.001],[-0.81,0.186],[-0.76,0.36],[-0.65,0.543],[-0.53,0.66],[-0.345,0.77],[-0.145,0.84],[0.09,0.863],[0.295,0.8],[0.477,0.68],[0.66,0.524],[0.75,0.336],[0.8,0.16],[0.834,-0.02],[0.82,-0.2],[0.784,-0.367],[0.67,-0.523],[0.527,-0.655],[0.407,-0.763],[0.227,-0.847],[0.007,-0.884],[0.007,-0.994],[0.25,-0.975],[0.447,-0.89],[0.62,-0.786],[0.74,-0.68],[0.86,-0.51],[0.914,-0.354],[0.99,-0.204],[1.01,-0.01],[1,0.166],[0.945,0.33],[0.88,0.46],[0.82,0.57],[0.75,0.67],[0.63,0.77],[0.52,0.84]],
       BODY: {
           FOV: 3,
           CONTROLLERS: [
             "canRepel",
             "onlyAcceptInArc",
             "mapAltToFire",
             "nearestDifferentMaster"
         ],
       }
     };
   exports.driveSign = {
     PARENT: [exports.genericTank],
     COLOR: 16,
     LABEL: "",
     SHAPE: 4,
     SIZE: 5,
       BODY: {
         FOV: 3,
         CONTORLLERS: [
           "canRepel",
           "onlyAcceptInArc",
           "mapAltToFire",
           "nearestDifferentMaster",
           ],
         }
        }  
   exports.autone = makeAuto(exports.drone, "Drone");
   exports.autob = makeAuto(exports.bullet ,"Bullet");
   exports.autrap = makeAuto(exports.trap, "Trap");
   exports.autos = makeAuto(exports.block, "Block");
   exports.bcirc = {
     PARENT: [exports.genericTank],
     COLOR: 10,
     SHAPE: 0,
     BODY: {
       FOV: 3,
       CONTROLLERS: [
       'canRepel', 
       'onlyAcceptInArc',
       'mapAltToFire',
       'nearestDifferentMaster',
       ],
   },
   };
exports.rcirc = {
     PARENT: [exports.genericTank],
     COLOR: 12,
     SHAPE: 0,
     BODY: {
       FOV: 3,
       CONTROLLERS: [
       'canRepel', 
       'onlyAcceptInArc',
       'mapAltToFire',
       'nearestDifferentMaster',
       ],
   },
   };
   exports.healSign = {
        PARENT:[exports.genericTank],
        COLOR: 12,
        LABEL: "",
        SHAPE: [
          [0.2,-0.8],
          [0.2,-0.196],
          [0.8,-0.196],
          [0.8,0.2],
          [0.204,0.2],
          [0.2,0.8],
          [-0.2,0.8],
          [-0.2,0.2],
          [-0.8,0.2],
          [-0.807,-0.2],
          [-0.2,-0.2],
          [-0.2,-0.8]],
        BODY: {
           FOV: 3,
           CONTROLLERS: [
             "canRepel",
             "onlyAcceptInArc",
             "mapAltToFire",
             "nearestDifferentMaster"
         ],
       }
    }
    exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
                    TYPE: exports.bullet,
                }, },
        ],
    };

    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.PurpleAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 14,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  18,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
exports.auto2gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    9,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
exports.auto4diepgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  23,    10.5,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.auto7gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  25,    12,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 2,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
exports.masterGun2 = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 4,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        }, 
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.sniper3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,     9,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
                    TYPE: exports.bullet,
                }, }, /*{
            POSITION: [   5,     9,     -1.5,    8,      0,      0,      0,   ], 
            },*/
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.Auto4generic = {
        PARENT: [exports.genericTank],
        LABEL: '',
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };

exports.architgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.smasherBody2 = {
  LABEL: '',
  CONTROLLERS: ['fastspin'],
  COLOR: 9,
  SHAPE: 6,
  INDEPENDENT: true,
  },
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.megasmashBody2 = {
    LABEL: '',
    CONTROLLERS: ['fastspin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };
exports.dominatorBody2 = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['dontTurn'], 
        SHAPE: [[-0.5,-0.866],[-1,0],[-0.5,0.866],[0.5,0.866],[1,0],[0.5,-0.866]],
        BODY: {
            FOV: 3,
        },
        COLOR: 9,
    };
exports.destroyerDominator = {
        PARENT: [exports.genericTank],
        LABEL: 'Dominator',
        CAN_BE_ON_LEADERBOARD: false,
        ACCEPTS_SCORE: false,
        COLOR: 12,
        PENETRATION: 1000,
        SIZE: 30,
        SKILL: [10, 10, 10, 10, 10, 0, 0, 0, 0, 0,],
        BODY: {
            FOV: 1,
            SPEED: base.SPEED * 0.5,
            HEALTH: base.HEALTH * 60,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 10,
        },
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
               POSITION: [  24,     0,      0,      0,     360, 0],
               TYPE: [exports.dominatorBody2, { INDEPENDENT: true, COLOR: 9}]
               },                            
        ],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     7,      1,      8,      0,      0,      0,   ], 
             PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic,g.protectorswarm,g.halfspeed,g.trifront]),
               TYPE: exports.bullet
            }, }, {
            POSITION: [  5.5,    7,    -1.8,    6.5,     0,      0,      0,   ],
            },
      ],
};
exports.gunnerDominator = {
        PARENT: [exports.genericTank],
        LABEL: 'Dominator',
        CAN_BE_ON_LEADERBOARD: false,
        ACCEPTS_SCORE: false,
        COLOR: 12,
        PENETRATION: 1000,
        SIZE: 30,
        SKILL: [10, 10, 10, 10, 10, 0, 0, 0, 0, 0,],
        BODY: {
            FOV: 1,
            SPEED: base.SPEED * 0.5,
            HEALTH: base.HEALTH * 60,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 10,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     3,       1,     0,      2,      0,      0.5,   ], 
             PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic,[1.25,  0,  1.5,    0.6,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2]]),
               TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     3,       1,     0,      -2,      0,      0.5,   ], 
             PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic,[1.25,  0,  1.5,    0.6,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2]]),
               TYPE: exports.bullet,
            }, }, {
            POSITION: [  15,     3,       1,     0,      0,      0,      0,   ], 
             PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic,[1.25,  0,  1.5,    0.6,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2]]),
               TYPE: exports.bullet,
            }, }, {
            POSITION: [  5.5,    9,    -1.8,     5.5,     0,      0,      0,   ],
            },
        ],
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
               POSITION: [  24,     0,      0,      0,     360, 0],
               TYPE: [exports.dominatorBody2, { INDEPENDENT: true, COLOR: 9}]
                },                            
        ],
};
exports.trapperDominator = {
        PARENT: [exports.genericTank],
        LABEL: 'Dominator',
        CAN_BE_ON_LEADERBOARD: false,
        PENETRATION: 1000,
        FACING_TYPE:'autospin',
        ACCEPTS_SCORE: false,
        COLOR: 12,
        SIZE: 30,
        SKILL: [10, 10, 10, 10, 10, 0, 0, 0, 0, 0,],
        BODY: {
            FOV: 1,
            SPEED: base.SPEED * 0.5,
            HEALTH: base.HEALTH * 60,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 10,
        },
        GUNS: [],
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
               POSITION: [  24,     0,      0,      0,     360, 0],
               TYPE: [exports.dominatorBody2, { INDEPENDENT: true, COLOR: 9}]
               },                            
        ],
  };
  for (let i = 0; i < 8; i++) {
  exports.trapperDominator.GUNS.push({
          POSITION: [  6.5,      4,      1,     5,     0,      (360 / 8) * i,      0,   ],
          }, {
          POSITION: [   1,     4,     1.5,    12,    0,       (360 / 8) * i,      0,   ], 
           PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone,g.pound]),
             TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE:true,
          }, },
     );
};
  exports.sancturret = {
    PARENT: [exports.genericTank],
    LABEL: '', 
    CONTROLLERS: ['fastspin'],
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  19,     7,     1.2,     0,      0,      0,      0],
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.lowreload]),
           TYPE: exports.sancullet,
            AUTOFIRE: true,
        }, }, {
        POSITION: [  17,     9,      1,      0,      0,      0,      0],
        }, {
        POSITION: [  19,     7,     1.2,     0,      0,     120,      0],
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.lowreload]),
           TYPE: exports.sancullet,
            AUTOFIRE: true,
        }, }, {
        POSITION: [  17,     9,      1,      0,      0,     120,      0],
        }, {
        POSITION: [  19,     7,     1.2,     0,      0,     240,      0],
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.lowreload]),
           TYPE: exports.sancullet,
            AUTOFIRE: true,
        }, }, {
        POSITION: [  17,     9,      1,      0,      0,      240,      0],
        }, 
    ],
    TURRETS: [{         /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [  18,   0,      0,      0,     360,  1,], 
      TYPE: exports.healSign,
    },
   ],
  };
  exports.sanctuary = {
        PARENT: [exports.genericTank],
        LABEL: 'Sanctuary',
        CAN_BE_ON_LEADERBOARD: false,
        FACING_TYPE:'autospin',
        ACCEPTS_SCORE: false,
        COLOR: 10,
        SIZE: 60,
        SKILL: [10, 10, 10, 10, 10, 0, 0, 0, 0, 0,],
        BODY: {
            FOV: 1,
            SPEED: base.SPEED * 0.5,
            HEALTH: base.HEALTH * 50,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 10,
            PUSHABILITY: 0,
        },
        GUNS: [],
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
               POSITION: [  24,     0,      0,      0,     360, 0],
               TYPE: [exports.dominatorBody2, { INDEPENDENT: true, COLOR: 9}]
               },/* {
               POSITION: [10, 0, 0, 0, 360, 1],
               TYPE: exports.sancturret,
               },*/
        ],
  };
  for (let i = 0; i < 7; i++) {
  exports.sanctuary.GUNS.push({
          POSITION: [  6.5,      4,      1,     5,     0,      (360 / 7) * i,      0,   ],
          }, {
          POSITION: [   1,     4,     1.5,    12,    0,       (360 / 7) * i,      0,   ], 
           PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone,g.pound]),
             TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE:true,
          }, },
     );
};/*
exports.mainsanctuary = {
        PARENT: [exports.genericTank],
        LABEL: 'Main Sanctuary',
        CAN_BE_ON_LEADERBOARD: false,
        FACING_TYPE:'autospin',
        ACCEPTS_SCORE: false,
        COLOR: 10,
        SIZE: 60,
        SKILL: [10, 10, 10, 10, 10, 0, 0, 0, 0, 0,],
        BODY: {
            FOV: 1,
            SPEED: base.SPEED * 0.5,
            HEALTH: base.HEALTH * 250,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 10,
            PUSHABILITY: 0,
        },
        GUNS: [],
        TURRETS: [{/* SIZE     X       Y     ANGLE    ARC 
               POSITION: [  24,     0,      0,      0,     360, 0],
               TYPE: [exports.dominatorBody2, { INDEPENDENT: true, COLOR: 9}]
               },/* {
               POSITION: [10, 0, 0, 0, 360, 1],
               TYPE: exports.sancturret,
               },
        ],
  };
  for (let i = 0; i < 10; i++) {
  exports.sanctuary.GUNS.push({
          POSITION: [  6.5,      4,      1,     5,     0,      (360 / 7) * i,      0,   ],
          }, {
          POSITION: [   1,     4,     1.5,    12,    0,       (360 / 7) * i,      0,   ], 
           PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.pound, g.pound]),
             TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE:true,
          }, },
     );
};*/
exports.desanctuaroyed = {
  PARENT: [exports.genericTank],
  LABEL: 'Destroyed Sanctuary',
  CAN_BE_ON_LEADERBOARD: false,
  ACCEPTS_SCORE: false,
  COLOR: 3,
  SIZE: 30,
  BODY: {
    HEALTH: base.HEALTH * 30,
    DAMAGE: base.DAMAGE * 60,
    REGEN: base.REGEN,
    SHIELD: base.SHIELD,
    PUSHABILITY: 0,
  },
  TURRETS: [{
    POSITION: [24, 0, 0, 0, 360, 0],
    TYPE: [exports.dominatorBody2, { INDEPENDENT: true, COLOR: 9 }],
    },
  ],
};
exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};

                exports.mfactory2 = {
                PARENT: [exports.minion],
                LABEL: '',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };
                exports.mfactory3 = {
                PARENT: [exports.minion],
                LABEL: '',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
                            TYPE: exports.mfactory3,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };

  exports.baboost = {
  PARENT: [exports.drone],
  CONTROLLERS: ["nearestDifferentMaster"],
  LABEL: "",
  COLOR: 16,
  SHAPE: 0,
  GUNS: [{
      POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
        TYPE: exports.bullet,
        LABEL: gunCalcNames.thruster
      }, }, {
      POSITION: [13, 8, 1, 0, -1, 135, 0.6],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
        TYPE: exports.bullet,
        LABEL: gunCalcNames.thruster
      }, }, {
      POSITION: [13, 8, 1, 0, 1, 225, 0.6],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
        TYPE: exports.bullet,
        LABEL: gunCalcNames.thruster
      }, }, {
      POSITION: [16, 8, 1, 0, 0, 145, 0.1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
        TYPE: exports.bullet,
        LABEL: gunCalcNames.thruster
      }, },{
      POSITION: [16, 8, 1, 0, 0, 215, 0.1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
        TYPE: exports.bullet,
        LABEL: gunCalcNames.thruster
      }, },
   ],
};
exports.twinion = {
  PARENT: [exports.minion],
  GUNS: [{
      POSITION: [17, 9, 1, 0, 5.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
        WAIT_TO_CYCLE: true,
        TYPE: exports.bullet,
        }, }, {
      POSITION: [17, 9, 1, 0, -5.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
        WAIT_TO_CYCLE: true,
        TYPE: exports.bullet,
        }, },
     ],
  };
exports.destroyminion = {
 PARENT: [exports.minion],
 GUNS: [{
     POSITION: [21, 14, 1, 0, 0, 0, 0],
      PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
        TYPE: exports.bullet,
     }, },
   ],
 };
exports.buildminion = {
 PARENT: [exports.minion],
 GUNS: [{
     POSITION: [18, 14, 1, 0, 0, 0, 0]
     }, {
     POSITION: [2, 14, 1.1, 18, 0, 0, 0], 
      PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.trap, g.block]),
        TYPE: exports.block,
     }, },
  ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.dangerboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion, g.turret, g.power, g.lesspower, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [  20,    8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion, g.turret, g.power, g.lesspower, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },       
    ],
};
exports.battleturret = {
  PARENT: [exports.genericTank],
  LABEL: '',
  DANGER: 1,
  SHAPE: 0,
 };
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.dangerbox = {
    LABEL: 'Dangerbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.dangerboxTurret,
        },
    ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
        }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
        },
    ],
};
    exports.skimboss = {
        PARENT: [exports.genericTank],
        LABEL: 'Elite Skimmer',
        BODY: {
            HEALTH: 300,
            DAMAGE: 2,
            SHIELD: 200,
        },
        SHAPE: 3, 
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimturret,
                    },
        ],
    };
exports.ek3rdBody = {
  LABEL: "",
  COLOR: 9,
  SHAPE: 15,
  INDEPENDENT: true
};
exports.huntert = {
  PARENT: [exports.genericTank],
  LABEL: "EK-3 Hunter Turret",
  DANGER: 6,
  COLOR: 6,
  BODY: {
    ACCELERATION: base.ACCEL * 0.7,
    SPEED: base.SPEED * 0.9,
    FOV: base.FOV * 1.25
  },
  GUNS: [{
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [24, 12, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.stronger, g.basic, g.sniper, g.hunter]),
        TYPE: exports.bullet
      }, }, {
      POSITION: [21, 16, 1, 0, 0, 0, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.stronger, g.basic, g.sniper, g.hunter]),
        TYPE: exports.bullet
      },
    },
  ],
};
  exports.whitedirector = {
  PARENT: [exports.genericTank],
  LABEL: "Director",
  STAT_NAMES: statnames.drone,
  DANGER: 5,
  COLOR: 6,
  BODY: {
    ACCELERATION: base.ACCEL * 0.75,
    FOV: base.FOV * 1.1
  },
  MAX_CHILDREN: 5,
  GUNS: [{
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [6, 12, 1.2, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
        TYPE: exports.drone,
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.drone
      },
    },
  ],
};
     exports.spgray = {
     PARENT: [exports.genericTank],
     LABEL: '',
     COLOR: 16,
     GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
           POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
              TYPE: exports.bullet,
           }, }, {
           POSITION: [  12,    10,     1.4,     9,      0,      0,      0,   ], 
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
               TYPE: exports.bullet,
           }, },
       ],
    };
    exports.spinfm = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Machine',
        COLOR: 5,
        CONTROLLERS: ['reversespin'],
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
                AUTOFIRE: true
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      120,    0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
                AUTOFIRE: true
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      240,    0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
                AUTOFIRE: true
            }, },     
        ],
    };
  exports.bomb = {
  LABEL: "Bomb",
  PARENT: [exports.bullet],
  SHAPE: [
    [-1.48, -0.99],
    [0.5, -1],
    [1, -0.5],
    [1, 0.5],
    [0.5, 1],
    [-1, 1],
    [-1.5, 0.99],
    [-1.99, 0.51],
    [-2.5, 0.98],
    [-3, 0.99],
    [-3, -1],
    [-2.5, -1],
    [-2, -0.52]
  ],
  BODY: {
    RANGE: 50
  },         
  GUNS: [{
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [4, 8, 1, 0, 0, 0, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, }, {
     POSITION: [4, 8, 1, 0, 0, 90, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, }, {
      POSITION: [4, 8, 1, 0, 0, 180, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, }, {
      POSITION: [4, 8, 1, 0, 0, 270, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, },
    ],
  };
exports.boomb = {
  LABEL: "Bomb",
  PARENT: [exports.bullet],
  SHAPE: [
    [-1.48, -0.99],
    [0.5, -1],
    [1, -0.5],
    [1, 0.5],
    [0.5, 1],
    [-1, 1],
    [-1.5, 0.99],
    [-1.99, 0.51],
    [-2.5, 0.98],
    [-3, 0.99],
    [-3, -1],
    [-2.5, -1],
    [-2, -0.52]
  ],
  BODY: {
    RANGE: 100
  },         
  GUNS: [{
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [4, 8, 1, 0, 0, 0, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, }, {
     POSITION: [4, 8, 1, 0, 0, 90, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, }, {
      POSITION: [4, 8, 1, 0, 0, 180, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, }, {
      POSITION: [4, 8, 1, 0, 0, 270, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, }, {
      POSITION: [4, 8, 1, 0, 0, 45, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, }, {
     POSITION: [4, 8, 1, 0, 0, 135, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, }, {
      POSITION: [4, 8, 1, 0, 0, 225, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, }, {
      POSITION: [4, 8, 1, 0, 0, 315, 0],
       PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, g.boom]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true}],
        SHOOT_ON_DEATH: true
      }, },
    ],
  };
        exports.flankpoison = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        CONTROLLERS: ['fastspin'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.poisonbullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.poisonbullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.poisonbullet,
                }, },
        ],
    };
        exports.fpb = {
        PARENT: [exports.bullet],
        LABEL: '',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        CONTROLLERS: ['fastspin'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.poisonbullet,
                    AUTOFIRE: true
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.poisonbullet,
                    AUTOFIRE: true
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.poisonbullet,
                    AUTOFIRE: true
                }, },
        ],
    };
        exports.hexapoison = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        CONTROLLERS: ['fastspin'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.pound, g.pound]),
                    TYPE: exports.poisonbullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.pound, g.pound]),
                    TYPE: exports.poisonbullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.pound, g.pound]),
                    TYPE: exports.poisonbullet,
                }, }, {
            POSITION: [  18,     8,      1,      0,      0,      60,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.pound, g.pound]),
                    TYPE: exports.poisonbullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.pound, g.pound]),
                    TYPE: exports.poisonbullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     300,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.pound, g.pound]),
                    TYPE: exports.poisonbullet,
                }, }, 
        ],
    };
exports.fplaunch = {
  PARENT: [exports.genericTank],
  LABEL: '',
  CONTROLLERS: ['spin'],
  GUNS: [{
  POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
     TYPE: [exports.fpb, { AUTOFIRE: true }],
  }, },
 ],
};
              exports.mhove = {
              PARENT: [exports.minion],
              LABEL: '',
              DANGER: 6,
              GUNS: [{
                POSITION: [17.5, 7.8, 1, 0, 0, 0, 0]
                }, {
                POSITION: [16, 8.7, -1.2, 0, 0, 0, 0],
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                   TYPE: exports.bomb
                }, }, {
                POSITION: [4.5, 8.5, -1.8, 6.5, 0, 0, 0]
                },
              ],
            };
          exports.batt = {
          PARENT: [exports.genericTank],
          LABEL: '',
          DIE_AT_RANGE: true,
          BODY: {
            RANGE: 300,
          },
          GUNS: [{
            POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
            }, {
            POSITION: [2, 8, 1, 14, 0, 0, 0],
            }, {
            POSITION: [   4,     8,     1.5,    16,      0,      0,      0,   ], 
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.trap]),
             TYPE: exports.autrap, 
              STAT_CALCULATOR: gunCalcNames.trap,
               AUTOFIRE: true,
                MAX_CHILDREN: 1
            }, }, {
            POSITION: [  14,     8,      1,      0,      0,      90,      0,   ],
            }, {
            POSITION: [2, 8, 1, 14, 0, 90, 0],
            }, {
            POSITION: [   4,     8,     1.5,    16,      0,      90,      0,   ], 
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.trap]),
             TYPE: exports.autrap,
              STAT_CALCULATOR: gunCalcNames.trap,
               AUTOFIRE: true,
                MAX_CHILDREN: 1
            }, }, {
            POSITION: [  14,     8,      1,      0,      0,      180,      0,   ],
            }, {
            POSITION: [2, 8, 1, 14, 0, 0, 240],
            }, {
            POSITION: [   4,     8,     1.5,    16,      0,      180,      0,   ], 
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.trap]),
             TYPE: exports.autrap, 
              STAT_CALCULATOR: gunCalcNames.trap,
               AUTOFIRE: true,
                MAX_CHILDREN: 1
            }, }, {
            POSITION: [  14,     8,      1,      0,      0,      180,      0,   ],
            }, {
            POSITION: [2, 8, 1, 14, 0, 0, 240],
            }, {
            POSITION: [   4,     8,     1.5,    16,      0,      180,      0,   ], 
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.trap]),
             TYPE: exports.autrap,
              STAT_CALCULATOR: gunCalcNames.trap,
               AUTOFIRE: true,
                MAX_CHILDREN: 1
            }, },
          ],
        };
          exports.btt = {
          PARENT: [exports.genericTank],
          LABEL: '',
          MAX_CHILDREN: 1,
          DIE_AT_RANGE: true,
          BODY: {
            RANGE: 300,
          },
          GUNS: [{
            POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
            }, {
            POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
             PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
                 AUTOFIRE: true,
                  MAX_CHILDREN: 1
            }, }, {
            POSITION: [  14,     8,      1,      0,      0,      120,      0,   ],
            }, {
            POSITION: [   4,     8,     1.5,    14,      0,      120,      0,   ], 
             PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap, 
                STAT_CALCULATOR: gunCalcNames.trap,
                 AUTOFIRE: true,
                  MAX_CHILDREN: 1
            }, }, {
            POSITION: [  14,     8,      1,      0,      0,      240,      0,   ],
            }, {
            POSITION: [   4,     8,     1.5,    14,      0,      240,      0,   ], 
             PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap, 
                STAT_CALCULATOR: gunCalcNames.trap,
                 AUTOFIRE: true,
                  MAX_CHILDREN: 1
            }, },
          ],
        };
exports.ctmissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    FACING_TYPE: 'autospin',
    GUNS: [ { 
        POSITION: [  14,     6,      1,      0,      0,     0,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.halfreload, g.lowpower, g.muchmorerecoil, g.morespeed]),
                TYPE: [exports.btt, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, {
        POSITION: [  14,     6,      1,      0,      0,     90,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.halfreload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.batt, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, {
        POSITION: [  14,     6,      1,      0,      0,     180,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.halfreload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.btt, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, {
        POSITION: [  14,     6,      1,      0,      0,     270,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.halfreload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.batt, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, },
    ],
};
exports.eggdrone = {
    PARENT: [exports.drone],
    LABEL: 'Egg',
    SHAPE: 0,
    COLOR: 6,
    BODY: {
        DAMAGE: 3,
        DENSITY: 2.9,
        HEALTH: 2.5,
    },
};
exports.eq3body = {
  LABEL: "",
  COLOR: 9,
  SHAPE: 12,
  INDEPENDENT: true
};
exports.eq3minion = {
  PARENT: [exports.minion],
    LABEL: 'Minion', 
    TYPE: 'minion',
    BODY: {
        FOV: 0.7,
        SPEED: 3.2,
        ACCELERATION: 0.45,
        HEALTH: 5,
        SHIELD: 0.2,
        DAMAGE: 1.25,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.45,
    },
    COLOR: 6,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: [exports.bullet, { COLOR: 19 }],
        }, }, 
    ],
};
exports.eq3spawn = {
  PARENT: [exports.genericTank],
  LABEL: 'Spawner',
  BODY: {
    FOV: 1.05
  },
  GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
        }, {
        POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
         PROPERTIES: {          
          MAX_CHILDREN: 4,
           SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
            TYPE: exports.eq3minion,
             STAT_CALCULATOR: gunCalcNames.drone,                        
              AUTOFIRE: true,
               SYNCS_SKILLS: true,  
        }, }, {                        
        POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
        }
     ],
 };
exports.eq3musket = {
  PARENT: [exports.genericTank],
  LABEL: 'Musketeer',
  GUNS: [{
    POSITION: [9, 7, -1.2, 5, 0, 180, 0],
    }, {
    POSITION: [16, 5, 0, 0, 3, 0, 0],
    }, {
    POSITION: [16, 5, 0, 0, -3, 0, 0],
    }, {
    POSITION: [1, 5, 0, 16.3, -3, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lowpower, g.fast]),
       TYPE: [exports.trap, { COLOR: 19 }],
    }, }, {
    POSITION: [0, 5, 0, 16.3, -2, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lowpower, g.fast]),
       TYPE: [exports.trap, { COLOR: 19 }],
    }, }, {
    POSITION: [0, 5, 0, 16.3, -1, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lowpower, g.fast]),
       TYPE: [exports.trap, { COLOR: 19 }],
    }, }, {
    POSITION: [1, 5, 0, 16.3, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lowpower, g.fast]),
       TYPE: [exports.trap, { COLOR: 19 }],
    }, }, {
    POSITION: [0, 5, 0, 16.3, 1, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lowpower, g.fast]),
       TYPE: [exports.trap, { COLOR: 19 }],
    }, }, {
    POSITION: [0, 5, 0, 16.3, 2, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lowpower, g.fast]),
       TYPE: [exports.trap, { COLOR: 19 }],
    }, }, {
    POSITION: [0, 5, 0, 16.3, 3, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lowpower, g.fast]),
       TYPE: [exports.trap, { COLOR: 19 }],
    }, }, {
    POSITION: [5, 13, 1.5, 16, 0, 0, 0],
    }, 
  ],
};
  let grendata = [];
  for (let i = 0; i < 23; i++) {
  grendata.push({
    POSITION: [1, 4, -0, 0, 0, i * (360 / 23) + 360 / 23 / 2, 0],
     PROPERTIES: {
      AUTOFIRE: true,
       SHOOT_SETTINGS: combineStats([g.basic, g.op, g.gunner, g.arty, g.twin, g.sniper, g.spread, g.skim]),
        TYPE: exports.growBulet
    }, }, 
  )
}
exports.grenade = {
PARENT: [exports.bulet],
GUNS: [...grendata]
},
exports.boomba = {
PARENT: [exports.bulet],
LABEL: '',  
INDEPENDENT: true,
  BODY: {
  RANGE: 100,
},  
GUNS: [{
  POSITION: [14, 10, 1, 0, 0, 180, 0],
   PROPERTIES: {
    AUTOFIRE: true,
     SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
      TYPE: [exports.growBulet, { PERSISTS_AFTER_DEATH: true, }],
       STAT_CALCULATOR: gunCalcNames.thruster,
    }, }, {
  POSITION: [1, 4, 1, 0, 0, 180, 2.2],
   PROPERTIES: {
    AUTOFIRE: true,
     SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
      TYPE: [exports.grenade, { PERSISTS_AFTER_DEATH: true, }],
       STAT_CALCULATOR: gunCalcNames.thruster,
    }, }, 
  ],
};
exports.sk3snaket = {
  PARENT: [exports.bullet],
  LABEL: '',
  BODY: {
    RANGE: 100
  },
  GUNS: [{
    POSITION: [ 6, 12, 1.2, 8, 0, 180, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed, g.lessreload]),
       TYPE: [exports.snaketer, { PERSISTS_AFTER_DEATH: true, }],
        AUTOFIRE: true,
         NEGATIVE_RECOIL: false,
          STAT_CALUCLATOR: gunCalcNames.thruster
    }, },
  ],
};
exports.sk3rocket = {
  PARENT: [exports.genericTank],
  LABEL: '',
  GUNS: [{
      POSITION: [ 10, 11, -0.5, 14, 0, 0, 0],
      }, {
      POSITION: [ 21, 12, -1.4, 0, 0, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.skim, g.lowreload]),
         TYPE: exports.sk3snaket,
      }, },
   ],
};
            exports.auto3I2 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
exports.sk3minion = {
    PARENT: [exports.eq3minion],
    LABEL: '',
    COLOR: 13,
    SHAPE: 4,
    MAX_CHILDREN: 4,
    GUNS: [{
      POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      90,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      90,      0.1,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      90,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      180,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      180,      0.2,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      180,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      270,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      270,      0.3,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      270,      0,   ], 
      },
   ],
  TURRETS: [{
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.auto3I2, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto3I2, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.auto3I2, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto3I2, { COLOR: 13 }],
    },
  ],
};
        exports.conqtory = {
            PARENT: [exports.genericTank],
            LABEL: '',
            GUNS: [{
                POSITION: [21, 14, 1, 0, 0, 180, 0],
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                   TYPE: exports.destroyminion,
                    AUTOFIRE: true,
                     MAX_CHILDREN: 4
                }, }, {
                POSITION: [18, 14, 1, 0, 0, 0, 0], 
                }, {
                POSITION: [2, 14, 1.1, 18, 0, 0, 0], 
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                   TYPE: exports.buildminion,
                    AUTOFIRE: true,
                     MAX_CHILDREN: 4
                }, }, 
            ],
        };
exports.ek4body = {
  LABEL: "",
  COLOR: 9,
  SHAPE: 12,
  SIZE: 6,
  INDEPENDENT: true
};
exports.ek4assassin = {
  PARENT: [exports.genericTank],
  LABEL: 'Twin-Assassin',
  COLOR: 16,
  GUNS: [{
    POSITION: [9, 5, 1, 2, 6.5, 0, 0],
    }, {
    POSITION: [9, 5, 1, 12, 6.5, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
       TYPE: exports.bullet
    }, }, {
    POSITION: [9, 5, 1, 2, -6.5, 0, 0.5],
    }, {
    POSITION: [9, 5, 1, 12, -6.5, 0, 0.5],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
       TYPE: exports.bullet
  }, }, 
 ], 
};

exports.ek4eaglepound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: '',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.ek4eagle = makeBird(exports.ek4eaglepound, 'Turret');
exports.ek4eagle.BODY = {
  HEALTH: base.HEALTH * 2.5,
  DAMAGE: base.DAMAGE * 1.8
}
exports.ek4eagle.COLOR = 6;
exports.ek4eagle.PARENT = [exports.minion];
        exports.ek4falconassassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: '',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, g.doublereload]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
exports.ek4falcon = makeBird(exports.ek4falconassassin, 'Turret');
exports.ek4falcon.BODY = {
  HEALTH: base.HEALTH * 2.5,
  DAMAGE: base.DAMAGE * 1.8
}
exports.ek4falcon.PARENT = [exports.minion];
exports.ek4falcon.COLOR = 6;
exports.ultraeggturret = (() => {
  let stat = combineStats([g.basic, g.lessreload, g.power]);
  return {
  PARENT: [exports.genericTank],
  LABEL: '',
  COLOR: 16,
  GUNS: [{
    POSITION: [10, 3.5, 1, 0, 8, 0, 1.5],
     PROPERTIES: {
      SHOOT_SETTINGS: stat,
       TYPE: exports.bullet,
    }, }, {
    POSITION: [10, 3.5, 1, 0, -8, 0, 1.5],
     PROPERTIES: {
      SHOOT_SETTINGS: stat,
       TYPE: exports.bullet,
    }, }, {
    POSITION: [13, 3.5, 1, 0, 6, 0, 1],
     PROPERTIES: {
      SHOOT_SETTINGS: stat,
       TYPE: exports.bullet,
    }, }, {
    POSITION: [13, 3.5, 1, 0, -6, 0, 1],
     PROPERTIES: {
      SHOOT_SETTINGS: stat,
       TYPE: exports.bullet,
    }, }, {
    POSITION: [16, 3.5, 1, 0, 4, 0, 0.5],
     PROPERTIES: {
      SHOOT_SETTINGS: stat,
       TYPE: exports.bullet,
    }, }, {
    POSITION: [16, 3.5, 1, 0, -4, 0, 0.5],
     PROPERTIES: {
      SHOOT_SETTINGS: stat,
       TYPE: exports.bullet,
    }, }, {
    POSITION: [19, 2, 1, 0, 2, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: stat,
       TYPE: exports.bullet,
    }, }, {
    POSITION: [19, 2, 1, 0, -2, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: stat,
       TYPE: exports.bullet,
    }, },
  ],
}})();
            exports.ultraeggpenta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                COLOR: 16,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.66, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.lesspower, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.lesspower, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.lesspower, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.lesspower, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.lesspower, g.morereload]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.ultraegg = {
  PARENT: [exports.minion],
  LABEL: 'Ultra Egg',
  SHAPE: 8,
  COLOR: 6,
  TURRETS: [{
    POSITION: [12, 0, 0, 0, 360, 1],
    TYPE: [exports.ultraeggturret, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, 0, 180, 0],
    TYPE: [exports.ultraeggpenta, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, 90, 180, 0],
    TYPE: [exports.ultraeggpenta, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, 180, 180, 0],
    TYPE: [exports.ultraeggpenta, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, 270, 180, 0],
    TYPE: [exports.ultraeggpenta, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, 20, 180, 0],
    TYPE: [exports.autoTurret, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, -20, 180, 0],
    TYPE: [exports.autoTurret, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, 110, 180, 0],
    TYPE: [exports.autoTurret, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, -110, 180, 0],
    TYPE: [exports.autoTurret, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, 200, 180, 0],
    TYPE: [exports.autoTurret, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, -200, 180, 0],
    TYPE: [exports.autoTurret, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, 290, 180, 0],
    TYPE: [exports.autoTurret, { COLOR: 16 }],
    }, {
    POSITION: [4, 0, 10.5, -290, 180, 0],
    TYPE: [exports.autoTurret, { COLOR: 16 }],
    },
  ],
  GUNS: [{
    POSITION: [11, 4, 0.55, 7, 2.5, 45, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [11, 4, 0.55, 7, -2.5, 45, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [11, 4, 0.55, 7, 2.5, 135, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [11, 4, 0.55, 7, -2.5, 135, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [11, 4, 0.55, 7, 2.5, 225, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [11, 4, 0.55, 7, -2.5, 225, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [11, 4, 0.55, 7, 2.5, 315, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [11, 4, 0.55, 7, -2.5, 315, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, 
  ],
};
exports.revolutionistring = {
  PARENT: [exports.genericTank],
  LABEL: 'Ring',
  SHAPE: 'M 0 -1 A 0.9 0.9 90 0 0 0 1 A 0.9 0.9 90 0 0 0 -1 L -0.005 -0.848 A 0.6 0.6 90 0 1 -0.005 0.859 A 0.6 0.6 90 0 1 0.002 -0.855',
  COLOR: 17,
  CONTROLLERS: ["slowSpin"],
  TURRETS: [{
    POSITION: [6, 10, 0, 315, 210, 1],
    TYPE: exports.autoTurret,
    SHOOT_SETTINGS: combineStats([g.basic]),
    }, {
    POSITION: [6, 10, 0, 135, 210, 1],
    TYPE: exports.autoTurret,
    SHOOT_SETTINGS: combineStats([g.basic]),
    }
  ]
}
function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
} 
function makeBird(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
      POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
         TYPE: exports.bullet,
          LABEL: gunCalcNames.thruster,
      }, };
    let spawner2 = {
      POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
         TYPE: exports.bullet,
          LABEL: gunCalcNames.thruster,
      }, };
    let spawner3 = {
      POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],     
       PROPERTIES: {      
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
         TYPE: exports.bullet,
          LABEL: gunCalcNames.thruster,
      }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner, spawner2, spawner3]; }
    else { output.GUNS = [...type.GUNS, spawner, spawner2, spawner3]; }
    if (name == -1) { output.LABEL = 'Bird ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}
exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.freezebullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
}
exports.page2 = {
PARENT: [exports.genericTank],
LABEL: 'Page 2',
GUNS: [{ /*** LENGTH WIDTH ASPECT X  Y ANGLE DELAY */
  POSITION: [    18,    8,    1,   0, 0,  0,    0   ],
  PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic]),
    TYPE: exports.bullet,
    }, },
  ],
};
exports.page3 = {
PARENT: [exports.genericTank],
LABEL: 'Page 3',
GUNS: [ { /*** LENGTH WIDTH ASPECT X  Y ANGLE DELAY */
  POSITION: [    18,    8,    1,   0, 0,  0,    0   ],
  PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic]),
    TYPE: exports.bullet,
    }, },
  ],
};
exports.ppage2 = {
PARENT: [exports.genericTank],
LABEL: 'Back',
GUNS: [ { /*** LENGTH WIDTH ASPECT X  Y ANGLE DELAY */
  POSITION: [    18,    8,    1,   0, 0,  0,    0   ],
  PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic]),
    TYPE: exports.bullet,
    }, },
  ],
};
exports.ppage1 = {
PARENT: [exports.genericTank],
LABEL: 'Back',
GUNS: [ { /*** LENGTH WIDTH ASPECT X  Y ANGLE DELAY */
  POSITION: [    18,    8,    1,   0, 0,  0,    0   ],
  PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic]),
    TYPE: exports.bullet,
    }, },
  ],
};
exports.bbase = makeHybrid(exports.basic, 'Basebrid');
exports.ausid = makeAuto(exports.bbase, 'Auto-Basebrid');
exports.swas = {
  PARENT: [exports.genericTank],
  LABEL: 'Swasic',
 // FACING_TYPE: 'autospin',
  GUNS: [{
    POSITION: [ 18, 8, 1, 0, 0, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.lesspower]),
        TYPE: exports.swasbullet,
    }, }, {
    POSITION: [ 18, 12, -1.3, 0, 0, 180, 0], 
    },  
   ],
  };
exports.tswas = {
  PARENT: [exports.genericTank],
  LABEL: 'Twasic',
 // FACING_TYPE: 'autospin',
  GUNS: [{
    POSITION: [ 18, 8, 1, 0, -5.5, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.lowpower]),
        TYPE: exports.swasbullet,
    }, }, {
    POSITION: [ 18, 8, 1, 0, 5.5, 0, 0.5],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.lowpower]),
        TYPE: exports.swasbullet,
    }, }, {
    POSITION: [ 18, 12, -1.3, 0, 0, 180, 0], 
    },  
   ],
  };
exports.sswas = {
  PARENT: [exports.genericTank],
  LABEL: 'Sniwasic',
 // FACING_TYPE: 'autospin',
  GUNS: [{
    POSITION: [ 24, 8, 1, 0, 0, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lowpower]),
        TYPE: exports.swasbullet,
    }, }, {
    POSITION: [ 18, 12, -1.3, 0, 0, 180, 0], 
    },  
   ],
  };
exports.mswas = {
PARENT: [exports.genericTank],
  LABEL: 'Machwasic',
 // FACING_TYPE: 'autospin',
  GUNS: [{ 
 POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lowpower, g.lesspower]),
                TYPE: exports.swasbullet, 
              }, }, {
    POSITION: [ 18, 12, -1.3, 0, 0, 180, 0], 
    },  
   ],
  };
exports.cleth = {
    PARENT: [exports.genericTank],
    LABEL: 'Clether', 
    
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
          }, }, {
        POSITION: [  8,     8,      1,     18,      0,      0,      0,   ],
                        }, {
        POSITION: [   4,     8,     1.5,   26,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
         }, },    
      ],
  };
exports.band = {
  PARENT: [exports.genericTank],
  LABEL: 'Band',
  GUNS: [{
      POSITION: [18, 8, 1, 0, 0, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.swarm, g.doublereload, g.doublereload, g.doublereload]),
         TYPE: exports.bee,
          STAT_CALCULATOR: gunCalcNames.swarm,
      }, },
   ],
};
exports.decess = {
  PARENT: [exports.genericTank],
  LABEL: 'Decessor',
  GUNS: [{
      POSITION: [18, 8, 1, 0, 5, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [18, 8, 1, 0, -5, 0, 0.5],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.swarm, g.doublereload, g.doublereload, g.doublereload]),
         TYPE: exports.bee,
          STAT_CALCULATOR: gunCalcNames.swarm,
      }, },
   ],
};
exports.scout = {
  PARENT: [exports.genericTank],
  LABEL: 'Scout',
  GUNS: [{
      POSITION: [24, 8, 1, 0, 0, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lessreload]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.swarm, g.doublereload, g.doublereload, g.doublereload]),
         TYPE: exports.bee,
          STAT_CALCULATOR: gunCalcNames.swarm,
      }, },
   ],
};
exports.revist = {
PARENT: [exports.genericTank],
LABEL: 'Revolutionist',
GUNS: [{ /*** LENGTH WIDTH ASPECT X  Y ANGLE DELAY */
  POSITION: [   18,    8,    1,   0, 0,  0,    0   ],
  PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic]),
    TYPE: exports.bullet,
    }, },
  ],
TURRETS: [{
  POSITION: [45, 0, 0, 0, 360, 1],
  TYPE: exports.revolutionistring
  },
 ],
};
exports.pbasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Poisoner', 
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 12, -1.4, 0, 0, 0, 0],
        }, {
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lowpower]),
            TYPE: exports.poisonbullet,
        }, }, {
        POSITION: [15, 3, 1, 0, 0, 0, 0],
        PROPERTIES: {
          COLOR: 1,
        }, },
    ],
};

exports.ptwin = {
    PARENT: [exports.genericTank],
    LABEL: 'Spreadeser', 
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 14, -1.4, 5, 0, 0, 0],
         }, {
        POSITION: [  18,     8,      1,      0,      -5.5,      0,      0.5,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfreload, g.lowpower]),
            TYPE: exports.poisonbullet,
        }, }, {
        POSITION: [  18,     8,      1,      0,      5.5,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin,  g.halfreload, g.lowpower]),
            TYPE: exports.poisonbullet,
        }, }, {
        POSITION: [15, 3, 1, 0, -5.5, 0, 0],
        PROPERTIES: {
          COLOR: 1,
        }, }, {
        POSITION: [15, 3, 1, 0, 5.5, 0, 0],
        PROPERTIES: {
          COLOR: 1,
        }, },
    ],
};
exports.pdouble = {
    PARENT: [exports.genericTank],
    LABEL: 'Doubleter', 
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 12, -1.4, 0, 0, 0, 0],
        }, {
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lowpower]),
            TYPE: exports.poisonbullet,
        }, }, { 
        POSITION: [15, 12, -1.4, 0, 0, 180, 0],
        }, {
        POSITION: [  18,     8,      1,      0,      0,      180,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lowpower]),
            TYPE: exports.poisonbullet,
        }, }, {
        POSITION: [15, 3, 1, 0, 0, 0, 0],
        PROPERTIES: {
          COLOR: 1,
        }, }, {
        POSITION: [15, 3, 1, 0, 0, 180, 0],
        PROPERTIES: {
          COLOR: 1,
        }, }, 
     ],
  };
exports.pflank = {
    PARENT: [exports.genericTank],
    LABEL: 'Flanketer', 
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 12, -1.4, 0, 0, 0, 0],
        }, {
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lowpower]),
            TYPE: exports.poisonbullet,
        }, }, { 
        POSITION: [15, 12, -1.4, 0, 0, 120, 0],
        }, {
        POSITION: [  18,     8,      1,      0,      0,      120,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lowpower]),
            TYPE: exports.poisonbullet,
        }, }, {
        POSITION: [15, 12, -1.4, 0, 0, 240, 0],
        }, {
        POSITION: [  18,     8,      1,      0,      0,      240,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lowpower]),
            TYPE: exports.poisonbullet,
        }, }, {
        POSITION: [15, 3, 1, 0, 0, 0, 0],
        PROPERTIES: {
          COLOR: 1,
        }, }, {
        POSITION: [15, 3, 1, 0, 0, 120, 0],
        PROPERTIES: {
          COLOR: 1,
        }, }, {
        POSITION: [15, 3, 1, 0, 0, 240, 0],
        PROPERTIES: {
          COLOR: 1,
        }, },   
    ],
};
exports.ppound = {
    PARENT: [exports.genericTank],
    LABEL: 'Hevoisoner', 
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [17, 14, -1.3, 0, 0, 0, 0],
        }, {
        POSITION: [  20,     12,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.lowpower]),
            TYPE: exports.poisonbullet,
        }, },  {
        POSITION: [15, 6, 1, 0, 0, 0, 0],
        PROPERTIES: {
          COLOR: 1,
        }, },
    ],
};
exports.pdirect = {
    PARENT: [exports.genericTank],
    LABEL: 'Toxector', 
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [4, 12, -1.4, 8, 0, 0, 0],
         }, {
        POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.doublereload]),
                    TYPE: exports.poisondrone,
                    MAX_CHILDREN: 4,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
        }, }, {
        POSITION: [4, 6, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
          COLOR: 1,
        }, }, 
    ],
};
exports.basicep = {
    PARENT: [exports.genericTank],
    LABEL: 'Basiceptioner', 
    
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lesspower]),
            TYPE: exports.bcb,
            
        }, }, 
    ],
 TURRETS: [{
   POSITION: [12, 0, 0, 0, 360, 1],
   TYPE: exports.cepturret,
   },
 ],          
}
exports.twinicep = {
    PARENT: [exports.genericTank],
    LABEL: 'Twiniceptioner', 
    
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      -5.5,      0,     0.5,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfreload, g.lowpower, g.lesspower]),
            TYPE: exports.bcb,
          }, }, {  
        POSITION: [  18,     8,      1,      0,      5.5,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfreload, g.lowpower, g.lesspower]),
            TYPE: exports.bcb,
          }, },
    ],
 TURRETS: [{
   POSITION: [12, 0, 0, 0, 360, 1],
   TYPE: exports.cepturret,
   },
 ],          
}
exports.snicep = {
    PARENT: [exports.genericTank],
    LABEL: 'Sniceptioner', 
    BODY: {
    ACCELERATION: base.ACCEL * 0.7, 
    FOV: base.FOV * 1.2,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  24,     8.5,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lowpower, g.lesspower]),
            TYPE: exports.bcb,
            
        }, }, 
    ],
 TURRETS: [{
   POSITION: [12, 0, 0, 0, 360, 1],
   TYPE: exports.cepturret,
   },
 ],          
}
exports.drive = {
  PARENT: [exports.genericTank],
  LABEL: 'Driver',
  GUNS: [{
    POSITION: [18, 8, 1, 0, 0, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.lesspower]),
        TYPE: exports.autob
       }, },
      ],
  TURRETS: [{
    POSITION: [12, 0, 0, 0, 360, 1],
     TYPE: exports.driveSign
    },
   ], 
  };
exports.tdrive = {
  PARENT: [exports.genericTank],
  LABEL: 'Twinriver',
  GUNS: [{           
    POSITION: [18, 8, 1, 0, -5.5, 0, 0.5],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.lowpower, g.halfreload]),
        TYPE: exports.autob
       }, }, {
    POSITION: [18, 8, 1, 0, 5.5, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.lowpower, g.halfreload]),
        TYPE: exports.autob
       }, },     
      ],
  TURRETS: [{
    POSITION: [12, 0, 0, 0, 360, 1],
    TYPE: exports.driveSign
    },
  ], 
};
exports.snive = {
  PARENT: [exports.genericTank],
  LABEL: 'Sniver',
  GUNS: [{
    POSITION: [24, 8.5, 1, 0, 0, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lowpower]),
        TYPE: exports.autob
    }, },
  ],
  TURRETS: [{
    POSITION: [12, 0, 0, 0, 360, 1],
    TYPE: exports.driveSign
    },
  ], 
};
exports.mgrow = { 
  PARENT: [exports.genericTank],
  LABEL: 'Mini-Grower',
  GUNS: [{
    POSITION: [ 23, 8, 1, 0, 0, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
        TYPE: exports.miniGrowBullet,
       }, }, {
    POSITION: [ 5, 12, 1, 16, 0, 0, 0],
       },
     ],
    };
exports.tmgrow = { 
  PARENT: [exports.genericTank],
  LABEL: 'Twin Mini-Grower',
  GUNS: [{
    POSITION: [ 23, 8, 1, 0, -5.5, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
        TYPE: exports.miniGrowBullet,
       }, }, {
    POSITION: [ 23, 8, 1, 0, 5.5, 0, 0.5],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
        TYPE: exports.miniGrowBullet,
       }, }, {
    POSITION: [ 5, 24, 1, 16,0, 0, 0],
       }, 
     ],
    };
exports.smgrow = { 
  PARENT: [exports.genericTank],
  LABEL: 'Misnipe-Grower',
  BODY: { 
        ACCELERATION: base.ACCEL * 0.7, 
        FOV: base.FOV * 1.2, 
        }, 
  GUNS: [{
    POSITION: [ 29, 8, 1, 0, 0, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound]),
        TYPE: exports.miniGrowBullet,
       }, }, {
    POSITION: [ 5, 12, 1, 22, 0, 0, 0],
       },
     ],
    };
exports.grow = {
  PARENT: [exports.genericTank],
  LABEL: 'Grower',
  GUNS: [{
    POSITION: [ 23, 12, 1, 0, 0, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
        TYPE: exports.growBullet,
       }, }, {
    POSITION: [ 5, 16, 1, 16, 0, 0, 0],
       },
     ],
    };
exports.amgrow = makeAuto(exports.mgrow, 'Auto-Mini-Grower');
exports.m2grow = {
  PARENT: [exports.genericTank],
  LABEL: 'Mega-Grower',
  GUNS: [{
    POSITION: [ 23, 16, 1, 0, 0, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
        TYPE: exports.megaGrowBullet,
       }, }, {
    POSITION: [ 5, 20, 1, 16, 0, 0, 0],
       },
     ],
    };
exports.agrow = makeAuto(exports.grow, 'Auto-Grower');
exports.ggrow = {
  PARENT: [exports.genericTank],
  LABEL: 'Giga-Grower',
  GUNS: [{
    POSITION: [ 23, 20, 1, 0, 0, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
        TYPE: exports.gigaGrowBullet,
       }, }, {
    POSITION: [ 5, 24, 1, 16, 0, 0, 0],
       },
     ],
    };
exports.am2grow = makeAuto(exports.m2grow, 'Auto-Mega-Grower');
exports.ninja = {
    PARENT: [exports.genericTank],
    LABEL: 'Ninja', 
    DENSITY: base.DENSITY * -99999,
    INVISIBLE: [0.8,0.3],
    BODY: {
        SHIELD: base.SHIELD * -0.5,
        REGEN: base.REGEN * 0.1,
        HEALTH: base.HEALTH * -3,
        SPEED: base.SPEED * 3.5,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  1,     8,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.power]),
            TYPE: exports.shuriken,
        }, }, 
      ],
  TURRETS: [{         /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [ 10,   12,      0,      0,     360,  0,], 
                TYPE: exports.shuriken,
            }],
},
exports.shurikenthrow = {
    PARENT: [exports.genericTank],
    LABEL: 'Shuriken Thrower',
    BODY: {
        SHIELD: base.SHIELD * -0.5,
        REGEN: base.REGEN * 0.1,
        HEALTH: base.HEALTH * -3,
        SPEED: base.SPEED * 2,
          },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  0.1,     5,      1,     0,     0,    -30,       0, ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.slowpo, g.norecoil]),
            TYPE: exports.shuriken,
            }, }, {
        POSITION: [  0.1,     5,      1,     0,     0,     0,   0.333, ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.slowpo, g.norecoil]),
            TYPE: exports.shuriken,
            }, }, {
        POSITION: [  0.1,     5,      1,     0,     0,     30,   0.666, ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.slowpo, g.norecoil]),
            TYPE: exports.shuriken,
            }, },
        ],
  TURRETS: [{         /** SIZE     X       Y     ANGLE    ARC */
              POSITION: [  7,     12,      0,    -30,     360,  0,],
              TYPE: exports.shuriken,},
            { POSITION: [  7,     12,      0,     30,     360,  0,],
              TYPE: exports.shuriken,},
            { POSITION: [  7,     12,      0,      0,     360,  0,],
              TYPE: exports.shuriken,},
            ],

  };
exports.crossbow = {
    PARENT: [exports.genericTank],
    LABEL: 'Crossbow', 
    SHAPE: [[1.36,-0.24],
            [1.5,-0.2],
            [1.2,-0.1],
            [1.16,0.08],
            [0.506,0.08],
            [0.325,0.077],
            [-0.515,0.077],
            [-0.506,-0.103],
            [1.096,-0.1],
            [1.142,-0.31],
            [1.197,-0.412],
            [1.21,-0.506],
            [1.12,-0.62],
            [0.866,-0.74],
            [0.286,-0.87],
            [0.075,-1.057],
            [-0.026,-1.3],
            [-0.51,0.08],
            [-1.1,0.077],
            [-1.1,-0.2],
            [-0.5,-0.2],
            [0,-1.5],
            [0.1,-1.2],
            [0.3,-1],
            [0.5,-0.9],
            [0.75,-0.85],
            [1,-0.8],
            [1.2,-0.7],
            [1.3,-0.6],
            [1.33,-0.5],
            [1.3,-0.4],
            [1.254,-0.35],
            [1.206,-0.202],
            [1.2,0.001],
            [1.2,0],
            [1.2,0.1],
            [1.5,0.2],
            [1.36,0.24],
            [1.25,0.3],
            [1.3,0.4],
            [1.33,0.5],
            [1.3,0.6],
            [1.2,0.7],
            [1,0.8],
            [0.75,0.85],
            [0.5,0.9],
            [0.3,1],
            [0.1,1.2],
            [0,1.5],
            [-0.506,0.2],
            [-1.1,0.2],
            [-1.097,-0.07],
            [-0.52,-0.027],
            [-0.34,0.405],
            [-0.04,1.197],
            [0.207,0.91],
            [0.45,0.79],
            [0.72,0.74],
            [0.976,0.686],
            [1.14,0.607],
            [1.214,0.525],
            [1.202,0.425],
            [1.125,0.275],
            [1.106,0.187],
            [1.102,0.077],
            [1.254,-0.35]
           ],
        BODY:{ 
           ACCELERATION: base.ACCEL * 0.7,
           FOV: base.FOV * 1.85,
           DENSITY: base.DENSITY * 1.5
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY*/
        POSITION: [  10,   5.85,     0,     -1,      0,      0,      0,],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.bow, g.slowpo, g.slowpo]),
            TYPE: exports.arrow,
        }, }, 
    ],
};
  exports.heal = {
    PARENT: [exports.genericTank],
    LABEL: 'Healer', 
    BODY: {
        SHIELD: base.SHIELD * 1000,
        REGEN: base.REGEN * 1000,
        HEALTH: base.HEALTH * 1000,
        DAMAGE: base.DAMAGE * 9,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  21,    7,      1.2,    0,      0,      0,      0],
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic]),
           TYPE: exports.hepullet,
        }, }, {
        POSITION: [  18,     9,      1,      0,      0,      0,      0],
        }, 
    ],
    TURRETS: [{         /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [  17,   0,      0,      0,     360,  1,], 
      TYPE: exports.healSign,
    },
   ],
  };
  exports.medic = {
    PARENT: [exports.genericTank],
    LABEL: 'Medic', 
    BODY: {
        SHIELD: base.SHIELD * 1000,
        REGEN: base.REGEN * 1000,
        HEALTH: base.HEALTH * 1000,
        DAMAGE: base.DAMAGE * 9,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  25,    7,      1.2,    0,      0,      0,      0],
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.power]),
           TYPE: exports.hepullet,
        }, }, {
        POSITION: [  22,     9,      1,      0,      0,      0,      0],
        }, 
    ],
    TURRETS: [{/** SIZE     X       Y     ANGLE    ARC */
      POSITION: [  17,   0,      0,      0,     360,  1,], 
      TYPE: exports.healSign,
    }
   ],
  };
  exports.paramedic = {
    PARENT: [exports.genericTank],
    LABEL: 'Paramedic', 
    BODY: {
        SHIELD: base.SHIELD * 1000,
        REGEN: base.REGEN * 1000,
        HEALTH: base.HEALTH * 1000,
        DAMAGE: base.DAMAGE * 9,
    },
    GUNS: [ {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17.5,    7,     1.2,     0,     -2,     -10,    0.5],
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic]),
           TYPE: exports.hepullet,
        }, }, {
        POSITION: [  14.5,     9,     1,      0,     -2,     -10,     0],
        }, {
        POSITION: [  17.5,    7,     1.2,     0,      2,      10,    0.5],
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic]),
           TYPE: exports.hepullet,
        }, }, {
        POSITION: [  14.5,     9,     1,      0,      2,      10,     0],
        }, {
        POSITION: [  21,    7,     1.2,     0,      0,      0,      0],
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic]),
           TYPE: exports.hepullet,
        }, }, {
        POSITION: [  18,     9,     1,      0,      0,      0,      0],
        }, 
    ],
    TURRETS: [{         /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [  17,   0,      0,      0,     360,  1,], 
      TYPE: exports.healSign,
    },
   ],
  };
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.lesspower]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  
exports.assail = makeAuto(exports.single, 'Assailant');
exports.glock19 = makeAuto(exports.single, 'Glock-19', { type: exports.singleAutoTurret });
exports.glock19gen5 = makeAuto(exports.single, 'Glock-19 Gen 5', { type: exports.mulgleAutoTurret }); 
exports.mulgle = {
                PARENT: [exports.genericTank],
                LABEL: 'Married',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.lesspower]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }, {
                    POSITION: [  19,     8,      1,      0,      0,      180,      0],                         
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.lesspower]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      180,      0,   ],                         
                    }   
                ],
            };
exports.tick = makeAuto(exports.mulgle, 'Ticker');
exports.glock19X = makeAuto(exports.mulgle, 'Glock-19 X', { type: exports.singleAutoTurret });
exports.plock = {
                PARENT: [exports.genericTank],
                LABEL: 'Plocker',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.lesspower]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }, {
                    POSITION: [  19,     8,      1,      0,      0,      90,      0],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.lesspower]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      90,      0,   ],                         
                    }, {
                    POSITION: [  19,     8,      1,      0,      0,      180,      0],                         
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.lesspower]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      180,      0,   ],                         
                    }, {
                    POSITION: [  19,     8,      1,      0,      0,      270,      0],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.lesspower]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      270,      0,   ],                         
                    }, 
                ],
            };
exports.strong = makeAuto(exports.plock, 'Stronger');
           exports.pellet = {
             PARENT: [exports.genericTank],
             LABEL: 'Pelleter',
             GUNS: [{
              POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]), 
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, 
                ],
            }; 
exports.submachine = {
PARENT: [exports.genericTank],
LABEL: 'Sub-Machine',
DANGER: 6,
GUNS: [{
POSITION: [30, 2, 1, 0, 0, 0, 0, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
TYPE: exports.bullet,
 }, }, {
 POSITION: [30, 2, 1, 0, 2, 0, 0.2, ],
 PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
TYPE: exports.bullet,
 }, }, {
POSITION: [30, 2, 1, 0, -2, 0, 0.4, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
TYPE: exports.bullet,
}, }, {
POSITION: [30, 2, 1, 0, 0, 0, 0.6, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
TYPE: exports.bullet,
 }, }, {
POSITION: [30, 2, 1, 0, 2, 0, 0.8, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
TYPE: exports.bullet,
 }, }, {
POSITION: [30, 2, 1, 0, -2, 0, 1, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
TYPE: exports.bullet,
 }, }, {
POSITION: [12, 10, 1, 0, 0, 0, 0, ],
}, {
POSITION: [5, 10, 1, 20, 0, 0, 0, ],
},
],
};
exports.vulcan = {
PARENT: [exports.genericTank],
LABEL: 'Vulcan',
DANGER: 7,
BODY: {
ACCELERATION: base.ACCEL * 0.7,
FOV: base.FOV * 1.2,
},
GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
POSITION: [30, 1.5, 1, 0, -4.5, 0, 0, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
TYPE: exports.bullet,
 }, }, {
 POSITION: [30, 1.5, 1, 0, -4.5, 0, 0.9, ],
 PROPERTIES: {
 SHOOT_SETTINGS: combineStats([g.basic, g.vulc]), TYPE: exports.bullet,
 }, }, {
POSITION: [30, 1.5, 1, 0, 4.5, 0, 0.4, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
TYPE: exports.bullet,
}, }, {
POSITION: [30, 1.5, 1, 0, 4.5, 0, 0.5, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
TYPE: exports.bullet,
}, }, {
POSITION: [30, 1.5, 1, 0, -2.5, 0, 0.1, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
TYPE: exports.bullet,
}, }, {
POSITION: [30, 1.5, 1, 0, 2.5, 0, 0.3, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
TYPE: exports.bullet,
}, }, {
POSITION: [30, 1.5, 1, 0, 2.5, 0, 0.6, ],
PROPERTIES: { 
SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
TYPE: exports.bullet,
}, }, {
POSITION: [30, 1.5, 1, 0, -2.5, 0, 0.8, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
TYPE: exports.bullet,
}, }, {
POSITION: [30, 1.5, 1, 0, 0, 0, 0.2, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
TYPE: exports.bullet,
}, }, {
POSITION: [30, 1.5, 1, 0, 0, 0, 0.7, ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
TYPE: exports.bullet,
}, }, {
POSITION: [12, 14, 1, 0, 0, 0, 0, ],
}, {
POSITION: [5, 14, 1, 20, 0, 0, 0, ],
},
],
};
           exports.spell = {
             PARENT: [exports.genericTank],
             LABEL: 'Speller',
             GUNS: [{
              POSITION: [  25,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  25,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, 
                ],
            }; 
           exports.dpellet = {
             PARENT: [exports.genericTank],
             LABEL: 'Double Pelleter',
             GUNS: [{
              POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]), 
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
              POSITION: [  19,     2,      1,      0,    -2.5,     180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     180,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]), 
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      180,      0,   ],
                        },
                ],
            }; 
           exports.fpellet = {
             PARENT: [exports.genericTank],
             LABEL: 'Flank Pelleter',
             GUNS: [{
              POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]), 
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
              POSITION: [  19,     2,      1,      0,    -2.5,     120,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     120,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]), 
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      120,      0,   ],
                        }, {
              POSITION: [  19,     2,      1,      0,    -2.5,     240,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     240,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.flank, g.lotsmorrecoil]), 
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      240,      0,   ],
                        },            
                ],
            };
           exports.basinv = {
             PARENT: [exports.genericTank],
             LABEL: 'Invisic',
             INVISIBLE: [0.08,0.03],
             GUNS:  [{
               POSITION: [ 18, 8.5, -1.5, 0, 0, 0, 0],
               PROPERTIES: {
                 SHOOT_SETTINGS: combineStats([g.basic]),
                 TYPE: exports.bullet,
                 }, },
               ],
             };
           exports.dinv = {
             PARENT: [exports.genericTank],
             LABEL: 'Double Invisic',
             INVISIBLE: [0.08,0.03],
             GUNS:  [{
               POSITION: [ 18, 8.5, -1.5, 0, 0, 0, 0],
               PROPERTIES: {
                 SHOOT_SETTINGS: combineStats([g.basic]),
                 TYPE: exports.bullet,
                 }, }, {
               POSITION: [ 18, 8.5, -1.5, 0, 0, 180, 0],
               PROPERTIES: {
                 SHOOT_SETTINGS: combineStats([g.basic]),
                 TYPE: exports.bullet,
                 }, },     
               ],
             };
           exports.finv = {
             PARENT: [exports.genericTank],
             LABEL: 'Flank Invisic',
             INVISIBLE: [0.08,0.03],
             GUNS:  [{
               POSITION: [ 18, 8.5, -1.5, 0, 0, 0, 0],
               PROPERTIES: {
                 SHOOT_SETTINGS: combineStats([g.basic]),
                 TYPE: exports.bullet,
                 }, }, {
               POSITION: [ 18, 8.5, -1.5, 0, 0, 120, 0],
               PROPERTIES: {
                 SHOOT_SETTINGS: combineStats([g.basic]),
                 TYPE: exports.bullet,
                 }, }, { 
               POSITION: [ 18, 8.5, -1.5, 0, 0, 240, 0],
               PROPERTIES: {
                 SHOOT_SETTINGS: combineStats([g.basic]),
                 TYPE: exports.bullet,
                 }, },
               ],
             };
           exports.bigtrishooter = {
                PARENT: [exports.genericTank],
                DANGER: 5,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    HEALTH: 1
                       },
                LABEL: 'Trilooter',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,    22,      1.3,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.slowpo, g.slowpo, g.halfreload, g.halfreload, g.halfreload]),
                TYPE: exports.trianglet,
            }, },
        ],
    }
        let smshskl = 12; //13;
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
exports.landmine = {
  PARENT: [exports.genericTank],
  LABEL: 'Landmine',
  INVISIBLE: [0.08,0.03],
  BODY: {
    FOV: base.FOV * 1.1,
    DENSITY: base.DENSITY * 2.5,
    },
  IS_SMASHER: true,
  SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
  STAT_NAMES: statnames.smasher,
  TURRETS: [ {
    POSITION: [21.5, 0, 0, 0, 360, 0],
    TYPE: exports.smasherBody
    }, {
    POSITION: [21.5, 0, 0, 0, 360, 0],
    TYPE: exports.smasherBody2
    },
   ],
  };
exports.megaland = {
  PARENT: [exports.genericTank],
  LABEL: 'Mega-Landmine',
  INVISIBLE: [1,1],
  BODY: {
    FOV: base.FOV * 1.1,
    DENSITY: base.DENSITY * 2.5,
    },
  IS_SMASHER: true,
  SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
  STAT_NAMES: statnames.smasher,
  TURRETS: [ {
    POSITION: [24, 0, 0, 0, 360, 0],
    TYPE: exports.megasmashBody
    }, {
    POSITION: [24, 0, 0, 0, 360, 0],
    TYPE: exports.megasmashBody2
    },
   ],
  };
exports.nobonk = {
  LABEL: "bonker body",
  DANGER: 7,
  INVISIBLE:[1,1],
  BODY: {
    FOV: base.FOV * 1.5,
    DENSITY: base.DENSITY * 3
  },
  IS_SMASHER: true,
  SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
  STAT_NAMES: statnames.smasher,
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [20.5, 0, 0, 0, 360, 0],
      TYPE: exports.smasherBody
    }
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [1, 8, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.halfreload,
          g.tonsmorrecoil,
          g.tonsmorrecoil,
          g.fake
        ]),
        TYPE: exports.bonkbullet
      }
    }
  ]
};
exports.bonkclassC = {
  PARENT: [exports.genericEntity],
  LABEL: "Bonker Class",
  SHAPE: 0,
  SIZE: 5
};
exports.bonk = makeAuto(exports.nobonk, "Bonker", {
  type: exports.bonkclassC,
  size: 11
});
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
exports.gigasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Giga-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  28,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
exports.ultismash = {
                PARENT: [exports.genericTank],
                LABEL: 'Ultimate-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  34,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };     
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1.15,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };       
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];
exports.lance = {
  PARENT: [exports.genericTank],
  LABEL: "Lancer",
  GUNS: [
    {      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [30,     8,      0.1,     0,      0,      0     , 0],
      AUTOFIRE: true,
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lance, g.lowpower]),
        TYPE: exports.bullet,
        AUTOFIRE: true
      }, },
    ],
  SKILL_CAP: [9,     10,         10,          10,         0,       9,       9,      9,      9,      9],
};
exports.tlance = {
  PARENT: [exports.genericTank],
  LABEL: "Twin Lancer",
  GUNS: [
    {      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [30,     8,      0.1,     0,      -5.5,      0     , 0],
      AUTOFIRE: true,
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lance, g.lowpower]),
        TYPE: exports.bullet,
        AUTOFIRE: true
      }, }, {
        POSITION: [30,     8,      0.1,     0,      5.5,      0     , 0],
      AUTOFIRE: true,
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lance, g.lowpower]),
        TYPE: exports.bullet,
        AUTOFIRE: true
      }, },
    ],
  SKILL_CAP: [9,     10,         10,          10,         0,       9,       9,      9,      9,      9],
};
exports.death = {  
  PARENT: [exports.genericTank],
  LABEL: "Deather",
  GUNS: [
    {      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [40,     10,      0.1,     0,      0,      0     , 0],
      AUTOFIRE: true,
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.lance, g.lowpower]),
        TYPE: exports.bullet,
        AUTOFIRE: true
      }, },
    ],
  SKILL_CAP: [9,     10,         10,          10,         0,       9,       9,      9,      9,      9],
};
exports.excali = {
  PARENT: [exports.genericTank],
  LABEL: "Excalibrator",
  GUNS: [
    {      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [50,     12,      0.1,     0,      0,      0     , 0],
      AUTOFIRE: true,
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.lance, g.lowpower]),
        TYPE: exports.bullet,
        AUTOFIRE: true
      }, },
    ],
  SKILL_CAP: [9,     10,         10,          10,         0,       9,       9,      9,      9,      9],
};
    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
exports.autwin = makeAuto(exports.twin, 'Auto-Twin');
exports.twinb = makeHybrid(exports.twin, 'Twinbrid');
exports.tpage2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Page 2',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
exports.tpage3 = {
        PARENT: [exports.genericTank],
        LABEL: 'Page 3',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
exports.twinn = makeAuto(exports.twin, 'Twinner', { type: exports.autoSmasherTurret });
exports.twiniply = makeAuto(exports.twin, 'Twiniplyer', { type: exports.autoDoubleTurret });
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        }, 
         exports.thewn = {
          PARENT: [exports.genericTank],
          LABEL: "Hewn",
          DANGER: 6,
          GUNS: [{
            POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.hewn, g.morerecoil]),
             TYPE: exports.bullet,
              }, }, {
           POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.hewn, g.morerecoil]),
             TYPE: exports.bullet,
             }, }, { 
           POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.hewn]),
             TYPE: exports.bullet,
              }, }, {
           POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.hewn]),
             TYPE: exports.bullet,
              }, }, 
           
              
             ],
          }; 
exports.brush = {
            PARENT: [exports.genericTank],
            LABEL: 'Brusher',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12.5,   1,      1,      0,      3,     0,      0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.brush]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12.5,   1,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.brush]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12.5,   1,      1,      0,     -3,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.brush]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  14,     1,      1,      0,      2,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.brush]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  14,     1,      1,      0,     -2,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.brush]),
                        TYPE: exports.bullet,
                    }, },
            ],
        }
            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.doublegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Double Machgunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [   /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                   {POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  14,     3,     4.0,    -3,      5,      180,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      180,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     180,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     180,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
exports.quadragunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Spraybedder',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [   /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                   {POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  14,     3,     4.0,    -3,      5,      180,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      180,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     180,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     180,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  14,     3,     4.0,    -3,      5,      90,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      90,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     90,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     90,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  14,     3,     4.0,    -3,      5,      -90,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      -90,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     -90,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     -90,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      -90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            
            exports.autogunner = makeAuto(exports.gunner);            
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };
               exports.shot = {
                PARENT: [exports.genericTank],
                LABEL: 'Shotenner',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     2,      1,      0,    -3.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     2,      1,      0,     3.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    2.5,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,   -2.5,      0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,     0,       0,       0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    
                    POSITION: [  5.5,    9.5,    -1.8,    5.5,     0,      0,      0,   ],
                        },
                ],
            };

        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
exports.autripletwin = makeAuto(exports.tripletwin, 'Auto-Triple Twin');
exports.quadtwin = {
            PARENT: [exports.genericTank],
            LABEL: 'Quad Twin',
            DANGER: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     4.2,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.spam, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -4.2,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.spam, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     4.2,    90,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.spam, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -4.2,    90,     0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.spam,  g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     4.5,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.spam, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -4.5,     180,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.spam, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     4.2,    -90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.spam, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -4.2,    -90,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.spam, g.double]),
                        TYPE: exports.bullet,
                    }, },       
            ],
        };
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.twinndouble = makeAuto(exports.double, 'Twinning Double', { type: exports.autoSmasherTurret });
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
        exports.splittle = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Triple',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };          
        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
exports.skimofdeath = {
  PARENT: [exports.genericTank],
//  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
 // COLOR: 2,
  BODY: {
  FOV: base.FOV * 1.9
  },
  LABEL: "Quskidelopalypsaticather",
  DANGER: 7,
  INDEPENDENT: false,
  GUNS: [{
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [10, 14, -0.5, 9, 0, 0, 0]
      }, {
      POSITION: [17, 15, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.celestialSkimmer]),
        TYPE: exports.boomba,
        STAT_CALCULATOR: gunCalcNames.sustained
      }, }, {
      POSITION: [10, 14, -0.5, 9, 0, 90, 0]
      }, {
      POSITION: [17, 15, 1, 0, 0, 90, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.celestialSkimmer]),
        TYPE: exports.boomba,
        STAT_CALCULATOR: gunCalcNames.sustained
      }, }, {
      POSITION: [10, 14, -0.5, 9, 0, 180, 0]
      }, {
      POSITION: [17, 15, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.celestialSkimmer]),
        TYPE: exports.boomba,
        STAT_CALCULATOR: gunCalcNames.sustained
      }, }, {
      POSITION: [10, 14, -0.5, 9, 0, 270, 0]
      }, {
      POSITION: [17, 15, 1, 0, 0, 270, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.celestialSkimmer]),
        TYPE: exports.boomba,
        STAT_CALCULATOR: gunCalcNames.sustained
      }, }, 
    ],
};
exports.diepbent = {
            PARENT: [exports.genericTank],
            LABEL: 'Diep Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,      0,    -50,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      0,     50,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.66, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
               exports.hepta = {
                PARENT: [exports.genericTank],
                LABEL: 'Hepta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     8,      1,      0,     -4,    -45,    0.99, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,     8,      1,      0,      4,     45,    0.999, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.66, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'BentHybrid');

 

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
exports.direcow = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Direcower',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    6,      1,      0,      7.,      0,     0.5],
                      
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    6,      1,      0,     -7.8,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  23,    6,      1,      0,     -5,      0,      1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, {
               POSITION: [  23,    6,      1,      0,     5,      0,     1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [ 25,    6,      1,      0,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, },        
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Dual',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
                exports.trual = {
                PARENT: [exports.genericTank],
                DANGER: 8,
                BODY: {
                    ACCEL: base.ACCEL * 1,
                    FOV: base.FOV * 1.2,
                },
                LABEL: 'Trual',
                GUNS: [ {  /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     6.5,      1,     0,     5.5,     0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Smaller',
                        }, }, { 
                    POSITION: [  20,     6.5,      1,      0,    -5.5,     0,     1.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Smaller',
                        }, }, {
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper,]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.autiper = makeAuto(exports.sniper, 'Auto-Sniper');
exports.snipest = makeAuto(exports.sniper, 'Snipester', { type: exports.sniperAutoTurret });
exports.werewolf = makeAuto(exports.sniper, 'Werewolf', { type: exports.assassinAutoTurret });
exports.snipeb = makeHybrid(exports.sniper, 'SnipeBrid');         
exports.snipe2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Page 2',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper,]),
                TYPE: exports.bullet,
            }, },
        ],
   };         
exports.snipe3 = {
        PARENT: [exports.genericTank],
        LABEL: 'Page 3',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper,]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.tsniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      -5.5,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
           POSITION: [   24,    8.5,     1,      0,      5.5,      0,      0.5,   ], 
           PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, },    
        ],
    };
exports.infern = {
  PARENT: [exports.genericTank],
  LABEL: 'Inferno',
  BODY: {
  ACCELERATION: base.ACCEL * 0.7,
  FOV: base.FOV * 1.210,
  },
  GUNS: [{
    POSITION: [ 15, 8.5, 1, 0, 0, 20, 0],
    }, {
    POSITION: [ 24, 7, 1, 0, 0, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.slow, g.doublereload, g.doublereload]),
        TYPE: exports.flare,
       }, },
      ],
    };
exports.twinfern = {
  PARENT: [exports.genericTank],
  LABEL: 'Twinferno',
  BODY: {
  ACCELERATION: base.ACCEL * 0.7,
  FOV: base.FOV * 1.210,
  },
  GUNS: [{
    POSITION: [ 15, 8.5, 1, 0, 5.5, 20, 0],
    }, {
    POSITION: [ 15, 8.5, 1, 0, -5.5, -20, 0],
    }, {  
    POSITION: [ 24, 7, 1, 0, -5.5, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.slow, g.doublereload, g.doublereload]),
        TYPE: exports.flare,
       }, }, {
    
    POSITION: [ 24, 7, 1, 0, 5.5, 0, 0.5],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.slow, g.doublereload, g.doublereload]),
        TYPE: exports.flare,
       }, },
      ],
    };
exports.assin = {
        PARENT: [exports.genericTank],
        LABEL: 'Assin',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        
       
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */

            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper,g.doublereload, g.morerecoil]),
                TYPE: exports.bullet,
            }, }, 
        ],
        TURRETS: [ {
          POSITION: [ 5, 0, 0, 0, 360, 1],
          TYPE: exports.bcirc,
          }
       ],
   };
        exports.sneak = {
        PARENT: [exports.genericTank],
        LABEL: 'Sneaker',
        INVISIBLE: [0.08,0.03],
        BODY: {
            ACCELERATION: base.ACCEL * 0.8, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,    -1.5,    0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper,]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.rifle = {
    PARENT: [exports.genericTank],
    LABEL: 'Rifle',
    BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.225,
                },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
        POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
            }, {
        POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
              PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                    TYPE: exports.bullet,
                        }, },
                ],
            };
exports.arms = makeHybrid(exports.rifle, 'Armsman');
                exports.musk = {
                PARENT: [exports.genericTank],
                LABEL: 'Musket',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  14,    20,      1,      0,     0,      0,      0,   ], 
                        }, {
                    POSITION: [  18,    6.5,    1,      0,      4,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,    6.5,    1,      0,      -4,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
exports.sniprifle = {
    PARENT: [exports.genericTank],
    LABEL: 'Sniper Rifle',
    BODY: {
           ACCELERATION: base.ACCEL * 0.7,
           FOV: base.FOV * 1.5,
           DENSITY: base.DENSITY * 1.5
    },
    GUNS:[
      {POSITION: [24, 10.5,0,0,0,0,0]},
      {POSITION: [28,7,0,0,0,0,0],
               PROPERTIES: {
                   SHOOT_SETTINGS: combineStats([g.basic, g.sniprifle, g.slowpo, g.lessreload]),
                   TYPE: exports.bullet
               },}
    ]
};
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
exports.poisonsnipe = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Sniporus',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [{
                POSITION: [  10.75,  0.4,    21,     19,      0,      0,      0,   ], 
                }, {
                POSITION: [  25,    8.4,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.lowreload]),
                        TYPE: exports.poisonbullet,
                }, }, { 
                POSITION: [   5,    12.5,    -1.6,    8,      0,      0,      0,   ],
                }, {
                POSITION: [22, 3.4, 1, 0, 0, 0, 0],
                 PROPERTIES: {
                  COLOR: 1,
                }, },
            ],
        };
        exports.poisonmach = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Poison',
        GUNS: [ {   /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [6, 13, 1.6, 8, 0, 0, 0],
          }, {
          POSITION: [12,     10,     1.4,     8,      0,      0,      0,   ], 
           PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mini]),
                TYPE: exports.poisonbullet,
          }, }, {
          POSITION: [8, 3, 1.4, 8, 0, 0, 0],
           PROPERTIES: {
           COLOR: 1,
          }, },
     ],
};
exports.stalker = {
  PARENT: [exports.genericTank],
  DANGER: 6,
  LABEL: "Stalker",
  INVISIBLE: [0.08, 0.03],
  BODY: {
    ACCELERATION: base.ACCEL * 0.6,
    SPEED: base.SPEED * 0.85,
    FOV: base.FOV * 1.4
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [27, 8.5, -1.5, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
        TYPE: exports.bullet
      }
    },
  ]
};
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autorange = makeAuto(exports.ranger, 'Auto-Ranger');
            exports.seek = {
                PARENT: [exports.genericTank],
                LABEL: 'Seeker',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.6,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  42,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin, "Auto-Assassin");
            exports.snipingass = makeAuto(exports.assassin, "Free Fire", { type: exports.sniperAutoTurret });
exports.subd = {
            PARENT: [exports.genericTank],
            LABEL: 'Subduer',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     6,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  19,    10,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
exports.tsubd = {
            PARENT: [exports.genericTank],
            LABEL: 'Binary',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     4,      1,      0,      -5.5,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfreload]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  17,    8,      1,      0,      -5.5,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfreload]),
                        TYPE: exports.bullet,
                    }, }, {
               POSITION: [  20,     4,      1,      0,      5.5,      0,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfreload]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  17,    8,      1,      0,      5.5,      0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfreload]),
                        TYPE: exports.bullet,
                    }, },       
            ],
        };
        exports.hunter = {
           PARENT: [exports.genericTank],
           LABEL: 'Hunter',
           DANGER: 6,
           BODY: {
              ACCELERATION: base.ACCEL * 0.7,
              SPEED: base.SPEED * 0.9,
              FOV: base.FOV * 1.25,
          },
          GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                  PROPERTIES: {
                       SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                       TYPE: exports.bullet,
                   }, }, { 
              POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                  PROPERTIES: {
                      SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                       TYPE: exports.bullet,
                   }, },
           ],
        };
        exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.1, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.sotap = makeHybrid(exports.preda, "Softaper");
  exports.term = {
                PARENT: [exports.genericTank],
                LABEL: 'Terminator',
                DANGER: 8,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.9,
                    SPEED: base.SPEED * 1,
                    FOV: base.FOV * 1.4,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,     4,      1,      0,      0,      0,     0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  24,     8,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.3  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.39,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },      
                ],
            };

            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
    exports.rocket = {
      PARENT: [exports.genericTank],
      LABEL: 'Rocketeer',
      DANGER: 7,
      BODY: {
       ACCELERATION: base.ACCEL * 0.7,
       SPEED: base.SPEED * 0.8,
       FOV: base.FOV * 1.3
       },
      GUNS: [{
        POSITION: [ 10, 11, -0.5, 14, 0, 0, 0],
          }, {
        POSITION: [ 21, 12, -1.4, 0, 0, 0, 0],
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.skim]),
           TYPE: exports.snaketer,
           }, },
          ],
      };
    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.doublereload]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
exports.adirect = makeAuto(exports.director, 'Auto-Director');
exports.bridirect = makeHybrid(exports.director, 'DirectBrid');
exports.manage = {
        PARENT: [exports.genericTank],
        LABEL: 'Manager',  
        STAT_NAMES: statnames.drone,
        INVISIBLE: [0.08,0.03],
        DANGER: 6,
        BODY: {
            ACCELERATION: base.ACCEL * 0.85,
            FOV: base.FOV * 1.2,
        },
        MAX_CHILDREN: 8,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.doublereload, g.doublereload]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.drivect = {
        PARENT: [exports.genericTank],
        LABEL: 'Drivector',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.doublereload]),
                    TYPE: exports.autone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
        TURRETS: [ {
          POSITION: [12, 0, 0, 0, 360, 1],
          TYPE: exports.driveSign
        }, 
      ],          
    }; 
    exports.overdrive = {
       PARENT: [exports.genericTank],
       LABEL: 'OverDrive',  
       DANGER: 7,
       STAT_NAMES: statnames.drone,
       BODY: {
       ACCELERATION: base.ACCEL * 0.75,
       SPEED: base.SPEED * 0.9,
       FOV: base.FOV * 1.1,
       },
       MAX_CHILDREN: 8,
       GUNS: [{ 
           POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
            PROPERTIES: {         
             SHOOT_SETTINGS: combineStats([g.drone, g.over]),
              TYPE: exports.autone,
               AUTOFIRE: true,
                SYNCS_SKILLS: true,
                 STAT_CALCULATOR: gunCalcNames.drone,
                  WAIT_TO_CYCLE: true,     
           }, }, {
           POSITION: [   6,     12,    1.2,     8,      0,     270,      0,   ], 
            PROPERTIES: {         
             SHOOT_SETTINGS: combineStats([g.drone, g.over]),
              TYPE: exports.autone,
               AUTOFIRE: true,
                SYNCS_SKILLS: true,
                 STAT_CALCULATOR: gunCalcNames.drone,
                  WAIT_TO_CYCLE: true,     
           }, }, 
      ],
      TURRETS: [{        
          POSITION: [  12,   0,      0,      0,     360,  1,], 
          TYPE: exports.driveSign
          },
      ], 
   };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: 'Master',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun2,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };
        exports.clocko = {
        PARENT: [exports.genericTank],
        LABEL: 'Overclock',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 1,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.4,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.doublereload]),
                    TYPE: [exports.bigdrone, { SIZE: 17 }],
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
exports.overgod = {
PARENT: [exports.genericTank],
LABEL: 'Overgod',      
DANGER: 8,
 STAT_NAMES: statnames.drone,
 BODY: {         
 ACCELERATION: base.ACCEL * 0.9,
 SPEED: base.SPEED * 1,
 FOV: base.FOV * 1.3,
 },
MAX_CHILDREN: 16,
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
POSITION: [   6,     7,    1.2,     8,      0,     90,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over]),
TYPE: exports.drone,
AUTOFIRE: true,
SYNCS_SKILLS: true,
STAT_CALCULATOR: gunCalcNames.drone,
 WAIT_TO_CYCLE: true,     
  }, }, {      
 POSITION: [   6,     7,    1.2,     8,      0,     180,     0,   ],  
 PROPERTIES: {
 SHOOT_SETTINGS: combineStats([g.drone, g.over]),
 TYPE: exports.drone,
 AUTOFIRE: true,
 SYNCS_SKILLS: true,
 STAT_CALCULATOR: gunCalcNames.drone,
 WAIT_TO_CYCLE: true, 
  }, }, {
 POSITION: [   6,     7,    1.2,     8,      0,     270,     0,   ],
 PROPERTIES: {
 SHOOT_SETTINGS: combineStats([g.drone, g.over]),
TYPE: exports.drone,
AUTOFIRE: true,
SYNCS_SKILLS: true,
STAT_CALCULATOR: gunCalcNames.drone,                
}, }, {
POSITION: [   6,     7,    1.2,     8,      0,    0,     0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over]),
TYPE: exports.drone,
AUTOFIRE: true,
SYNCS_SKILLS: true,
STAT_CALCULATOR: gunCalcNames.drone,   
}, }, {    
POSITION: [   6,     7,    1.2,     8,      0,     45,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over]),
TYPE: exports.drone,
AUTOFIRE: true,
SYNCS_SKILLS: true,
STAT_CALCULATOR: gunCalcNames.drone,
 WAIT_TO_CYCLE: true,     
  }, }, {   
 POSITION: [   6,     7,    1.2,     8,      0,     135,     0,   ],
 PROPERTIES: {
 SHOOT_SETTINGS: combineStats([g.drone, g.over]),
 TYPE: exports.drone,
AUTOFIRE: true,
SYNCS_SKILLS: true,
STAT_CALCULATOR: gunCalcNames.drone,
WAIT_TO_CYCLE: true, 
}, }, {
POSITION: [   6,     7,    1.2,     8,      0,     225,     0,   ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over]),
TYPE: exports.drone,
AUTOFIRE: true,
SYNCS_SKILLS: true,
STAT_CALCULATOR: gunCalcNames.drone,                
 }, }, {
POSITION: [   6,     7,    1.2,     8,      0,    315,     0,   ],      
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over]),
TYPE: exports.drone,
AUTOFIRE: true,
SYNCS_SKILLS: true,
STAT_CALCULATOR: gunCalcNames.drone,   
}, },
],
};
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: 'Banshee',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, "");
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
       }



  
  
  
  
    
  
  
    
      
    
    
   
   
    
         
  

exports.overanni = {
PARENT: [exports.genericTank],
LABEL: "AnniLord",
DANGER: 8,
GUNS: [ {
POSITION: [20, 19.5, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
TYPE: exports.bullet,
}, }, {
POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
TYPE: exports.drone,                                                                                                           AUTOFIRE: true,                                                                                                                                        SYNCS_SKILLS: true,                                                                                                                                                                    STAT_CALCULATOR: gunCalcNames.drone,                                                                                                                                                                                                WAIT_TO_CYCLE: true,                                                                                                                                                                                                                              MAX_CHILDREN: 2,   
}, }, {
POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ],                                                                                                                                                                                                                                                                                                 PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),                                                                                                                                                                                                                                                                                                                                                        TYPE: exports.drone,                                                                                                                                                                                                                                                                                                                                                                                    AUTOFIRE: true,                                                                                                                                                                                                                                                                                                                                                                                                             SYNCS_SKILLS: true,                                                                                                                                                                                                                                                                                                                                                                                                                                           STAT_CALCULATOR: gunCalcNames.drone,                                                                                                                                                                                                                                                                                                                                                                                                                                                                        WAIT_TO_CYCLE: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         MAX_CHILDREN: 2, 
}, },
], 
};  
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };
            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
exports.hug = {
  PARENT: [exports.genericTank],
  LABEL: 'Hugger',
  DANGER: 8,
  STAT_NAMES: statnames.swarm,
  FACING_TYPE: 'locksFacing',
  BODY: {
    ACCELERATION: base.ACCEL,
    FOV: base.FOV * 1.4,
    },
  GUNS: [{
    POSITION: [ 7, 7.5, 0.6, 7, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
    }, }, {
    POSITION: [ 7, 7.5, 0.6, 7, 4, 40, 0.333],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [ 7, 7.5, 0.6, 7, -4, -40, 0.333],       
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [ 9, 7.5, 0.6, 7, 5, 80, 0.666],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
        TYPE: exports.swarm,
         STAT_CALCULATOR: gunCalcNames.swarm
    }, }, { 
     POSITION: [9, 7.5, 0.6, 7, -5, -80, 0.666],
      PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
        TYPE: exports.swarm,
         STAT_CALCULATOR: gunCalcNames.swarm,
    }, }, 
  ],
 };
exports.night = {
PARENT: [exports.genericTank],
LABEL: 'Nightmare',
DANGER: 8, 
STAT_NAMES: statnames.swarm,
FACING_TYPE: 'locksFacing',
BODY: {
ACCELERATION: base.ACCEL,
FOV: base.FOV * 1.4,
 },
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
TYPE: exports.swarm,
STAT_CALCULATOR: gunCalcNames.swarm,        
LABEL: 'Guided'                
}, }, {
POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: [exports.autoswarm],
STAT_CALCULATOR: gunCalcNames.swarm,        
LABEL: 'Autonomous',        
}, }, {
POSITION: [   7,    7.5,    0.6,     7,      4,     180,     0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: [exports.autoswarm],
STAT_CALCULATOR: gunCalcNames.swarm,        
LABEL: 'Autonomous',         
 }, }, {
POSITION: [   7,    7.5,    0.6,     7,     -4,     180,    0.5,  ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
TYPE: exports.swarm,
STAT_CALCULATOR: gunCalcNames.swarm,        
}, }, {
POSITION: [   7,    7.5,    0.6,     7,      4,     0,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
TYPE: exports.swarm,
STAT_CALCULATOR: gunCalcNames.swarm,        
LABEL: 'Guided'                
}, }, {
POSITION: [   7,    7.5,    0.6,     7,     -4,     0,     0.5,  ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: [exports.autoswarm],
STAT_CALCULATOR: gunCalcNames.swarm,        
LABEL: 'Autonomous',        
}, }, {
POSITION: [   7,    7.5,    0.6,     7,      4,     -90,     0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: [exports.autoswarm],
STAT_CALCULATOR: gunCalcNames.swarm,        
LABEL: 'Autonomous',         
 }, }, {
 POSITION: [   7,    7.5,    0.6,     7,     -4,     -90,    0.5,  ], 
 PROPERTIES: {
 SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
 TYPE: exports.swarm,
 STAT_CALCULATOR: gunCalcNames.swarm,
 }, },
 ],
 };
            exports.autocruiser = makeAuto(exports.cruiser);
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
exports.pentaseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Pentamancer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 6,
            MAX_CHILDREN: 12,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.power, g.power, g.doublereload]),
                        TYPE: exports.penchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.power, g.power, g.doublereload]),
                        TYPE: exports.penchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro, 
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro, 
                        }, },
                    ],
            };
exports.malefict = {
  PARENT: [exports.genericTank],
  LABEL: 'Maleficitor',
  DANGER: 8,
  STAT_NAMES: statnames.necro,
  BODY: {
    ACCELERATION: base.ACCEL * 0.7,
    SPEED: base.SPEED * 0.8,
    FOV: base.FOV * 1.15,
    },
SHAPE: 4,
MAX_CHILDREN: 20,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                    TYPE: exports.invchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                }, },
        ],
    };
exports.autonecro = makeAuto(exports.necromancer, 'Automancer')
exports.necromonster = {
                PARENT: [exports.genericTank],
                LABEL: 'NecroEnder',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                
                MAX_CHILDREN: 45,
                GUNS: [ {/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                   POSITION: [   2,     12,     0,      8,      5,     90,      0,   ], 
                        },    {
                   POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.quadrareload, g.power]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                   POSITION: [   2,     12,     0,      8,      5,     270,    0.5,  ],
                        },    {
                   POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.quadrareload, g.power]),
                            TYPE: exports.sunchip,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                  POSITION: [   2,     12,     0,      8,      5,      0,     0.25, ],
                        },    {
                  POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.quadrareload]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro, 
                        }, }, {
                  POSITION: [   2,     12,     0,      8,      5,     180,    0.75  ],
                        },    {
                  POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.quadrareload]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro, 
                        }, },
                    ],
  TURRETS: [{
    POSITION: [15, 0, 0, 0, 360, 1],
    TYPE: exports.rcirc
    },
  ],
};
    exports.trimancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Trimancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.25,
                },
                SHAPE: 3,
                
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.trichip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     60,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.trichip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,    -60,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.trichip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro, 
                        }, },
                     ],
                 };
        exports.spawner = {
            PARENT: [exports.genericTank],
            LABEL: 'Spwaner',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
        exports.tspawn = {
            PARENT: [exports.genericTank],
            LABEL: 'Twin Spwaner',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    6,      1,     10.5,    5,      0,      0,   ], 
                }, {
                POSITION: [   1,     8,      1,      15,    5,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 2,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.twinion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                POSITION: [  3.5,    8,      1,      8,     5,      0,      0,   ], 
                }, {
                POSITION: [  5,      8,      1.6,    2,     2.7,      0,      0,   ], 
                }, {
                POSITION: [  4.5,    6,      1,     10.5,    -5,      0,      0,   ], 
                }, {
                POSITION: [   1,     8,      1,      15,    -5,      0,      0.5,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 2,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.twinion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                POSITION: [  3.5,    8,      1,      8,     -5,      0,      0,   ], 
                }, {
                POSITION: [  5,      8,      1.6,    2,     -2.7,    0,      0,   ],
                },
            ],
        };
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };

    exports.machine = {
        PARENT: [exports.genericTank],
        
      LABEL: 'Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.machine2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Page 2',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.achine = makeAuto(exports.machine, 'Auto-Machine');
exports.hbchine = makeHybrid(exports.machine, 'MachineBrid');
exports.tmachine = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin Machine',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    18,     6,     1.4,     6.7,      -5.5,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    18,     6,     1.4,     6.7,      5.5,      0,      0.5,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mach]),
                TYPE: exports.bullet,
            }, },   
        ],
    };
exports.gatling = {
  PARENT: [exports.genericTank],
  LABEL: 'Gatling Gun',
    BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
  GUNS:[{
    POSITION: [18, 10, 1.4, 8, 0, 0, 0],
    PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mach]),
    TYPE: exports.bullet,
   
    }, },
    ],
  };
exports.gilor = makeAuto(exports.machine, 'Gilorine', { type: exports.machineAutoTurret });
    exports.dmachine = {
        PARENT: [exports.genericTank],
        LABEL: 'Double Machine',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      180,    0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },    
        ],
    };
    exports.fmachine = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Machine',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      120,    0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      240,    0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },     
        ],
    };
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     9,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   exports.extinct = {
                PARENT: [exports.genericTank],
                LABEL: 'Extinguisher',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  17,     7,     1,       5,      0,      0,      0.3,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.extinguisher]),
                        TYPE: exports.exllet,
                    }, }, { 
                    POSITION: [  15,    8,     1.3,      0,      0,      0,      0.6,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.extinguisher, g.lowpower]),
                        TYPE: exports.exllet,
                    }, }, {
                    POSITION: [  12,    10,     1.5,     0,      0,      0,      0.9,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.extinguisher, g.lowpower]),
                        TYPE: exports.exllet,
                    }, }, 
                    
                ],
            };
   
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.tmini = {
            PARENT: [exports.genericTank],
            LABEL: 'Twin Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      -5.5,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      -5.5,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      -5.5,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
               POSITION: [  22,     8,      1,      0,      5.5,      0,      0.5    ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      5.5,      0,    0.833, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      5.5,      0,   1.167, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, },    
             ],
  }
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }
                ],
            };
                exports.reloader = {
                PARENT: [exports.genericTank],
                LABEL: 'Reloader',
                DANGER: 8,
                BODY: {
                    FOV: 1.4,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.reloader]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.reloader]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.reloader]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.reloader]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.reloader]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  15,     8,      1,      0,      0,      0,      1, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.reloader]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  13,     8,      1,      0,      0,      0,     1.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.reloader]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  11,     8,      1,      0,      0,      0,     1.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.reloader]),
                            TYPE: exports.bullet,
                        }, }   
                ],
            };
exports.lazer = {
                PARENT: [exports.genericTank],
                LABEL: 'Weak Lazer',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                    DENSITY: base.DENSITY * 1.5
                },
                GUNS: [      { 
                    POSITION: [  27,     3,      1,      0,      0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.quadrareload, g.norecoil]),
                            TYPE: exports.lazerbeam,
                        }, },{
                    POSITION: [  25,     3,      1,      0,      0,      0,     0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.quadrareload, g.norecoil]),
                            TYPE: exports.lazerbeam,
                        }, }, { 
                    POSITION: [  23,     3,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.quadrareload, g.norecoil]),
                            TYPE: exports.lazerbeam,
                        }, }, { 
                    POSITION: [  21,     3,      1,      0,      0,      0,     0.3, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.quadrareload, g.norecoil]),
                            TYPE: exports.lazerbeam,
                        }, }, { 
                    POSITION: [  19,     3,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.quadrareload, g.norecoil]),
                            TYPE: exports.lazerbeam,
                        }, },  { 
                    POSITION: [  17,     3,      1,      0,      0,      0,     0.5, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.quadrareload, g.norecoil]),
                            TYPE: exports.lazerbeam,
                        }, },  { 
                    POSITION: [  15,     3,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.quadrareload, g.norecoil]),
                            TYPE: exports.lazerbeam,
                        }, },{
                    POSITION: [  13,     3,      1,      0,      0,      0,     0.7, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.quadrareload], g.norecoil),
                            TYPE: exports.lazerbeam,
                        }, }, {
                    POSITION: [  11,     3,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.quadrareload, g.norecoil]),
                            TYPE: exports.lazerbeam,
                        }, }
                ],
            };
            exports.crop = makeHybrid(exports.mini, "Crop Duster");
            exports.barcade = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Barricade',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.pound2 = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Page 2',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.aund = makeAuto(exports.pound, 'Auto-Pounder');
exports.craft = makeAuto(exports.pound, 'Crafter', { type: exports.heavy3gun });
exports.tase = makeAuto(exports.pound, 'Taser', { type: exports.destroyerAutoTurret });
exports.poundbrid = makeHybrid(exports.pound, 'Poundbrid');
exports.pounper = {
        PARENT: [exports.genericTank],
        DANGER: 6,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Pounper',
        GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.gempound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Poundstructor',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.gem,
                MAX_CHILDREN: 3,
            }, },
        ],
    };
exports.pistol = {
  PARENT: [exports.genericTank],
  LABEL: 'Pistol',
  DANGER: 6,
  BODY: {
    ACCELERATION: base.ACCEL * 0.9
   },
  GUNS: [{
    POSITION: [ 23, 8, 1, 0, 0, 0, 0],
    }, {
    POSITION: [ 5, 12, 1, 9, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pistol]),
        TYPE: exports.bullet,
      }, },
     ],
  };
  exports.steamroll = {
  PARENT: [exports.genericTank],
  LABEL: "Sterror",
  BODY: {
    ACCELERATION: base.ACCEL * 0.7,
    FOV: base.FOV * 1.2
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [24, 8.5, 1, 0, 0, 0, 0],
     },{
        POSITION: [12, 12, 1, 24, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound]),
        TYPE: exports.bullet
      }
    }
  ]
};  

  exports.flatt = {
  PARENT: [exports.genericTank],
  LABEL: "Flattener",
  BODY: {
    ACCELERATION: base.ACCEL * 0.8,
    FOV: base.FOV * 1.3
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [20, 8.5, 1, 0, 0, 0, 0],
    },{
        POSITION: [18, 18, 1, 20, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.destroy]),
        TYPE: exports.bullet
      }
    }
  ]
 };
        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
exports.autodestroy = makeAuto(exports.destroy, 'Auto-Destroyer')
exports.poundestroy = makeAuto(exports.destroy, 'Poundestroyer', { type: exports.heavy3gun });
exports.ram = {
  PARENT: [exports.genericTank],
  LABEL: 'Rammer',
  BODY: {
    ACCELERATION: base.ACCEL * 0.9, 
    SPEED: base.SPEED * 1,
   },
  DANGER: 7,
  GUNS: [{
    POSITION: [25, 14, 1, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETITNGS: combineStats([g.basic, g.pound, g.destroy, g.doublereload]),
      TYPE: exports.bullet,
    }, },
  ],
  TURRETS: [{
    POSITION: [21, 0, 0, 0, 360, 0],
    TYPE: exports.smasherBody
    },
  ],
 };         
            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.autoanni = makeAuto(exports.anni, 'Auto-Annihilator');
                exports.decent = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Decentrilizer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 23,     20,     1.2,      0,      0,      0,      0,   ],                       
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.decent]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.mswarm = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Mini-Swarmer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  11,    11,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.mswarmb,
                        }, }, {
                    POSITION: [  12,    9,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
            exports.swarmer = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Swarmer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.swarmb,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
                exports.m2swarm = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Mega-Swarmer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    20,     -1,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.m2swarmb,
                        }, }, {
                    POSITION: [  15,    17,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
            exports.annibrid = makeHybrid(exports.anni, 'Annibrid')
            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };
    exports.blast = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Blaster',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  4,      2,      1,     11,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      2,      1,     11,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     13,      -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                   POSITION: [  4,      2,      1,     13,      -2,      0,      0,   ], 
                       PROPERTIES: {
                           SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, { 
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, { 
                   POSITION: [  1,      4,      1,     12,     -2,      0,      0,   ], 
                       PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                     POSITION: [  1,      4,      1,     12,     -3,      0,      0,   ], 
                       PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                 
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                       PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  1,      3,      1,     13,     -2,      0,      0,   ], 
                       PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                       POSITION: [  1,      3,      1,     13,     -3,      0,      0,   ], 
                       PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {  
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                     POSITION: [  1,      2,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                     POSITION: [  1,      2,      1,     13,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {    
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  13,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };
    
          exports.trapper = {
          PARENT: [exports.genericTank],
          LABEL: 'Trapper',
          DANGER: 5,
          STAT_NAMES: statnames.trap,
          BODY: {
            SPEED: base.SPEED * 0.7,
            FOV: base.FOV * 1.05,
          },
          GUNS: [{
            POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
            }, {
            POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.trap]),
              TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
             }, },
           ],
        };
          exports.trapper2 = {
          PARENT: [exports.genericTank],
          LABEL: 'Page 2',
          DANGER: 5,
          STAT_NAMES: statnames.trap,
          BODY: {
            SPEED: base.SPEED * 0.7,
            FOV: base.FOV * 1.05,
          },
          GUNS: [{
            POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
            }, {
            POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.trap]),
              TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
             }, },
           ],
        };
          exports.arsenal = {
          PARENT: [exports.genericTank],
          LABEL: 'Arsenal',
          DANGER: 5,
          STAT_NAMES: statnames.trap,
          BODY: {
            SPEED: base.SPEED * 0.8,
            FOV: base.FOV * 1.15,
          },
          GUNS: [{
            POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
            }, {
            POSITION: [2, 8, 1, 14, 0, 0, 0],
            }, {
            POSITION: [   4,     8,     1.5,    16,      0,      0,      0,   ], 
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.trap]),
             TYPE: exports.autrap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
          ],
        };
exports.ttrapper = {
          PARENT: [exports.genericTank],
          LABEL: 'Twin-Trapper',
          DANGER: 6,
          STAT_NAMES: statnames.trap,
          BODY: {
            SPEED: base.SPEED * 0.8,
            FOV: base.FOV * 1.1,
          },
          GUNS: [{
            POSITION: [  14,     8,      1,      0,      5.5,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      5.5,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
            POSITION: [  14,     8,      1,      0,      -5.5,      0,      0.5,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      -5.5,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },              
                ],
        };
exports.ptrapper = {
          PARENT: [exports.genericTank],
          LABEL: 'Trapoisoner',
          DANGER: 5,
          STAT_NAMES: statnames.trap,
          BODY: {
            SPEED: base.SPEED * 0.7,
            FOV: base.FOV * 1.05,
          },
          GUNS: [{
            POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
            }, {
            POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
             PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.poisontrap, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
            POSITION: [12, 3, 1, 0, 0, 0, 0],
             PROPERTIES: {
              COLOR: 1,
            }, },
          ],
        };
exports.autrapper = makeAuto(exports.trapper, 'Auto-Trapper');
exports.trapb = makeHybrid(exports.trapper, 'Trapbrid');
        exports.mtrap = {
          PARENT: [exports.genericTank],
          LABEL: 'Mega Trapper',
          DANGER: 5,
          STAT_NAMES: statnames.trap,
          BODY: {
            SPEED: base.SPEED * 0.7,
            FOV: base.FOV * 1.05,
          },
          GUNS: [{
            POSITION: [  16,     14,      1,      0,      0,      0,      0,   ],
            }, {
            POSITION: [   6,     15,     1.7,    15,      0,      0,      0,   ], 
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.trap]),
              TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
             }, },
           ],
        };
        exports.tritrap = {
          PARENT: [exports.genericTank],
          LABEL: 'Tri-Trapper',
          DANGER: 5,
          STAT_NAMES: statnames.trap,
          BODY: {
            SPEED: base.SPEED * 0.7,
            FOV: base.FOV * 1.05,
          },
          GUNS: [{
            POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
            }, {
            POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
             PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
            POSITION: [  14,     8,      1,      0,      0,      120,      0,   ],
            }, {
            POSITION: [   4,     8,     1.5,    14,      0,      120,      0,   ], 
             PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
            POSITION: [  14,     8,      1,      0,      0,      240,      0,   ],
            }, {
            POSITION: [   4,     8,     1.5,    14,      0,      240,      0,   ], 
             PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
          ],
        };
        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Builder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };
            exports.rap = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Raptor',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   3,    12,      1,      18,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     21,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.autos,
                    }, },
            ],
        };
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
            exports.production = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Productioner',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.95,
                    FOV: base.FOV * 1.35,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,    10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    12,      1,    15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,    18.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    15,     1.3,    21,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.dangerbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    15,      1,     8,       0,      0,      0,   ]
                    }
                ],
            };
            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Constructor',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
exports.corp = {
                PARENT: [exports.genericTank],
                LABEL: 'Corporker',
                STAT_NAMES: statnames.trap,
                DANGER: 8,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,    1.4,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    21,     1.4,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
            exports.autobuilder = makeAuto(exports.builder);
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Conqueror',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.dange = {
              PARENT: [exports.genericTank],
              LABEL: 'Danger',
              DANGER: 8,
              STAT_NAMES: statnames.trap,
              BODY: {
              SPEED: base.SPEED * 0.9
                },
              GUNS: [{
                POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
                 PROPERTIES: {
                   SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                  }, }, {
                POSITION: [18, 18, 1, 0, 0, 180, 0],
                  },{ 
                POSITION: [2, 18, 1.2, 18, 0, 180, 0],
                 PROPERTIES: {
                   SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: exports.block,
                   }, }
                ],
              };
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15, 
                  },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
exports.chase = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Chaser',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.25,
                    ACCELERATION: base.ACCEL * 0.1,
                  },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.trichase,
                        }, },
                ],
  TURRETS: [{
    POSITION: [15, 0, 0, 0, 360, 1],
    TYPE: exports.rcirc
    },
            ],
            };
exports.bentboomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Bent Boomer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,    10,      1,      8,     -2,     -35,     0,   ],
                        }, {
                    POSITION: [   8,    10,      1,      8,      2,      35,     0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     16,    -2,     -35,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   2,    10,     1.3,     16,     2,      35,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
exports.invisboom = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Invisible Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                INVISIBLE: [1, 1],
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
           exports.Xbomb = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber healer',
                Danger:6,
                BODY: {
                    ACCELARATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.5,
                    FOV: base.FOV * 1.05,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  18,    10,     -2,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,]),
                            TYPE: exports.hepullet,
                        }, },
                ],
            };
            exports.quadbuilder = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Quad Builder',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.minishot = {
            PARENT: [exports.genericTank],
            DANGER: 5,
            LABEL: 'MiniShot',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  16,     3,      1,      0,     -4,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  16,     3,      1,      0,      4,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  18,     8,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
exports.beek = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Beekeeper',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bee,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  12,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bee,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.ord = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Ordnance',
            BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.50,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  24,     8,      1,      0,      0,      0,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Normal',
                    }, }, {
                POSITION: [  21,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.blund = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Blunder',
            BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -8,     -7,     0.50,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      8,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  24,     8,      1,      0,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Normal',
                    }, }, {
                POSITION: [  21,     12,     1,      0,      0,      0,      0.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, }, {
                POSITION: [  18,     16,     1,      0,      0,      0,      0.3,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Weaked Heavy',
                    }, },
            ],
        };
        exports.demolish = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Demolisher',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -7,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      7,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  20,     14,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
            exports.control = makeHybrid(exports.artillery, 'Controller');
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
                exports.assend = makeHybrid(exports.mortar, 'Assender');
                exports.anger = {
                PARENT: [exports.genericTank],
                LABEL: 'Angerar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  11,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  11,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  14,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  14,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  7,     3,      1,      0,     -10,     -7,     1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  7,     3,      1,      0,      10,      7,     1.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {      
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
         exports.fwlaunch = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                LABEL: 'Firework Launcher',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     10,      1,     7,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,     14,      1,     0,      0,      0,      0,  ],
                        PROPERTIES: { 
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.firework,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
         exports.launch = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.05,
                },
                LABEL: 'Launcher',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     10,      1,     7,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,     14,      1,     0,      0,      0,      0,  ],
                        PROPERTIES: { 
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.smolmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
         exports.deploy = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Deployer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,    12,      1,      7,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    16,      1,      0,      0,      0,      0,  ],
                        PROPERTIES: { 
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.arty]),
                            TYPE: exports.smolmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     8,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  16,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.hove = {
              PARENT: [exports.genericTank],
              LABEL: 'Hover',
              BODY: {
              FOV: base.FOV * 1.3,
              ACCELERATION: base.ACCEL * 1.1
              },
              DANGER: 6,
              GUNS: [{
                POSITION: [17.5, 6.8, 1, 0, 0, 0, 0]
                }, {
                POSITION: [16, 7.7, -1.2, 0, 0, 0, 0],
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, ]),
                   TYPE: exports.bomb
                }, }, {
                POSITION: [4.5, 7.5, -1.8, 6.5, 0, 0, 0]
                },
              ],
            };
            exports.sharp = {
              PARENT: [exports.genericTank],
              LABEL: 'Sharpnel',
              BODY: {
              FOV: base.FOV * 1.4,
              ACCELERATION: base.ACCEL * 1.2
              },
              DANGER: 6,
              GUNS: [{
                POSITION: [17.5, 7.8, 1, 0, 0, 0, 0]
                }, {
                POSITION: [16, 8.7, -1.2, 0, 0, 0, 0],
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.decent]),
                   TYPE: exports.boomb
                }, }, {
                POSITION: [4.5, 8.5, -1.8, 6.5, 0, 0, 0]
                },
              ],
            };
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3.7,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    3.7,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     3.7,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    3.7,    1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     3.7,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     3.7,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    3.7,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     3.7,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    3.7,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     3.7,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            }; 
exports.flank2 = {
PARENT: [exports.genericTank],
LABEL: 'Flank',
BODY: {
SPEED: base.SPEED * 1.05,
},
GUNS: [{
POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
TYPE: exports.bullet,
 }, }, { 
POSITION: [  18,     8,      1,      0,      0,      180,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.flank]),
TYPE: exports.bullet,
}, }, 
   ],
  }; 
exports.dsnipe = {
        PARENT: [exports.genericTank],
        LABEL: 'Double Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper,]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  24,    8.5,     1,      0,      0,      180,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper,]),
                TYPE: exports.bullet,
           }, }, 
       ],
  };
exports.fsnipe = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper,]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  24,    8.5,     1,      0,      0,      120,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper,]),
                TYPE: exports.bullet,
            }, }, {
          POSITION: [  24,    8.5,     1,      0,      0,      240,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper,]),
                TYPE: exports.bullet,
            }, },  
                     
        ],
    };
exports.dpound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Double Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,    12,      1,      0,      0,      180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },    
        ],
    };
exports.fpound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Flank Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,    12,      1,      0,      0,      120,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,    12,      1,      0,      0,      240,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },    
        ],
    };
    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
  exports.flankp2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Page 2',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
  exports.ank = makeAuto(exports.flank, 'Auto-Flank Guard');
  exports.pleck = makeAuto(exports.flank, 'Plecker', { type: exports.flankAutoTurret });
  exports.conjest = makeAuto(exports.flank, 'Conjestor', { type: exports.hexaAutoTurret });
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Hexa Tank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
exports.ahexa = makeAuto(exports.hexa, 'Auto-Hexa Tank');
exports.villain = makeAuto(exports.hexa, 'Villain', { type: exports.flankAutoTurret });
            exports.deathstar = {
            PARENT: [exports.genericTank],
            LABEL: 'Death Star',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     12,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  20,     12,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  20,     12,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  20,     12,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  20,     12,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  20,     12,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.acto = makeAuto(exports.octo, 'Autoctanoko');
exports.cyc = {
    PARENT: [exports.genericTank],
    LABEL: 'Cyclone',
    DANGER: 7,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 3.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 30, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 60, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 90, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone]),
            TYPE: exports.bullet,
       },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 150, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 180, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 210, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone]),
            TYPE: exports.bullet,
    },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 300, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 330, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.cyclone]),
            TYPE: exports.bullet,
        }, },
     ],
  };
     
  
            exports.heptatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Hepta-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })();
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            }, 'Hexa-Trapper');

        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
            exports.ttri = {
            PARENT: [exports.genericTank],
            LABEL: 'Twin-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      5.5,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {
                POSITION: [  18,     8,      1,      0,      -5.5,      0,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {      
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
            exports.cri = {
            PARENT: [exports.genericTank],
            LABEL: 'Cheapist',
            BODY: {
                HEALTH: base.HEALTH * 0.7,
                SHIELD: base.SHIELD * 0.7,
                DENSITY: base.DENSITY * 0.5,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     135,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     225,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
exports.autocri = makeAuto(exports.cri, 'Auto-Cheapist');
            exports.accor = {
            PARENT: [exports.genericTank],
            LABEL: 'Accelerator',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
                ACCELERATION: base.ACCEL * 1,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     135,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     225,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {
                POSITION: [  16,     8,      1,      0,      0,     110,    0.2,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     250,    0.2,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },       
            ],
        };    
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.6,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                    SPEED: base.SPEED * 1.3
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
                exports.pump = {
                PARENT: [exports.genericTank],
                LABEL: 'Pumper',
                BODY: {
                    HEALTH: base.HEALTH * 0.7,
                    SHIELD: base.SHIELD * 0.7,
                    DENSITY: base.DENSITY * 0.3,
                    SPEED: base.SPEED * 1.6
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                            }, }, {
                     POSITION: [ 16, 12, 1, 0, 0, 180, 1],
                      PROPERTIES: {
                       SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound]),
                        TYPE: exports.bullet,
                           }, },
                         ],
                       };
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 1.1
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, 
                ],
            };
            exports.starship = makeHybrid(exports.booster, 'Starship')
            exports.warship = makeHybrid(exports.fighter, 'Warship')
            exports.booghter = {
                PARENT: [exports.genericTank],
                LABEL: 'Dragon',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 1.6
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      95,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -95,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     145,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, { 
                    POSITION: [  13,     8,      1,      0,      1,     215,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     155,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     205,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.defeat = {
                PARENT: [exports.genericTank],
                LABEL: 'Defeater',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 1.1
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -5.5,    0,      0.5, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, { 
                    POSITION: [  16,     8,      1,      0,     5.5,    0,      0,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, { 
                    POSITION: [  16,     8,      1,      0,     0,     -90,   0,    ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {  
                    POSITION: [  16,     8,      1,      0,     0,      90,   0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {      
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, 
                ],
            };
            exports.surfer = {
                PARENT: [exports.genericTank],
                LABEL: 'Surfer',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };    
            exports.autotri = makeAuto(exports.tri);   
            exports.autotri.BODY = {
                SPEED: base.SPEED,
            };  
      exports.bird = makeBird(exports.basic, 'Bird');
   exports.clone = makeBird(exports.twin, 'Cloner');
  exports.break = makeBird(exports.sniper, 'Breaker');
exports.sweep = makeBird(exports.machine, 'Sweeper');
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
        exports.auto2 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-2',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto2gun,
                        }, {
                POSITION: [  11,     8,      0,     180,    190, 0], 
                    TYPE: exports.auto2gun,
                        }, 
                      ],
          };
        exports.auto2_2 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-2-2',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 1], 
                    TYPE: [exports.auto2, { COLOR: 16 }],
                        }, {
                POSITION: [  11,     8,      0,     180,    190, 1], 
                    TYPE: [exports.auto2, { COLOR: 16 }],
                        }, 
                      ],
          };
        exports.auto2_3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-2-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 1], 
                    TYPE: [exports.auto2, { COLOR: 16 }],
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 1], 
                    TYPE: [exports.auto2, { COLOR: 16 }],
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 1], 
                    TYPE: [exports.auto2, { COLOR: 16 }],
                        },
            ],
        };
        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
        exports.auto3_2 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3-2',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 1], 
                    TYPE: [exports.auto3, { COLOR: 16 }],
                        }, {
                POSITION: [  11,     8,      0,     180,    190, 1], 
                    TYPE: [exports.auto3, { COLOR: 16 }],
                        }, 
                      ],
          };
        exports.auto3_3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 1], 
                    TYPE: [exports.auto3, { COLOR: 16 }],
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 1], 
                    TYPE: [exports.auto3, { COLOR: 16 }],
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 1], 
                    TYPE: [exports.auto3, { COLOR: 16 }],
                        },
            ],
        };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.auto7 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-7',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,     180,    190, 0], 
                        TYPE: exports.auto7gun,
                            }, {
                    POSITION: [  11,     8,      0,     129,    190, 0], 
                        TYPE: exports.auto7gun,
                            }, {
                    POSITION: [  11,     8,      0,     77.5,   190, 0], 
                        TYPE: exports.auto7gun,
                            }, {
                    POSITION: [  11,     8,      0,     26,     190, 0], 
                        TYPE: exports.auto7gun,
                            }, {
                    POSITION: [  11,     8,      0,     -26,    190, 0], 
                        TYPE: exports.auto7gun,
                            }, {
                    POSITION: [  11,     8,      0,     -77.5,  190, 0], 
                        TYPE: exports.auto7gun,
                            }, {
                    POSITION: [  11,     8,      0,     -129,   190, 0], 
                        TYPE: exports.auto7gun,
                            },
                ],
            };
            exports.heavy2 = {
                BODY: {
                    SPEED: base.SPEED * 0.75,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-2',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     180,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, 
                    ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
            exports.heavy5 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,      72,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     144,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     216,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     288,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
            exports.archit = {
                LABEL: 'Architect',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                PARENT: [exports.genericTank],
                DANGER: 6,
                
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.architgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.architgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.architgun,
                            },
                ],
            };
            exports.sniper2 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Sniper-2',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.05,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     180,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, 
                     ],
            };
            exports.sniper3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Sniper-3',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.sniper3gun,
                            },
                ],
            };
            exports.sniper6 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Sniper-6',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.45,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,      60,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     180,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     300,    170, 0], 
                        TYPE: exports.sniper3gun,
                            },
                   ],
            };
            exports.twin2 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Twin-2',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      0,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     180,    160, 0], 
                        TYPE: exports.auto4gun,
                            },
                    ],
             };
            exports.twin4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Twin-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
            exports.twin6 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Twin-6',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      0,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     120,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     240,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     60,     160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     180,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     300,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
                exports.twin8 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Twin-8',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                        SHOOT_SETTINGS: combineStats([g.mini, g.lowpower, g.lowpower])
                            }, {
                    POSITION: [  12,     6,      0,      90,    160, 0], 
                        TYPE: exports.auto4gun,
                        SHOOT_SETTINGS: combineStats([g.mini, g.lowpower, g.lowpower])
                            }, {
                    POSITION: [  12,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                        SHOOT_SETTINGS: combineStats([g.mini, g.lowpower, g.lowpower])
                            }, {
                    POSITION: [  12,     6,      0,     180,    160, 0], 
                        TYPE: exports.auto4gun,
                        SHOOT_SETTINGS: combineStats([g.mini, g.lowpower, g.lowpower])
                            }, {
                    POSITION: [  12,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                        SHOOT_SETTINGS: combineStats([g.mini, g.lowpower, g.lowpower])
                            }, {
                    POSITION: [  12,     6,      0,     270,    160, 0], 
                        TYPE: exports.auto4gun,
                        SHOOT_SETTINGS: combineStats([g.mini, g.lowpower, g.lowpower])
                            }, {
                    POSITION: [  12,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                        SHOOT_SETTINGS: combineStats([g.mini, g.lowpower, g.lowpower])
                            }, {
                    POSITION: [  12,     6,      0,     0,      160, 0], 
                        TYPE: exports.auto4gun,
                        SHOOT_SETTINGS: combineStats([g.mini, g.lowpower, g.lowpower])
                            }
                ],
            };
            
        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
        exports.bulwark = {
            PARENT: [exports.genericTank],
            LABEL: 'Bulwark',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      5.5,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     7,      1,      0,      6.5,     180,     0,   ],
                    }, {
                POSITION: [   4,     7,     1.7,    13,      6.5,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  20,     8,      1,      0,      -5.5,      0,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     7,      1,      0,      -6.5,     180,     0,   ],
                    }, {
                POSITION: [   4,     7,     1.7,    13,      -6.5,     180,     0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Bushwhacker',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
                exports.skimmest = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                LABEL: 'Revolutioner',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    16,    -0.5,     8,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  16,    17,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.hypermissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

                exports.twist = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Twister',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,      1,      9,      0,      0,      0,  ], 
                    }, {
                    POSITION: [  17,    15,    -1.3,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.cmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                    }, },
               ],
           };
           exports.twisturret = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Twister',
                DANGER: 7,
                COLOR: 13,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,      1,      9,      0,      0,      0,  ], 
                    }, {
                    POSITION: [  17,    15,    -1.3,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.lessreload, g.lessreload]),
                            TYPE: exports.hypercmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                    }, },
               ],
           };
           exports.twist2 = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Twisted Hard',
                DANGER: 7,             //15   -0.5
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    1,     9,      0,      0,      0,  ], 
                    }, {
                    POSITION: [  17,    15,    -1.3,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.ccmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                    }, },
                  ],
                };
                exports.bturret = {
                PARENT: [exports.genericTank],
                CONTROLLERS: ['boomerang'],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Boomerx3',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.boomerang,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        },
                    POSITION: [  17,    15,      1.1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.boomerang,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

exports.doublemissile = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Double Missile',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                  PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.lowpower]),
                            TYPE: exports.hypermissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        },
                        }, {
                    POSITION: [  17,    15,      1.1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.lowpower]),
                            TYPE: exports.cmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
exports.ak47 = {
    PARENT: [exports.genericTank],
    LABEL: 'AK-47',
    RESET_UPGRADES: true,
    INVISIBLE: [0, 0],
    ALPHA: 1,
    SHAPE: 'm 7.93294,0.3852 c -0.0125,-0.025 -0.01,-0.2325 -0.01,-0.2325 l -0.0025,-0.105 -0.1025,0.0025 -0.095,0.2025 -0.095,0.145 c 0,0 -0.37496,0.0082 -0.535,0.005 -0.25,-0.005 -0.3925,-0.1425 -0.3925,-0.1425 l -0.0075,-0.095 -0.815,-0.005 c 0,0 0.005,-0.035 -0.015,-0.04 -0.02,-0.005 -0.99,-0.0025 -0.99,-0.0025 l -0.015,-0.0325 c 0,0 -0.1625,0 -0.2025,0.0025 -0.04,0.0025 -0.0875,0.055 -0.12,0.06 -0.0325,0.005 -0.1125,0.0025 -0.1125,0.0025 L 4.42044,0.0127 4.29794,0.0102 c 0,0 -0.005,0.05 0,0.115 -0.215,0 -1.80008,0.0032 -1.8775,0.0075 -0.045,0.0025 -0.09184,0.0296 -0.11302,0.05188 -0.02356,0.02476 -0.03814,0.06458 -0.03948,0.08562 -0.0675,0.005 -0.0825,0.0175 -0.12,0.055 -0.0375,0.0375 -0.03,0.125 -0.03,0.125 0,0 -0.57478,0.07816 -0.625,0.08 -0.16482,0.00598 -0.1125,-0.07 -0.3025,-0.05 -0.1014,0.01066 -1.09,0.125 -1.115,0.125 -0.025,0 -0.08438,0.01132 -0.0625,0.075 0.08812,0.25652 0.11084,0.58902 0.1025,0.69 -0.01078,0.13054 0.4025,-0.06 0.9225,-0.215 0.52,-0.155 1.095,-0.37 1.095,-0.37 0,0 0.05824,0.03246 0.0875,0.1025 0.02988,0.07156 0.0225,0.1575 0.0225,0.1575 0,0 -0.19,0.445 -0.24,0.52 -0.05,0.075 0.03,0.08 0.03,0.08 l 0.34,0.0925 c 0.035,0.00836 0.05582,-0.0025 0.06582,-0.03832 0.01532,-0.05488 0.02336,-0.27168 0.06336,-0.33168 0.04,-0.06 0.2175,-0.2675 0.2175,-0.2675 h 0.75832 l -0.00082,-0.31168 c 0,0 0.0025,0.01168 0.04914,0.005 0,0.80296 0.67824,1.48692 0.89502,1.59918 0.05768,0.02988 0.075,-0.005 0.09,-0.0325 0.015,-0.0275 0.18832,-0.30664 0.215,-0.36 0.02666,-0.05332 0.05332,-0.07332 -0.02668,-0.12664 C 4.0857,1.46426 4.10294,0.7702 4.10294,0.7702 c 0,0 0.285,-0.005 0.3175,-0.0025 0.0325,0.0025 0.13982,0.09734 0.1975,0.0975 0.23206,0.00074 0.2725,-0.1125 0.4475,-0.115 0.08006,-0.00114 0.9275,0 0.9275,0 v -0.1475 l 2.0025,0.0025 0.0025,-0.1975 c 0,0 -0.0525,0.0025 -0.065,-0.0225 z m -5.17634,0.66116 0.00134,-0.25164 0.5175,0.0025 c -0.02058,0.00796 0.0225,0.245 0.0225,0.245 l -0.54134,0.00414 z',
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,   1.5,      1,     50,      5,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.power, g.doublereload, g.doublereload, g.power]),
            TYPE: [exports.bullet, { SHAPE: 5, }],
        }, },
    ],
};

function bossStats(options = {}) {
  if (!options.health) options.health = 1;
  if (!options.damage) options.damage = 1;
  if (!options.speed) options.speed = 1;
  if (!options.fov) options.fov = 1;
  if (!options.accel) options.accel = 1;
  return {
    HEALTH: base.HEALTH * 15 * options.health,
    DAMAGE: base.DAMAGE * 1.5 * options.damage,
    SPEED: base.SPEED * 0.1 * options.speed,
    DENSITY: 500,
    FOV: base.FOV * 1.125 * options.fov,
    SHIELD: base.SHIELD * 0.75,
    ACCELERATION: 2 * options.accel,
  };
}
const setBuild = build => {
  let skills = build.split(build.includes("/") ? "/" : "").map(r => +r);
  if (skills.length !== 10)
    throw new RangeError("Build must be made up of 10 numbers");
  return [6, 4, 3, 5, 2, 9, 0, 1, 8, 7].map(r => skills[r]);
};
//BETA TANKS
exports.rogisfat = {
PARENT: [exports.genericTank],
};
exports.dev = {
PARENT: [exports.genericTank],
LABEL: 'Developer',
RESET_UPGRADES: true,
SKILL: setBuild("0077777700"),
BODY: { // def
SHIELD: unlimited,
REGEN: 10,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 20,
FOV: 1.09,
},    
TURRETS: [],
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
POSITION: [  18,    10,    -1.3,     0,      0,      0,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet,
}, 
}, 
],
};
exports.dev2 = {
PARENT: [exports.genericTank],
LABEL: "Bosses",
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev2p2 = {
PARENT: [exports.genericTank],
LABEL: "Bosses Page 2",
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev1u2 = {
PARENT: [exports.genericTank],
LABEL: 'Bosses Without AI', 
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev2u2 = {
PARENT: [exports.genericTank],
LABEL: 'X-K-X Bosses', 
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev1u2u2 = {
PARENT: [exports.genericTank],
LABEL: 'X-K-X Bosses Without AI', 
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev3u2 = {
PARENT: [exports.genericTank],
LABEL: 'Celestials', 
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev1u3u2 = {
PARENT: [exports.genericTank],
LABEL: 'Celestials Without AI', 
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev3u2p2 = {
PARENT: [exports.genericTank],
LABEL: 'Celestials Page 2', 
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev2u3u2 = {
PARENT: [exports.genericTank],
LABEL: 'Old Celestials', 
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev4u2 = {
PARENT: [exports.genericTank],
LABEL: "Eternals",
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev1u4u2 = {
PARENT: [exports.genericTank],
LABEL: "Eternals Without AI",
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev3 = {
PARENT: [exports.genericTank],
LABEL: "Beta Tanks",
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev3p2 = {
PARENT: [exports.genericTank],
LABEL: "Page 2",
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev2u3 = {
PARENT: [exports.genericTank],
LABEL: 'OP Tanks',
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
BODY: { // def
SHIELD: unlimited,
REGEN: 10,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 20,
FOV: 1.09,
},             
TURRETS: [],
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
POSITION: [  18,    10,    -1.3,     0,      0,      0,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet,
}, 
}, 
],
};
exports.dev3p3 = {
PARENT: [exports.genericTank],
LABEL: "Page 3",
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev3u3 = {
PARENT: [exports.genericTank],
LABEL: 'Diep Tanks',
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
BODY: { // def
SHIELD: unlimited,
REGEN: 10,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 20,
FOV: 1.09,
},             
TURRETS: [],
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
POSITION: [  18,    10,    -1.3,     0,      0,      0,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet,
}, 
}, 
],
};
exports.dev4 = {
PARENT: [exports.genericTank],
LABEL: 'Color Changer', 
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev5 = {
PARENT: [exports.genericTank],
LABEL: 'Nesters', 
RESET_UPGRADES: true,
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev6 = {
PARENT: [exports.genericTank],
LABEL: 'Arena Closers', 
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev7 = {
PARENT: [exports.genericTank],
LABEL: 'Dominators', 
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: unlimited,
REGEN: 11,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 11,
FOV: 1.09
 },
TURRETS: [],
GUNS: [ {    
POSITION: [18, 10, -1.3, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.op]),
TYPE: exports.bullet
}
}
]
};
exports.dev8 = {
PARENT: [exports.genericTank],
LABEL: 'Future Tanks',
RESET_UPGRADES: true,
BODY: { // def
SHIELD: unlimited,
REGEN: 10,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 20,
FOV: 1.09,
},    
TURRETS: [],
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
POSITION: [  18,    10,    -1.3,     0,      0,      0,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, 
}, 
],
};
exports.dev9 = {
PARENT: [exports.genericTank],
LABEL: 'Entities',
RESET_UPGRADES: true,
BODY: { // def
SHIELD: unlimited,
REGEN: 10,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 20,
FOV: 1.09,
},    
TURRETS: [],
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
POSITION: [  18,    10,    -1.3,     0,      0,      0,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, 
}, 
],
};
exports.dev1u9 = {
PARENT: [exports.genericTank],
LABEL: 'Bosses',
RESET_UPGRADES: true,
BODY: { // def
SHIELD: unlimited,
REGEN: 10,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 20,
FOV: 1.09,
},    
TURRETS: [],
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
POSITION: [  18,    10,    -1.3,     0,      0,      0,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, 
}, 
],
};
exports.dev2u9 = {
PARENT: [exports.genericTank],
LABEL: 'Polygons',
RESET_UPGRADES: true,
BODY: { // def
SHIELD: unlimited,
REGEN: 10,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 20,
FOV: 1.09,
},    
TURRETS: [],
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
POSITION: [  18,    10,    -1.3,     0,      0,      0,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, 
}, 
],
};
exports.dev3u9 = {
PARENT: [exports.genericTank],
LABEL: 'Tanks',
RESET_UPGRADES: true,
BODY: { // def
SHIELD: unlimited,
REGEN: 10,
HEALTH: unlimited,
DAMAGE: unlimited,
DENSITY: 20,
FOV: 1.09,
},    
TURRETS: [],
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
POSITION: [  18,    10,    -1.3,     0,      0,      0,      0,   ], 
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, 
}, 
],
}; 
exports.approach3 = {
PARENT: [exports.genericTank],
LABEL: 'Approacher',
RESET_UPGRADES: true,
SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
BODY: {
SHIELD: 1001,
REGEN: 11,
HEALTH: 101,
DAMAGE: 11,
DENSITY: 11,
FOV: 1.09
 },
GUNS: [{
  POSITION: [ 18, 8, 1, 0, 0, -30, 0.5],
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic]),
     TYPE: exports.trap
      }, }, {
  POSITION: [ 18, 8, 1, 0, 0, 30, 0.5],
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic]),
     TYPE: exports.trap
     }, }, {
  POSITION: [ 18, 8, 1, 0, 0, 15, 0.2],
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.hive]),
     TYPE: exports.m2swarmb
     }, }, {
  POSITION: [ 18, 8, 1, 0, 0, -15, 0.2],
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.hive]),
     TYPE: exports.m2swarmb
     }, }, {
  POSITION: [ 26, 8, 1, 0, 0, 0, 0],
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sidewind]),
     TYPE: exports.snake
     }, }, 
    ],     
   };   
exports.approach2 = makeAuto(exports.approach3,'');
exports.approach = makeHybrid(exports.approach2, 'Approacher');
exports.hugespray = { 
            PARENT: [exports.pinkBodyTank],
            LABEL: "Elite Sprayer",
            DANGER: 8,
            SIZE: 45,
            BODY: {
              HEALTH: 150,
              SPEED: base.SPEED,
              FOV: 3,
              },
  SHAPE: 3,
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        },
            ],
        };  

exports.hugedestroy = {
            PARENT: [exports.pinkBodyTank],
            LABEL: "Elite Destroyer",
            DANGER: 8,
            SIZE: 45,
            BODY: {
            HEALTH: 150,
            SPEED: base.SPEED,
            FOV: 3,
              },
            SHAPE: 3,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.drone]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.drone]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.drone]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.Auto4generic, { INDEPENDENT: true, COLOR: 5, }]
                    },
            ],
        }; 
 exports.ausic = makeAuto(exports.basic); 
            exports.hugegun = {
            PARENT: [exports.pinkBodyTank],
            LABEL: 'Elite Gunner',
            DANGER: 8,
            SIZE: 45,
            BODY: {
             HEALTH: 150,
            SPEED: base.SPEED,
            FOV: 3,
              },
            SHAPE: 3,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        }; 
            exports.hugebattle = {
            PARENT: [exports.genericTank],
            LABEL: 'Elite Battleship',
            DANGER: 6,
            SHAPE: 3,
            COLOR: 5,
            FACING_TYPE: 'autospin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,    6,    0.6,     7,      7.5,      60,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                 POSITION: [   4,    6,    0.6,     7,      0,      60,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   4,   6,    0.6,     7,     -7.5,      60,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   4,    6,    0.6,     7,      7.5,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                 POSITION: [   4,    6,    0.6,     7,      0,      180,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   4,   6,    0.6,     7,     -7.5,      180,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   4,    6,    0.6,     7,      7.5,      -60,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                 POSITION: [   4,    6,    0.6,     7,      0,      -60,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   4,   6,    0.6,     7,     -7.5,      -60,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ], 
      TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,     7,      0,     0,     360, 1], 
                    TYPE: [exports.auto3gun, {COLOR: 5}]
                        }, {
                POSITION: [  5,     7,      0,     120,    360, 1], 
                    TYPE: [exports.auto3gun, {COLOR: 5}]
                        }, {
                POSITION: [  5,     7,      0,     240,    360, 1], 
                    TYPE: [exports.auto3gun, {COLOR: 5}]
                        }, {
               POSITION: [  1,     0,      0,      0,     0, 0], 
                    TYPE: exports.battleturret,
                        },
             ],
        };
  exports.newhugespray = {
    PARENT: [exports.genericTank],
    LABEL: 'Elite Sprayer',
    COLOR: 5,
    SHAPE: 3,
    DANGER: 6,
    TURRETS: [{
      POSITION: [11.5, 7, 6, 60, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [11.5, 7, -6, 60, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [11.5, 7, 6, 180, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [11.5, 7, -6, 180, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [11.5, 7, 6, -60, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [11.5, 7, -6, -60, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [6, 0, 0, 0, 360, 1],
      TYPE: exports.spinfm
      },
     ],
    };
        exports.hugespawn = {
            PARENT: [exports.genericTank],
            LABEL: 'Elite Spawner',
            DANGER: 6,
            SHAPE: 3,
            COLOR: 5,
            FACING_TYPE: 'autospin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [{
              POSITION: [  4.5,    11,      1,     10.5,    0,      60,      0,   ], 
                }, {
                POSITION: [   1,     14,      1,      15,     0,      60,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                POSITION: [  3.5,    14,      1,      8,      0,      60,      0,   ], 
                }, {
              POSITION: [  4.5,    11,      1,     10.5,    0,      60,      0,   ], 
                }, {
                POSITION: [   1,     14,      1,      15,     0,      60,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                POSITION: [  3.5,    14,      1,      8,      0,      60,      0,   ], 
                },
          ],
  };
  exports.hugestream = {
  PARENT: [exports.genericTank],
  LABEL: 'Elite Streamliner',
  DANGER: 6,
  COLOR: 5,
  SHAPE: 3,
  FACING_TYPE: 'autospin',
  BODY: {
      ACCELERATION: base.ACCEL * 0.75,
      FOV: base.FOV * 1.2,
  },
  TURRETS: [{
    POSITION: [8, 0, 0, 0, 360, 1],
    TYPE: exports.reloader
    }, {
    POSITION: [14, 7, 0, 60, 360, 0],
    TYPE: exports.stream  
    }, {
    POSITION: [14, 7, 0, 180, 360, 0],
    TYPE: exports.stream  
    }, {
    POSITION: [14, 7, 0, 300, 360, 0],
    TYPE: exports.stream  
    }, 
   ],         
  };  
  exports.elitebasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Elite Basic',
    DANGER: 6,
    COLOR: 5,
    SHAPE: 3,
    FACING_TYPE: 'autospin',
    BODY: {
      ACCELERATION: base.ACCEL * 0.75,
      FOV: base.FOV * 1.2,
    },
    TURRETS: [{
      POSITION: [14, 7, 0, 60, 190, 0],
      TYPE: exports.single,
      }, {
      POSITION: [14, 7, 0, 180, 120, 0],
      TYPE: exports.single,
      }, {
      POSITION: [14, 7, 0, 300, 120, 0],
      TYPE: exports.single,
      }, {
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: [exports.single, { COLOR: 16 }],
      }, 
    ],
  };
  exports.hugenest = {
  PARENT: [exports.genericTank],
  LABEL: 'Nest Keeper',
  COLOR: 14,
  SHAPE: 5,
  SIZE: 65,
  VALUE: 10000,
  BODY: {
  FOV: 1.3,
  SPEED: base.SPEED * 0.5,
  HEALTH: base.HEALTH * 2,
  SHIELD: base.SHIELD * 1.9,
  REGEN: base.REGEN * 0.5,
  DAMAGE: base.DAMAGE * 3.1,
  },
  GUNS: [{
    POSITION: [   3.5,     10,    1.05,     8,      0,     38.5,      0,   ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.meta]),
       TYPE: [exports.drone,{ COLOR: 14, }],
        MAX_CHILDREN: 2,
         AUTOFIRE: true,
          SYNCS_SKILLS: true,
           STAT_CALCULATOR: gunCalcNames.drone,
  }, }, {
    POSITION: [   3.5,     10,    1.05,     8,      0,     110.5,    0,  ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.meta]),
       TYPE: [exports.drone,{ COLOR: 14, }],
        MAX_CHILDREN: 2,
         AUTOFIRE: true,
          SYNCS_SKILLS: true,
           STAT_CALCULATOR: gunCalcNames.drone,
  }, }, {
    POSITION: [   3.5,     10,    1.05,     8,      0,     180,    0,  ], 
     PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.meta]),
         TYPE: [exports.drone,{ COLOR: 14, }],
          MAX_CHILDREN: 2,
           AUTOFIRE: true,
            SYNCS_SKILLS: true,
             STAT_CALCULATOR: gunCalcNames.drone,
  }, }, {
    POSITION: [   3.5,     10,    1.05,     8,      0,     252,    0,  ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.meta]),
       TYPE: [exports.drone,{ COLOR: 14, }],
        MAX_CHILDREN: 2,
         AUTOFIRE: true,
          SYNCS_SKILLS: true,
           STAT_CALCULATOR: gunCalcNames.drone,
  }, }, {
    POSITION: [   3.5,     10,    1.05,     8,      0,     -38.5,    0,  ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.meta]),
       TYPE: [exports.drone,{ COLOR: 14, }],
        MAX_CHILDREN: 2,
         AUTOFIRE: true,
          SYNCS_SKILLS: true,
           STAT_CALCULATOR: gunCalcNames.drone,
  }, },
  ],
  TURRETS: [{
    POSITION: [12, 0, 0, 0, 360, 1],
    TYPE: exports.autoBoomerTurret
  }, {
    POSITION: [8, 9.5, 0, 0, 190, 0],
    TYPE: exports.PurpleAutoSmasherTurret 
  }, {
    POSITION: [8, 9.5, 0, 77, 190, 0],
    TYPE: exports.PurpleAutoSmasherTurret 
  }, {  
    POSITION: [8, 9.5, 0, 144, 190, 0],
    TYPE: exports.PurpleAutoSmasherTurret 
  }, {
    POSITION: [8, 9.5, 0, 216, 190, 0],
    TYPE: exports.PurpleAutoSmasherTurret 
  }, {
    POSITION: [8, 9.5, 0, 288, 190, 0],
    TYPE: exports.PurpleAutoSmasherTurret 
  },
 ],
 };
                exports.falboostnoai = {
                PARENT: [exports.genericTank],
                LABEL: 'Fallen Booster',
                AI: { NO_LEAD: true },
                DANGER: 7,
                CONTROLLERS: ['mapTargetToGoal', 'nearestDifferentMaster'],
       //         SKILL: setBuild("7499777099"),
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.CONQ = {
            PARENT: [exports.genericTank],
            LABEL: 'CONQ',
            COLOR: 37,
            SHAPE: 6,
            GUNS: [{
                POSITION: [21, 14, 1, 0, 0, 60, 0],
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                   TYPE: exports.bullet,
                }, }, {
                POSITION: [21, 14, 1, 0, 0, 180, 0],
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                   TYPE: exports.bullet,
                }, }, {
                POSITION: [21, 14, 1, 0, 0, 300, 0],
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                   TYPE: exports.bullet,
                }, }, {
                POSITION: [18, 14, 1, 0, 0, 0, 0], 
                }, {
                POSITION: [2, 14, 1.1, 18, 0, 0, 0], 
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                   TYPE: exports.block,
                }, }, {
                POSITION: [18, 14, 1, 0, 0, 120, 0], 
                }, {
                POSITION: [18, 14, 1, 0, 0, 240, 0], 
                }, {
                POSITION: [2, 14, 1.1, 18, 0, 240, 0], 
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                   TYPE: exports.block,
                }, }, 
              ],
          TURRETS: [{
            POSITION: [12, 0, 0, 0, 360, 1],
            TYPE: exports.conqtory
            },
           ],
          };
exports.ek1st = {
  PARENT: [exports.genericTank],
  LABEL: "EK-1",
  COLOR: 6,
  SIZE: 20,
  SHAPE: 0,
  AI: { NO_LEAD: false },
  VALUE: 30000,
  BODY: {
    HEALTH: 250
  },
  TURRETS: [{
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 10, 0, 180, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }],
    }, {
      POSITION: [10, 10, 0, 60, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    }, {
      POSITION: [10, 10, 0, -60, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    }, {
      POSITION: [10, 10, 0, 123, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    }, {
      POSITION: [10, 10, 0, 0, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    }, {
      POSITION: [10, 10, 0, -123, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    }, {
      POSITION: [25, 0, 0, 180, 0, 0],
      TYPE: [exports.smasherBody, { COLOR: 9 }]
    }, {
      POSITION: [22, 0, 0, 0, 360, 1],
      TYPE: [exports.rogisfat, { COLOR: 6 }],
    }, {
      POSITION: [10, 0, 0, 0, 360, 1],
      TYPE: [exports.bigauto4gun, { COLOR: 16 }]
    }, 
  ],
};
exports.ek2nd = {
  PARENT: [exports.genericTank],
  LABEL: "EK-2",
  COLOR: 6,
  SIZE: 25,
  SHAPE: 0,
  AI: { NO_LEAD: false },
  VALUE: 50000,
    BODY: {
      HEALTH: 500
    },
  TURRETS: [{
      /*        SIZE X   Y ANGLE  ARC */
      POSITION: [15, 10, 0, 180, 190, 0],
      TYPE: [exports.gunner, { COLOR: 6 }]
    }, {
      POSITION: [15, 10, 0, 60, 190, 0],
      TYPE: [exports.gunner, { COLOR: 6 }]
    }, {
      POSITION: [15, 10, 0, -60, 190, 0],
      TYPE: [exports.gunner, { COLOR: 6 }]
    }, {
      POSITION: [3, 12, -4, 0, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [3, 12, 4, 0, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [3, 12, -4, 120, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [3, 12, 4, 120, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [3, 12, -4, 240, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [3, 12, 4, 240, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [25, 0, 0, 180, 0, 0],
      TYPE: [exports.smasherBody, { COLOR: 9 }]
    }, {
      POSITION: [10, 0, 0, 0, 360, 1],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    },
  ],
  GUNS: [{
    POSITION: [11, 4, 0.55, 7, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [11, 4, 0.55, 7, 0, 120, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [11, 4, 0.55, 7, 0, 240, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, },
  ],
};
exports.ek3rd = {
    PARENT: [exports.genericTank],
    LABEL: "EK-3",
    COLOR: 6,
    SIZE: 40,
    VALUE: 100000,
    BODY: {
      FOV: 1.3,
      SPEED: base.SPEED * 0.1,
      HEALTH: 750,
      SHIELD: base.SHIELD * 2,
      REGEN: base.REGEN,
      DAMAGE: base.DAMAGE * 3
    },
    TURRETS: [{
        POSITION: [3, 12, 2, 0, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, 0, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, 2, 60, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, 60, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, 2, -60, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, -60, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, 120, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, 2, 120, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, 2, 180, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, 180, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, 2, 240, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, 240, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [5, 7, 0, 180, 190, 1],
        TYPE: exports.whitedirector
      }, {
        POSITION: [5, 7, 0, 60, 190, 1],
        TYPE: exports.whitedirector
      }, {
        POSITION: [5, 7, 0, -60, 190, 1],
        TYPE: exports.whitedirector
      }, {
        POSITION: [8, 0, 0, 0, 360, 1],
        TYPE: exports.huntert
      }, {
        POSITION: [24, 0, 0, 0, 360, 0],
        TYPE: exports.ek3rdBody
      },
    ],
        GUNS: [{
        /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [11, 2.5, 0.6, 7, -1.5, 30, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, 30, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, -1.5, -30, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, -30, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, -1.5, -90, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, -90, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, -1.5, 90, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, 90, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, -1.5, 150, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, 150, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, -1.5, 210, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, 210, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        },
      },
    ],
  };
exports.eq1st = {
    PARENT: [exports.genericTank],
    LABEL: "EQ-1",
    COLOR: 6,
    SIZE: 20,
    SHAPE: 0,
    VALUE: 30000,
    BODY: {
      HEALTH: 250
    },
    GUNS: [{
      POSITION: [2, 5, 1, 0, 0, 60, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [2, 5, 1, 0, 0, 180, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 6,
      }, }, {
      POSITION: [2, 5, 1, 0, 0, 300, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 60, 0],
      }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 180, 0],
      }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 300, 0],
      },
     ],
    TURRETS: [{
      POSITION: [25, 0, 0, 180, 0, 0],
      TYPE: [exports.smasherBody, { COLOR: 9 }]
      }, {
      POSITION: [8, 0, 0, 0, 360, 1],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      },
     ],
   };
exports.eq2nd = {
    PARENT: [exports.genericTank],
    LABEL: "EQ-2",
    COLOR: 6,
    SIZE: 25,
    SHAPE: 0,
    VALUE: 100000,
    BODY: {
      HEALTH: 500
    },
    GUNS: [{
      POSITION: [2, 5, 1, 0, 0, 60, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [2, 5, 1, 0, 0, 180, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDEN: 6,
      }, }, {
      POSITION: [2, 5, 1, 0, 0, 300, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 60, 0],
      }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 180, 0],
      }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 300, 0],
      },
    ],
    TURRETS: [{
      POSITION: [9, 10, 0, 0, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, 120, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, 240, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [25, 0, 0, 180, 0, 0],
      TYPE: [exports.smasherBody, { COLOR: 9 }]
      }, {
      POSITION: [9, 0, 0, 0, 360, 1],
      TYPE: [exports.megaTrapTurret, { COLOR: 16 }],
      },
     ],
   };
exports.eq3rd = {
    PARENT: [exports.genericTank],
    LABEL: "EQ-3",
    COLOR: 6,
    SIZE: 40,
    SHAPE: 0,
    VALUE: 500000,
    BODY: {
      FOV: 1.3,
      SPEED: base.SPEED * 0.1,
      HEALTH: 750,
      SHIELD: base.SHIELD * 2,
      REGEN: base.REGEN,
      DAMAGE: base.DAMAGE * 3
    },
    GUNS: [{
      POSITION: [2, 3, 1, 0, 0, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [2, 3, 1, 0, 0, 120, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [2, 3, 1, 0, 0, 240, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 6,
      }, }, {
      POSITION: [2, 3, 1, 0, 0, 60, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 6,
      }, }, {
      POSITION: [2, 3, 1, 0, 0, 180, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [2, 3, 1, 0, 0, 300, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 0, 0],
      }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 120, 0],
      }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 240, 0],
      }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 60, 0],
      }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 180, 0],
      }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 300, 0],
      },
    ],
    TURRETS: [{
      POSITION: [9, 10, 0, 30, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, 150, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, 270, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, -30, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, -150, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, -270, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [4, 5.35, 0, 0, 360, 1],
      TYPE: [exports.eq3spawn, { COLOR: 16 }],
      }, {
      POSITION: [4, 5.35, 0, 120, 360, 1],
      TYPE: [exports.eq3spawn, { COLOR: 16 }],
      }, {
      POSITION: [4, 5.35, 0, 240, 360, 1],
      TYPE: [exports.eq3spawn, { COLOR: 16 }],
      }, {
      POSITION: [5, 0, 0, 0, 360, 1],
      TYPE: [exports.eq3musket, { COLOR: 16 }],
      }, {
      POSITION: [25, 0, 0, 180, 0, 0],
      TYPE: [exports.eq3body, { COLOR: 9 }]
      }, 
    ],
  };

exports.ek4th = (() => {
  let nailgunY = 1;
return {
    PARENT: [exports.genericTank],
    LABEL: "EK-4",
    COLOR: 6,
    SIZE: 55,
    SHAPE: 0,
    VALUE: 1000000,
    BODY: {
      FOV: 1.3,
      SPEED: base.SPEED * 0.1,
      HEALTH: 1000,
      SHIELD: base.SHIELD * 2,
      REGEN: base.REGEN,
      DAMAGE: base.DAMAGE * 3
    },
    TURRETS: [{
      POSITION: [22, 0, 0, 0, 360, 0],
      TYPE: [exports.eq3body, { COLOR: 9 }],
      }, {
      POSITION: [6, 5, 5, 45, 360, 1],
      TYPE: [exports.ek4assassin, { COLOR: 16 }],
      }, {
      POSITION: [6, 5, 5, 135, 360, 1],
      TYPE: [exports.ek4assassin, { COLOR: 16 }],
      }, {
      POSITION: [6, 5, 5, 225, 360, 1],
      TYPE: [exports.ek4assassin, { COLOR: 16 }],
      }, {
      POSITION: [6, 5, 5, 315, 360, 1],
      TYPE: [exports.ek4assassin, { COLOR: 16 }],
      },
    ],
    GUNS: [{ 
      POSITION: [3, 3.3, 1, 13, 0, 0, 0], 
      }, {
      POSITION: [2, 6.5, 1, 15.5, 0, 0, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: exports.ek4falcon,
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,
             MAX_CHILDREN: 2
      }, }, {                        
      POSITION: [2, 6.5, 1, 11, 0, 0, 0], 
      }, {
      POSITION: [3, 3.3, 1, 13, 0, 90, 0], 
      }, {
      POSITION: [2, 6.5, 1, 15.5, 0, 90, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: exports.ultraegg,
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
             MAX_CHILDREN: 1
      }, }, {                        
      POSITION: [2, 6.5, 1, 11, 0, 90, 0], 
      }, {
      POSITION: [3, 3.3, 1, 13, 0, 180, 0], 
      }, {
      POSITION: [2, 6.5, 1, 15.5, 0, 180, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: exports.ek4eagle,
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true, 
             MAX_CHILDREN: 2
      }, }, {                        
      POSITION: [2, 6.5, 1, 11, 0, 180, 0], 
      }, {
      POSITION: [3, 3.3, 1, 13, 0, 270, 0], 
      }, {
      POSITION: [2, 6.5, 1, 15.5, 0, 270, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: exports.ultraegg,
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,
             MAX_CHILDREN: 1
      }, }, {                        
      POSITION: [2, 6.5, 1, 11, 0, 270, 0], 
      }, {
      POSITION: [8, 4, 0.55, 11, 0, 60, 0],
      PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      }, }, {  
      POSITION: [8, 4, 0.55, 11, 0, 150, 0],
      PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      }, }, { 
      POSITION: [8, 4, 0.55, 11, 0, 240, 0],
      PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      }, }, { 
      POSITION: [8, 4, 0.55, 11, 0, 330, 0],
      PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY - 0.5), 30, 0.25],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY + 0.5), 30, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, nailgunY, 30, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY - 0.5), 120, 0.25],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY + 0.5), 120, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, nailgunY, 120, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY - 0.5), 210, 0.25],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY + 0.5), 210, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, nailgunY, 210, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY - 0.5), 300, 0.25],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY + 0.5), 300, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, nailgunY, 300, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY + 0.5), 30, 0.25], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY - 0.5), 30, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, -nailgunY, 30, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY + 0.5), 120, 0.25], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY - 0.5), 120, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, -nailgunY, 120, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY + 0.5), 210, 0.25], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY - 0.5), 210, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, -nailgunY, 210, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY + 0.5), 300, 0.25], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY - 0.5), 300, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, -nailgunY, 300, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [1, 3, -1.8, 11, 0, 30, 0],
      }, {
      POSITION: [1, 3, -1.8, 11, 0, 120, 0],
      }, {
      POSITION: [1, 3, -1.8, 11, 0, 210, 0],
      }, {
      POSITION: [1, 3, -1.8, 11, 0, 300, 0],
      },
   ],
}})();
exports.sk1st = {
    PARENT: [exports.genericTank],
    LABEL: "SK-1",
    COLOR: 13,
    SIZE: 20,
    SHAPE: 4,
    VALUE: 300000,
    MAX_CHILDREN: 8,
    GUNS: [{
      POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      90,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      90,      0.1,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      90,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      180,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      180,      0.2,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      180,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      270,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      270,      0.3,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      270,      0,   ], 
      },
   ],
  TURRETS: [{
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.auto3, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto3, { COLOR: 13 }],
    }, { 
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.auto3, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto3, { COLOR: 13 }],
    },
  ],
};
exports.sk2nd = {
    PARENT: [exports.genericTank],
    LABEL: "SK-2",
    COLOR: 13,
    SIZE: 25,
    SHAPE: 4,
    VALUE: 400000,
    MAX_CHILDREN: 10,
    GUNS: [{
      POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      90,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      90,      0.1,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      90,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      180,      0,   ], 
      }, { //
      POSITION: [   2,     14,      1,      15.5,   0,      180,      0.2,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      180,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      270,      0,   ], 
      }, { //
      POSITION: [   2,     14,      1,      15.5,   0,      270,      0.3,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      270,      0,   ], 
      },
   ],
  TURRETS: [{
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.heavy3, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.heavy3, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto5, { COLOR: 13 }],
    }, {
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: [exports.rocket, { COLOR: 13 }],
    },
  ],
};
exports.sk3rd = {
    PARENT: [exports.genericTank],
    LABEL: "SK-3",
    COLOR: 13,
    SIZE: 40,
    SHAPE: 4,
    VALUE: 500000,
    BODY: {
      FOV: 1.3,
      SPEED: base.SPEED * 0.1,
      HEALTH: base.HEALTH * 2,
      SHIELD: base.SHIELD * 2,
      REGEN: base.REGEN,
      DAMAGE: base.DAMAGE * 3
    },
    MAX_CHILDREN: 4,
    GUNS: [{
      POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      90,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      90,      0.1,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      90,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      180,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      180,      0.2,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      180,      0,   ], 
      }, { 
      POSITION: [   5,     11,      1,      10.5,   0,      270,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      270,      0.3,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      270,      0,   ], 
      },
   ],
  TURRETS: [{
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: [exports.sk3rocket, { COLOR: 13 }],
    },
  ],
};
exports.sk4th = {
    PARENT: [exports.genericTank],
    LABEL: "SK-4",
    COLOR: 13,
    SIZE: 65,
    SHAPE: 4,
    VALUE: 1000000,
    BODY: {
      FOV: 1.5,
      SPEED: base.SPEED * 0.2,
      HEALTH: base.HEALTH * 2.1,
      SHIELD: base.SHIELD * 2.1,
      REGEN: base.REGEN * 1.1,
      DAMAGE: base.DAMAGE * 3.1,
    },
    MAX_CHILDREN: 4,
    GUNS: [{
      POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      90,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      90,      0.1,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      90,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      180,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      180,      0.2,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      180,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      270,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      270,      0.3,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      270,      0,   ], 
      },
   ],
  TURRETS: [{
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, { //
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 0, 360, 1],
    TYPE: [exports.twin4, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 90, 360, 1],
    TYPE: [exports.sniper3, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 180, 360, 1],
    TYPE: [exports.twin4, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 270, 360, 1],
    TYPE: [exports.sniper3, { COLOR: 13 }],
    }, {
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: [exports.sk3rocket, { COLOR: 13 }],
    },
  ],
};
exports.sk5th = {
    PARENT: [exports.genericTank],
    LABEL: "SK-5",
    COLOR: 13,
    SIZE: 80,
    SHAPE: 4,
    VALUE: 1500000,
    BODY: {
      FOV: 1.7,
      SPEED: base.SPEED * 0.3,
      HEALTH: base.HEALTH * 2.2,
      SHIELD: base.SHIELD * 2.2,
      REGEN: base.REGEN * 1.2,
      DAMAGE: base.DAMAGE * 3.2,
    },
    MAX_CHILDREN: 4,
    GUNS: [{
      POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      90,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      90,      0.1,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {//                        
      POSITION: [   4,     14,      1,      8,      0,      90,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      180,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      180,      0.2,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      180,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      270,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      270,      0.3,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      270,      0,   ], 
      },
   ],
  TURRETS: [{
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {//
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 0, 360, 1],
    TYPE: [exports.twin6, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 90, 360, 1],
    TYPE: [exports.sniper6, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 180, 360, 1],
    TYPE: [exports.twin6, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 270, 360, 1],
    TYPE: [exports.sniper6, { COLOR: 13 }],
    }, {
    POSITION: [3, 4, 0,  0,  360, 1],
    TYPE: [exports.auto5gun, { COLOR: 16 }],
    }, {
    POSITION: [3, 4, 0,  90,  360, 1],
    TYPE: [exports.auto5gun, { COLOR: 16 }],
    }, {
    POSITION: [3, 4, 0,  180,  360, 1],
    TYPE: [exports.auto5gun, { COLOR: 16 }],
    }, {
    POSITION: [3, 4, 0,  270,  360, 1],
    TYPE: [exports.auto5gun, { COLOR: 16 }],
    }, {
    POSITION: [8, 0, 0,  0,  360, 1],
    TYPE: [exports.sk3rocket, { COLOR: 13 }],
    },
  ],
};
exports.sk6th = {
    PARENT: [exports.genericTank],
    LABEL: "SK-6",
    COLOR: 13,
    SIZE: 95,
    SHAPE: 4,
    VALUE: 2000000,
    BODY: {
      FOV: 1.9,
      SPEED: base.SPEED * 0.5,
      HEALTH: base.HEALTH * 2.4,
      SHIELD: base.SHIELD * 2.4,
      REGEN: base.REGEN * 1.4,
      DAMAGE: base.DAMAGE * 3.4,
    },
    MAX_CHILDREN: 4,
    GUNS: [{
      POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      90,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      90,      0.1,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {  
      POSITION: [   4,     14,      1,      8,      0,      90,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      180,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      180,      0.2,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      180,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      270,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      270,      0.3,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.sk3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      270,      0,   ], 
      },
   ],
  TURRETS: [{
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.heavy5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto7, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 0, 360, 1],
    TYPE: [exports.twin6, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 90, 360, 1],
    TYPE: [exports.sniper6, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 180, 360, 1],
    TYPE: [exports.twin6, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 270, 360, 1],
    TYPE: [exports.sniper6, { COLOR: 13 }],
    }, {
    POSITION: [3, 4, 0,  0,  360, 1],
    TYPE: [exports.preda, { COLOR: 16 }],
    }, {
    POSITION: [3, 4, 0,  90,  360, 1],
    TYPE: [exports.preda, { COLOR: 16 }],
    }, {
    POSITION: [3, 4, 0,  180,  360, 1],
    TYPE: [exports.preda, { COLOR: 16 }],
    }, {
    POSITION: [3, 4, 0,  270,  360, 1],
    TYPE: [exports.preda, { COLOR: 16 }],
    }, {
    POSITION: [3, 4, 0,  40,  360, 1],
    TYPE: [exports.ord, { COLOR: 16 }],
    }, {
    POSITION: [3, 4, 0,  135,  360, 1],
    TYPE: [exports.ord, { COLOR: 16 }],
    }, {
    POSITION: [3, 4, 0,  225,  360, 1],
    TYPE: [exports.ord, { COLOR: 16 }],
    }, {
    POSITION: [3, 4, 0,  315,  360, 1],
    TYPE: [exports.ord, { COLOR: 16 }],
    }, {
    POSITION: [8, 0, 0,  0,  360, 1],
    TYPE: [exports.sk3rocket, { COLOR: 13 }],
    },
  ],
};
//Colour Changes
exports.t0 = {
  PARENT: [exports.genericTank],
  LABEL: 'Teal',
  COLOR: 0
  };
exports.t1 = {
  PARENT: [exports.genericTank],
  LABEL: 'Light Green',
  COLOR: 1
  };
exports.t2 = {
  PARENT: [exports.genericTank],
  LABEL: 'Orange',
  COLOR: 2
  };
exports.t3 = {
  PARENT: [exports.genericTank],
  LABEL: 'Light Yellow',
  COLOR: 3
  };
exports.t4 = {
  PARENT: [exports.genericTank],
  LABEL: 'Lavender',
  COLOR: 4
  };
exports.t5 = {
  PARENT: [exports.genericTank],
  LABEL: 'Pink',
  COLOR: 5
  };
exports.t6 = {
  PARENT: [exports.genericTank],
  LABEL: 'Very Light Gray',
  COLOR: 6
  };
exports.t7 = {
  PARENT: [exports.genericTank],
  LABEL: 'Light Gray',
  COLOR: 7
  };
exports.t8 = {
  PARENT: [exports.genericTank],
  LABEL: 'Bright White',
  COLOR: 8
  };
exports.t9 = {
  PARENT: [exports.genericTank],
  LABEL: 'Darker GGray',
  COLOR: 9
  };
exports.t10 = {
  PARENT: [exports.genericTank],
  LABEL: 'Sky Blue',
  COLOR: 10
  };
exports.clean = {
  PARENT: [exports.genericTank],
  LABEL: 'Server Cleaner',
  BODY: {
    FOV: 2
  },
  GUNS: [{
    POSITION: [18, 69420, 1, 0, 5, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.op]),
       TYPE: exports.bullet
       }, },
      ],
  };
exports.explore = {
  PARENT: [exports.genericTank],
  LABEL: 'Explorer',
  BODY: {
    FOV: 3,
    HEALTH: 999999999999,
    REGEN: 99999999,
    SHIELD: 999999999
  },
  GUNS: [{
    POSITION: [18, 8, 1, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.op]),
       TYPE: exports.bullet
       }, },
      ],
  };
                exports.ultifact = {
                PARENT: [exports.genericTank],
                LABEL: 'Ultimate Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
                            TYPE: exports.factory2,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.odat = makeAuto({
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,      -7,     0.50,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  24,     8,      1,      0,      0,      0,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Normal',
                    }, }, {
                POSITION: [  21,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,
                        MAX_CHILDREN: 4,
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,    
                        MAX_CHILDREN: 4, 
                    }, }, {
                POSITION: [  14,     8,      1,      0,      0,      180,      0,   ],
                    }, {
                POSITION: [   4,     8,     1.5,    14,      0,      180,      0,   ], 
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.trap]),
                   TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
             }, },
           ],
        }, 'Overdanceautotrapper');
exports.arrasmayhem = {
  PARENT: [exports.genericTank],
  LABEL: 'arrasmayhemtanksbelike',
  GUNS: [{
     POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, 
                                     g.doublereload, 
                                     g.doublereload, 
                                     g.doublereload, 
                                     g.doublereload, 
                                     g.doublereload]),
         TYPE: exports.bullet
       }, },
     ],
  };

            exports.minitrap = {
            PARENT: [exports.genericTank],
            DANGER: 5,
            LABEL: 'MiniTrapper',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     3,      1,      0,     -4,     -0,     0.25,   ],
                }, {
                POSITION: [  20,     3,      1,      0,      4,      0,     0.75,   ], 
                }, {
                POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                }, {
                POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                 PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.basic, g.doublereload]),
                   TYPE: exports.ctmissile
                }, }, {
                POSITION: [  18,     8,     1,      0,      0,      0,      0,   ], 
                },  
           ],
        };
                exports.master2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Master',
                BODY: {
                    HEALTH: base.HEALTH * 0.6,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                    SPEED: base.SPEED * 1.3
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     13,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.baboost,
                            MAX_CHILDREN: 2,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.baboost,
                            MAX_CHILDREN: 2,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.baboost,
                            MAX_CHILDREN: 2,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.baboost,
                            MAX_CHILDREN: 2,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.baboost,
                            MAX_CHILDREN: 2,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
                exports.sept = {
                PARENT: [exports.genericTank],
                DANGER: 8,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Septuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,    10,      1,      0,     -5,      0,    1.004, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  13,    10,      1,      0,      5,      0,    1.004, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,     -4,      0,    1.004, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      4,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -2,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      2,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            }; 
exports.spectate = {
  PARENT: [exports.genericTank],
  LABEL: 'Spectator',
  BODY: {
    HEALTH: 100000000,
    DAMAGE: 100000000,
    FOV: 2.5,
    ACCELERATION: 2.5,
    SPEED: 2.5
  },
  ALPHA: 0.001,
  INVISIBLE: [0.1,0.1],
  DANGER: -8
};
exports.momwtdym = {
    PARENT: [exports.genericTank],
    BODY: {
      ACCELERATION: 111117777777777000001111133333,
      SPEED: 55555444443333333333333334444455555,
      HEALTH: 10000000,
      DAMAGE: 100000,
    },
    LABEL: 'Me on my way to do your mom',
    DANGER: 7,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni,
                                    g.doublereload, g.doublereload, g.doublereload, g.doublereload, g.doublereload,
                                    g.doublereload, g.doublereload, g.doublereload, g.doublereload, g.doublereload,
                                    g.doublereload, g.doublereload, g.doublereload, g.doublereload, g.doublereload]),
       TYPE: exports.bullet,
     }, },
   ],
 };

exports.ugrow = {
  PARENT: [exports.genericTank],
  LABEL: 'Ultra-Grower',
  GUNS: [{
    POSITION: [ 23, 20, 1, 0, 0, 0, 0],
     PROPERTIES: {
       SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
        TYPE: exports.ultraGrowBullet,
       }, }, {
    POSITION: [ 5, 24, 1, 16, 0, 0, 0],
       },
     ],
    };
exports.diepfact = {
  PARENT: [exports.genericTank],
  LABEL: 'Diep Factory',
  DANGER: 8,
  MAX_CHILDREN: 6,
  SHAPE: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
                    TYPE: exports.minion,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                }, },
        ],
    };
exports.quad = {
  PARENT: [exports.genericTank],
  LABEL: 'Quad Tank',
  GUNS: [{
    POSITION: [18, 8, 1, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: exports.bullet,
    }, }, {
    POSITION: [18, 8, 1, 0, 0, 90, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: exports.bullet,
    }, }, {
    POSITION: [18, 8, 1, 0, 0, 180, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: exports.bullet,
    }, }, {
    POSITION: [18, 8, 1, 0, 0, 270, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: exports.bullet,
    }, },
  ],
};
exports.auto4diep = {
  PARENT: [exports.genericTank],
  LABEL: 'Diep Auto-4',
  DANGER: 7,
  FACING_TYPE: 'autospin',
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [  11,     8,      0,      0,     190, 0], 
      TYPE: exports.auto4diepgun,
      }, {
      POSITION: [  11,     8,      0,      90,    190, 0], 
      TYPE: exports.auto4diepgun,
      }, {
      POSITION: [  11,     8,      0,     180,    190, 0], 
      TYPE: exports.auto4diepgun,
      }, {
      POSITION: [  11,     8,      0,     270,    190, 0], 
      TYPE: exports.auto4diepgun,
      }, ],
};
exports.dbenthy = makeHybrid(exports.diepbent, 'Bent Hybrid 2');
exports.worsttank = makeAuto(exports.smash, 'Diep Auto-Smasher');

//Nesters
exports.eggnest = {
  PARENT: [exports.genericTank],
  LABEL: 'Egg Nester',
  COLOR: 6,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 5, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.egg, { COLOR:6, SIZE: 5 }],
    }, }, {
    POSITION: [18, 10, -1.3, 0, 0, 0, 0],
    }, 
  ],
  TURRETS: [{
    POSITION: [5, 0, 0, 0, 360, 1],
    TYPE: exports.egg
    },
   ],
  };
exports.squnest = {
  PARENT: [exports.genericTank],
  LABEL: 'Square Nester',
  COLOR: 13,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7, 1, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.square, { COLOR:13, SIZE: 10 }],
    }, }, {
    POSITION: [18, 10, -1.3, 0, 0, 0, 0],
    }, 
  ],
  TURRETS: [{
    POSITION: [6, 0, 0, 0, 360, 1],
    TYPE: exports.square
    },
   ],
  };
exports.trinest = {
  PARENT: [exports.genericTank],
  LABEL: 'Triangle Nester',
  COLOR: 2,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.triangle, { COLOR:2, SIZE: 9 }],
    }, }, {
    POSITION: [18, 10, -1.3, 0, 0, 0, 0],
    }, 
  ],
  TURRETS: [{
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: exports.triangle
    },
   ],
  };
exports.pentanest = {
  PARENT: [exports.genericTank],
  LABEL: 'Penta Nester',
  COLOR: 14,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7.5, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.pentagon, { COLOR:14, SIZE: 16 }],
    }, }, {
    POSITION: [18, 10, -1.3, 0, 0, 0, 0],
    }, 
  ],
  TURRETS: [{
    POSITION: [7.5, 0, 0, 0, 360, 1],
    TYPE: exports.pentagon
    },
   ],
  };
exports.gemnest = {
  PARENT: [exports.genericTank],
  LABEL: 'Gem Nester',
  COLOR: 0,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 5, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.gem, { COLOR:0, SIZE: 5 }],
    }, }, {
    POSITION: [18, 10, -1.3, 0, 0, 0, 0],
    }, 
  ],
  TURRETS: [{
    POSITION: [5, 0, 0, 0, 360, 1],
    TYPE: exports.gem
    },
   ],
  };
exports.gsqunest = {
  PARENT: [exports.genericTank],
  LABEL: 'Green Square Nester',
  COLOR: 1,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.gsqu, { COLOR:1, SIZE: 10 }],
    }, }, {
    POSITION: [18, 10, -1.3, 0, 0, 0, 0],
    }, 
  ],
  TURRETS: [{
    POSITION: [6, 0, 0, 0, 360, 1],
    TYPE: exports.gsqu
    },
   ],
  };
exports.gtrinest = {
  PARENT: [exports.genericTank],
  LABEL: 'Green Triangle Nester',
  COLOR: 1,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.gtri, { COLOR:1, SIZE: 13 }],
    }, }, {
    POSITION: [18, 10, -1.3, 0, 0, 0, 0],
    }, 
  ],
  TURRETS: [{
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: exports.gtri
    },
   ],
  };
exports.gpenest = {
  PARENT: [exports.genericTank],
  LABEL: 'Green Penagon Nester',
  COLOR: 1,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7.5, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.gpenta, { COLOR:1, SIZE: 16 }],
    }, }, {
    POSITION: [18, 10, -1.3, 0, 0, 0, 0],
    }, 
  ],
  TURRETS: [{
    POSITION: [7.5, 0, 0, 0, 360, 1],
    TYPE: exports.gpenta
    },
   ],
  };

exports.jewnest = {
  PARENT: [exports.genericTank],
  LABEL: 'Jewel Nester',
  COLOR: 3,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 5, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.jewel, { COLOR:3, SIZE: 5 }],
    }, }, {
    POSITION: [18, 10, -1.3, 0, 0, 0, 0],
    }, 
  ],
  TURRETS: [{
    POSITION: [5, 0, 0, 0, 360, 1],
    TYPE: exports.jewel
    },
   ],
  };
/*nothing.  uhhhhhh
exports.pmode = {
PARENT: [exports.genericTank],
LABEL: "PictureMode",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};



exports.unamed = {
PARENT: [exports.genericTank],
LABEL : "Unknown",
GUNS: [{
POSITION: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
], 
};



exports.back = {
PARENT: [exports.genericTank],
LABEL : "Back",
GUNS: [{
POSITION: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
], 
};



exports.selectank = {
PARENT: [exports.genericTank],
LABEL: "YourTankHere",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};



exports.bluetank= {
PARENT: [exports.genericTank],
LABEL: "BluePicture",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};



exports.greentank = {
PARENT: [exports.genericTank],
LABEL: "GreenPicture",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};



exports.redtank = {
PARENT: [exports.genericTank],
LABEL: "RedPicture",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};



exports.yellowtank = {
PARENT: [exports.genericTank],
LABEL: "YellowPicture",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};



exports.purpletank = {
PARENT: [exports.genericTank],
LABEL: "PurplePicture",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};



exports.magentank = {
PARENT: [exports.genericTank],
LABEL: "MagentaPicture",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};



exports.graytank = {
PARENT: [exports.genericTank],
LABEL: "GrayPicture",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};



exports.whitank = {
PARENT: [exports.genericTank],
LABEL: "WhitePicture",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};



exports.aquatank = {
PARENT: [exports.genericTank],
LABEL: "AquaPicture",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};



exports.goldtank = {
PARENT: [exports.genericTank],
LABEL: "GoldPicture",
GUNS: [ {
POSITITON: [18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet,
}, },
],
};         
*/
exports.betaAt0 = {
PARENT: [exports.genericTank],
LABEL: 'Abandoned Unsolved Tank',
};
exports.betaAt1U1 = {
PARENT: [exports.genericTank],
LABEL: 'A'
};
exports.betaAt2U1 = {
PARENT: [exports.genericTank],
LABEL: 'F'
};
exports.betaAt3U1 = {
PARENT: [exports.genericTank],
LABEL: 'T',
};
exports.betaAt4U1 = {
PARENT: [exports.genericTank],
LABEL: 'O',
};
exports.betaAt5U1 = {
PARENT: [exports.genericTank],
LABEL: 'C',
};
exports.betaAt6U1 = {
PARENT: [exports.genericTank],
LABEL: 'X',
};
exports.betaAt7U1 = {
PARENT: [exports.genericTank],
LABEL: 'L',
};
exports.betaAt8U1 = {
PARENT: [exports.genericTank],
LABEL: 'S',
};
exports.betaAt9U1 = {
PARENT: [exports.genericTank],
LABEL: 'R',
};
exports.betaAt10U1 = {
PARENT: [exports.genericTank],
LABEL: 'Q',
};
exports.betaAt1U2 = {
PARENT: [exports.genericTank],
LABEL: '4'
};
exports.betaAt2U2 = {
PARENT: [exports.genericTank],
LABEL: '8'
};
exports.betaAt3U2 = {
PARENT: [exports.genericTank],
LABEL: '6', 
};
exports.betaAt4U2 = {
PARENT: [exports.genericTank],
LABEL: '10',
};
exports.betaAt5U2 = {
PARENT: [exports.genericTank],
LABEL: '1',
};
exports.betaAt6U2 = {
PARENT: [exports.genericTank],
LABEL: '7',
};
exports.betaAt7U2 = {
PARENT: [exports.genericTank],
LABEL: '5',
};
exports.betaAt8U2 = {
PARENT: [exports.genericTank],
LABEL: '2',
};
exports.betaAt9U2 = {
PARENT: [exports.genericTank],
LABEL: '9',
};
exports.betaAt10U2 = {
PARENT: [exports.genericTank],
LABEL: '3',
};
exports.betaAt1U3 = {
PARENT: [exports.genericTank],
LABEL: '@'
};
exports.betaAt2U3 = {
PARENT: [exports.genericTank],
LABEL: ';'
};
exports.betaAt3U3 = {
PARENT: [exports.genericTank],
LABEL: '+',
};
exports.betaAt4U3 = {
PARENT: [exports.genericTank],
LABEL: '/',
};
exports.betaAt5U3 = {
PARENT: [exports.genericTank],
LABEL: '$',
};
exports.betaAt6U3 = {
PARENT: [exports.genericTank],
LABEL: '!',
};
exports.betaAt7U3 = {
PARENT: [exports.genericTank],
LABEL: '_',
};
exports.betaAt8U3 = {
PARENT: [exports.genericTank],
LABEL: '—',
};
exports.betaAt9U3 = {
PARENT: [exports.genericTank],
LABEL: ',',
};
exports.betaAt10U3 = {
PARENT: [exports.genericTank],
LABEL: '«',
};
exports.betaAt1U4 = {
PARENT: [exports.genericTank],
LABEL: '£'
};
exports.betaAt2U4 = {
PARENT: [exports.genericTank],
LABEL: '√'
};
exports.betaAt3U4 = {
PARENT: [exports.genericTank],
LABEL: '×',
};
exports.betaAt4U4 = {
PARENT: [exports.genericTank],
LABEL: '©',
};
exports.betaAt5U4 = {
PARENT: [exports.genericTank],
LABEL: '™',
};
exports.betaAt6U4 = {
PARENT: [exports.genericTank],
LABEL: '~',
};
exports.betaAt7U4 = {
PARENT: [exports.genericTank],
LABEL: '¶',
};
exports.betaAt8U4 = {
PARENT: [exports.genericTank],
LABEL: '∆',
};
exports.betaAt9U4 = {
PARENT: [exports.genericTank],
LABEL: '^',
};
exports.betaAt10U4 = {
PARENT: [exports.genericTank],
LABEL: '♪',
};
exports.betaAt1UF = {
PARENT: [exports.genericTank],
LABEL: '↑'
};
exports.betaAt2UF = {
PARENT: [exports.genericTank],
LABEL: '§'
};
exports.betaAt3UF = {
PARENT: [exports.genericTank],
LABEL: '±',
};
exports.betaAt4UF = {
PARENT: [exports.genericTank],
LABEL: '↓',
};
exports.betaAt5UF = {
PARENT: [exports.genericTank],
LABEL: '₱',
};
exports.betaAt6UF = {
PARENT: [exports.genericTank],
LABEL: 'μ',
};
exports.betaAt7UF = {
PARENT: [exports.genericTank],
LABEL: '∞',
};
exports.betaAt8UF = {
PARENT: [exports.genericTank],
LABEL: '⟩',
};
exports.betaAt9UF = {
PARENT: [exports.genericTank],
LABEL: '★',
};
exports.betaAt10UF = {
PARENT: [exports.genericTank],
LABEL: '≠',
}
//Paladin Layers
exports.paladinSwarmerBody = {
  PARENT: [exports.genericTank],
  LABEL: "Paladin",
  SHAPE: 5,
  SIZE: 10,
  TURRETS: [{
    POSITION: [9, 8, 0, 180, 180, 0],
    TYPE: exports.paladinSwarmer
    }, {
    POSITION: [9, 8, 0, 108, 180, 0],
    TYPE: exports.paladinSwarmer
    }, {
    POSITION: [9, 8, 0, 35, 180, 0],
    TYPE: exports.paladinSwarmer
    }, {
    POSITION: [9, 8, 0, -35, 180, 0],
    TYPE: exports.paladinSwarmer
    }, {
    POSITION: [9, 8, 0, -108, 180, 0],
    TYPE: exports.paladinSwarmer
    },
   ],
  };
exports.paladinSunchipBody = {
  PARENT: [exports.genericTank],
  LABEL: "Paladin",
  SHAPE: 7,
  SIZE: 10,
  MAX_CHILDREN: 15,
  GUNS: [{
   POSITION: [4, 6.5, 1.2, 7.5, 0, 180, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.paladinSunchip, { INDEPENDENT: false }],
   }, }, { 
   POSITION: [4, 6.5, 1.2, 7.5, 0, 129, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.paladinSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, 77.5, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.paladinSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, 26, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.paladinSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, -26, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.paladinSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, -77.5, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.paladinSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, -129, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.paladinSunchip, { INDEPENDENT: false }],
   }, },
  ],
 };
exports.paladin2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Paladin",
  COLOR: 14,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.paladinSunchipBody, { COLOR: 14}],
      }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.paladinSwarmerBody, { COLOR: 14}],
      }, 
    ],
  };
//Freyja Layers
exports.freyjaCruiserBody = {
  PARENT: [exports.genericTank],
  LABEL: "Freyja",
  SHAPE: 7,
  SIZE: 10,
  INDEPENDENT: false,
  CONTROLLERS: ["nearestDifferentMaster"],
  COLOR: 16,
  TURRETS: [{
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 9, 0, (360 * 3.5) / 7, 180, 0],
      TYPE: exports.freyjaCruiserTurret
    }, {
      POSITION: [8, 9, 0, (360 * 2.5) / 7, 180, 0],
      TYPE: exports.freyjaCruiserTurret
    }, {
      POSITION: [8, 9, 0, (360 * 1.5) / 7, 180, 0],
      TYPE: exports.freyjaCruiserTurret
    }, {
      POSITION: [8, 9, 0, (360 * 0.5) / 7, 180, 0],
      TYPE: exports.freyjaCruiserTurret
    }, {
      POSITION: [8, 9, 0, (-360 * 0.5) / 7, 180, 0],
      TYPE: exports.freyjaCruiserTurret
    }, {
      POSITION: [8, 9, 0, (-360 * 1.5) / 7, 180, 0],
      TYPE: exports.freyjaCruiserTurret
    }, {
      POSITION: [8, 9, 0, (-360 * 2.5) / 7, 180, 0],
      TYPE: exports.freyjaCruiserTurret
    },
  ],
};
exports.freyjaGunnerBody = {
  PARENT: [exports.genericTank],
  LABEL: "Freyja",
  SHAPE: 5,
  SIZE: 10,
  INDEPENDENT: false,
  CONTROLLERS: ["nearestDifferentMaster"],
  COLOR: 16,
  TURRETS: [{
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 8, 0, 180, 120, 0],
      TYPE: exports.auto4gun
    }, {
      POSITION: [10, 8, 0, 108, 120, 0],
      TYPE: exports.auto4gun
    }, {
      POSITION: [10, 8, 0, 35, 120, 0],
      TYPE: exports.auto4gun
    }, {
      POSITION: [10, 8, 0, -35, 120, 0],
      TYPE: exports.auto4gun
    }, {
      POSITION: [10, 8, 0, -108, 120, 0],
      TYPE: exports.auto4gun
    },
  ],
};
exports.freyja2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Freyja",
  COLOR: 1,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.freyjaCruiserBody, { COLOR: 1}],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.freyjaGunnerBody, { COLOR: 1}],
    },
  ],
};
//Zaphkiel Layers
exports.zaphkielSkimmerBody = {
  PARENT: [exports.genericTank],
  LABEL: "Zaphkiel Skimmer",
  SHAPE: 5,
  SIZE: 10,
  TURRETS: [{
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [9, 8, 0, 180, 180, 0],
      TYPE: exports.zaphkielSkimmer
    }, {
      POSITION: [9, 8, 0, 108, 180, 0],
      TYPE: exports.zaphkielSkimmer
    }, {
      POSITION: [9, 8, 0, 35, 180, 0],
      TYPE: exports.zaphkielSkimmer
    }, {
      POSITION: [9, 8, 0, -35, 180, 0],
      TYPE: exports.zaphkielSkimmer
    }, {
      POSITION: [9, 8, 0, -108, 180, 0],
      TYPE: exports.zaphkielSkimmer
    },
  ],
};
exports.zaphkielDroneBody = {
  PARENT: [exports.genericTank],
  LABEL: "Zaphkiel Drone",
  SHAPE: 7,
  SIZE: 10,
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  MAX_CHILDREN: 28,
  GUNS: [{
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [4, 6.5, 1.2, 7.5, 0, (360 * 3.5) / 7, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.celestial]),
         TYPE: [exports.drone, { INDEPENDENT: false }],
          AUTOFIRE: true,
           SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
             WAIT_TO_CYCLE: true
      }, }, {
      POSITION: [4, 6.5, 1.2, 7.5, 0, (360 * 2.5) / 7, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.celestial]),
         TYPE: [exports.drone, { INDEPENDENT: false }],
          AUTOFIRE: true,
           SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
             WAIT_TO_CYCLE: true
      }, }, {
      POSITION: [4, 6.5, 1.2, 7.5, 0, (360 * 1.5) / 7, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.celestial]),
         TYPE: [exports.drone, { INDEPENDENT: false }],
          AUTOFIRE: true,
           SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
             WAIT_TO_CYCLE: true
      }, }, {
      POSITION: [4, 6.5, 1.2, 7.5, 0, (360 * 0.5) / 7, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.celestial]),
         TYPE: [exports.drone, { INDEPENDENT: false }],
          AUTOFIRE: true,
           SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
             WAIT_TO_CYCLE: true
      }, }, {
      POSITION: [4, 6.5, 1.2, 7.5, 0, (-360 * 0.5) / 7, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.celestial]),
         TYPE: [exports.drone, { INDEPENDENT: false }],
          AUTOFIRE: true,
           SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
             WAIT_TO_CYCLE: true
      }, }, {
      POSITION: [4, 6.5, 1.2, 7.5, 0, (-360 * 1.5) / 7, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.celestial]),
         TYPE: [exports.drone, { INDEPENDENT: false }],
          AUTOFIRE: true,
           SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
             WAIT_TO_CYCLE: true
      }, }, {
      POSITION: [4, 6.5, 1.2, 7.5, 0, (-360 * 2.5) / 7, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.celestial]),
         TYPE: [exports.drone, { INDEPENDENT: false }],
          AUTOFIRE: true,
           SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
             WAIT_TO_CYCLE: true
      }, },
   ],
};
exports.zaphkiel2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Zaphkiel",
  COLOR: 1,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.zaphkielDroneBody, { COLOR: 2}],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.zaphkielSkimmerBody, { COLOR: 2}],
    },
  ],
};
exports.raguturret1 = {
  PARENT: [exports.autoTurret],
  LABEL: 'Ragu Bullet',
  GUNS: [
    {
      POSITION: [12, 14, 1, 0, 0, 0, 0]
    },
    {
      POSITION: [17, 16, 0.6, 0, 0, 0, 0]
    },
    {
      POSITION: [21, 9.6, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.power, g.power]),
        TYPE: exports.bullet
      }
    }
  ]
}
exports.rugabody1 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 5,
  COLOR: 17,
  CONTROLLERS: ['spin'],
  TURRETS: [
     {
       POSITION: [8, 8, 0, (360 * 1.5) / 5, 180, 0],
       TYPE: exports.raguturret1
     },   {
       POSITION: [8, 8, 0, (360 * 2.5) / 5, 180, 0],
       TYPE: exports.raguturret1
     },   {
       POSITION: [8, 8, 0, (360 * 3.5) / 5, 180, 0],
       TYPE: exports.raguturret1
     },   {
       POSITION: [8, 8, 0, (360 * 4.5) / 5, 180, 0],
       TYPE: exports.raguturret1
     },   {
       POSITION: [8, 8, 0, (360 * 5.5) / 5, 180, 0],
       TYPE: exports.raguturret1
     }
  ]
}
exports.rugabody2 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 7,
  COLOR: 17,
  MAX_CHILDREN: 35,
  CONTROLLERS: ['reversespin'],
  GUNS: [
    {
      POSITION: [11, 6, 1.4, 0, 0, (360 * 1.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.lowpower]),
        TYPE: exports.autodrone,
        AUTOFIRE: true
      }
    },  {
      POSITION: [11, 6, 1.4, 0, 0, (360 * 2.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.lowpower]),
        TYPE: exports.autodrone,
        AUTOFIRE: true
      }
    },  {
      POSITION: [11, 6, 1.4, 0, 0, (360 * 3.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.lowpower]),
        TYPE: exports.autodrone,
        AUTOFIRE: true
      }
    },  {
      POSITION: [11, 6, 1.4, 0, 0, (360 * 4.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.lowpower]),
        TYPE: exports.autodrone,
        AUTOFIRE: true
      }
    },  {
      POSITION: [11, 6, 1.4, 0, 0, (360 * 5.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.lowpower]),
        TYPE: exports.autodrone,
        AUTOFIRE: true
      }
    },  {
      POSITION: [11, 6, 1.4, 0, 0, (360 * 6.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.lowpower]),
        TYPE: exports.autodrone,
        AUTOFIRE: true
      }
    },  {
      POSITION: [11, 6, 1.4, 0, 0, (360 * 7.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.lowpower]),
        TYPE: exports.autodrone,
        AUTOFIRE: true
      }
    }
  ]
}
exports.ruga = {
  PARENT: [exports.genericTank],
  LABEL: 'Celestial',
  NAME: 'Ruga',
  SHAPE: 9,
  COLOR: 17,
  CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A boss has defeated!',
  SIZE: 40,
  VALUE: 1000000,
  BODY: bossStats({
    health: 3,
    speed: 0.4
  }),
  SKILL: setBuild("9999999999"),
  TURRETS: [
    ...celestialTrapTurretArray,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.rugabody2
    }, {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.rugabody1
    }
  ]
}
//Xerxes (Old Zaphkiel) Layers
exports.xerxesSkimmerBody = {
  PARENT: [exports.genericTank],
  LABEL: "Xerxes Skimmer",
  SHAPE: 5,
  SIZE: 10,
  TURRETS: [{
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [9, 8, 0, 180, 180, 0],
      TYPE: exports.xerxesSkimmer
    }, {
      POSITION: [9, 8, 0, 108, 180, 0],
      TYPE: exports.xerxesSkimmer
    }, {
      POSITION: [9, 8, 0, 35, 180, 0],
      TYPE: exports.xerxesSkimmer
    }, {
      POSITION: [9, 8, 0, -35, 180, 0],
      TYPE: exports.xerxesSkimmer
    }, {
      POSITION: [9, 8, 0, -108, 180, 0],
      TYPE: exports.xerxesSkimmer
    },
  ],
};
exports.xerxes2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Xerxes",
  COLOR: 14,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  SEND_MESSAGE: 'The Old Zaphkiel.',
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.zaphkielDroneBody, { COLOR: 14}],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.xerxesSkimmerBody, { COLOR: 14}],
    },
  ],
};
//Theia Layers
exports.theiaMissileBody = {
  PARENT: [exports.genericTank],
  LABEL: "Theia",
  SHAPE: 5,
  SIZE: 13,
  TURRETS: [{
    POSITION: [9, 8, 0, 180, 180, 0],
    TYPE: exports.theiaMissileShooter
    }, {
    POSITION: [9, 8, 0, 108, 180, 0],
    TYPE: exports.theiaMissileShooter
    }, {
    POSITION: [9, 8, 0, 35, 180, 0],
    TYPE: exports.theiaMissileShooter
    }, {
    POSITION: [9, 8, 0, -35, 180, 0],
    TYPE: exports.theiaMissileShooter
    }, {
    POSITION: [9, 8, 0, -108, 180, 0],
    TYPE: exports.theiaMissileShooter
    },
   ],
  };
exports.theiaSunchipBody = {
  PARENT: [exports.genericTank],
  LABEL: "Theia",
  SHAPE: 7,
  SIZE: 10,
  MAX_CHILDREN: 45,
  GUNS: [{
   POSITION: [4, 6.5, 1.2, 7.5, 0, 180, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.theiaSunchip, { INDEPENDENT: false }],
   }, }, { 
   POSITION: [4, 6.5, 1.2, 7.5, 0, 129, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.theiaSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, 77.5, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.theiaSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, 26, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.theiaSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, -26, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.theiaSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, -77.5, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.theiaSunchip, { INDEPENDENT: false }],
   }, }, { 
   POSITION: [4, 6.5, 1.2, 7.5, 0, -129, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.theiaSunchip, { INDEPENDENT: false }],
   }, },
  ],
 };
exports.theia2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Theia",
  COLOR: 1,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.theiaSunchipBody, { COLOR: 13 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.theiaMissileBody, { COLOR: 13 }],
    },
  ],
};
//Alviss Layers
exports.alvissLaunchBody = {
  PARENT: [exports.genericTank],
  LABEL: "Alviss",
  SHAPE: 5,
  SIZE: 13,
  TURRETS: [{
    POSITION: [9, 8, 0, 180, 180, 0],
    TYPE: exports.alvissLaunch
    }, {
    POSITION: [9, 8, 0, 108, 180, 0],
    TYPE: exports.alvissLaunch
    }, {
    POSITION: [9, 8, 0, 35, 180, 0],
    TYPE: exports.alvissLaunch
    }, {
    POSITION: [9, 8, 0, -35, 180, 0],
    TYPE: exports.alvissLaunch
    }, {
    POSITION: [9, 8, 0, -108, 180, 0],
    TYPE: exports.alvissLaunch
    },
   ],
  };
exports.alvissEggBody = {
  PARENT: [exports.genericTank],
  LABEL: "Alviss",
  SHAPE: 7,
  SIZE: 10,
  TURRETS: [{
    POSITION: [9, 8, 0, 180, 180, 0],
    TYPE: exports.alvissEggShooter
    }, {
    POSITION: [9, 8, 0, 129, 180, 0],
    TYPE: exports.alvissEggShooter
    }, {
    POSITION: [9, 8, 0, 77.5,  180, 0],
    TYPE: exports.alvissEggShooter
    }, {
    POSITION: [9, 8, 0, 26, 180, 0],
    TYPE: exports.alvissEggShooter
    }, {
    POSITION: [9, 8, 0, -26, 180, 0],
    TYPE: exports.alvissEggShooter
    }, {
    POSITION: [9, 8, 0, -77.5, 180, 0],
    TYPE: exports.alvissEggShooter
    }, {
    POSITION: [9, 8, 0, -129, 180, 0],
    TYPE: exports.alvissEggShooter
    },
   ],
  };
exports.alviss2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Alviss",
  COLOR: 17,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.alvissEggBody, { COLOR: 17 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.alvissLaunchBody, { COLOR: 17 }],
    },
  ],
};
//Old Paladin Layers
exports.oldPaladinTwinBody = {
  PARENT: [exports.genericTank],
  LABEL: "Paladin",
  SHAPE: 5,
  SIZE: 10,
  CONTROLLERS: ['slowSpin'],
  TURRETS: [{
    POSITION: [9, 8, 0, 180, 180, 0],
    TYPE: exports.oldPaladinTwin
    }, {
    POSITION: [9, 8, 0, 108, 180, 0],
    TYPE: exports.oldPaladinTwin
    }, {
    POSITION: [9, 8, 0, 35, 180, 0],
    TYPE: exports.oldPaladinTwin
    }, {
    POSITION: [9, 8, 0, -35, 180, 0],
    TYPE: exports.oldPaladinTwin
    }, {
    POSITION: [9, 8, 0, -108, 180, 0],
    TYPE: exports.oldPaladinTwin
    },
   ],
  };
exports.oldPaladinSunchipBody = {
  PARENT: [exports.genericTank],
  LABEL: "Paladin",
  SHAPE: 7,
  SIZE: 10,
  MAX_CHILDREN: 100,
  CONTROLLERS: ['reverseSlowSpin'],
  GUNS: [{
   POSITION: [4, 6.5, 1.2, 7.5, 0, 180, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.oldPaladinSunchip, { INDEPENDENT: false }],
   }, }, { 
   POSITION: [4, 6.5, 1.2, 7.5, 0, 129, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.oldPaladinSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, 77.5, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.oldPaladinSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, 26, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.oldPaladinSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, -26, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.oldPaladinSunchip, { INDEPENDENT: false }],
   }, }, {
   POSITION: [4, 6.5, 1.2, 7.5, 0, -77.5, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.oldPaladinSunchip, { INDEPENDENT: false }],
   }, }, { //
   POSITION: [4, 6.5, 1.2, 7.5, 0, -129, 0],
    PROPERTIES: {
     SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celestial]),
      TYPE: [exports.oldPaladinSunchip, { INDEPENDENT: false }],
   }, },
  ],
};
exports.oldpaladin2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Old Paladin",
  COLOR: 17,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  CONTROLLERS: ['slowSpin'],
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.oldPaladinSunchipBody, { COLOR: 10 }, { CONTROLLERS: ['reversespin'] }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.oldPaladinTwinBody, { COLOR: 10 }],
    },
  ],
};
//Kronos Layers
exports.kronosLaunchBody = {
  PARENT: [exports.genericTank],
  LABEL: "Kronos",
  SHAPE: 9,
  SIZE: 16,
  CONTROLLERS: ["nearestDifferentMaster"],
  TURRETS: [{
    POSITION: [6, 7.5, 0, 20, 180, 0],
    TYPE: exports.kronosAlphaSkimLauncher
    }, {
    POSITION: [6, 7.5, 0, 60, 180, 0],
    TYPE: exports.kronosAlphaSkimLauncher
    }, {
    POSITION: [6, 7.5, 0, 100, 180, 0],
    TYPE: exports.kronosAlphaSkimLauncher
    }, {
    POSITION: [6, 7.5, 0, 140, 180, 0],
    TYPE: exports.kronosAlphaSkimLauncher
    }, {
    POSITION: [6, 7.5, 0, -20, 180, 0],
    TYPE: exports.kronosAlphaSkimLauncher
    }, {
    POSITION: [6, 7.5, 0, -60, 180, 0],
    TYPE: exports.kronosAlphaSkimLauncher
    }, {
    POSITION: [6, 7.5, 0, -100, 180, 0],
    TYPE: exports.kronosAlphaSkimLauncher
    }, {
    POSITION: [6, 7.5, 0, -140, 180, 0],
    TYPE: exports.kronosAlphaSkimLauncher
    }, {
    POSITION: [6, 7.5, 0, -180, 180, 0],
    TYPE: exports.kronosAlphaSkimLauncher
    },
   ],
  };
exports.kronosCarrierBody = {
  PARENT: [exports.genericTank],
  LABEL: "Kronos",
  SHAPE: 7,
  SIZE: 13,
  CONTROLLERS: ["nearestDifferentMaster"],
  TURRETS: [{
    POSITION: [7, 7.5, 0, 180, 180, 0],
    TYPE: exports.kronosCarrier
    }, {
    POSITION: [7, 7.5, 0, 129, 180, 0],
    TYPE: exports.kronosCarrier
    }, {
    POSITION: [7, 7.5, 0, 77.5, 180, 0],
    TYPE: exports.kronosCarrier
    }, {
    POSITION: [7, 7.5, 0, 26, 180, 0],
    TYPE: exports.kronosCarrier
    }, {
    POSITION: [7, 7.5, 0, -26, 180, 0],
    TYPE: exports.kronosCarrier
    }, {
    POSITION: [7, 7.5, 0, -77.5, 180, 0],
    TYPE: exports.kronosCarrier
    }, {
    POSITION: [7, 7.5, 0, -129, 180, 0],
    TYPE: exports.kronosCarrier
    },
  ],
};
exports.kronosTripletBody = {
  PARENT: [exports.genericTank],
  LABEL: "Kronos",
  SHAPE: 5,
  SIZE: 10,
  CONTROLLERS: ["nearestDifferentMaster"],
  TURRETS: [{
    POSITION: [7, 7.5, 0, 180, 180, 0],
    TYPE: exports.kronosTriplet
    }, {
    POSITION: [7, 7.5, 0, 108, 180, 0],
    TYPE: exports.kronosTriplet
    }, {
    POSITION: [7, 7.5, 0, 35, 180, 0],
    TYPE: exports.kronosTriplet
    }, {
    POSITION: [7, 7.5, 0, -35, 180, 0],
    TYPE: exports.kronosTriplet
    }, {
    POSITION: [7, 7.5, 0, -108, 180, 0],
    TYPE: exports.kronosTriplet
    },
  ],
};
  exports.kronos2 = {
  PARENT: [exports.genericTank],
  LABEL: "Eternal",
  NAME: "Kronos",
  COLOR: 6,
  SHAPE: 11,
  SIZE: 80,
  VARIES_IN_SIZE: false,
  VALUE: 4000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("7939998151"),
  TURRETS: [...EternalTrapTurretArray, {
      POSITION: [18, 0, 0, 0, 0, 1],
      TYPE: [exports.kronosLaunchBody, { COLOR: 6 }],
    }, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.kronosCarrierBody, { COLOR: 6 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.kronosTripletBody, { COLOR: 6 }],
    },
  ],
};
//Ragnarok Layers
exports.ragnarokGemBody = {
  PARENT: [exports.genericTank],
  LABEL: "Ragnarok",
  SHAPE: 9,
  SIZE: 16,
  MAX_CHILDREN: 16,
  CONTROLLERS: ["nearestDifferentMaster"],
  GUNS: [{
    POSITION: [2, 3, -1.6, 9, 0, 20, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.power]),
       TYPE: exports.ragnarokGemDrone
    }, }, {
    POSITION: [2, 3, -1.6, 9, 0, 60, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.power]),
       TYPE: exports.ragnarokGemDrone
    }, }, {
    POSITION: [2, 3, -1.6, 9, 0, 100, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.power]),
       TYPE: exports.ragnarokGemDrone
    }, }, {
    POSITION: [2, 3, -1.6, 9, 0, 140, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.power]),
       TYPE: exports.ragnarokGemDrone
    }, }, {
    POSITION: [2, 3, -1.6, 9, 0, -20, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.power]),
       TYPE: exports.ragnarokGemDrone
    }, }, {
    POSITION: [2, 3, -1.6, 9, 0, -60, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.power]),
       TYPE: exports.ragnarokGemDrone
    }, }, {
    POSITION: [2, 3, -1.6, 9, 0, -100, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.power]),
       TYPE: exports.ragnarokGemDrone
    }, }, {
    POSITION: [2, 3, -1.6, 9, 0, -140, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.power]),
       TYPE: exports.ragnarokGemDrone
    }, }, { //
    POSITION: [2, 3, -1.6, 9, 0, -180, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.power]),
       TYPE: exports.ragnarokGemDrone
    }, },
  ],
};
exports.ragnarokAutoSmashBody = {
  PARENT: [exports.genericTank],
  LABEL: "Ragnarok",
  SHAPE: 7,
  SIZE: 13,
  CONTROLLERS: ["nearestDifferentMaster"],
  TURRETS: [{
    POSITION: [6, 9, 0, 180, 180, 0],
    TYPE: exports.ragnarokAutoSmashLauncher
    }, {
    POSITION: [6, 9, 0, 129, 180, 0],
    TYPE: exports.ragnarokAutoSmashLauncher
    }, {
    POSITION: [6, 9, 0, 77.5, 180, 0],
    TYPE: exports.ragnarokAutoSmashLauncher
    }, {
    POSITION: [6, 9, 0, 26, 180, 0],
    TYPE: exports.ragnarokAutoSmashLauncher
    }, {
    POSITION: [6, 9, 0, -26, 180, 0],
    TYPE: exports.ragnarokAutoSmashLauncher
    }, {
    POSITION: [6, 9, 0, -77.5, 180, 0],
    TYPE: exports.ragnarokAutoSmashLauncher
    }, {
    POSITION: [6, 9, 0, -129, 180, 0],
    TYPE: exports.ragnarokAutoSmashLauncher
    },
  ],
};
exports.ragnarokGunCruiseBody = {
  PARENT: [exports.genericTank],
  LABEL: "Ragnarok",
  SHAPE: 5,
  SIZE: 10,
  CONTROLLERS: ["nearestDifferentMaster"],
  TURRETS: [{
    POSITION: [10, 7.5, 0, 180, 180, 0],
    TYPE: exports.ragnarokGunCruise
    }, {
    POSITION: [10, 7.5, 0, 108, 180, 0],
    TYPE: exports.ragnarokGunCruise
    }, {
    POSITION: [10, 7.5, 0, 35, 180, 0],
    TYPE: exports.ragnarokGunCruise
    }, {
    POSITION: [10, 7.5, 0, -35, 180, 0],
    TYPE: exports.ragnarokGunCruise
    }, {
    POSITION: [10, 7.5, 0, -108, 180, 0],
    TYPE: exports.ragnarokGunCruise
    },
  ],
};
exports.ragnarok2 = {
  PARENT: [exports.genericTank],
  LABEL: "Ragnarok",
  NAME: "Ragnarok",
  COLOR: 0,
  SHAPE: 11,
  SIZE: 80,
  VARIES_IN_SIZE: false,
  VALUE: 4000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("7939998151"),
  TURRETS: [...RagnarokTrapTurretArray, {
      POSITION: [18, 0, 0, 0, 0, 1],
      TYPE: [exports.ragnarokGemBody, { COLOR: 0 }],
    }, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.ragnarokAutoSmashBody, { COLOR: 0 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.ragnarokGunCruiseBody, { COLOR: 0 }],
    },
  ],
};
//King Layers
let kingJewelBodyData = [];
  for (let i = 0; i < 11; i++) {
  kingJewelBodyData.push({
    POSITION: [2, 3, -1.6, 9, 0, i * (360 / 11) + 360 / 11 / 2, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.power]),
       TYPE: exports.kingAutoJewel
    }, }, 
  );
 };
exports.kingJewelBody = {
  PARENT: [exports.genericTank],
  LABEL: "King",
  SHAPE: 11,
  SIZE: 19,
  MAX_CHILDREN: 22,
  CONTROLLERS: ["nearestDifferentMaster"],
  GUNS: [...kingJewelBodyData]
 };
exports.kingOctoLaunchBody = {
  PARENT: [exports.genericTank],
  LABEL: "King",
  SHAPE: 9,
  SIZE: 16,
  CONTROLLERS: ["nearestDifferentMaster"],
  TURRETS: [{
    POSITION: [4, 9, 0, 20, 180, 0],
    TYPE: [exports.kingOctoLauncher, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, 60, 180, 0],
    TYPE: [exports.kingOctoLauncher, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, 100, 180, 0],
    TYPE: [exports.kingOctoLauncher, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, 140, 180, 0],
    TYPE: [exports.kingOctoLauncher, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, -20, 180, 0],
    TYPE: [exports.kingOctoLauncher, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, -60, 180, 0],
    TYPE: [exports.kingOctoLauncher, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, -100, 180, 0],
    TYPE: [exports.kingOctoLauncher, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, -140, 180, 0],
    TYPE: [exports.kingOctoLauncher, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, -180, 180, 0],
    TYPE: [exports.kingOctoLauncher, { COLOR: 16 }],
    },
  ],
};
exports.kingStreamBody = {
  PARENT: [exports.genericTank],
  LABEL: "King",
  SHAPE: 7,
  SIZE: 13,
  CONTROLLERS: ["nearestDifferentMaster"],
  TURRETS: [{
    POSITION: [4, 9, 0, 180, 180, 0],
    TYPE: [exports.stream, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, 129, 180, 0],
    TYPE: [exports.stream, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, 77.5, 180, 0],
    TYPE: [exports.stream, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, 26, 180, 0],
    TYPE: [exports.stream, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, -26, 180, 0],
    TYPE: [exports.stream, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, -77.5, 180, 0],
    TYPE: [exports.stream, { COLOR: 16 }],
    }, {
    POSITION: [4, 9, 0, -129, 180, 0],
    TYPE: [exports.stream, { COLOR: 16 }],
    }, 
  ],
};
exports.kingTerminateBody = {
  PARENT: [exports.genericTank],
  LABEL: "King",
  SHAPE: 5,
  SIZE: 10,
  CONTROLLERS: ["nearestDifferentMaster"],
  TURRETS: [{
    POSITION: [10, 7.5, 0, 180, 180, 0],
    TYPE: [exports.term, { COLOR: 16 }],
    }, {
    POSITION: [10, 7.5, 0, 108, 180, 0],
    TYPE: [exports.term, { COLOR: 16 }],
    }, {
    POSITION: [10, 7.5, 0, 35, 180, 0],
    TYPE: [exports.term, { COLOR: 16 }],
    }, {
    POSITION: [10, 7.5, 0, -35, 180, 0],
    TYPE: [exports.term, { COLOR: 16 }],
    }, {
    POSITION: [10, 7.5, 0, -108, 180, 0],
    TYPE: [exports.term, { COLOR: 16 }],
    },
  ],
};
exports.king2 = {
  PARENT: [exports.genericTank],
  LABEL: "King",
  NAME: "King",
  COLOR: 36,
  SHAPE: 13,
  SIZE: 120,
  VARIES_IN_SIZE: false,
  VALUE: 8000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("8949999262"),
  TURRETS: [...KingTrapTurretArray, {
      POSITION: [21, 0, 0, 0, 0, 1],
      TYPE: [exports.kingJewelBody, { COLOR: 36 }],
    }, {
      POSITION: [18, 0, 0, 0, 0, 1],
      TYPE: [exports.kingOctoLaunchBody, { COLOR: 36 }],
    }, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.kingStreamBody, { COLOR: 36 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.kingTerminateBody, { COLOR: 36 }],
    },
  ],
};
//Mothership?
exports.mothership = {
  PARENT: [exports.genericTank],
  LABEL: 'Mothership',
  NAME: 'Mothership',
  VARIES_IN_SIZE: false,
  BODY: bossStats({
    health: 4,
    speed: 0.3
  }),
  SIZE: 60,
  SKILL: setBuild("9999999999"),
  MAX_CHILDREN: 32,
  GUNS: [{
      POSITION: [12, 3.4, 1.1, 0, 0, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.drone]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, 90, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, 180, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, 270, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, 45, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, 135, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, 225, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, 315, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, 22.5, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, 112.5, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, 202.5, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, 292.5, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, -22.5, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, -112.5, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, -202.5, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, {
      POSITION: [12, 3.4, 1.1, 0, 0, -292.5, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
         TYPE: exports.mothershipdrone,
         }, }, 
      ],
  }
  exports.sp1 = (() => {
  let sp1Data = [];
  for (let i = 0; i < 5; i++) {
  sp1Data.push({
    POSITION: [17.5, 7.8, 1, 0, 0, i * (360 / 5) + 360 / 5 / 2, 0]
    }, {
    POSITION: [16, 8.7, -1.2, 0, 0, i * (360 / 5) + 360 / 5 / 2, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
       TYPE: exports.bomb
    }, }, {
    POSITION: [4.5, 8.5, -1.8, 6.5, 0, i * (360 / 5) + 360 / 5 / 2, 0]
    },
   );
 };
 return {
   PARENT: [exports.genericTank],
   LABEL: 'SP-1',
   BODY: bossStats({
    health: 3,
    speed: 0.4
   }),
   SIZE: 20,
   GUNS: [...sp1Data],
   TURRETS: [{
     POSITION: [8, 0, 0, 0, 360, 1],
     TYPE: exports.flankpoison
     },
    ],
   };
  })();
  exports.sp2 = (() => {
  let props = { 
   SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
    TYPE: exports.mhove,
     STAT_CALCULATOR: gunCalcNames.drone,                        
      AUTOFIRE: true,
       SYNCS_SKILLS: true,
        MAX_CHILDREN: 2
  }
  return {
    PARENT: [exports.genericTank],
    LABEL: 'SP-2',
    BODY: bossStats({
    health: 3.5,
    speed: 0.45
    }),
    SIZE: 50,
    GUNS: [{
    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
    }, {
    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
     PROPERTIES: props
    }, {                        
    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
    }, {
    POSITION: [   5,     11,      1,      10.5,   0,      120,      0,   ], 
    }, {
    POSITION: [   2,     14,      1,      15.5,   0,      120,      0,   ], 
     PROPERTIES: props
    }, {                        
    POSITION: [   4,     14,      1,      8,      0,      120,      0,   ], 
    }, {
    POSITION: [   5,     11,      1,      10.5,   0,      240,      0,   ], 
    }, {
    POSITION: [   2,     14,      1,      15.5,   0,      240,      0,   ], 
     PROPERTIES: props
    }, {                        
    POSITION: [   4,     14,      1,      8,      0,      240,      0,   ], 
    }, {
    POSITION: [   17.5,  7.8,     1,      0,      0,      60,       0    ],
    }, {
    POSITION: [   16,    8.7,    -1.2,    0,      0,      60,       0    ],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
       TYPE: exports.boomb
    }, }, {
    POSITION: [   4.5,   8.5,    -1.8,    6.5,    0,      60,       0    ],
    }, {
    POSITION: [   17.5,  7.8,     1,      0,      0,      180,       0    ],
    }, {
    POSITION: [   16,    8.7,    -1.2,    0,      0,      180,       0    ],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
       TYPE: exports.boomb
    }, }, {
    POSITION: [   4.5,   8.5,    -1.8,    6.5,    0,      180,       0    ],
    }, {
    POSITION: [   17.5,  7.8,     1,      0,      0,      300,       0    ],
    }, {
    POSITION: [   16,    8.7,    -1.2,    0,      0,      300,       0    ],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
       TYPE: exports.boomb
    }, }, {
    POSITION: [   4.5,   8.5,    -1.8,    6.5,    0,      300,       0    ],
    },
   ],
   TURRETS: [{
    POSITION: [8, 0, 0, 0, 360, 1],
    TYPE: exports.fplaunch
    },
   ], 
  }})();
//Athena Layers
  exports.athenaQuintBody = {
  PARENT: [exports.genericTank],
  LABEL: "Athena",
  SHAPE: 5,
  SIZE: 10,
  TURRETS: [{
    POSITION: [7, 7.5, 0, 180, 180, 0],
    TYPE: exports.quint
    }, {
    POSITION: [7, 7.5, 0, 108, 180, 0],
    TYPE: exports.quint
    }, {
    POSITION: [7, 7.5, 0, 35, 180, 0],
    TYPE: exports.quint
    }, {
    POSITION: [7, 7.5, 0, -35, 180, 0],
    TYPE: exports.quint
    }, {
    POSITION: [7, 7.5, 0, -108, 180, 0],
    TYPE: exports.quint
    },
   ],
  };
  exports.athenaDroneBody = {
  PARENT: [exports.genericTank],
  LABEL: "Athena",
  SHAPE: 7,
  SIZE: 13,
  GUNS: [...athenaDroneBodyData]
  };
  exports.athena2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Athena",
  COLOR: 69,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.athenaDroneBody, { COLOR: 69 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.athenaQuintBody, { COLOR: 69 }],
    },
  ],
};
//Nyx layers
exports.nyxRocketeerBody = {
  PARENT: [exports.genericTank],
  LABEL: "Nyx",
  SHAPE: 5,
  SIZE: 10,
  TURRETS: [{
    POSITION: [7, 7.5, 0, 180, 180, 0],
    TYPE: [exports.rocket, { COLOR: 5 }],
    }, {
    POSITION: [7, 7.5, 0, 108, 180, 0],
    TYPE: [exports.rocket, { COLOR: 5 }],
    }, {
    POSITION: [7, 7.5, 0, 35, 180, 0],
    TYPE: [exports.rocket, { COLOR: 5 }],
    }, {
    POSITION: [7, 7.5, 0, -35, 180, 0],
    TYPE: [exports.rocket, { COLOR: 5 }],
    }, {
    POSITION: [7, 7.5, 0, -108, 180, 0],
    TYPE: [exports.rocket, { COLOR: 5 }],
    },
   ],
  };
  let nyxMinionBodyData = [];
  for (let i = 0; i < 7; i++) {
  nyxMinionBodyData.push({
    POSITION: [4, 6.5, -1.4, 7.5, 0, i * (360 / 7) + 360 / 7 / 2, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.celestial]),
       TYPE: exports.minion,
        MAX_CHILDREN: 2,
    }, },
   );
  };
  exports.nyxMinionBody = {
  PARENT: [exports.genericTank],
  LABEL: "Nyx",
  SHAPE: 7,
  SIZE: 13,
  GUNS: [...nyxMinionBodyData]
  };
  exports.nyx2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Nyx",
  COLOR: 5,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.nyxMinionBody, { COLOR: 5 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.nyxRocketeerBody, { COLOR: 5 }],
    },
  ], 
};
//why do these randoms in my yt wanted to create this celestial | Blaze Layers
exports.blazeSidewinderBody = {
  PARENT: [exports.genericTank],
  LABEL: "Blaze",
  SHAPE: 5,
  SIZE: 10,
  TURRETS: [{
    POSITION: [7, 7.5, 0, 180, 180, 0],
    TYPE: [exports.sidewind, { COLOR: 16 }],
    }, {
    POSITION: [7, 7.5, 0, 108, 180, 0],
    TYPE: [exports.sidewind, { COLOR: 16 }],
    }, {
    POSITION: [7, 7.5, 0, 35, 180, 0],
    TYPE: [exports.sidewind, { COLOR: 16 }],
    }, {
    POSITION: [7, 7.5, 0, -35, 180, 0],
    TYPE: [exports.sidewind, { COLOR: 16 }],
    }, {
    POSITION: [7, 7.5, 0, -108, 180, 0],
    TYPE: [exports.sidewind, { COLOR: 16 }],
    },
   ],
  };
let blazeGravelBodyData = [];
  for (let i = 0; i < 7; i++) {
  blazeGravelBodyData.push({
    POSITION: [4, 6.5, -1.4, 7.5, 0, i * (360 / 7) + 360 / 7 / 2, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.celestial]),
       TYPE: exports.blazeGravel,
        MAX_CHILDREN: 2,
    }, },
   );
  };
  exports.blazeGravelBody = {
  PARENT: [exports.genericTank],
  LABEL: "Nyx",
  SHAPE: 7,
  SIZE: 13,
  GUNS: [...blazeGravelBodyData]
  };
exports.blaze2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Blaze",
  COLOR: 16,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.blazeGravelBody, { COLOR: 16 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.blazeSidewinderBody, { COLOR: 16 }],
    },
  ], 
};
exports.tyrTwinBody = {
  PARENT: [exports.genericTank],
  LABEL: 'Tyr',
  CONTROLLERS: ['nearestDifferentMaster'],
  SHAPE: 5,
  SIZE: 10,
  TURRETS: [{
    POSITION: [12, 7.5, 0, 180, 180, 0],
    TYPE: exports.auto4gun
    }, {
    POSITION: [12, 7.5, 0, 108, 180, 0],
    TYPE: exports.auto4gun
    }, {
    POSITION: [12, 7.5, 0, 35, 180, 0],
    TYPE: exports.auto4gun
    }, {
    POSITION: [12, 7.5, 0, -35, 180, 0],
    TYPE: exports.auto4gun
    }, {
    POSITION: [12, 7.5, 0, -108, 180, 0],
    TYPE: exports.auto4gun
    },
  ],
 };
exports.tyrMinionLaunchBody = {
  PARENT: [exports.genericTank],
  LABEL: 'Tyr',
  SHAPE: 7,
  SIZE: 13,
  TURRETS: [{
    POSITION: [7, 7.5, 0, 180, 180, 0],
    TYPE: exports.tyrMinionLauncher,
    }, {
    POSITION: [7, 7.5, 0, 129, 180, 0],
    TYPE: exports.tyrMinionLauncher,
    }, {
    POSITION: [7, 7.5, 0, 77.5, 180, 0],
    TYPE: exports.tyrMinionLauncher,
    }, {
    POSITION: [7, 7.5, 0, 26, 180, 0],
    TYPE: exports.tyrMinionLauncher,
    }, {
    POSITION: [7, 7.5, 0, -26, 180, 0],
    TYPE: exports.tyrMinionLauncher,
    }, {
    POSITION: [7, 7.5, 0, -77.5, 180, 0],
    TYPE: exports.tyrMinionLauncher,
    }, {
    POSITION: [7, 7.5, 0, -129, 180, 0],
    TYPE: exports.tyrMinionLauncher,
    },
  ],
};
exports.tyr2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Tyr",
  COLOR: 17,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.tyrMinionLaunchBody, { COLOR: 17 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.tyrTwinBody, { COLOR: 17 }],
    },
  ], 
};
exports.fiolnirBeekeeperBody = {
  PARENT: [exports.genericTank],
  LABEL: 'Fiolnir',
  CONTROLLERS: ['nearestDifferentMaster'],
  SHAPE: 5,
  SIZE: 10,
  TURRETS: [{
    POSITION: [12, 7.5, 0, 180, 180, 0],
    TYPE: [exports.fiolnirBeekeeper, { COLOR: 17 }],
    }, {
    POSITION: [12, 7.5, 0, 108, 180, 0],
    TYPE: [exports.fiolnirBeekeeper, { COLOR: 17 }],
    }, {
    POSITION: [12, 7.5, 0, 35, 180, 0],
    TYPE: [exports.fiolnirBeekeeper, { COLOR: 17 }],
    }, {
    POSITION: [12, 7.5, 0, -35, 180, 0],
    TYPE: [exports.fiolnirBeekeeper, { COLOR: 17 }],
    }, {
    POSITION: [12, 7.5, 0, -108, 180, 0],
    TYPE: [exports.fiolnirBeekeeper, { COLOR: 17 }],
    },
  ],
 };
exports.fiolnirSplitCruiserBody = {
  PARENT: [exports.genericTank],
  LABEL: 'Fiolnir',
  SHAPE: 7,
  SIZE: 13,
  TURRETS: [{
    POSITION: [7, 9, 0, 180, 180, 0],
    TYPE: [exports.fiolnirSplitCruiser, { COLOR: 17 }],
    }, {
    POSITION: [7, 9, 0, 129, 180, 0],
    TYPE: [exports.fiolnirSplitCruiser, { COLOR: 17 }],
    }, {
    POSITION: [7, 9, 0, 77.5, 180, 0],
    TYPE: [exports.fiolnirSplitCruiser, { COLOR: 17 }],
    }, {
    POSITION: [7, 9, 0, 26, 180, 0],
    TYPE: [exports.fiolnirSplitCruiser, { COLOR: 17 }],
    }, {
    POSITION: [7, 9, 0, -26, 180, 0],
    TYPE: [exports.fiolnirSplitCruiser, { COLOR: 17 }],
    }, {
    POSITION: [7, 9, 0, -77.5, 180, 0],
    TYPE: [exports.fiolnirSplitCruiser, { COLOR: 17 }],
    }, {
    POSITION: [7, 9, 0, -129, 180, 0],
    TYPE: [exports.fiolnirSplitCruiser, { COLOR: 17 }],
    },
  ],
};
exports.fiolnir2 = {
  PARENT: [exports.genericTank],
  LABEL: "Celestial",
  NAME: "Fiolnir",
  COLOR: 17,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.fiolnirSplitCruiserBody, { COLOR: 17 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.fiolnirBeekeeperBody, { COLOR: 17 }],
    },
  ], 
};
//TIER 1
        exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pound, exports.pbasic, exports.ausic, exports.lance, exports.band, exports.page2];
        exports.ppage1.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pound, exports.pbasic, exports.ausic, exports.lance, exports.band, exports.page2]; 
        exports.page2.UPGRADES_TIER_1 = [exports.ppage1, exports.basinv, exports.minishot, exports.trapper, exports.cri, exports.auto2, exports.bbase, exports.pellet, exports.mgrow, exports.single, exports.page3];
        exports.ppage2.UPGRADES_TIER_1 = [exports.ppage1, exports.basinv, exports.minishot, exports.trapper, exports.cri, exports.auto2, exports.bbase, exports.pellet, exports.mgrow, exports.single, exports.page3]; 
        exports.page3.UPGRADES_TIER_1 = [exports.ppage2, exports.basicep, exports.drive, exports.subd, exports.heal];
//TIER 1 | Developer Tier
        exports.dev.UPGRADES_TIER_1 = [exports.basic, exports.dev2, exports.dev3, exports.dev4, exports.dev5, exports.dev6, exports.dev7, exports.dev8, exports.dev9, exports.elitebasic];
        exports.dev2.UPGRADES_TIER_1 = [exports.dev, exports.dev1u2, exports.dev2u2, exports.dev3u2, exports.dev4u2];
        exports.dev1u2.UPGRADES_TIER_1 = [exports.dev2, exports.hugespray, exports.hugedestroy, exports.hugegun, exports.hugebattle, exports.skimboss, exports.hugenest, exports.newhugespray, exports.falboostnoai, exports.dev];
        exports.dev2u2.UPGRADES_TIER_1 = [exports.dev1u2u2];
        exports.dev3u2.UPGRADES_TIER_1 = [exports.dev1u3u2, exports.dev2u3u2];
        exports.dev1u2u2.UPGRADES_TIER_1 = [exports.ek1st, exports.eq1st, exports.sp1, exports.sk1];
        exports.dev4u2.UPGRADES_TIER_1 = [exports.dev1u4u2]
        exports.dev1u4u2.UPGRADES_TIER_1 = [exports.kronos2];
        exports.dev3.UPGRADES_TIER_1 = [exports.dev, exports.dev2u3, exports.dev3u3, exports.ak47, exports.twin8, exports.crossbow, exports.lazer, exports.quadragunner, exports.bigtrishooter, exports.ultismash, exports.dev3p2];
        exports.dev2u3.UPGRADES_TIER_1 = [exports.clean, exports.approach, exports.baseProtector, exports.odat, exports.arrasmayhem, exports.explore];
        exports.dev3u3.UPGRADES_TIER_1 = [exports.diepbent, exports.diepfact, exports.quad, exports.auto4diep];
        exports.dev3p2.UPGRADES_TIER_1 = [exports.dev3, exports.blast, exports.pentaseer, exports.heal, exports.mothership, exports.gempound, exports.doublemissile, exports.dbenthy, exports.twist2, exports.ultifact, exports.dev3p3];
        exports.dev3p3.UPGRADES_TIER_1 = [exports.dev3p2, exports.minitrap, exports.clocko, exports.ram, exports.master2, exports.sept, exports.skimofdeath, exports.deathstar, exports.momwtdym, exports.ugrow];
        exports.dev4.UPGRADES_TIER_1 = [exports.t0, exports.t1, exports.t2, exports.t3, exports.t4, exports.t5, exports.t6, exports.t7, exports.t8, exports.t9, exports.t10];
        exports.dev5.UPGRADES_TIER_1 = [exports.eggnest];
        exports.dev7.UPGRADES_TIER_1 = [exports.destroyerDominator, exports.gunnerDominator, exports.trapperDominator, exports.sanctuary];
        exports.dev8.UPGRADES_TIER_1 = [exports.band, exports.decess, exports.scout];
        exports.dev9.UPGRADES_TIER_1 = [exports.dev1u9, exports.dev2u9];
        exports.dev1u9.UPGRADES_TIER_1 = [exports.dev, exports.Auto4generic, exports.hugestream];
        exports.dev2u9.UPGRADES_TIER_1 = [exports.dev, exports.egg, exports.square, exports.triangle, exports.pentagon, exports.hexagon, exports.heptagon];
//TIER | guess what branches to dev
        exports.betaAt0.UPGRADES_TIER_1 = [exports.betaAt1U1, exports.betaAt2U1, exports.betaAt3U1, exports.betaAt4U1, exports.betaAt5U1, exports.betaAt6U1, exports.betaAt7U1, exports.betaAt8U1, exports.betaAt8U1, exports.betaAt9U1, exports.betaAt10U1];
        exports.betaAt7U1.UPGRADES_TIER_1 = [exports.betaAt1U2, exports.betaAt2U2, exports.betaAt3U2, exports.betaAt4U2, exports.betaAt5U2, exports.betaAt6U2, exports.betaAt7U2, exports.betaAt8U2, exports.betaAt9U2, exports.betaAt10U2, exports.dev];
        exports.betaAt2U2.UPGRADES_TIER_1 = [exports.betaAt1U3, exports.betaAt2U3, exports.betaAt3U3, exports.betaAt4U3, exports.betaAt5U3, exports.betaAt6U3, exports.betaAt7U3, exports.betaAt8U3, exports.betaAt9U3, exports.betaAt10U3, exports.dev];
        exports.betaAt4U3.UPGRADES_TIER_1 = [exports.betaAt1U4, exports.betaAt2U4, exports.betaAt3U4, exports.betaAt4U4, exports.betaAt5U4, exports.betaAt6U4, exports.betaAt7U4, exports.betaAt8U4, exports.betaAt9U4, exports.betaAt10U4, exports.dev];
        exports.betaAt9U4.UPGRADES_TIER_1 = [exports.betaAt1UF, exports.betaAt2UF, exports.betaAt3UF, exports.betaAt4UF, exports.betaAt5UF, exports.betaAt6UF, exports.betaAt7UF, exports.betaAt8UF, exports.betaAt9UF, exports.betaAt10UF, exports.dev];
        exports.betaAt3UF.UPGRADES_TIER_1 = [exports.dev];
//TIER 1 | Dev Tank Branches 
        exports.t0.UPGRADES_TIER_1 = [exports.dev];
        exports.t1.UPGRADES_TIER_1 = [exports.dev];
        exports.t2.UPGRADES_TIER_1 = [exports.dev];
        exports.t3.UPGRADES_TIER_1 = [exports.dev];
        exports.t4.UPGRADES_TIER_1 = [exports.dev];
        exports.t5.UPGRADES_TIER_1 = [exports.dev];
        exports.t6.UPGRADES_TIER_1 = [exports.dev];
        exports.t7.UPGRADES_TIER_1 = [exports.dev];
        exports.t8.UPGRADES_TIER_1 = [exports.dev];
        exports.t9.UPGRADES_TIER_1 = [exports.dev];
        exports.t10.UPGRADES_TIER_1 = [exports.dev];
        exports.eggnest.UPGRADES_TIER_1 = [exports.squnest, exports.gemnest, exports.dev];
        exports.squnest.UPGRADES_TIER_1 = [exports.trinest, exports.dev];
        exports.trinest.UPGRADES_TIER_1 = [exports.pentanest, exports.dev];
        exports.pentanest.UPGRADES_TIER_1 = [exports.dev];
        exports.gemnest.UPGRADES_TIER_1 = [exports.gsqunest, exports.jewnest, exports.dev];
        exports.gsqunest.UPGRADES_TIER_1 = [exports.gtrinest, exports.dev];
        exports.gtrinest.UPGRADES_TIER_1 = [exports.gpenest, exports.dev];
        exports.gpenest.UPGRADES_TIER_1 = [exports.dev];
//TIER 1 | XKX BRANCHES
        exports.ek1st.UPGRADES_TIER_1 = [exports.ek2nd];
        exports.ek2nd.UPGRADES_TIER_1 = [exports.ek3rd];
        exports.sp1.UPGRADES_TIER_1 = [exports.sp2];
        exports.sp2.UPGRADES_TIER_1 = [];
        exports.eq1st.UPGRADES_TIER_1 = [exports.eq2nd];
        exports.eq2nd.UPGRADES_TIER_1 = [exports.eq3rd];
        exports.sk1st.UPGRADES_TIER_1 = [exports.sk2nd];
        exports.sk2nd.UPGRADES_TIER_1 = [exports.sk3rd];
        exports.sk3rd.UPGRADES_TIER_1 = [exports.sk4th];
        exports.sk4th.UPGRADES_TIER_1 = [exports.sk5th];
        exports.sk5th.UPGRADES_TIER_1 = [exports.sk6th];
//SPECIAL TIER 2
        exports.page3.UPGRADES_TIER_2 = [exports.revist];
//TIER 2
        exports.twin.UPGRADES_TIER_2 = [exports.tpage2, exports.double, exports.bent, exports.cruiser, exports.gunner, exports.hexa, exports.clone, exports.twinn, exports.ttrapper];
        exports.tpage2.UPGRADES_TIER_2 = [exports.tpage3, exports.thewn, exports.tlance, exports.tmgrow, exports.tmachine, exports.tsniper, exports.twinicep, exports.tdrive, exports.tsubd];
        exports.tpage3.UPGRADES_TIER_2 = [exports.ptwin, exports.autwin, exports.twinb, exports.tswas, exports.twin2, exports.bulwark, exports.decess];
        exports.machine.UPGRADES_TIER_2 = [exports.machine2, exports.artillery, exports.mini, exports.gunner, exports.gilor, exports.launch, exports.gatling, exports.poisonmach, exports.tmachine, exports.dmachine];
        exports.machine2.UPGRADES_TIER_2 = [exports.achine, exports.hbchine, exports.mswas, exports.sweep];
        exports.sniper.UPGRADES_TIER_2 = [exports.snipe2, exports.assassin, exports.hunter, exports.mini, exports.builder, exports.rifle, exports.steamroll, exports.machine2, exports.poisonsnipe, exports.sniper2]; 
        exports.snipe2.UPGRADES_TIER_2 = [exports.snipe3, exports.infern, exports.pounper, exports.tsniper, exports.assin, exports.sneak, exports.smgrow, exports.spell, exports.sswas, exports.autiper, exports.snipeb];
        exports.snipe3.UPGRADES_TIER_2 = [exports.dsnipe, exports.submachine, exports.snicep, exports.snive, exports.break];
        exports.flank.UPGRADES_TIER_2 = [exports.flankp2,exports.hexa, exports.tri, exports.accor, exports.auto3, exports.ank];
        exports.flankp2.UPGRADES_TIER_2 = [exports.ank];
        exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer, exports.spawner, exports.master, exports.drivect, exports.pdirect, exports.adirect, exports.bridirect];
        exports.pbasic.UPGRADES_TIER_2 = [exports.ptwin, exports.poisonsnipe, exports.poisonmach, exports.pdouble, exports.ppound, exports.pdirect, exports.ptrapper];
        exports.lance.UPGRADES_TIER_2 = [exports.death, exports.tlance, exports.smash];
        exports.pound.UPGRADES_TIER_2 = [exports.destroy, exports.builder, exports.artillery, exports.pounper, exports.launch, exports.pistol, exports.mswarm, exports.steamroll, exports.grow, exports.dpound, exports.pound2];
        exports.pound2.UPGRADES_TIER_2 = [exports.ppound, exports.mtrap, exports.heavy2, exports.aund];
        exports.minishot.UPGRADES_TIER_2 = [exports.artillery, exports.thewn, exports.bent];
        exports.trapper.UPGRADES_TIER_2 = [exports.trapper2, exports.builder, exports.flanktrap, exports.cleth, exports.ttrapper, exports.autrapper, exports.ptrapper, exports.arsenal, exports.trapb];
        exports.trapper2.UPGRADES_TIER_2 = [exports.mtrap];
        exports.cri.UPGRADES_TIER_2 = [exports.tri, exports.autocri, exports.accor, exports.bird];
        exports.pellet.UPGRADES_TIER_2 = [exports.gunner, exports.spell, exports.dpellet, exports.submachine];
        exports.ausic.UPGRADES_TIER_2 = [exports.ausid, exports.autwin, exports.autiper, exports.achine, exports.ank, exports.aund, exports.adirect, exports.autrapper, exports.amgrow, exports.assail];
        exports.bbase.UPGRADES_TIER_2 = [exports.twinb, exports.snipeb, exports.hbchine, exports.poundbrid, exports.bridirect, exports.trapb, exports.ausid];
        exports.single.UPGRADES_TIER_2 = [exports.mulgle, exports.assail];
        exports.mgrow.UPGRADES_TIER_2 = [exports.grow, exports.amgrow, exports.tmgrow, exports.smgrow];
        exports.thewn.UPGRADES_TIER_2 = [exports.twinfern];
        exports.basinv.UPGRADES_TIER_2 = [exports.dinv, exports.sneak];
        exports.basicep.UPGRADES_TIER_2 = [exports.twinicep, exports.snicep];
        exports.drive.UPGRADES_TIER_2 = [exports.tdrive, exports.snive, exports.drivect, exports.arsenal]; 
        exports.flank2.UPGRADES_TIER_2 = [exports.double, exports.dsnipe, exports.dmachine, exports.overseer, exports.dpound, exports.pdouble];
        exports.subd.UPGRADES_TIER_2 = [exports.tsubd, exports.hunter];
        exports.arsenal.UPGRADES_TIER_2 = [exports.rap];
        //exports.swas.UPGRADES_TIER_2 = [exports.tswas, exports.sswas, exports.mswas];
        exports.auto2.UPGRADES_TIER_2 = [exports.auto3, exports.twin2, exports.sniper2, exports.heavy2];
        exports.band.UPGRADES_TIER_2 = [exports.decess, exports.scout];
        exports.heal.UPGRADES_TIER_2 = [exports.medic, exports.paramedic];
//SPECIAL TIER 3
        exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash, exports.weirdspike, exports.bonk, exports.landmine];
        exports.twin.UPGRADES_TIER_3 = [exports.triple, exports.dual]; 
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack]; 
        exports.flank.UPGRADES_TIER_3 = [exports.tripletwin, exports.fsnipe, exports.fmachine, exports.pflank, exports.fpound];
        exports.flankp2.UPGRADES_TIER_3 = [exports.fpellet, exports.finv];
        exports.director.UPGRADES_TIER_3 = [exports.manage];
        exports.trapper.UPGRADES_TIER_3 = [exports.barcade, exports.overtrap];
        exports.tpage2.UPGRADES_TIER_3 = [exports.twinfern, exports.tmini];
        exports.tpage3.UPGRADES_TIER_3 = [exports.ttri, exports.tspawn];
        exports.auto2.UPGRADES_TIER_3 = [exports.auto2_2];
//TIER 3 
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble, exports.battleship];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.triple];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.twin4,exports.machinegunner, exports.brush];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.stalker, exports.autoass, exports.vulcan],
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach, exports.dual];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.rap, exports.boomer, exports.quadbuilder, exports.conq];
        exports.boomer.UPGRADES_TIER_3 = [exports.ninja];
        exports.rifle.UPGRADES_TIER_3 = [exports.musk, exports.arms];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];
        exports.destroy.UPGRADES_TIER_3 = [exports.conq, exports.anni, exports.hybrid, exports.construct, exports.shotgun2, exports.demolish, exports.flatt, exports.m2grow, exports.autodestroy, exports.deploy];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.demolish, exports.control, exports.beek, exports.ord];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.crop , exports.barcade, exports.tmini];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.break, exports.bomber, exports.autotri, exports.surfer, exports.ttri, exports.clone, exports.sweep];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexatrap, exports.cyc, exports.ahexa];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.twin4, exports.sniper3];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.conq, exports.bomber, exports.bulwark];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.overdrive, exports.banshee];  
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer, exports.malefict];
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress];
        exports.spawner.UPGRADES_TIER_3 = [exports.factory, exports.tspawn]; 
        exports.accor.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.bomber, exports.autotri, exports.surfer];
        exports.launch.UPGRADES_TIER_3 = [exports.skimmer, exports.twist, exports.sidewind, exports.swarmer, exports.rocket, exports.deploy, exports.hove];
        exports.grow.UPGRADES_TIER_3 = [exports.m2grow, exports.agrow];
        exports.amgrow.UPGRADES_TIER_3 = [exports.agrow];
        exports.steamroll.UPGRADES_TIER_3 = [exports.flatt];
        exports.thewn.UPGRADES_TIER_3 = [exports.split];
        exports.death.UPGRADES_TIER_3 = [exports.excali];
        exports.infern.UPGRADES_TIER_3 = [exports.twinfern];
        exports.dsnipe.UPGRADES_TIER_3 = [exports.fsnipe]; 
        exports.sneak.UPGRADES_TIER_3 = [exports.stalker];
        exports.master.UPGRADES_TIER_3 = [exports.overlord, exports.banshee];
        exports.dmachine.UPGRADES_TIER_3 = [exports.fmachine];
        exports.dpound.UPGRADES_TIER_3 = [exports.fpound];
        exports.pdouble.UPGRADES_TIER_3 = [exports.pflank];
        exports.mswarm.UPGRADES_TIER_3 = [exports.swarmer];
        exports.tsubd.UPGRADES_TIER_3 = [exports.dual];
        exports.twinb.UPGRADES_TIER_3 = [exports.benthybrid];
        exports.dpellet.UPGRADES_TIER_3 = [exports.fpellet];
        exports.drivect.UPGRADES_TIER_3 = [exports.overdrive];
        exports.submachine.UPGRADES_TIER_3 = [exports.vulcan];
        exports.dinv.UPGRADES_TIER_3 = [exports.finv];
        exports.twin2.UPGRADES_TIER_3 = [exports.twin4];
        exports.sniper2.UPGRADES_TIER_3 = [exports.sniper3];
        exports.heavy2.UPGRADES_TIER_3 = [exports.heavy3];
        exports.poundbrid.UPGRADES_TIER_3 = [exports.control, exports.hybrid];
        exports.mulgle.UPGRADES_TIER_3 = [exports.plock, exports.tick];
        exports.assail.UPGRADES_TIER_3 = [exports.tick, exports.glock19];
        exports.autwin.UPGRADES_TIER_3 = [exports.autodouble, exports.twinn];
        exports.autiper.UPGRADES_TIER_3 = [exports.autoass, exports.snipest];
        exports.aund.UPGRADES_TIER_3 = [exports.autodestroy, exports.craft];
        exports.ank.UPGRADES_TIER_3 = [exports.ahexa, exports.pleck];
        exports.ahexa.UPGRADES_TIER_3 = [exports.hexatrap];
        exports.autocri.UPGRADES_TIER_3 = [exports.autotri];
        exports.bird.UPGRADES_TIER_3 = [exports.clone, exports.break, exports.sweep];
//TIER 4
        exports.landmine.UPGRADES_TIER_4 = [exports.megaland];
        exports.megasmash.UPGRADES_TIER_4 = [exports.gigasmash];
        exports.necromancer.UPGRADES_TIER_4 = [exports.necromonster, exports.autonecro, exports.trimancer];
    //  exports.boomer.UPGRADES_TIER_4 = [exports.invisboom, exports.bentboomer, exports.chase];
        exports.booster.UPGRADES_TIER_4 = [exports.booghter, exports.starship, exports.pump];
        exports.fighter.UPGRADES_TIER_4 = [exports.booghter, exports.warship, exports.defeat];
        exports.machinegunner.UPGRADES_TIER_4 = [exports.doublegunner];
        exports.rifle.UPGRADES_TIER_4 = [exports.sniprifle];
        exports.spray.UPGRADES_TIER_4 = [exports.extinct];
        exports.anni.UPGRADES_TIER_4 = [exports.overanni, exports.decent, exports.ggrow, exports.dange, exports.m2swarm, exports.autoanni];
        exports.sidewind.UPGRADES_TIER_4 = [];
        exports.mortar.UPGRADES_TIER_4 = [exports.anger, exports.assend];
        exports.skimmer.UPGRADES_TIER_4 = [exports.skimmest];
        exports.tripletwin.UPGRADES_TIER_4 = [exports.quadtwin, exports.autripletwin];
        exports.preda.UPGRADES_TIER_4 = [exports.term, exports.sotap, exports.trual];
        exports.penta.UPGRADES_TIER_4 = [exports.hepta, exports.hug];
        exports.dual.UPGRADES_TIER_4 = [exports.trual]; 
        exports.stream.UPGRADES_TIER_4 = [exports.reloader];
        exports.battleship.UPGRADES_TIER_4 = [exports.night];
        exports.overlord.UPGRADES_TIER_4 = [exports.overgod]; 
        exports.ninja.UPGRADES_TIER_4 = [exports.shurikenthrow];
        exports.construct.UPGRADES_TIER_4 = [exports.corp, exports.dange, exports.engineer];
        exports.poach.UPGRADES_TIER_4 = [exports.sotap];
        exports.ranger.UPGRADES_TIER_4 = [exports.seek, exports.autorange];
        exports.m2grow.UPGRADES_TIER_4 = [exports.ggrow, exports.am2grow];
        exports.triple.UPGRADES_TIER_4 = [exports.quint, exports.direcow];
        exports.conq.UPGRADES_TIER_4 = [exports.dange];
        exports.carrier.UPGRADES_TIER_4 = [exports.hug];
        exports.swarmer.UPGRADES_TIER_4 = [exports.m2swarm];  
        exports.nailgun.UPGRADES_TIER_4 = [exports.shot];
        exports.rap.UPGRADES_TIER_4 = [exports.engineer];
        exports.control.UPGRADES_TIER_4 = [exports.assend];
        exports.split.UPGRADES_TIER_4 = [exports.splittle];
        exports.ord.UPGRADES_TIER_4 = [exports.blund];
        exports.auto5.UPGRADES_TIER_4 = [exports.auto7, exports.heavy5];
        exports.heavy3.UPGRADES_TIER_4 = [exports.heavy5];
        exports.plock.UPGRADES_TIER_4 = [exports.strong];
        exports.glock19.UPGRADES_TIER_4 = [exports.glock19X, exports.glock19gen5];
        exports.autodouble.UPGRADES_TIER_4 = [exports.autripletwin, exports.twinndouble];
        exports.twinn.UPGRADES_TIER_4 = [exports.twinndouble, exports.twiniply];
        exports.autoass.UPGRADES_TIER_4 = [exports.autorange, exports.snipingass];
        exports.snipest.UPGRADES_TIER_4 = [exports.snipingass, exports.werewolf];
        exports.craft.UPGRADES_TIER_4 = [exports.poundestroy, exports.tase];
        exports.autodestroy.UPGRADES_TIER_4 = [exports.autoanni, exports.poundestroy];
        exports.pleck.UPGRADES_TIER_4 = [exports.villain, exports.conjest];
        exports.ahexa.UPGRADES_TIER_4 = [exports.acto, exports.villain];
        exports.octo.UPGRADES_TIER_4 = [exports.acto];
        exports.auto2_2.UPGRADES_TIER_4 = [exports.auto2_3, exports.auto3_2];
        exports.break.UPGRADES_TIER_4 = [exports.falcon];
        exports.hove.UPGRADES_TIER_4 = [exports.sharp];
  //SPECIAL TIER 4 TANKS
        exports.auto3.UPGRADES_TIER_4 = [exports.auto3_2];
        exports.assassin.UPGRADES_TIER_4 = [exports.falcon];
  //TIER 5 TANKS
        exports.auto3_2.UPGRADES_TIER_5 = [exports.auto3_3];
        exports.auto2_3.UPGRADES_TIER_5 = [exports.auto3_3];
        exports.corp.UPGRADES_TIER_5 = [exports.production];
        exports.engineer.UPGRADES_TIER_5 = [exports.production];

/*
exports.pmode.UPGRADES_TIER_1 = [exports.bluetank, exports.greentank, exports.redtank, exports.yellowtank, exports.purpletank, exports.magentank, exports.graytank, exports.whitank, exports.whitank, exports.aquatank, exports.goldtank];

exports.bluetank.UPGRADES_TIER_1 = [exports.selectank, 
exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.unamed,  exports.unamed, exports.unamed, exports.unamed, exports.back];
  
exports.greentank.UPGRADES_TIER_1 = [exports.unamed, 
exports.selectank, exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.unamed,  exports.unamed, exports.unamed, exports.unamed, exports.back];

exports.redtank.UPGRADES_TIER_1 = [exports.unamed, 
exports.unamed, exports.selectank, exports.unamed, exports.unamed, exports.unamed, exports.unamed,  exports.unamed, exports.unamed, exports.unamed, exports.back];

exports.yellowtank.UPGRADES_TIER_1 = [exports.unamed, 
exports.unamed, exports.unamed, exports.selectank, exports.unamed, exports.unamed, exports.unamed,  exports.unamed, exports.unamed, exports.unamed, exports.back];

exports.purpletank.UPGRADES_TIER_1 = [exports.unamed, 
exports.unamed, exports.unamed, exports.unamed, exports.selectank, exports.unamed, exports.unamed,  exports.unamed, exports.unamed, exports.unamed, exports.back];

exports.magentank.UPGRADES_TIER_1 = [exports.unamed, 
exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.selectank, exports.unamed,  exports.unamed, exports.unamed, exports.unamed, exports.back];

exports.graytank.UPGRADES_TIER_1 = [exports.unamed, 
exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.selectank,  exports.unamed, exports.unamed, exports.unamed, exports.back];

exports.whitank.UPGRADES_TIER_1 = [exports.unamed, 
exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.unamed,  exports.selectank, exports.selectank, exports.unamed, exports.back];

exports.aquatank.UPGRADES_TIER_1 = [exports.unamed, 
exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.unamed,  exports.unamed, exports.unamed, exports.selectank, exports.back];

exports.goldtank.UPGRADES_TIER_1 = [exports.back, 
exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.unamed, exports.unamed,  exports.unamed, exports.unamed, exports.unamed, exports.selectank];

exports.back.UPGRADES_TIER_1 = [exports.bluetank, exports.greentank, exports.redtank, exports.yellowtank, exports.purpletank, exports.magentank, exports.graytank, exports.whitank, exports.whitank, exports.aquatank, exports.goldtank];

    exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash];
            
    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.triple, exports.hexa];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.autodouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.benthybrid];
        exports.triple.UPGRADES_TIER_3 = [exports.quint];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.overseer, exports.hunter, exports.builder];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.battleship
                                            , exports.overtrap, exports.necromancer, exports.factory, exports.fortress];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder];
        
    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.gunner, exports.artillery];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.mortar, exports.stream];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo];
        exports.tri.UPGRADES_TIER_3 = [exports.booster, exports.fighter, exports.bomber, exports.autotri];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.guntrap, exports.fortress, exports.bomber];*/

// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 0.01,
        PUSHABILITY: 0,
        DENSITY: 0.01,
        RESIST: 1,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: false,
    DRAW_HEALTH: true,
    GIVE_KILL_MASSAGE: false,
};
exports.autoCrash = makeAuto(exports.crasher, 'Crasher');
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABELS : 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.2,
        spd: 0.5,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 1,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 1,
        SPEED: base.SPEED * 0.5,
        HEALTH: 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    LABEL: 'Sentry',
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.heavy3gun, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.megaTrapTurret, size: 12, });
exports.sentryBrid = makeHybrid(exports.sentry, 'Sentry');
exports.sentryAnni = {
  PARENT: [exports.sentry],
  LABEL: 'Sentry',
  DANGER: 3,
  GUNS: [{
  POSITION: [ 20.5,  18.5,     1,      0,      0,      180,      0,   ],
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
     TYPE: exports.bullet,
  }, },
 ],
};
exports.sentryFlank = {
  PARENT: [exports.sentry],
  LABEL: 'Sentry',
  DANGER: 3,
  GUNS: [{
  POSITION: [18, 8, 1, 0, 0, 60, 0],
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
     TYPE: exports.bullet
  }, }, {
  POSITION: [18, 8, 1, 0, 0, 180, 0],
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
     TYPE: exports.bullet
  }, }, {
  POSITION: [18, 8, 1, 0, 0, 300, 0],
   PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
     TYPE: exports.bullet
  }, },
 ],
};  
exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    BODY: { FOV: 1.4 },
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A boss has defeated!',
};
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: '',
     
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 1,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                    TYPE: exports.crasher,
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, }, 
        ],
    };
    exports.elite = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Crasher',
        COLOR: 5,
        SHAPE: 3,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 1.4,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    };
    exports.fallen = {
        PARENT: [exports.elite],
        COLOR: 16,
        SHAPE: 0,
        BODY: {
            SPEED: base.SPEED * 2.5,
            HEALTH: base.HEALTH * 1.3,
            DAMAGE: base.DAMAGE * 2.55,
        },
        MOTION_TYPE: 'motor',
        FACING_TYPE: 'smoothToTarget',
        CONTROLLERS: ['nearestDifferentMaster'],
        };
        exports.elite_destroyer = {
            PARENT: [exports.elite],
            LABEL: 'Elite Destroyer',
            AI: { NO_LEAD: true },
            BODY: { FOV: 1.5 },
            BROADCAST_MESSAGE: 'The Elite Destroyer Has Been Defeated!',  
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5, }]
                    },
            ],
        };
        exports.elite_gunner = {
            PARENT: [exports.elite],
            LABEL: 'Elite Gunner',
            AI: { NO_LEAD: true },
            BROADCAST_MESSAGE: 'The Elite Gunner Has Been Defeated!',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.power]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    SHOOT_SETTINGS: combineStats([g.basic, g.lesspower]),
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
                    SHOOT_SETTINGS: combineStats([g.basic, g.lesspower]),
            }],
        };
        exports.elite_sprayer = { 
            PARENT: [exports.elite],
            LABEL: 'Elite Sprayer',
            AI: { NO_LEAD: false },
            BROADCAST_MESSAGE: 'The Elite Sprayer Has Been Defeated!',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        },
            ],
        };
    exports.elite_sprayer_2 = {
    PARENT: [exports.elite],
    LABEL: 'Elite Sprayer',
    COLOR: 5,
    SHAPE: 3,
    DANGER: 6,
    TURRETS: [{
      POSITION: [11.5, 7, 6, 60, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [11.5, 7, -6, 60, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [11.5, 7, 6, 180, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [11.5, 7, -6, 180, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [11.5, 7, 6, -60, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [11.5, 7, -6, -60, 360, 0],
      TYPE: exports.spgray
      }, {
      POSITION: [6, 0, 0, 0, 360, 1],
      TYPE: exports.spinfm
      },
     ],
    };
           exports.elite_battleship = {
            PARENT: [exports.elite],
            LABEL: 'Elite Battleship',
            AI: { NO_LEAD: false },
            BROADCAST_MESSAGE: 'The Elite Battleship Has Been Defeated!',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,    6,    0.6,     7,      7.5,      60,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                 POSITION: [   4,    6,    0.6,     7,      0,      60,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   4,   6,    0.6,     7,     -7.5,      60,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   4,    6,    0.6,     7,      7.5,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                 POSITION: [   4,    6,    0.6,     7,      0,      180,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   4,   6,    0.6,     7,     -7.5,      180,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   4,    6,    0.6,     7,      7.5,      -60,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                 POSITION: [   4,    6,    0.6,     7,      0,      -60,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   4,   6,    0.6,     7,     -7.5,      -60,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lesspower, g.slow]),
                        TYPE: exports.autoswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ], 
      TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,     7,      0,     0,     360, 1], 
                    TYPE: [exports.auto3gun, {COLOR: 5}]
                        }, {
                POSITION: [  5,     7,      0,     120,    360, 1], 
                    TYPE: [exports.auto3gun, {COLOR: 5}]
                        }, {
                POSITION: [  5,     7,      0,     240,    360, 1], 
                    TYPE: [exports.auto3gun, {COLOR: 5}]
                        }, 
                
             ],
        };
  exports.ek1 = {
  PARENT: [exports.miniboss],
  LABEL: "EK-1",
  COLOR: 6,
  SIZE: 20,
  SHAPE: 0,
  AI: { NO_LEAD: false },
  TURRETS: [{
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 10, 0, 180, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    }, {
      POSITION: [10, 10, 0, 60, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    }, {
      POSITION: [10, 10, 0, -60, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    }, {
      POSITION: [10, 10, 0, 123, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    }, {
      POSITION: [10, 10, 0, 0, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    }, {
      POSITION: [10, 10, 0, -123, 190, 0],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    }, {
      POSITION: [25, 0, 0, 180, 0, 0],
      TYPE: [exports.smasherBody, { COLOR: 9 }]
    }, {
      POSITION: [10, 0, 0, 0, 360, 1],
      TYPE: [exports.bigauto4gun, { COLOR: 16 }]
    },
  ],
};
  exports.ek2 = {
  PARENT: [exports.miniboss],
  LABEL: "EK-2",
  COLOR: 6,
  SIZE: 25,
  SHAPE: 0,
  AI: { NO_LEAD: false },
  TURRETS: [{
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [15, 10, 0, 180, 190, 0],
      TYPE: [exports.gunner, { COLOR: 6 }]
    }, {
      POSITION: [15, 10, 0, 60, 190, 0],
      TYPE: [exports.gunner, { COLOR: 6 }]
    }, {
      POSITION: [15, 10, 0, -60, 190, 0],
      TYPE: [exports.gunner, { COLOR: 6 }]
    }, {
      POSITION: [3, 12, -4, 0, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [3, 12, 4, 0, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [3, 12, -4, 120, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [3, 12, 4, 120, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [3, 12, -4, 240, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [3, 12, 4, 240, 190, 0],
      TYPE: [exports.auto3gun, { COLOR: 16 }],
    }, {
      POSITION: [25, 0, 0, 180, 0, 0],
      TYPE: [exports.smasherBody, { COLOR: 9 }]
    }, {
      POSITION: [10, 0, 0, 0, 360, 1],
      TYPE: [exports.autoTurret, { COLOR: 16 }]
    },
  ],
  GUNS: [{
    POSITION: [11, 4, 0.55, 7, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [11, 4, 0.55, 7, 0, 120, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, }, {
    POSITION: [11, 4, 0.55, 7, 0, 240, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm
    }, },
  ],
};
exports.ek3 = (() => {
  let props = {
    SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
    TYPE: exports.minion,
    STAT_CALCULATOR: gunCalcNames.drone,
    AUTOFIRE: true,
    MAX_CHILDREN: 1,
    SYNCS_SKILLS: true,
    WAIT_TO_CYCLE: true
  };
return {
    PARENT: [exports.miniboss],
    LABEL: "EK-3",
    COLOR: 6,
    SIZE: 40,
    VALUE: 500000,
    BODY: {
      FOV: 1.3,
      SPEED: base.SPEED * 0.1,
      HEALTH: base.HEALTH * 2,
      SHIELD: base.SHIELD * 2,
      REGEN: base.REGEN,
      DAMAGE: base.DAMAGE * 3
    },
    TURRETS: [{
        POSITION: [3, 12, 2, 0, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, 0, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, 2, 60, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, 60, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, 2, -60, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, -60, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, 120, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, 2, 120, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, 2, 180, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, 180, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, 2, 240, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [3, 12, -2, 240, 190, 0],
        TYPE: exports.autoSmasherTurret
      }, {
        POSITION: [5, 7, 0, 180, 190, 1],
        TYPE: exports.whitedirector
      }, {
        POSITION: [5, 7, 0, 60, 190, 1],
        TYPE: exports.whitedirector
      }, {
        POSITION: [5, 7, 0, -60, 190, 1],
        TYPE: exports.whitedirector
      }, {
        POSITION: [8, 0, 0, 0, 360, 1],
        TYPE: exports.huntert
      }, {
        POSITION: [24, 0, 0, 0, 360, 0],
        TYPE: exports.ek3rdBody
      },
    ],
GUNS: [{
        /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [11, 2.5, 0.6, 7, -1.5, 30, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, 30, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, -1.5, -30, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, -30, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, -1.5, -90, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, -90, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, -1.5, 90, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, 90, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, -1.5, 150, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, 150, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, -1.5, 210, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        }, }, {
        POSITION: [11, 2.5, 0.6, 7, 1.5, 210, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
          TYPE: exports.swarm,
          STAT_CALCULATOR: gunCalcNames.swarm
        },
      },
    ],
  };
  })(); 
exports.ek4 = (() => {
  let nailgunY = 1;
return {
    PARENT: [exports.miniboss],
    LABEL: "EK-4",
    COLOR: 6,
    SIZE: 55,
    SHAPE: 0,
    VALUE: 1000000,
    BODY: {
      FOV: 1.3,
      SPEED: base.SPEED * 0.1,
      HEALTH: 1000,
      SHIELD: base.SHIELD * 2,
      REGEN: base.REGEN,
      DAMAGE: base.DAMAGE * 3
    },
    TURRETS: [{
      POSITION: [22, 0, 0, 0, 360, 0],
      TYPE: [exports.eq3body, { COLOR: 9 }],
      }, {
      POSITION: [6, 5, 5, 45, 360, 1],
      TYPE: [exports.ek4assassin, { COLOR: 16 }],
      }, {
      POSITION: [6, 5, 5, 135, 360, 1],
      TYPE: [exports.ek4assassin, { COLOR: 16 }],
      }, {
      POSITION: [6, 5, 5, 225, 360, 1],
      TYPE: [exports.ek4assassin, { COLOR: 16 }],
      }, {
      POSITION: [6, 5, 5, 315, 360, 1],
      TYPE: [exports.ek4assassin, { COLOR: 16 }],
      },
    ],
    GUNS: [{ 
      POSITION: [3, 3.3, 1, 13, 0, 0, 0], 
      }, {
      POSITION: [2, 6.5, 1, 15.5, 0, 0, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: exports.ek4falcon,
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,
             MAX_CHILDREN: 2
      }, }, {                        
      POSITION: [2, 6.5, 1, 11, 0, 0, 0], 
      }, {
      POSITION: [3, 3.3, 1, 13, 0, 90, 0], 
      }, {
      POSITION: [2, 6.5, 1, 15.5, 0, 90, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: exports.ultraegg,
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
             MAX_CHILDREN: 1
      }, }, {                        
      POSITION: [2, 6.5, 1, 11, 0, 90, 0], 
      }, {
      POSITION: [3, 3.3, 1, 13, 0, 180, 0], 
      }, {
      POSITION: [2, 6.5, 1, 15.5, 0, 180, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: exports.ek4eagle,
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true, 
             MAX_CHILDREN: 2
      }, }, {                        
      POSITION: [2, 6.5, 1, 11, 0, 180, 0], 
      }, {
      POSITION: [3, 3.3, 1, 13, 0, 270, 0], 
      }, {
      POSITION: [2, 6.5, 1, 15.5, 0, 270, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: exports.ultraegg,
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,
             MAX_CHILDREN: 1
      }, }, {                        
      POSITION: [2, 6.5, 1, 11, 0, 270, 0], 
      }, {
      POSITION: [8, 4, 0.55, 11, 0, 60, 0],
      PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      }, }, {
      POSITION: [8, 4, 0.55, 11, 0, 150, 0],
      PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      }, }, { 
      POSITION: [8, 4, 0.55, 11, 0, 240, 0],
      PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      }, }, { 
      POSITION: [8, 4, 0.55, 11, 0, 330, 0],
      PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.morerecoil]),
       TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY - 0.5), 30, 0.25],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY + 0.5), 30, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, nailgunY, 30, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY - 0.5), 120, 0.25],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY + 0.5), 120, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, nailgunY, 120, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY - 0.5), 210, 0.25],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY + 0.5), 210, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, nailgunY, 210, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY - 0.5), 300, 0.25],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (nailgunY + 0.5), 300, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, nailgunY, 300, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY + 0.5), 30, 0.25], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY - 0.5), 30, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, -nailgunY, 30, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY + 0.5), 120, 0.25], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY - 0.5), 120, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, -nailgunY, 120, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY + 0.5), 210, 0.25], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY - 0.5), 210, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, -nailgunY, 210, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY + 0.5), 300, 0.25], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2, 0.5, 1, 11, (-nailgunY - 0.5), 300, 0.75], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [2.5, 0.5, 1, 11, -nailgunY, 300, 0], 
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
         TYPE: exports.bullet,
      }, }, {
      POSITION: [1, 3, -1.8, 11, 0, 30, 0],
      }, {
      POSITION: [1, 3, -1.8, 11, 0, 120, 0],
      }, {
      POSITION: [1, 3, -1.8, 11, 0, 210, 0],
      }, {
      POSITION: [1, 3, -1.8, 11, 0, 300, 0],
      },
   ],
}})();
exports.eq1 = {
    PARENT: [exports.miniboss],
    LABEL: "EQ-1",
    COLOR: 6,
    SIZE: 20,
    SHAPE: 0,
    VALUE: 500000,
    GUNS: [{
      POSITION: [2, 5, 1, 0, 0, 60, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
      }, }, {
      POSITION: [2, 5, 1, 0, 0, 180, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
      }, }, {
      POSITION: [2, 5, 1, 0, 0, 300, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
      }, }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 60, 0],
      }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 180, 0],
      }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 300, 0],
      },
     ],
    TURRETS: [{
      POSITION: [25, 0, 0, 180, 0, 0],
      TYPE: [exports.smasherBody, { COLOR: 9 }]
      }, {
      POSITION: [8, 0, 0, 0, 360, 1],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      },
     ],
    };
exports.eq2 = {
    PARENT: [exports.miniboss],
    LABEL: "EQ-2",
    COLOR: 6,
    SIZE: 25,
    SHAPE: 0,
    VALUE: 500000,
    GUNS: [{
      POSITION: [2, 5, 1, 0, 0, 60, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
      }, }, {
      POSITION: [2, 5, 1, 0, 0, 180, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
      }, }, {
      POSITION: [2, 5, 1, 0, 0, 300, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
      }, }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 60, 0],
      }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 180, 0],
      }, {
      POSITION: [1.5, 12, 1.1, 12.5, 0, 300, 0],
      },
    ],
    TURRETS: [{
      POSITION: [9, 10, 0, 0, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, 120, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, 240, 360, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [25, 0, 0, 180, 0, 0],
      TYPE: [exports.smasherBody, { COLOR: 9 }]
      }, {
      POSITION: [9, 0, 0, 0, 360, 1],
      TYPE: [exports.megaTrapTurret, { COLOR: 16 }],
      },
     ],
    };
    exports.eq3 = {
    PARENT: [exports.miniboss],
    LABEL: "EQ-3",
    COLOR: 6,
    SIZE: 40,
    SHAPE: 0,
    VALUE: 500000,
    BODY: {
      FOV: 1.3,
      SPEED: base.SPEED * 0.1,
      HEALTH: base.HEALTH * 2,
      SHIELD: base.SHIELD * 2,
      REGEN: base.REGEN,
      DAMAGE: base.DAMAGE * 3
    },
    GUNS: [{
      POSITION: [2, 3, 1, 0, 0, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [2, 3, 1, 0, 0, 120, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [2, 3, 1, 0, 0, 240, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 6,
      }, }, {
      POSITION: [2, 3, 1, 0, 0, 60, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 6,
      }, }, {
      POSITION: [2, 3, 1, 0, 0, 180, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [2, 3, 1, 0, 0, 300, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lowpower, g.halfreload]),
         TYPE: [exports.eggdrone, { SIZE: 5 }],
          MAX_CHILDREN: 7,
      }, }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 0, 0],
      }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 120, 0],
      }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 240, 0],
      }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 60, 0],
      }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 180, 0],
      }, {
      POSITION: [1.5, 5, 1.1, 12.5, 0, 300, 0],
      },
    ],
    TURRETS: [{
      POSITION: [9, 10, 0, 30, 180, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, 150, 180, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, 270, 180, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, -30, 180, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, -150, 180, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [9, 10, 0, -270, 180, 0],
      TYPE: [exports.trapTurret, { COLOR: 16 }],
      }, {
      POSITION: [4, 5.35, 0, 0, 180, 1],
      TYPE: [exports.eq3spawn, { COLOR: 16 }],
      }, {
      POSITION: [4, 5.35, 0, 120, 180, 1],
      TYPE: [exports.eq3spawn, { COLOR: 16 }],
      }, {
      POSITION: [4, 5.35, 0, 240, 180, 1],
      TYPE: [exports.eq3spawn, { COLOR: 16 }],
      }, {
      POSITION: [5, 0, 0, 0, 180, 1],
      TYPE: [exports.eq3musket, { COLOR: 16 }],
      }, {
      POSITION: [25, 0, 0, 180, 0, 0],
      TYPE: [exports.eq3body, { COLOR: 9 }]
      }, 
    ],
  };
  exports.sk1 = {
    PARENT: [exports.miniboss],
    LABEL: "SK-1",
    COLOR: 13,
    SIZE: 20,
    SHAPE: 4,
    VALUE: 300000,
    MAX_CHILDREN: 8,
    GUNS: [{
      POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      90,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      90,      0.1,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      90,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      180,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      180,      0.2,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      180,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      270,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      270,      0.3,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      270,      0,   ], 
      },
   ],
  TURRETS: [{
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.auto3, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto3, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.auto3, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto3, { COLOR: 13 }],
    },
  ],
};
exports.sk2 = {
    PARENT: [exports.miniboss],
    LABEL: "SK-2",
    COLOR: 13,
    SIZE: 25,
    SHAPE: 4,
    VALUE: 400000,
    MAX_CHILDREN: 10,
    GUNS: [{
      POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      90,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      90,      0.1,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      90,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      180,      0,   ], 
      }, {
      POSITION: [   2,     14,      1,      15.5,   0,      180,      0.2,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      180,      0,   ], 
      }, {
      POSITION: [   5,     11,      1,      10.5,   0,      270,      0,   ], 
      }, { //
      POSITION: [   2,     14,      1,      15.5,   0,      270,      0.3,   ],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.halfreload]),
         TYPE: [exports.eq3minion, { COLOR: 13 }],
          STAT_CALCULATOR: gunCalcNames.drone,                        
           AUTOFIRE: true,
            SYNCS_SKILLS: true,   
      }, }, {                        
      POSITION: [   4,     14,      1,      8,      0,      270,      0,   ], 
      },
   ],
  TURRETS: [{
    POSITION: [3, 9, 0, 45, 360, 1],
    TYPE: [exports.heavy3, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 135, 360, 1],
    TYPE: [exports.auto5, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 225, 360, 1],
    TYPE: [exports.heavy3, { COLOR: 13 }],
    }, {
    POSITION: [3, 9, 0, 315, 360, 1],
    TYPE: [exports.auto5, { COLOR: 13 }],
    }, {
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: [exports.rocket, { COLOR: 13 }],
    },
  ],
};
    exports.palisade = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 28,
            VALUE: 500000,
            BODY: {
                FOV: 2,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
                SPEED: base.SPEED * 2
            },
            CONTROLLERS: ['nearestDifferentMaster'],
            BROADCAST_MESSAGE: 'The Palisade Has been Defeated!',
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    })();
                exports.summon = {
                PARENT: [exports.miniboss],
                LABEL: 'Summoner',
                DANGER: 7,
                COLOR: 3,
                SHAPE: 4,
                SIZE: 25,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.25,
                    SPEED: base.SPEED * 0.25,
                    FOV: base.FOV * 1.4,
                    HEALTH: 250,
                },
                MAX_CHILDREN: 36,
                CONTROLLERS: [ 'nearestDifferentMaster', 'mapAltToFire', 'minion',],
                FACING_TYPE: 'autospin',
                BROADCAST_MESSAGE: 'The Summoner Has Been Defeated!',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   3,     7,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.doublereload, g.doublereload, g.doublereload, g.lowpower, g.slow]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   3,     7,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.doublereload, g.doublereload, g.doublereload, g.lowpower, g.slow]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   3,     7,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.doublereload, g.doublereload, g.doublereload, g.lowpower, g.slow]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   3,     7,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.doublereload, g.doublereload, g.doublereload, g.lowpower, g.slow]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                       ],
                  };
        exports.elite_skimmer = {
        PARENT: [exports.elite],
        LABEL: 'Elite Skimmer',
        BROADCAST_MESSAGE: 'The Elite Skimmer Has Been Defeated!',
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimturret,
                    },
        ],
    };
        exports.elite_twister = {
        PARENT: [exports.elite],
        LABEL: 'Elite Twister',
        BROADCAST_MESSAGE: 'The Elite Twister Has Been Defeated!',
        COLOR: 13,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.twisturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.twisturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.twisturret,
                    },
        ],
    };
                exports.fallenboost = {
                PARENT: [exports.fallen],
                LABEL: 'Fallen Booster',
                AI: { NO_LEAD: true },
                DANGER: 7,
                CONTROLLERS: ['mapTargetToGoal', 'nearestDifferentMaster'],
                SKILL: setBuild("7499777099"),
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.nest = {
  PARENT: [exports.miniboss],
  LABEL: 'Nest Keeper',
  COLOR: 14,
  SHAPE: 5,
  SIZE: 40,
  VALUE: 10000,
  BODY: {
  FOV: 1.3,
  SPEED: base.SPEED * 0.5,
  HEALTH: base.HEALTH * 2,
  SHIELD: base.SHIELD * 1.9,
  REGEN: base.REGEN * 0.5,
  DAMAGE: base.DAMAGE * 3.1,
  },
  BROADCAST_MESSAGE: 'The Nest Keeper Has Been Defeated!',
  GUNS: [{
    POSITION: [   3.5,     10,    1.05,     8,      0,     38.5,      0,   ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.meta]),
       TYPE: [exports.drone,{ COLOR: 14, }],
        MAX_CHILDREN: 2,
         AUTOFIRE: true,
          SYNCS_SKILLS: true,
           STAT_CALCULATOR: gunCalcNames.drone,
  }, }, {
    POSITION: [   3.5,     10,    1.05,     8,      0,     110.5,    0,  ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.meta]),
       TYPE: [exports.drone,{ COLOR: 14, }],
        MAX_CHILDREN: 2,
         AUTOFIRE: true,
          SYNCS_SKILLS: true,
           STAT_CALCULATOR: gunCalcNames.drone,
  }, }, {
    POSITION: [   3.5,     10,    1.05,     8,      0,     180,    0,  ], 
     PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.meta]),
         TYPE: [exports.drone,{ COLOR: 14, }],
          MAX_CHILDREN: 2,
           AUTOFIRE: true,
            SYNCS_SKILLS: true,
             STAT_CALCULATOR: gunCalcNames.drone,
  }, }, {
    POSITION: [   3.5,     10,    1.05,     8,      0,     252,    0,  ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.meta]),
       TYPE: [exports.drone,{ COLOR: 14, }],
        MAX_CHILDREN: 2,
         AUTOFIRE: true,
          SYNCS_SKILLS: true,
           STAT_CALCULATOR: gunCalcNames.drone,
  }, }, {
    POSITION: [   3.5,     10,    1.05,     8,      0,     -38.5,    0,  ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.meta]),
       TYPE: [exports.drone,{ COLOR: 14, }],
        MAX_CHILDREN: 2,
         AUTOFIRE: true,
          SYNCS_SKILLS: true,
           STAT_CALCULATOR: gunCalcNames.drone,
  }, },
  ],
  TURRETS: [{
    POSITION: [12, 0, 0, 0, 360, 1],
    TYPE: exports.autoBoomerTurret
  }, {
    POSITION: [8, 9.5, 0, 0, 190, 0],
    TYPE: exports.PurpleAutoSmasherTurret 
  }, {
    POSITION: [8, 9.5, 0, 77, 190, 0],
    TYPE: exports.PurpleAutoSmasherTurret 
  }, {  
    POSITION: [8, 9.5, 0, 144, 190, 0],
    TYPE: exports.PurpleAutoSmasherTurret 
  }, {
    POSITION: [8, 9.5, 0, 216, 190, 0],
    TYPE: exports.PurpleAutoSmasherTurret 
  }, {
    POSITION: [8, 9.5, 0, 288, 190, 0],
    TYPE: exports.PurpleAutoSmasherTurret 
  },
 ],
 };
exports.paladin = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Paladin",
  COLOR: 14,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BROADCAST_MESSAGE: "Paladin Is Gone, Be Ready For Next.",
  BODY: bossStats({
    health: 3,
    speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.paladinSunchipBody, {COLOR: 14}],
      }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.paladinSwarmerBody, {COLOR: 14}],
      }, 
    ],
  };
exports.freyja = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Freyja",
  COLOR: 1,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BROADCAST_MESSAGE: "The Freyja Has Been Defeated, good job!",
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.freyjaCruiserBody, { COLOR: 1}],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.freyjaGunnerBody, { COLOR: 1}],
    },
  ],
};
exports.zaphkiel = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Zaphkiel",
  COLOR: 2,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BROADCAST_MESSAGE: "good Job surviving skimmers, Zaphkiel Is Defeated!",
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.zaphkielDroneBody, { COLOR: 2}],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.zaphkielSkimmerBody, { COLOR: 2}],
    },
  ],
};
exports.theia = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Theia",
  COLOR: 13,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BROADCAST_MESSAGE: 'Wow, Theia has Defeated!',
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.theiaSunchipBody, { COLOR: 13 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.theiaMissileBody, { COLOR: 13 }],
    },
  ],
};
exports.alviss = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Alviss",
  COLOR: 17,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.alvissEggBody, { COLOR: 17 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.alvissLaunchBody, { COLOR: 17 }],
    },
  ],
};
  exports.athena = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Athena",
  COLOR: 69,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.athenaDroneBody, { COLOR: 69 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.athenaQuintBody, { COLOR: 69 }],
    },
  ],
};
exports.nyx = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Nyx",
  COLOR: 5,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.nyxMinionBody, { COLOR: 5 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.nyxRocketeerBody, { COLOR: 5 }],
    },
  ],
};
exports.blaze = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Blaze",
  COLOR: 16,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.blazeGravelBody, { COLOR: 16 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.blazeSidewinderBody, { COLOR: 16 }],
    },
  ], 
};
exports.tyr = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Tyr",
  COLOR: 17,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.tyrMinionLaunchBody, { COLOR: 17 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.tyrTwinBody, { COLOR: 17 }],
    },
  ], 
};

exports.fiolnir = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Fiolnir",
  COLOR: 17,
  SHAPE: 9,
  SIZE: 40,
  VARIES_IN_SIZE: false,
  VALUE: 1000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...celestialTrapTurretArray, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.fiolnirSplitCruiserBody, { COLOR: 17 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.fiolnirBeekeeperBody, { COLOR: 17 }],
    },
  ], 
};
exports.kronos = {
  PARENT: [exports.miniboss],
  LABEL: "Eternal",
  NAME: "Kronos",
  COLOR: 6,
  SHAPE: 11,
  SIZE: 80,
  VARIES_IN_SIZE: false,
  VALUE: 4000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  SKILL: setBuild("6929987040"),
  TURRETS: [...EternalTrapTurretArray, {
      POSITION: [18, 0, 0, 0, 0, 1],
      TYPE: [exports.kronosLaunchBody, { COLOR: 6 }],
    }, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.kronosCarrierBody, { COLOR: 6 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.kronosTripletBody, { COLOR: 6 }],
    },
  ],
};
exports.ragnarok = {
  PARENT: [exports.miniboss],
  LABEL: "Ragnarok",
  NAME: "Ragnarok",
  COLOR: 0,
  SHAPE: 11,
  SIZE: 80,
  VARIES_IN_SIZE: false,
  VALUE: 4000000,
  BODY: bossStats({
  health: 3,
  speed: 0.5
  }),
  FACING_TYPE: 'autospin',
  SKILL: setBuild("7939998151"),
  TURRETS: [...RagnarokTrapTurretArray, {
      POSITION: [18, 0, 0, 0, 0, 1],
      TYPE: [exports.ragnarokGemBody, { COLOR: 0 }],
    }, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.ragnarokAutoSmashBody, { COLOR: 0 }],
    }, {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: [exports.ragnarokGunCruiseBody, { COLOR: 0, CONTROLLERS: ['reversespin'] }],
    },
  ],
};
exports.ac = {
    PARENT: [exports.genericTank],
    LABEL: 'Arena Closer',
    CAN_BE_ON_LEADERBOARD: false,
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: 'hard',
    CAN_GO_OUTSIDE_ROOM: true,
    GIVE_KILL_MESSAGE: false,
    BROADCAST_MESSAGE: 'The Arena Cl- wait. destroyed?????',
    NAME: 'Arena Closer',
    CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 3,
    SIZE: 35,
    SKILL: skillSet({
        rld: 10,
        dam: 10, 
        pen: 10,
        str: 10,
        spd: 10,
        atk: 10,
        hlt: 10,
        shi: 10,
        rgn: 10,
        mob: 10,        
    }),
  LEVEL: 45,
  BODY: {
    SPEED: 10,
    HEALTH: 9999999999,
    REGEN: 9999999999,
    DAMAGE: 10000000,
    SHIELD: 50000000,
    FOV: 2,
    PUSHABILITY: 0,
    HETERO: 0,
    },
  GUNS: [{    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.op, g.norecoil,  g.halfreload, g.AC, g.halfreload]),
            TYPE: exports.bullet,
          }, }, 
    ],
  };
exports.tc = {
  PARENT: [exports.ac],
  LABEL: 'Twin Closer',
  NAME: 'Twin Closer',
  GUNS: [{/*** LENGTH  WIDTH   ASPECT    X       Y      ANGLE   DELAY */
    POSITION: [  14,     9,      1,      0,     5.7,      0,      0,   ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.op, g.norecoil,  g.halfreload, g.AC, g.halfreload]),
       TYPE: exports.bullet,
    }, }, {
    POSITION: [  14,     9,      1,      0,    -5.7,      0,      0.5,   ], 
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.op, g.norecoil,  g.halfreload, g.AC, g.halfreload]),
       TYPE: exports.bullet,
    }, },
  ],
};
exports.sc = {
  PARENT: [exports.ac],
  LABEL: 'Sniper Closer',
  NAME: 'Sniper Closer',
  GUNS: [{/*** LENGTH  WIDTH   ASPECT    X       Y      ANGLE  DELAY */
    POSITION: [  20,     9,      1,      0,      0,       0,     0,   ],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.op, g.norecoil, g.halfreload, g.AC, g.halfreload]),
       TYPE: exports.bullet,
    }, },
  ],
};  
exports.mc = {
  PARENT: [exports.ac],
  LABEL: 'Machine Closer',
  NAME: 'Machine Closer',
  GUNS: [{/*** LENGTH  WIDTH   ASPECT    X       Y      ANGLE  DELAY */
    POSITION: [  8,     11,     1.4,     8,      0,       0,     0,   ],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.op, g.norecoil, g.halfreload, g.AC, g.halfreload]),
       TYPE: exports.bullet,
    }, },
  ],
};  
exports.fc = {
  PARENT: [exports.ac],
  LABEL: 'Flank Closer',
  NAME: 'Flank Closer',
  GUNS: [{/*** LENGTH  WIDTH   ASPECT    X       Y      ANGLE  DELAY */
    POSITION: [  14,     9,      1,      0,      0,       0,     0,   ],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.op, g.norecoil, g.halfreload, g.AC, g.halfreload]),
       TYPE: exports.bullet,
    }, }, {
    POSITION: [  14,     9,      1,      0,      0,      120,    0,   ],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.op, g.norecoil, g.halfreload, g.AC, g.halfreload]),
       TYPE: exports.bullet,
    }, }, {
    POSITION: [  14,     9,      1,      0,      0,      240,    0,   ],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.op, g.norecoil, g.halfreload, g.AC, g.halfreload]),
       TYPE: exports.bullet,
    }, },
  ],
};  
exports.dc = {
  PARENT: [exports.ac],
  LABEL: 'Director Closer',
  NAME: 'Director Closer',
  GUNS: [{/*** LENGTH  WIDTH   ASPECT    X       Y      ANGLE  DELAY */
    POSITION: [  6,     13,     1.2,     8,      0,       0,     0,   ],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.over, g.op, g.norecoil, g.halfreload, g.AC, g.halfreload]),
       TYPE: exports.drone,
        MAX_CHILDREN: 5
    }, },
  ],
};    
exports.pc = {
  PARENT: [exports.ac],
  LABEL: 'Pounder Closer',
  NAME: 'Pounder Closer',
  GUNS: [{/*** LENGTH  WIDTH   ASPECT    X       Y      ANGLE  DELAY */
    POSITION: [  16,    13,      1,      0,      0,       0,     0,   ],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.op, g.norecoil, g.halfreload, g.AC, g.halfreload]),
       TYPE: exports.bullet,
    }, },
  ],
};  
//Crasher Nesters
exports.senest = {
  PARENT: [exports.genericTank],
  LABEL: 'Sentry Nester',
  COLOR: 5,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7, -2, 0, 0, 0, 0]
    }, 
  ],
  TURRETS: [{
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: exports.sentry
    },
   ],
  };
exports.swsenest= {
  PARENT: [exports.genericTank],
  LABEL: 'Sentry Swarm Nester',
  COLOR: 5,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.sentrySwarm, { COLOR:5 }],
    }, },
  ],
  TURRETS: [{
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: exports.sentrySwarm
    },
   ],
  };
exports.sgsenest= {
 PARENT: [exports.genericTank],  
  LABEL: 'Sentry Gun Nester',
  COLOR: 5,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.sentryGun, { COLOR:5 }],
    }, },
  ],
  TURRETS: [{
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: exports.sentryGun },
   ],
  };
exports.stsenest = {
 PARENT: [exports.genericTank],  
  LABEL: 'Sentry Trap Nester',
  COLOR: 5,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.sentryTrap, { COLOR:5 }],
    }, },
  ],
  TURRETS: [{
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: exports.sentryTrap
    },
   ],
  };
exports.sasenest = {
 PARENT: [exports.genericTank],  
  LABEL: 'Sentry Annihilator Nester',
  COLOR: 5,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.sentryAnni, { COLOR:5 }],
    }, },
  ],
  TURRETS: [{
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: exports.sentryAnni
    },
   ],
  };
exports.sfsenest = {
 PARENT: [exports.genericTank],  
  LABEL: 'Sentry Flank Nester',
  COLOR: 5,
  BODY: {
  HEALTH: 1000
  },
  GUNS: [{
    POSITION: [18, 7, -2, 0, 0, 0, 0],
     PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic]),
       TYPE: [exports.sentryFlank, { COLOR:5 }],
    }, },
  ],
  TURRETS: [{
    POSITION: [7, 0, 0, 0, 360, 1],
    TYPE: exports.sentryFlank
    },
   ],
  };
exports.bot = {
    VALUE: 35000,
    FACING_TYPE: 'looseToTarget',
    BODY: {
    HEALTH: 0.1,
      },
 /*   SKILL: skillSet[{
    rld: 7,
    spd: 7,
    dam: 7, 
    pen: 7,
    str: 7,
    atk: 7,   
    hlt: 1,
    }],*/
 // SKILL: [0, 0, 4, 7, 7, 7, 7, 7, 0, 0],
  SKILL: setBuild("0066666600"),
  HEALTH_WITH_LEVEL: true, 
    COLOR: 17,
    NAME: "[AI] ",
    CONTROLLERS: [
        'nearestDifferentMaster', 'minion', 'fleeAtLowHealth'
    ],
  //  AI: { STRAFE: true, },
};
//SECRET BRANCH
exports.eggnest.UPGRADES_TIER_1 = [exports.squnest, exports.gemnest, exports.senest];
//SECRET RETURN BRANCH | SENTRY NESTERS
exports.senest.UPGRADES_TIER_1 = [exports.dev, exports.swsenest, exports.sgsenest, exports.stsenest, exports.sasenest, exports.sfsenest];
exports.swsenest.UPGRADES_TIER_1 = [exports.senest, exports.sgsenest, exports.stsenest, exports.sasenest, exports.sfsenest];
exports.sgsenest.UPGRADES_TIER_1 = [exports.senest, exports.swsenest, exports.stsenest, exports.sasenest, exports.sfsenest];
exports.stsenest.UPGRADES_TIER_1 = [exports.senest, exports.swsenest, exports.sgsenest, exports.sasenest, exports.sfsenest];
exports.sasenest.UPGRADES_TIER_1 = [exports.senest, exports.swsenest, exports.sgsenest, exports.stsenest, exports.sfsenest];
exports.sfsenest.UPGRADES_TIER_1 = [exports.senest, exports.swsenest, exports.sgsenest, exports.stsenest, exports.sasenest];
//SECRET DEV BRANCH
exports.dev2.UPGRADES_TIER_1.push(exports.elite_sprayer, exports.elite_destroyer, exports.elite_gunner, exports.elite_battleship, exports.palisade, exports.dev2p2)
exports.dev2p2.UPGRADES_TIER_1 = [exports.dev2, exports.summon, exports.elite_skimmer, exports.nest, exports.elite_sprayer_2, exports.elite_twister, exports.fallenboost];
exports.dev2u2.UPGRADES_TIER_1 = [exports.ek1, exports.eq1, exports.sk1, exports.dev1u2u2];
exports.dev1u2u2.UPGRADES_TIER_1 = [exports.ek1st, exports.eq1st, exports.sk1st];
exports.dev3u2.UPGRADES_TIER_1 = [exports.dev2, exports.dev1u3u2, exports.dev2u3u2, exports.paladin, exports.freyja, exports.zaphkiel, exports.theia, exports.alviss, exports.athena, exports.nyx, exports.dev3u2p2];
exports.dev3u2p2.UPGRADES_TIER_1 = [exports.dev3u2, exports.blaze, exports.tyr, exports.fiolnir];
exports.dev2u3u2.UPGRADES_TIER_1 = [exports.dev3u2, exports.oldpaladin2, exports.xerxes2];
exports.dev1u3u2.UPGRADES_TIER_1 = [exports.dev3u2, exports.paladin2, exports.ruga, exports.freyja2, exports.zaphkiel2, exports.theia2, exports.alviss2, exports.athena2, exports.nyx2, exports.blaze2, exports.tyr2, exports.fiolnir2];
exports.dev4u2.UPGRADES_TIER_1 = [exports.kronos, exports.ragnarok, exports.dev1u4u2];
exports.dev1u4u2.UPGRADES_TIER_1 = [exports.kronos2, exports.ragnarok2, exports.king2, exports.dev4u2];
exports.dev6.UPGRADES_TIER_1 = [exports.ac, exports.tc, exports.sc, exports.mc, exports.fc, exports.dc, exports.pc, exports.dev];
//SECRET | XKX BRANCH
exports.ek1.UPGRADESg_TIER_1 = [exports.ek2];
exports.ek2.UPGRADES_TIER_1 = [exports.ek3]; 
exports.ek3.UPGRADES_TIER_1 = [exports.ek4];
exports.eq1.UPGRADES_TIER_1 = [exports.eq2];
exports.eq2.UPGRADES_TIER_1 = [exports.eq3];
exports.sk1.UPGRADES_TIER_1 = [exports.sk2];