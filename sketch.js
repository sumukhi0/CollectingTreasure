var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;

 // gameOver = createSprite(200,200,20,10);
  //gameOver.addAnimation("gameOver",endImg);
 // gameOver.scale = 0.5;

  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

  score = 0;
}

function draw() {

  background(0);
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(gameState === PLAY){
   // gameOver.visible = false;
    boy.x = World.mouseX;
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  //code to reset the background
  if(path.y > 400 ){
     path.y = height/2;
  }
  if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+50;
    
    }else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      
    }else {
    if(swordGroup.isTouching(boy)){
      swordGroup.destroyEach();
      gameState = END;
  }
  }
  }
  
  if(gameState === END){
    
    path.velocityY = 0;
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    boy.velocityY = 0;
    // gameOver.visible = true;
    boy.addAnimation("SahilRunning",endImg);
    boy.x = 200;
    boy.y = 300;
    boy.scale = 0.5;
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();    
    
    }
    


  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (frameCount % 250 === 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (frameCount % 80 === 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (frameCount % 200 === 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (frameCount % 150 === 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}