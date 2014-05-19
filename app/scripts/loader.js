var Loader = (function(){
  var prefix = 'images/';
  var assets = {
    backgroundImage:'background2.png'
  , foregroundImage:'foreground2.png'
  , gamespaceImage:'random_trans.png'
  , sslAnim:'ssl.json'
  , atlasImage:'atlas.png'
  , atlasJson:'atlas.json'
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