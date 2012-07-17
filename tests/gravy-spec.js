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
    * TODO:
    *
    * Need to add tests for, anon function callbacks, callbacks that don't
    * exist, custom field objects, and form submission callbacks.
    *
    */
});
