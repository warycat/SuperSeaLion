var Camera = (function(){
  var width = 1136;
  var height = 640;
  var zoom = 1;
  var speed = 20;
  var xlimit = Screen.width/2 + 128 * 6;
  var ylimit = Screen.height/2 + 128 * 2;
  var center = {
    x:0
  , y:0
  };

  function render(){
    if(Gamespace.isEditing){
      if(Input.keys.A)center.x-=speed;
      if(Input.keys.D)center.x+=speed;
      if(Input.keys.W)center.y-=speed;
      if(Input.keys.S)center.y+=speed;
      if(Input.keys.Z)zoom*=1.01;
      if(Input.keys.X)zoom/=1.01;
      if(Input.keys.C)foregroundUnit*=1.01;
      if(Input.keys.V)foregroundUnit/=1.01;
      if(Input.keys.B)backgroundUnit*=1.01;
      if(Input.keys.N)backgroundUnit/=1.01;
      if(zoom<0.25)zoom=0.25;
      if(zoom>1)zoom=1;
      if(center.x<xlimit) center.x=xlimit;
      if(center.x>Gamespace.width-xlimit) center.x = Gamespace.width - xlimit;
      if(center.y<ylimit) center.y = ylimit;
      if(center.y> Gamespace.height - ylimit) center.y = Gamespace.height - ylimit;
    }else{
      center.x = SSL.sprite.position.x;
      center.y = SSL.sprite.position.y;
      zoom = 1;
      if(center.x<xlimit) center.x=xlimit;
      if(center.x>Gamespace.width-xlimit) center.x = Gamespace.width - xlimit;
      if(center.y<ylimit) center.y = ylimit;
      if(center.y> Gamespace.height - ylimit) center.y = Gamespace.height - ylimit;
    }
    Background.focus(center,zoom);
    Foreground.focus(center,zoom);
    Gamespace.focus(center,zoom);
  }

  return {
    render:render
  };

})();


