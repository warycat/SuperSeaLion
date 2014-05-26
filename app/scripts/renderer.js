var Renderer = (function(){
  var renderer = new PIXI.autoDetectRenderer(Screen.width, Screen.height);
  var paused = true;
  renderer.view.style.display = "block";
  renderer.view.style.margin = "auto";
  resize();
  document.body.appendChild(renderer.view);
  $(window).resize(function(){
    resize();
  });

  function resize(){
    var width = $(window).width();
    var height = $(window).height();
    if ( (height / width) > (640 / 1136)){
      renderer.view.style.width = $(window).width() + 'px';
      renderer.view.style.height = $(window).width()/1136 * 640 + 'px';
    }else{
      renderer.view.style.width = $(window).height()/640 * 1136 + 'px';
      renderer.view.style.height = $(window).height() + 'px';
    }
  }

  function play(){
    paused = false;
    requestAnimFrame(animate);
  }

  function pause(){
    paused = true;
  }

  function animate(){
    if(paused)return;
    World.render();
    Camera.render();
    renderer.render(Screen.stage);
    requestAnimFrame(animate);
    stats.update();
  }

  return {
    play:play
  , pause:pause
  , resize:resize
  };
})();

Input.init();

Loader.load();