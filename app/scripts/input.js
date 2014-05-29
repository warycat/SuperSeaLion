var Input = (function(){
  var keys = {};
  var debug = false;
  var keyString = 'ASDQWEZXCVBNP ';

  function keydown(event){
    var keyCode = event.keyCode;
    var keyChar = String.fromCharCode(keyCode);
    if(keyCode === 9){
      event.preventDefault();
      ED.dispatchEvent({type:'tab'});
    }
    if(keyString.indexOf(keyChar) !== -1){
      event.preventDefault();
      keys[keyChar] = true;
      if(debug)console.log(keyChar);
      if(keyChar === ' ')ED.dispatchEvent({type:'space'});
      if(keyChar === 'Q')ED.dispatchEvent({type:'jump'});
      if(keyChar === 'E')ED.dispatchEvent({type:'fire'});
      if(keyChar === 'P')ED.dispatchEvent({type:'print'});
    }
  }

  function keyup(event){
    var keyCode = event.keyCode;
    var keyChar = String.fromCharCode(keyCode);
    if(keyString.indexOf(keyChar) !== -1){
      event.preventDefault();
      keys[keyChar] = false;
      if(debug)console.log(keyChar);
      // ED.dispatchEvent({type:'keyup',key:keyChar});
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

