var snake = [];
var xp = [];
var yp = [];
var fx;
var fy;
var scl = 20;
var go = 0;
var xmeio;
var ymeio;
var fr = 5;

function keyPressed(){
  
  if(keyCode == UP_ARROW){
    if(snake.length == 1 || snake[0].posx != 0){
    snake[0].posy =-1;
    snake[0].posx = 0;
    }
  }
  if(keyCode == DOWN_ARROW){
    if(snake.length == 1 || snake[0].posx != 0){
    snake[0].posy = 1;
    snake[0].posx = 0;
    }
  }
  if(keyCode == LEFT_ARROW){
    if(snake.length == 1 || snake[0].posy != 0){
    snake[0].posx = -1;
    snake[0].posy = 0;
    }
  }
  if(keyCode == RIGHT_ARROW){
    if(snake.length == 1 || snake[0].posy != 0){
    snake[0].posx = 1;
    snake[0].posy = 0;
    }
  }
}

function Snake(a){
    this.x = xmeio;
    this.y = ymeio;
    this.posx= 1;
    this.posy = 0;
    

  this.update = function(){
    
    this.x += scl*this.posx;
    this.y += scl*this.posy;
    this.x = constrain(this.x, 0,width-scl);
    this.y = constrain(this.y, scl*3,height-scl);
    this.distancia = floor(dist(this.x,this.y,fx,fy)); 

    xp.push(this.x);   
    yp.push(this.y);

    if(xp.length > snake.length){
      xp.reverse();
      xp.pop();
      xp.reverse();
    }
    if(yp.length > snake.length){
      yp.reverse();
      yp.pop();
      yp.reverse();
    }

    if(this.distancia<scl){
      food.create();
      snake.push(new Snake());
      fr += 0.5;
    }
    textAlign(CENTER);
    stroke(255);
    fill(255);
    textSize(32);
    text(snake.length-1,width/2, scl*2);
  }

  this.follow = function(a){
    if(a != 0 ){
      this.x = xp[a-1];
      this.y = yp[a-1];
    }
  }

  this.show = function(){
    fill(255);
    noStroke();
    rect(this.x, this.y, scl, scl);
  }
}

function setup(){
  food = new Food();
  createCanvas(400,400);
  food.create();
  xmeio = width/2;
  ymeio = height/2;
  
  snake.push(new Snake());
}

function draw(){
  background(0);
  frameRate(fr);
  for(i=1; i<snake.length; i++){
    if(dist(snake[0].x, snake[0].y, snake[i].x, snake[i].y) < scl){
      go++
      console.log(snake.length - go);
      if(snake.length - go != 1){
        gameover();
      }
    }
  }
    
  snake[0].update();
  
  for(i=0; i<snake.length;i++){
    snake[i].follow(i);
    snake[i].show(); 
  }
  stroke(255);
  line(0,scl*3,width,scl*3)
  food.show();
}

function gameover(){

  snake = [];
  xp = [];
  yp = [];
  go = 0;
  fr = 5;  

  // textAlign(CENTER);
  // textSize(115);  
  // fill(255);
  // textStyle(BOLD)
  // text("GAME", xmeio, ymeio);
  // text("OVER", xmeio, ymeio*1.5);

  setup();
  draw();

}

function Food(){

  this.create = function(){
    fx = floor(random(0,width-scl)/scl)*scl;
    fy = floor(random(scl*3, height-scl)/scl)*scl;
  }

  this.show = function(){
    fill(255,0,100);
    noStroke();
    rect(fx, fy, scl, scl)  
  }
}