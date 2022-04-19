  //escopo global 
  var trex;
  var trexrun;
  var floor1;
  var floor2;
  var imgfloor1;
  var cloud;
  var obstacle1; 
  var obstacle2; 
  var obstacle3;
  var obstacle4;
  var obstacle5;
  var obstacle6;
  var pontuacao = 0;    
  var cloudGrup;
  var obstacleGroup;
  var JOGAR = 1;
  var FIMDOJOGO = 0;
  var estadoDoJogo = JOGAR;
  var trexdead;
  var gameOver;
  var restart;
  var soundGameOver
  var jumpsound
  var checkpoint
  var restartImg 
  var gameOverImg
  var rap
  
function preload(){
  trexrun= loadAnimation("trex1.png ", "trex3.png ", "trex4.png ");
  trexdead= loadAnimation("trex_collided.png");
  imgfloor1 = loadImage ("ground2.png");  
  cloud = loadImage ("cloud.png");
  obstacle1 = loadImage ("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage ("restart.png");
  soundGameOver = loadSound("die.mp3");
  jumpsound = loadSound("jump.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  rap = loadSound("teto.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)

  //criar um sprite do trex
  trex = createSprite(50,250,15,40);
  trex.addAnimation("running",trexrun);
  trex.scale = 0.5; 
  trex.addAnimation("urdead", trexdead)

  floor1 = createSprite(width/2+50 ,285,width/2,15);
  floor1.addImage (imgfloor1)  
  floor2 = createSprite(width/2,297,width/2,10);
  floor2.visible = false 
  cloudGroup = new Group();
  obstacleGroup = new Group();
  trex.setCollider("circle",0,0,30)
  //trex.debug = true
  restart = createSprite(width/2,127);
  restart.addImage (restartImg);
  restart.visible = false
  restart.scale = 0.5
  gameOver = createSprite(width/2,height/2+30);
  gameOver.addImage (gameOverImg);
  gameOver.visible = false
  gameOver.scale = 0.5
}
 
function draw(){
  console.log(trex.y);
  background("white");
  text(mouseX + "," + mouseY, mouseX, mouseY);
  trex.collide(floor2 );
  text ("pontuação:  "+ pontuacao,4,25 ); //concatenaçao de valores 
  drawSprites();
  
    if(estadoDoJogo == JOGAR){
  pontuacao = pontuacao + Math.round(frameRate()/60);
  criarNuvens();
  criarObstaculos();
  
    if (touches.lenght  > 0 || keyDown("space")&& trex.y >= 258  ){  
  trex.velocityY = -13
  touches=[]
  jumpsound.play();
  }  
    trex.velocityY = trex.velocityY + 1
      
    if(pontuacao>0 && pontuacao%300 == 0){ checkpoint.play();
        
    }   
    if(keyWentUp("space")){
      jumpsound.stop()
      
    }
      
    if (floor1.x < 0){
  floor1.x = floor1.width/4 ; 
  }
  floor1.velocityX = -(6+1*pontuacao/100) ; 
  trex.collide(floor1)
  if(trex.isTouching(obstacleGroup)){
  estadoDoJogo = FIMDOJOGO;
  soundGameOver.play()
}
  if(!rap.isPlaying()){
    rap.play();
    rap.setVolume(0.1)
  }
      
}
    else if (estadoDoJogo == FIMDOJOGO){
  floor1.velocityX = 0;
  obstacleGroup.setVelocityXEach(0);
  cloudGroup.setVelocityXEach(0);
  trex.velocityY = 0;
  cloudGroup.setLifetimeEach(0);
  obstacleGroup.setLifetimeEach(-1);
  trex.changeAnimation("urdead", trexdead)
  gameOver.visible = true
  restart.visible = true 
  if (mousePressedOver(restart)){
  reset()
  }
}
  
}


function criarNuvens(){
  if (frameCount %98 == 0){
  var nuvens = createSprite(width+100,20,1,1);
  nuvens.velocityX = -5;
  nuvens.addImage (cloud);
  nuvens.scale = 0.6;
  nuvens.lifetime = 750
  
  cloudGroup.add(nuvens);
  nuvens.y = Math.round(random(30, 123 ));
  nuvens.depth = trex.depth
  trex.depth = trex.depth +1
  
}
}

function criarObstaculos(){
  if (frameCount %80 == 0){
  var obstaculos = createSprite(width+100,268,30,30);
  obstaculos.velocityX = -(6+1*pontuacao/100) ;  
  var rand = Math.round(random(1,6 ));
  switch (rand) {
  case 1:obstaculos.addImage (obstacle1);
  break;
  case 2:obstaculos.addImage (obstacle2);
  break;
  case 3:obstaculos.addImage (obstacle3);
  break;
  case 4:obstaculos.addImage (obstacle4);
  break;
  case 5:obstaculos.addImage (obstacle5);
  break;
  case 6:obstaculos.addImage (obstacle6);
  break
  default: break;
  
}

  obstaculos.scale = 0.5;
  obstaculos.lifetime = 750;
  obstacleGroup.add(obstaculos);

}
}  
function reset(){
  estadoDoJogo = JOGAR;
  obstacleGroup.destroyEach();
  restart.visible = false;
  gameOver.visible = false;
  trex.changeAnimation("running",trexrun);
  pontuacao =0 
  
}
