//Require
const main = require('server.js');
const exports = require('definitions.js');
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
const guns = {
length: [gun[gunsType[0]], main.LENGTH],
width: [gun[gunsType[1]], main.WIDTH],
aspect: [gun[gunsType[2]], main.ASPECT],
x: [gun[gunsType[3]], main.X],
y: [gun[gunsType[4]], main.Y],
angle: [guns[gunsType[5]], main.ANGLE],
delay: [guns[gunsType[6]], main.DELAY],
}  
//Foods
var foodType = ['egg', 'square', 'triangle', 'pentagon']
var food = [entity.food, foodType[0,1,2,3]];
if (foodType['pentagon'] === food[foodType[3]]) ([
  return: {
   }])
const foods = {
egg: [food[foodType[0]], exports.egg],
square: [food[foodType[1]], exports.square],
triangle: [food[foodType[2]], exports.triangle],