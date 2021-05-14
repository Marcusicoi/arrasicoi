
This is temp.md an **Template** Tanks.

NOTE: if you see an **?, Custom** replace it with the new one

--- 
**Simple Help** 

exports.**?** = name,

LABEL: '**Custom**' = name,

TYPE: base.TYPE * **?**(or **?.?**) = Number,

STAT_NAMES: statnames.**?** = Insert Name (Like
statnames.**trap**, statnames.**drone**, statnames.**generic**
statnames.**smasher**, statnames.**necro**, statnames.**swarm**)

FACING_TYPE: '**?**' = Insert Name (Try Searching '**Facing**')

---
**Simples**

Simple = 
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
GUNS: [{
}]
};
```
---
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
---
Simple With Statnames =
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
STAT_NAMES: statnames.?,
GUNS: [{
}]
};
```
---
Simple With Body And Statnames =
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
STAT_NAMES: statnames.?,
BODY: {
ACCELERATION: base.ACCEL * ?,
SPEED: base.SPEED * ?,
FOV: base.FOV * ?,
DENSITY: base.DENSITY * ?,
},
GUNS: [{
}]
}; 
```
---
Simple With Facing Type = 
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
FACING_TYPE: '?',
GUNS: [{
}]
};
```
---
Simple With Facing Type And Statnames =
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
STAT_NAMES: statnames.?,
FACING_TYPE: '?',
GUNS: [{
}]
};
```
---
Simple With Facing Type And Body =
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
FACING_TYPE: '?',
BODY: {
ACCELERATION: base.ACCEL * ?,
SPEED: base.SPEED * ?,
FOV: base.FOV * ?,
DENSITY: base.DENSITY * ?,
},
GUNS: [{
}]
};
```
---
Simple With Facing Type And Statnames And Body =
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
FACING_TYPE: '?'
STAT_NAMES: statnames.?,
BODY: {
ACCELERATION: base.ACCEL * ?,
SPEED: base.SPEED * ?,
FOV: base.FOV * ?,
DENSITY: base.DENSITY * ?,
},
GUNS: [{
}]
};
```
---
Simple With Danger =  
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
DANGER: ?,
GUNS: [{
}]
};
```
---
Simple With Danger And Statnames =
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
DANGER: ?,
STAT_NAMES: statnames.?,
GUNS: [{
}]
};
```
---
Simple With Danger And Facing Type = 
```
exports.? = {
PARENT: [exports.genericTank],
LABEL: 'Custom',
DANGER: ?,
FACING_TYPE: '?',
GUNS: [{
}]
};
```