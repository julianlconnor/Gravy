window.demo = {};
demo.validators =  {
    username: function (val) {
        return (/\b[a-zA-Z]+\b/).test(val);
    },
    email: function (val) {
        return (/\b[a-zA-Z0-9-']{5,16}\b/).test(val);
    },
    phone: function (val) {
        return (/[0-9-]{10,11}/).test(val);
    },
    zipcode: function (val) {
        return (/^\d{5}(-\d{4})?$/).test(val);
    }
};

demo.demoView = Backbone.Gravy.extend({
    el: "#content",

    /*
    * This can obviously be abstracted out elsewhere.
    */

    gravy: {
        submit: {
            success: "save"
        },
        "username" : {
            "validator" : demo.validators.username,
            /*
            * Bear in mind that this neeeds to be a string if you want to
            * reference a method inside the view.
            */
            "success"   : "customSuccess"
        },
        "email"   : {
            "validator" : demo.validators.email,
            "optional" : true
        },
        "phone"   : demo.validators.phone,
        "zipcode" : demo.validators.zipcode
    },

    events: {
        "submit form" : "validateAll",
        "focusout input" : "validate"
    },

    initialize: function () {
        _.bindAll(this, 'success',
                        'error',
                        'clear',
                        'save',
                        'customSuccess');
        this.status = this.$('.status');
    },
    success: function (node) {
        node.parent().attr('class', 'success');
    },
    error: function (node) {
        node.parent().attr('class', 'error');
    },
    clear: function (node) {
        node.parent().attr('class', '');
    },
    save: function (params) {
        this.status.html("Form has passed validation." + JSON.stringify(params));
    },
    customSuccess: function (node) {
        node.parent().attr('class', 'custom-success');
    }
});
