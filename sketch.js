const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground
var rightground,rope,jointPoint,jointLink,bridge
var stones=[];
var boy1Im,boy1,backgroundIm  
var breakButton,buttonImg
var zombie1,zombie2,zombie3,zombie4,sadzombie
var collided = false;
function preload(){
  boy1Im = loadImage("./pic/zombie.png")
  backgroundIm=loadImage("./pic/background.png")
  buttonImg=loadImage("pic/axe.png")
  zombie1=loadAnimation("pic/zombie1.png","pic/zombie2.png")
  //zombie2=loadImage("pic/zombie2.png")
  
  zombie3=loadAnimation("pic/zombie3.png","pic/zombie4.png")
  //zombie4=loadImage("pic/zombie4.png")

  sadzombie=loadImage("pic/sad_zombie.png")



  
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  ground= new Base(70,430,400,100)
  rightground= new Base(1270,430,400,100)
 // rope = new YellowRope(7,{x:600,y:600})
 bridge= new Bridge(25,{x:50,y:350})
 jointPoint=new Base(displayWidth-200,350,100,40,20)
 Matter.Composite.add(bridge.body,jointPoint);
 jointLink= new Link(bridge,jointPoint);
/// stone creation
for (var i = 0; i <= 8; i++) {
  var x = random(width / 2 - 200, width / 2 + 300);
  var y = random(-10, 140);   
  var stone = new Stone(x, y,10);
  stone.scale=0.3
  stones.push(stone);
}
boy1=createSprite(200,600)

boy1.scale=0.1
boy1.velocityX=2

breakButton=createImg("pic/axe.png")
breakButton.position(width-200,height/2-50)
//breakButton.class("breakbutton")
breakButton.size(50,50);
breakButton.mouseClicked(handleButtonPress);
//breakButton.addImage("fall",buttonImg);


}

function draw() {
  background(backgroundIm);
  rectMode(CENTER);
  Engine.update(engine);
  //ground.show();
  //rightground.show();
  //rope.show();
  bridge.show();
  //jointPoint.show();
  boy1.addAnimation("left",zombie1);
boy1.addAnimation("right",zombie3);
boy1.addAnimation("saddy",sadzombie)

  for (var stone of stones) {
    stone.show();
    var pos = stone.body.position;
    var distance = dist(boy1.position.x, boy1.position.y, pos.x, pos.y);
    if (distance <= 50) {
      boy1.velocityX = 0;
    Matter.Body.setVelocity(stone.body, { x: 10, y: -10 });
    boy1.changeAnimation("saddy",sadzombie);
    collided = true;    
    }
    }
   
    if (boy1.position.x >= width - 300 && !collided) {
      boy1.velocityX = -10;
      boy1.changeAnimation("left",zombie1);
      console.log("test")
    }
   
    if (boy1.position.x <= 300 && !collided) {
      boy1.velocityX = 10;
      boy1.changeAnimation("right",zombie3);


    }

    var pos = stone.body.position;
 var distance = dist(boy1.position.x, boy1.position.y, pos.x, pos.y);
  if (distance <= 50) { boy1.velocityX = 0;
     Matter.Body.setVelocity(stone.body, { x: 10, y: -10 });
     boy1.changeAnimation("saddy",sadzombie)
     //console.log(changeImage())
      collided = true;
  }
   
    drawSprites();
   }
   
   function handleButtonPress() {
    jointLink.detached();
    setTimeout(() => {
    bridge.break();
    }, 1500);
   }

   