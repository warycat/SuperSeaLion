var Input = (function(){
  var keys = {};
  var debug = false;

  function keydown(event){
    var keyCode = event.keyCode;
    var keyChar = String.fromCharCode(keyCode);
    if('ASDQWE'.indexOf(keyChar) !== -1){
      event.preventDefault();
      keys[keyChar] = true;
      if(debug)console.log(keyChar);
    }
  }

  function keyup(event){
    var keyCode = event.keyCode;
    var keyChar = String.fromCharCode(keyCode);
    if('ASDQWE'.indexOf(keyChar) !== -1){
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