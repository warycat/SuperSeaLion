var Loader = (function(){
  var prefix = 'images/';
  var assets = {
    backgroundImage:'background2.png'
  , foregroundImage:'foreground2.png'
  , gamespaceImage:'random_trans.png'
  , atlasJson:'atlas.json'
  , atlasImage:'atlas.png'
  , sslAnim:'ssl.anim'
  , flAnim:'fl.anim'
  , gcAnim:'gc.anim'
  , jfAnim:'jf.anim'
  , lfAnim:'lf.anim'
  , octopusAnim:'octopus.anim'
  , lobsterAnim:'lobster.anim'
  , c1Anim:'c1.anim'
  , c2Anim:'c2.anim'
  , sgAnim:'sg.anim'
  , sfAnim:'sf.anim'
  // , groundAnim:'ground.anim'
  // , gfAnim:'gf.anim'
  // , turtleAnim:'turtle.anim'
  };
  
  var path = {};
  _.each(assets,function(value,key){
    path[key] = prefix + value;
  });

  var assetsToLoad = _.map(assets,function(value,key){
    return prefix + value;
  });
  console.log(path);
  console.log(assetsToLoad);

  var loader = new PIXI.AssetLoader(assetsToLoad);

  loader.onComplete = function() {
    Background.init();
    Foreground.init();
    Gamespace.init();
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