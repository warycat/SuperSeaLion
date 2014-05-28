var World = function(){};

World.circles = [];

World.dashes = [];

World.render = function(){
  for(var i in World.circles){
    var circle = World.circles[i];
    circle.render();
  }
};

var Dash = function(position, length){
  this.position = position;
  this.length = length;
  World.dashes.push(this);
};

var Circle = function(position, length){
  this.position = position || {x:0,y:0};
  this.x = this.position.x;
  this.y = this.position.y;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.length = length;
  if(position)World.circles.push(this);
};


Circle.prototype.render = function(){
  this.vx = this.vx + this.ax;
  this.vy = this.vy + this.ay;
  this.vx = (this.vx < - this.mvx) ? - this.mvx : this.vx;
  this.vx = (this.vx > this.mvx) ? this.mvx : this.vx;
  this.vy = (this.vy < - this.mvy) ? - this.mvy : this.vy;
  this.vy = (this.vy > this.mvy) ? this.mvy : this.vy;
  this.x = this.x + this.vx;
  this.y = this.y + this.vy;
  this.x = (this.x<0)? 0 : this.x;
  this.x = (this.x>Gamespace.width) ? Gamespace.width : this.x;
  this.y = (this.y<0)? 0 : this.y;
  this.y = (this.y>Gamespace.height) ? Gamespace.height : this.y;
  this.position = {x:this.x,y:this.y};
  this.sprite.position = {x:this.x,y:this.y};
};

Circle.prototype.collideCircle = function(circle){
	var x1 = this.position.x;
	var y1 = this.position.y;
	var x2 = circle.position.x;
	var y2 = circle.position.y;
	var dsquare = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
	var lsquare = (this.length + circle.length) * (this.length + circle.length);
	return lsquare > dsquare;
};

Circle.prototype.collideDash = function(dash){
  var x1 = this.position.x;
  var y1 = this.position.y;
  var x2 = dash.position.x;
  var y2 = dash.position.y;
  var l1 = this.length;
  var l2 = dash.length;
  if(x1<x2)return 0;
  if(x1>x2+l2)return 0;
  if(y1<y2-l1)return 0;
  if(y1>y2+l1)return 0;
  return (y1 < y2) ? -1 : 1;
};

Circle.prototype.inWater = function(){
  return (this.y<1024)?false:true;
};

Circle.prototype.gravity = function(){
  return (this.y < 1024) ? 0.7 : 0;
};


