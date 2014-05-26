var World = function(){};

World.circles = [];

World.dash = [];

World.render = function(){
  for(var i in World.circles){
    var circle = World.circles[i];
    circle.render();
  }
};

var Dash = function(position, length){
  this.position = position;
  this.length = length;
  World.dash.push(this);
};

var Circle = function(position, length){
  this.x = position.x;
  this.y = position.y;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.position = position;
  this.length = length;
  World.circles.push(this);
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
  this.sprite.position = {x:this.x,y:this.y};
};

Circle.prototype.collideCircle = function(circle){
	var x1 = this.position.x;
	var y1 = this.position.y;
	var x2 = circle.position.x;
	var y2 = circle.position.y;
	var dsquare = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
	var lsquare = (this.length + circle.length) * (this.length + circle.length);
	return lsquare < dsquare;
};

Circle.prototype.collideDash = function(dash){
  var x1 = this.position.x;
  var y1 = this.position.y;
  var x2 = dash.position.x;
  var y2 = dash.position.y;
  var l1 = this.length;
  var l2 = dash.length;
  return x1 > x2 && x1 < x2 + l2 && y1 > y2 - l1 && y1 < y2 + l1;
};

Circle.prototype.gravity = function(){
  return (this.y < 1024) ? 1 : 0;
};


