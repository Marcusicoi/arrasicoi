# Marcusicoi Arras Template 

NOTE: **Make Sure You Go To My Main Server So You Can See What Updates
I Have.**
# Remix It!

1. Click The Top Left Where It Says **Remix To Edit**
2. Wait.
3. Go To Your Icon Name.
4. Change The Icon And The Name Of Your Project
5. Now edit!

# SECRETS.

Click The File Named `🗝️.env`
Give Your New Secret Password
Example:
```
SECRET = AnyPasswordYouWant
```
If you Accidently Delete It Follow My Steps.
1. Go To Top Says `PlainText🧿`
2. TYPE: SECRET = `anypassword`
Done!

# File Meaning
The Tank Data, Polygons, Tier List Are In **`lib/efinitions.js`**

Packages Are In **`package.json`**

Random,Chances,BotName,BossesName Are in **`lib/random.js`**

Map/Data Are In **`config.json`**

Stats, Amount, Tier, Stuff Are In **`server.js`**

Updates List Are In **`updates.md`**

OpenShift Tutorial Are In **`OPENSHIFT.md`**

Block Codes,Test Suite Are In **`fasttalk.js`**

Help Are In **`help.md`**
# Type File Meaning

file.**js** Is A JavaScript The You Need To Work On

file.**md** Is A Reading Same As File.**txt**

file.**json** Are Data

file.**html** Is A Website Builder

file.**css** Is A Style,Font,Color,BackGround, For file.**html**

# Creating Tanks Tutorial

`exports.anyname` Means To Export A Name to Select It On Tier So `exports.test`

`PARENT: [],` Means To Do Same As You Want To Export It So `PARENT: [exports.genericTank]`

`LABEL: '',` Means That Name Of Your Tank So
`LABEL: 'TestTank',`

`DANGER: 0,` Means How Danger Your Tank Was So `DANGER: 7`

`GUNS: [{` Means The Gun Of The Barrel 

```
  L. W. A. X. Y. a. D
[ 0, 0, 0, 0, 0, 0, 0],
```

L = **LENGTH** means How Long The Barrel Of The Vertical One If Its 18 it will do as normal if Its
more Than 18 It Will go More Longer Like The Tank Barrel **Sniper, Assassin, Ranger**
if its less than 18 It will go short Like The Tank Barrel **Brusher**, (custom tank)

W = **WIDTH** means How Long The Barrel Of The Horizontal One If Its 10 It will do as normal
If Its more than 10 The Bullet Will Be Big And The tank barrel Will Wide Like The Tank Barrel
**Annihilator** If Its Less Than 10 The Horizontal Barrel Will Be Short 

A = **ASPECT** Means How Straight Or Not Straight The Barrel If Its 1 It will Be Normal
If Its More Than 1 It Will Go Wide And wide Like The Tank Barrel **Machine Gun**
If Its Less Than 1 It Will Go Narrow And More Like The Tank Barrel **Stalker**

X = **X-Axis** Means The Position Of The Tank Was If It Its 0 It Will go normal
If Its More Than 0 It Wil Move Up If its less Than 0 It will Move Down

Y = **Y-Axis** Means The Position Of The Tank Was If It Its 0 It Will go normal
If Its More Than 0 It Wil Move Left If its less Than 0 It will Move Right

a = **ANGLE** Means The Position of The Barrel Rotate Was If Its 0 It will stay on top
If its More Than 0 It will rotate ClockWise The Body Of Your Tank
If Its Less Than 0 It Will rotate Opposite Side Of Clockwise The Body Of Your Tank

D = **DELAY** (**ONLY IF YOU HAVE 2 BARRELS**) Means The Recoil Of the Barrel Was Shoot If its 0 It Will Do Normally
If Its More than 0 The 0 Will Shoot First If If Its Less Than 0
The -1 Will Shot First

So.
```
  L.  W. A. X. Y. a. D
[ 18, 8, 1, 0, 0, 0, 0],
```

`PROPERTIES:` Means The Properties Of Tank If You Didn't add Properties It Will Not Shoot So `PROPERTIES: {`

`SHOOT_SETTINGS: combineStats([g.?]),` Means The Shoot Settings of the tank if you put many the shoot bullet will strong or weak.
(If you Want Own Go To The Top And Find **const g =**
 So `SHOOT_SETTINGS: combineStats([g.basic]),`
 
`TYPE:` Means What Type Of Bullet It Shoot
`TYPE: exports.bullet` Or `TYPE: exports.drone` Or `TYPE: exports.trap` So I'll Pick `TYPE: exports.bullet`

If Its Done Type/Copy This: 
```
}, },
],
};
```
If You Want Another Barrel Type/Copy This:
```
}, }, {//. L. W. A. X. Y. a. D
POSITION: [0, 0, 0, 0, 0, 0, 0],
PROPERTIES: {, (or not)
SHOOT_SETTINGS: combineStats([g.?]),
TYPE: exports.?
```

And Start Working!

And If Its Done Find Scroll To Bottom Find **UPGRADE PATHS** select 
Any You Want To Put It If You Picked One Type `exports.test`

I Forgot My The Test Tank Is
(**NOTE: DO NOT COPY THIS ITS ALREADY WORKED** or you just want page2)
```
exports.test = {
PARENT: [exports.genericTank],
LABEL: 'TestTank',
DANGER: 7,
GUNS: [{//   L. W. A. X. Y. a. D
POSITION: [ 18, 8, 1, 0, 0, 0, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet
}, },
],
};
```
If You Want Page 2 Type/Copy This
```
exports.page2 = {

PARENT: [exports.genericTank],

LABEL: 'Page 2',

DANGER: 7,

GUNS: [{//   L. W. A. X. Y. a. D

POSITION: [ 18, 8, 1, 0, 0, 0, 0],

PROPERTIES: {

SHOOT_SETTINGS: combineStats([g.basic]),

TYPE: exports.bullet

}, },

],

};
```

And Find **UPGRADE PATHS** And Add (Make sure you remember what the next tank that fits your screen) `exports.basic.UPGRADES_TIER_1 = [exports.page2]`

# Show My App

1. Look Up
2. Click `🕶️`
3. Click **In A New Window/Tab**

**Note: If You Tap Next To The Code It Automatically Cant See your App**

# Angle
This Means The Tank Position Of An Barrel
Where It Shoots 


0 = **Normal**

90 = **Right**

180 = **Down**

-90 = **Left**

# Shoot Settings
Yes.

SHOOT_SETTINGS: combineStats([g.])

Means What Your Bullet Is Type of Weak, Normal, Op

If You wanna Make Your own
Search `const g`

# Type
Yes

TYPE: exports.?

Means What Kind Of Bullet/Drone/Trap or others Will Shoot In The Barrel

Example:
```
TYPE: exports.bullet = The Bullet/Blue Circle Will Come Out
TYPE: exports.drone = The Drone/Blue Triangle Will Come Out
TYPE: exports.trap = The Trap/Weird Triangle Will Come Out
```
If You Want More Go To **lib/definition.js** Find The Line **512** 
Scroll Down Find You Want To Test Then Select In Here `TYPE: exports.?`

# More Options
If You Want Your Tank Invisibles Type `INVISIBLE: [1,1]`


# Turrets
Yez.
```
TURRETS : [{ S. X. Y. A.  arc
POSITION: [  0, 0, 0, 0, 0, 0],
TYPE: exports.?
```
