

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

    isEmpty(variable) {
      if (typeof variable !== 'undefined' && variable != null) {
        if (Array.isArray(variable)) {
          return variable.length == 0;
        }
        else if(!isNaN(variable)) {
          return variable == 0;
        }
        else if(typeof variable === 'string' || variable instanceof String) {
          return variable.length == 0;
        }
        else {
          return Object.keys(variable).length === 0;
        }
      }
      else
        return true;
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
