var Loader = (function(){
  var assetsToLoad = ["images/logo_small.png", "images/PixieSpineData.json", "images/Pixie.json", "images/iP4_BGtile.jpg", "images/iP4_ground.png"];
  var loader = new PIXI.AssetLoader(assetsToLoad);
  loader.onComplete = function() {
    Renderer.play();
  };

  function load(){
    loader.load();
  }
  
  function push(asset){
    assetsToLoad.push(asset);
  }

  return {
    push:push
  , load:load
  };

})();