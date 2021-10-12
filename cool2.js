//Require
const main = require('server.js');
//Entity
var type = ['tank', 'food', 'boss', 'guns'];
var tank = type[0];
var food = type[1];
var boss = type[2];
var barrel = type[3];
const entity = {
  tank: tank[type[0]],
  food: food[type[1]],
  boss: boss[type[2]],
  barrel: barrel[type[3]],
};
//Guns
var gunsType = ['length', 'width', 'aspect', 'x', 'y', 'angle', 'delay'];
var gun = [entity.barrel, gunsType[0,1,2,3,4,5,6]];
var length = gun[gunsType[0]];
var width = gun[gunsType[1]];
var aspect = gun[gunsType[2]];
var x = gun[gunsType[3]];
var y = gun[gunsType[4]];
var angle = gun[gunsType[5]];
var delay = gun[gunsType[6]];
const guns = {
length: [length, main.LENGTH],
width: [width, main.WIDTH],
aspect: [aspect, main.ASPECT],
x: [x, main.X],
y: [y, main.Y],
angle: [angle, main.ANGLE],
delay: [delay, main.DELAY],
}  