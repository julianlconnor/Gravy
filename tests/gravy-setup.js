window.gravyTestView = Backbone.Gravy.extend({
    tagName: 'form',
    
    events: {
        "focusout input" : "validate",
        "submit"         : "validateAll"
    },

    gravy: {
        fullname: "validateName"
    },

    validateName: function(name) {
        /*
        * Tests that name only has 'legal' characters.
        */
        var re = /^[A-Za-z\s\',.-]+$/;
        return re.test(name);
    }

});
