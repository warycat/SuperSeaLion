var Input = (function(){
  var keys = {};
  var debug = false;
  var keyString = 'ASDQWEZXCVBN';

  function keydown(event){
    var keyCode = event.keyCode;
    var keyChar = String.fromCharCode(keyCode);
    if(keyString.indexOf(keyChar) !== -1){
      event.preventDefault();
      keys[keyChar] = true;
      if(debug)console.log(keyChar);
    }
  }

  function keyup(event){
    var keyCode = event.keyCode;
    var keyChar = String.fromCharCode(keyCode);
    if(keyString.indexOf(keyChar) !== -1){
      event.preventDefault();
      keys[keyChar] = false;
      if(debug)console.log(keyChar);
    }
  }

  function init(){
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup',keyup);
  }
  return {
    init:init
  , keys:keys
  };
})();