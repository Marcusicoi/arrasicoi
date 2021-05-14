
This is temp.md an **Template** Tanks. 

example. if you in android and you cant copy this.
This `temp.md` will help you.

Simple = 
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
GUNS: [{
}]
};
```
Simple With Body Option = 
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
BODY: {
ACCELERATION: base.ACCEL * ?
SPEED: base.SPEED * ?
FOV: base.FOV * ?
DENSITY: base.DENSITY * ?
},
GUNS: [{
}]
};
```

Simple With Statnames =
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
STAT_NAMES: statnames.?
GUNS: [{
}]
};
```

Simple With Body And Statnames =
