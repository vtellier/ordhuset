

let instances = [];
let synchronizing = { user: false };

/*global OhUtils*/
OhUtils = function(superClass) {
  return class extends superClass {
    constructor() {
      super();
      this.__instanceIndex = instances.length;
      instances.push(this);
    }

    static get properties() {
      return {
        user: {
          type: Object,
          observer: '__userObserver'
        }
      };
    }
    
    __userObserver(newValue, oldValue) {
      if(newValue === oldValue)
        return;
      
      // synchronize with the other instances
      this.__synchronize('user', newValue);
    }
    
    /*
     * Synchronizes a property among all other instances.
     */
    __synchronize(property, newValue) {
      if(synchronizing[property])
        return;
//      console.log(`Instance ${this.__instanceIndex} is synchronizing ${property}`);
      synchronizing[property] = true;
      for(var i=0; i<instances.length; i++) {
        if(i != this.__instanceIndex) {
          instances[i][property] = newValue;
        }
      }
      synchronizing[property] = false;
//      console.log(`Instance ${this.__instanceIndex} is DONE with synchronizing ${property}`);
    }

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

    hideClass(hide) {
      return hide ? 'hidden' : '';
    }
    
    showClass(show) {
      return show ? '' : 'hidden';
    }

    _objectKeys(obj) {
      if(obj === undefined || obj === null)
        return [];
      return Object.keys(obj);
    }

    _computeEndAt(startAt) {
      return startAt + String.fromCharCode(-1);
    }
    
    _showIfResults(arrayStar) {
      return arrayStar.base.length==0 ? "hidden" : "";
    }
    
    _showIfNoResult(arrayStar, search) {
      if(!arrayStar || !arrayStar.base)
        return '';
      return arrayStar.base.length>0 || this.isEmpty(search) ? "hidden" : "";
    }
    
    _showIfNotEmpty(obj) {
      return obj !== undefined ? "" : "hidden";
    }
    
    _success(message) {
      console.log('Firing success event:', message);
      this.dispatchEvent(new CustomEvent('success', {bubbles: true, detail: message}));
    }
    
    _failure(message) {
      console.log('Firing failure event:', message);
      this.dispatchEvent(new CustomEvent('failure', {bubbles: true, detail: message}));
    }
    
    // Return a user friendly version of the given word
    // ex: speak becomes 'to speak'
    _prettifyWord(word, def) {
      var ret = word;
      if(!this.isEmpty(def) && def.class === "verb") {
        if(def.lang === "en")
          ret = 'to '+ret;
        else if(def.lang === "no-bm")
          ret = 'å '+ret;
      }
      return ret;
    }
  }
};
