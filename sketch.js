var p1,p2;
var astroid1,astroid2,astroid3;
var blast,blastImage;
var space,spaceImage;
var spaceShip,spaceShipImage;
var laserImage;
var shoot = 0;
var laser;
var astroidGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var play = 0;
var end = 1;
var gameState = play;
function preload() {
    spaceImage = loadImage("space.png");
    spaceShipImage = loadImage("spaceship.png");
    laserImage = loadImage("laser.png");
    astroid1 = loadImage("as1.png");
    astroid2 = loadImage("as2.png");
    astroid3 = loadImage("as3.png");
    blastImage = loadImage("blast.png");
    explasionImage = loadImage("blast.png");
    explosionSound = loadSound("explosion.mp3");
    laserSound = loadSound("laser sound.mp3");
}

function setup() {  
    createCanvas(500,700);
    space = createSprite(250,350,30,20);
    space.addImage(spaceImage);
  space.velocityY = 5;

  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;
 p1 = createSprite(250,600);
 //p1.debug = true;
 p1.setCollider("rectangle",70,-27,5,265,156);
 p1.visible = false;
p2 = createSprite(250,600); 
p2.setCollider("rectangle",-70,-27,5,265,24);
 //p2.debug = true;
p2.visible = false;
  astroidGroup = new Group;
  laserGroup = new Group;
}

function draw() {
  background(0);

  if(gameState === play) {
 // console.log(frameCount);
 if(space.y > 800) {
  space.y = 300;
}
shoot = shoot - 1;

if(keyDown("space") && shoot < 460) {
    laser = createSprite(spaceShip.x,spaceShip.y - 130);
    laser.addImage(laserImage);
    laser.velocityY = -8; 
    laser.scale = 0.7;
    laserGroup.add(laser);
    laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
}

if(frameCount % 700 === 0) {
  space.velocityY = space.velocityY + 1;
}

if(keyDown("right") && spaceShip.x < 400) {
  spaceShip.x = spaceShip.x + 7;
  p1.x = p1.x + 7;
  p2.x = p2.x + 7;
}

if(keyDown("left") && spaceShip.x > 50) {
    spaceShip.x = spaceShip.x - 7;
    p1.x = p1.x - 7;
  p2.x = p2.x - 7;
}
if(astroidGroup.isTouching(p2) || astroidGroup.isTouching(p1)) {
astroidGroup.destroyEach();
var blast = createSprite(spaceShip.x,spaceShip.y - 50);
blast.addImage(blastImage);
blast.lifetime = 25;
explosionSound.play();
spaceShip.destroy();
gameState = end;
}
if(astroidGroup.isTouching(laserGroup)) {
  astroidGroup.destroyEach();
  laserGroup.destroyEach();
  explosionSound.play();
}

astroids();
drawSprites();
  }
  else if(gameState === end) {
  space.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!",120,350);
  }

}
  

function astroids() {
  if(frameCount % 100 === 0) {
  
    var astroid = createSprite(Math.round(random(35,375)),-20);
    astroid.velocityY = 6;
    astroid.scale = random(0.4,0.5);
    //astroid.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: astroid.addImage(astroid1);
              astroid.setCollider("circle",-80,10,160);
              break;
      case 2: astroid.addImage(astroid2);
              astroid.setCollider("circle",50,0,150);
              break;
      case 3: astroid.addImage(astroid3);
              astroid.setCollider("circle",0,0,170)
      default: break;
    }
    console.log(astroid.x);

    astroidGroup.add(astroid);
  }
}