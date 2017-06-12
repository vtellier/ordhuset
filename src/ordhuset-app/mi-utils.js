

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
    
    stringify(obj) {
      return JSON.stringify(obj, 2);
    }
    
    hideIfEmpty(arrayStar) {
      return arrayStar.base.length==0 ? "hidden" : "";
    }
    
    hideIfNotEmpty(arrayStar) {
      return arrayStar.base.length>0 ? "hidden" : "";
    }
  }
};
