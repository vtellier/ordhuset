

OhUtils = function(superClass) {
  return class extends superClass {
    constructor() {
      super();
    }

    static get properties() {
      return {
        /*bar: {
          type: Object
        }*/
      };
    }

    /*static get observers() {
      return [ '_barChanged(bar.*)' ];
    }
    _barChanged(bar) { ... }*/

    // Returns true if all arguments are empty or undefined
    isEmpty() {
      var ret = true;
      for (var i = 0; ret && i < arguments.length; i++) {
        var variable = arguments[i];
        if (typeof variable !== 'undefined' && variable != null) {
          if (Array.isArray(variable)) {
            ret = variable.length == 0;
          }
          else if(!isNaN(variable)) {
            ret = variable == 0;
          }
          else if(typeof variable === 'string' || variable instanceof String) {
            ret = variable.length == 0;
          }
          else {
            ret = Object.keys(variable).length === 0;
          }
        }
        else
          ret = true;
      }
      return ret;
    }

    // Returns true if all arguments are defined and not empty
    isNotEmpty() {
      var ret = true;
      for (var i = 0; ret && i < arguments.length; i++) {
        var variable = arguments[i];
        if (typeof variable !== 'undefined' && variable != null) {
          if (Array.isArray(variable)) {
            ret = variable.length > 0;
          }
          else if(!isNaN(variable)) {
            ret = variable > 0;
          }
          else if(typeof variable === 'string' || variable instanceof String) {
            ret = variable.length > 0;
          }
          else {
            ret = Object.keys(variable).length !== 0;
          }
        }
        else
          ret = false;
      }
      return ret;
    }
    
    areEqual() {
      var ret = true;
      if(arguments.length > 0) {
        var prec = arguments[0];
        for (var i = 1; ret && i < arguments.length; i++) {
          ret = prec === arguments[i];
          prec = arguments[i];
        }
      }
      return ret;
    }
    
    stringify(obj, spaces) {
      return JSON.stringify(obj, null, spaces);
    }
    
    _showIfNotEmpty(obj) {
      return obj !== undefined ? "" : "hidden";
    }
    
    _success(message) {
      console.log('I fire success', message);
      this.dispatchEvent(new CustomEvent('success', {bubbles: true, detail: message}));
    }
    
    _failure(message) {
      console.log('I fire failure', message);
      this.dispatchEvent(new CustomEvent('failure', {bubbles: true, detail: message}));
    }
  }
};
