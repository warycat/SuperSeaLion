var Loader = (function(){
  var prefix = 'images/';
  var assets = {
    backgroundImage:'background2.png'
  , foregroundImage:'foreground2.png'
  , gamespaceImage:'random_trans.png'
  , atlasJson:'atlas.json'
  , atlasImage:'atlas.png'
  , sslAnim:'ssl.anim'
  , flAnim:'fl.anim' // 1
  , gcAnim:'gc.anim' // 2
  , jfAnim:'jf.anim' // 3
  , lfAnim:'lf.anim' // 4
  , octopusAnim:'octopus.anim' // 5
  , sgAnim:'sg.anim' // 6
  , sfAnim:'sf.anim' // 7
  , lobsterAnim:'lobster.anim' // 8
  // , groundAnim:'ground.anim' // 9
  // , iceblock:'iceblock.anim' // 10
  , c1Anim:'c1.anim'
  , c2Anim:'c2.anim'
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
    SSL.init();
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


