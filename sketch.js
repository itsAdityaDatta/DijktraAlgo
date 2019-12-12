var x,y,a,b,i,j,k,l;
var circle;
var c,d;
var count;

function setup() {
  createCanvas(1300, 500);
  circle = 0;
  count = 0;
}

function draw() { 
  c = map(circle,0,1300,255,0);
  d = map(circle,0,1300,200,0);
  e = map(circle,0,1300,0,255);
  background(c,e,d,1000);
  fill(255,255,0);
  stroke(0);
  strokeWeight(4);
  ellipse(circle,300,50);
  if(circle >= 1280){
  	count = 1;
  }
  else if(circle <= 0){
  	count = 0;
  }
  if(count ==0){
  	circle = circle +3;
  }
  else if(count == 1){
  	circle = circle -3;
  }
}