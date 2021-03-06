var Loader = (function(){
  var prefix = 'images/';
  var assets = {
    backgroundImage:'background3.png'
  , foregroundImage:'foreground3.png'
  , gamespaceImage:'random_trans.png'
  , atlasJson:'atlas.json'
  , atlasImage:'atlas.png'
  , sslAnim:'ssl.anim'
  , fireballAnim:'fireball.anim'
  , ultiAnim:'ulti.anim'
  , groundAnim:'ground.anim'
  , flAnim:'fl.anim'
  , gcAnim:'gc.anim'
  , jfAnim:'jf.anim'
  , lfAnim:'lf.anim'
  , octopusAnim:'octopus.anim'
  , sgAnim:'sg.anim'
  , sfAnim:'sf.anim'
  , gfAnim:'gf.anim'
  , turtleAnim:'turtle.anim'
  , lobsterAnim:'lobster.anim'
  , c1Anim:'c1.anim'
  , c2Anim:'c2.anim'
  };
  
  var path = {};
  _.each(assets,function(value,key){
    path[key] = prefix + value;
  });

  var assetsToLoad = _.map(assets,function(value,key){
    return prefix + value;
  });

  var loader = new PIXI.AssetLoader(assetsToLoad);

  loader.onComplete = function() {
    Background.init();
    Foreground.init();
    Gamespace.init();
    FireButton.init();
    JumpButton.init();
    Enemy.load();
    for(var i in World.circles){
      var circle = World.circles[i];
      circle.init();
    }
    for(var j in World.dashes){
      var dash = World.dashes[j];
      dash.init();
    }
    Renderer.play();
  };

  function load(){
    loader.load();
  }

  return {
    assets:assets
  , path:path
  , load:load
  };

})();


