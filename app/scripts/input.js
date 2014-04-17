var Input = (function(){
  var keys = {};
  function keydown(event){
    var keyCode = event.keyCode;
    switch(keyCode){
      case 37:
      case 38:
      case 39:
      case 40:
      case 27:
      case 13:
      case 65:
        event.preventDefault();
        keys[keyCode] = true;
        break;
      default:
    }
  }

  function keyup(event){
    var keyCode = event.keyCode;
    switch(keyCode){
      case 37:
      case 38:
      case 39:
      case 40:
        event.preventDefault();
        keys[keyCode] = false;
        break;
      case 27:
        event.preventDefault();
        keys[keyCode] = false;
        onEsc();
        break;
      case 13:
      case 65:
        event.preventDefault();
        keys[keyCode] = false;
        onDone();
        break;
      default:
    }
  }
  function up(){
    if(keys[38] === true) return true;
    return false;
  }

  function down(){
    if(keys[40] === true) return true;
    return false;
  }

  function left(){
    if(keys[37] === true) return true;
    return false;
  }

  function right(){
    if(keys[39] === true) return true;
    return false;
  }
  function init(){
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup',keyup);
  }
  return {
    init:init
  , up:up
  , left:left
  , down:down
  , right:right
  };
})();