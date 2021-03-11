# Marcusicoi Arras Template 

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

# Type File Meaning

file.**js** Is A JavaScript The You Need To Work On

file.**md** Is A Reading Same As File.**txt**

file.**json** Are Data

file.**html** Is A Website Builder

file.**css** Is A Style,Font,Color,BackGround, For file.**html**

# Creating Tanks Tutorial

`exports.anyname` Means To Export A Name to Select It On Tier So `exports.basic`

`PARENT: [],` Means To Do Same As You Want To Export It So `PARENT: [exports.genericTank]`

`LABEL: '',` Means That Name Of Your Tank So
`LABEL: 'Basic',`

`DANGER: 0,` Means How Danger Your Tank Was So `DANGER: 7`

`GUNS: [{` Means The Gun Of The Barrel 

```
  L. W. A. X. Y. a. D
[ 0, 0, 0, 0, 0, 0, 0],
```

L = **LENGTH** means How Long The Barrel Of The Vertical One If Its 18 it will do as normal if Its
more Than 18 It Will go More Longer Like The Tank **Sniper, Assassin, Ranger**
if its less than 18 It will go short Like The Tank **Brusher**, (custom tank)

W = **WIDTH** means How Long The Barrel Of The Horizontal One If Its 10 It will do as normal
If Its more than 10 The Bullet Will Be Big And The tank barrel Will Wide Like The Tank
**Annihilator** If Its Less Than 10 The Horizontal Barrel Will Be Short 

A = **ASPECT** Means How Straight Or Not Straight The Barrel If Its 1 It will Be Normal
If Its More Than 1 It Will Go Wide And wide Like The Tank **Machine Gun**
If Its Less Than 1 It Will Go Narrow And More Like The Tank **Stalker**

X = **X-Axis** Means The Position Of The Tank Was If It Its 0 It Will go normal
If Its More Than 0 It Wil Move Left If its less Than 0 It will Move Right

Y = **Y-Axis** Means The Position Of The Tank Was If It Its 0 It Will go normal
If Its More Than 0 It Wil Move Up If its less Than 0 It will Move Down

a = **ANGLE** Means The Position of The Barrel Rotate Was If Its 0 It will stay on top
If its More Than 0 It will rotate The ClockWise The Body Of Your Tank
If Its 