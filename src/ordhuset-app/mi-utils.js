

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
    
    stringify(obj, spaces) {
      return JSON.stringify(obj, null, spaces);
    }
  }
};
