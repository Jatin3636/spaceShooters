var p1,p2;
var astroid1,astroid2,astroid3;
var blast,blastImage;
var space,spaceImage;
var spaceShip,spaceShipImage;
var laserImage;
var shoot = 0;
var score = 0;
var laser;
var astroidGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline;
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
  space.velocityY = (5 + score/10);

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
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
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

    if(keyDown("right") && spaceShip.x < 400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
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
      score = score + 1;
    }

    astroids();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    
    if(astroidGroup.isTouching(endline)) {
      astroidGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!",120,350);
  }

  if(gameState === instruction) {
    stroke("yellow");
    fill("white");
    textSize(30);
    text("     SPACE SHOOTERS    ",70,50);
    text("ENJOY THE GAME!",100,300);
    stroke("white");
    fill("white");
    textSize(20);
    text("year 2500 .....",0,80);
    text(" # Some astroids are coming towords Earth.",0,105);
    text(" # You are a space fighter.",0,130);
    text(" # Help the people and Earth !",0,155);
    text(" # press 'space' to shoot.",0,180);
    text(" # use right and left arrows to move.",0,205);
    text(" # press 's' to start game.",0,230);
    
    if(keyDown("s")) {
      gameState = play;
    } 
  }
}
  

function astroids() {
  if(frameCount % 110 === 0) {
  
    var astroid = createSprite(Math.round(random(35,375)),-20);
    astroid.velocityY = (6 + score/10);
    astroid.lifetime = 200;
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
    
    //console.log(astroid.x);
    astroidGroup.add(astroid);
  }
}

