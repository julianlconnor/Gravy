/*
*
* Gravy is a small form validation library.
*
* Used specifically for Venmo's Backbone Env.
*
* By Julian Connor
*
*/
Backbone.Gravy = Backbone.View;

_.extend(Backbone.Gravy.prototype, {
    /*
    *
    * List of reserved words.
    *
    */
    _r    : ["success", "error", "clear", "submit"],

    /*
    *
    * Helper function to detect if str is reserved for Gravy.
    *
    * @param {String} el
    */
    _reserved : function(el) {
        for ( w in this._r ) {
            if ( el === w )
                return true;
        }
        return false;
    },

    /*
    *
    * Default callback for form focusout events.
    *
    * Catches an event and searches the view/model
    * for the appropriate validation method and callback.
    *
    * @param {Event} e
    */
    validate: function(e){
        var callback, node, name, value, gravy, error = null, success = null;

        node  = $(e.target);
        value = e.target.value;
        gravy = this.gravy;

        /*
        *
        * Invoke 'clear' callback if node value is empty.
        *
        */
        if ( !value.length && gravy.clear )
            return this[gravy.clear].apply(this, [node]);

        name  = e.target.name;

        /*
        *
        * End execution if name is not found in gravy.
        *
        */
        if ( !gravy[name] ) return;

        /*
        *
        * If name points to an object, one or more custom rules for field.
        *
        * Otherwise, throw error if validator is not found
        *
        */
        if ( !(validator = gravy[name] instanceof Object ? 
               gravy[name] : (this[gravy[name]] || this.model[gravy[name]])) )
            throw new Error("Unable to find validator for: " + name);

        /*
        *
        * Check for validation methods in the gravy hash and model
        *
        */
        if ( _.isObject(validator) && !_.isFunction(validator)) {

            success = validator.success;
            error   = validator.error;

            /*
            * My Eyez!!
            */
            if ( !((validator = validator.validator) &&
                   (validator = (this[validator] || this.model[validator]))))
                throw new Error("Unable to find validator for: " + name);
        }

        /*
        *
        * Validates the value of the input and grabs the appropriate
        * success and error callbacks.
        *
        */
        callback = this[validator.apply(this, [value]) ? (success || gravy.success) : ( error || gravy.error )];

        /*
        *
        * Invokes the callback and passes along the input node.
        *
        */
        return callback.apply(this, [node]);
    },

    /*
    *
    * Catches form submissions, loops through all
    * keys that aren't Gravy reserved words.
    *
    * Validates all fields and invokes callbacks
    * based on results.
    *
    * @param {Event} e
    */
    validateAll: function(e) {
        /*
        * Stop form submission.
        */
        e.preventDefault();

        var valid = true,
            gravy = this.gravy;


        for ( key in gravy ) {
            /*
            * Only act on non-reserved keys.
            */
            if ( !this._reserved(key) ) {
                console.log(key);
            }
        }
    }
});
