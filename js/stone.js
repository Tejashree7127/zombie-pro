class Stone 
{
  constructor(x, y,r) 
  {
    let options = {
     // isStatic:true
     
    };
    this.r = 40;
    this.x=x
    this.y=y
    this.body = Bodies.circle(x, y,this.r,  options);
    this.image = loadImage("pic/stone.png")
   // this.w = w;
   // this.h = h;
    World.add(world, this.body);
  }

  show() { var pos = this.body.position; var angle = this.body.angle; push(); translate(pos.x, pos.y); rotate(angle); imageMode(CENTER); image(this.image, 0, 0, this.r, this.r); pop(); } }
