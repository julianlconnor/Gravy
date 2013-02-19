describe("Testing Gravy:", function() {
    beforeEach(function() {
        this.view = new gravyTestView();
    });

    describe("Asserting that default callbacks are invoked..", function() {
        
        beforeEach(function() {
            this.view.success = jasmine.createSpy();
            this.view.error   = jasmine.createSpy();
            this.view.clear   = jasmine.createSpy();
        });

        it("Calls default success spy when value is valid..", function() {
            /*
            * Create faux element.
            */
            var node = $('<input name="fullname" value="John Smith">');

            this.view.$el.append(node);

            node.focusout();

            expect(this.view.success).toHaveBeenCalled();
        });

        it("Calls default error spy when value is invalid..", function() {
            var node = $('<input name="fullname" value="1234!@#$">');

            this.view.$el.append(node);

            node.focusout();

            expect(this.view.error).toHaveBeenCalled();
        });

        it("Calls default clear spy when value is empty..", function() {
            var node = $('<input name="fullname" value="">');

            this.view.$el.append(node);

            node.focusout();

            expect(this.view.clear).toHaveBeenCalled();
        });
    });

    describe("Testing that custom success, error, and clear callbacks are invoked..", function() {
        
        beforeEach(function() {
            this.view.gravy.success = jasmine.createSpy();
            this.view.gravy.error   = jasmine.createSpy();
            this.view.gravy.clear   = jasmine.createSpy();
        });

        it("Calls custom success spy when value is valid..", function() {
            /*
            * Create faux element.
            */
            var node = $('<input name="fullname" value="John Smith">');

            this.view.$el.append(node);

            node.focusout();

            expect(this.view.gravy.success).toHaveBeenCalled();
        });

        it("Calls custom error spy when value is invalid..", function() {
            var node = $('<input name="fullname" value="1234!@#$">');

            this.view.$el.append(node);

            node.focusout();

            expect(this.view.gravy.error).toHaveBeenCalled();
        });

        it("Calls custom clear spy when value is empty..", function() {
            var node = $('<input name="fullname" value="">');

            this.view.$el.append(node);

            node.focusout();

            expect(this.view.gravy.clear).toHaveBeenCalled();
        });
    });
    /*
    *
    * exist, custom field objects, and form submission callbacks.
    *
    */
    describe("Testing that anonymous validation functions are properly invoked..", function() {
        
        beforeEach(function() {
            this.view.gravy = {};

            this.view.success = jasmine.createSpy();
            this.view.error   = jasmine.createSpy();
            this.view.clear   = jasmine.createSpy();
        });

        it("Calls anonymous validation function..", function() {
            /*
            * Create faux element.
            */

            var node = $('<input name="fullname" value="John Smith">');
            this.view.$el.append(node);

            this.view.gravy.fullname = function(val) {
                return true;
            };

            node.focusout();

            expect(this.view.success).toHaveBeenCalled();

            this.view.gravy.fullname = function(val) {
                return false;
            };

            node.focusout();

            expect(this.view.error).toHaveBeenCalled();
        });
        it("Calls anonymous validator function if there's a custom success..", function() {
            /*
            * Create faux element.
            */

            var node = $('<input name="fullname" value="John Smith">');
            this.view.$el.append(node);

            this.view.gravy.fullname = {};
            this.view.gravy.fullname.validator = function(val) {
                return true;
            };
            this.view.gravy.fullname.success = jasmine.createSpy();

            node.focusout();

            expect(this.view.gravy.fullname.success).toHaveBeenCalled();

            this.view.gravy.fullname.validator = function(val) {
                return false;
            };

            node.focusout();

            expect(this.view.error).toHaveBeenCalled();
        });

    });
    describe("Testing that custom validation objects are properly used..", function() {
        
        beforeEach(function() {
            this.view.success = jasmine.createSpy();
            this.view.error   = jasmine.createSpy();
            this.view.clear   = jasmine.createSpy();
        });

        it("Calls proper validation and callbacks on an object..", function() {
            /*
            * Create faux element.
            */

            var node = $('<input name="fullname" value="John Smith">');
            this.view.$el.append(node);

            /*
            * Create custom object and populate the validator, success, and error fields.
            */
            this.view.gravy.fullname = {};
            this.view.gravy.fullname.validator = function(val) {
                return true;
            };
            this.view.gravy.fullname.success = jasmine.createSpy();
            this.view.gravy.fullname.error = jasmine.createSpy();

            node.focusout();

            expect(this.view.gravy.fullname.success).toHaveBeenCalled();

            this.view.gravy.fullname.validator = function(val) {
                return false;
            };

            node.focusout();

            expect(this.view.gravy.fullname.error).toHaveBeenCalled();
        });

    });
    describe("Testing form submission callbacks..", function() {
        
        beforeEach(function() {
            var fullname_node = $('<input name="fullname" value="John Smith">'),
                email_node = $('<input name="email" value="john@smith.com">');

            this.view.$el.append(fullname_node);
            this.view.$el.append(email_node);

            this.view.success = jasmine.createSpy();
            this.view.error   = jasmine.createSpy();
            this.view.clear   = jasmine.createSpy();

            this.view.gravy = {};
            this.view.gravy.fullname = function(val) {
                return true;
            };
            this.view.gravy.email = function(val) {
                return true;
            };

            this.view.gravy.submit = {};
            this.view.gravy.submit.success = jasmine.createSpy();

        });

        it("Should error out on submit success if no success callback was found..", function() {
            var _this = this;
            this.view.gravy.submit.success = null;

            expect( function() { 
                _this.view.$el.submit();
            }).toThrow(new Error("[Gravy] Unable to find submission success callback!"));
        });

        it("Should not call save success if there was an error..", function() {
            this.view.gravy.email = function(val) {
                return false;
            };
            
            this.view.$el.submit();

            expect(this.view.gravy.submit.success).not.toHaveBeenCalled();
        });
        it("Should call save success if there was not an error..", function() {
            this.view.$el.submit();

            expect(this.view.gravy.submit.success).toHaveBeenCalled();
        });

    });
});
