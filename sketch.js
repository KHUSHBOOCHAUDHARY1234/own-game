var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ghost, ghost_running;
var ground, groundImage;

var cloudsGroup, cloudImage;
var  obstacle1,obstacle2,obstacle3,obstacle4;

var score;

var gameOverImg;

function preload() {
     ghost_running = loadAnimation("ghost.webp");
  
  
  groundImage = loadImage("background.jpg");
  
  cloudImage = loadImage("Cloud 2.jpg");
  
  obstacle1 = loadImage("obstacle1.jpg");

  
   
  gameOverImg = loadImage("gameover image.jpg")
  
  
}
function setup() {
  createCanvas(600, 200);
  
  ghost = createSprite(50,180,20,50);
  ghost.addAnimation("running", ghost_running);
  ghost.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);

  
  gameOver.scale = 0.5;
  
  
  //create  Cloud Groups
  cloudsGroup = createGroup();
  obstaclesGroup = createGroup();
  
  console.log("Hello" + 5);
  
  ghost.setCollider("circle",0,0,40);
  ghost.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    //move the ground
    ground.velocityX = -(4 + 3* score/100);
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& ghost.y >= 100) {
        ghost.velocityY = -12;
    
    }
    
    //add gravity
    ghost.velocityY = ghost.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    // spawn the obctacle
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(ghost)){
        gameState = END;
        
    }

    if(score>0 && score % 100 === 0);
  
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;

     
      ground.velocityX = 0;
      ghost.velocityY = 0
     
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}







     













