# Gravy

### What is Gravy?

Gravy is a small (1.2k) form validation layer that helps decouple form events and callbacks from your views and models.

### Why is this useful?

I found myself rewriting a lot of form validation code throughout all my views so I thought it would be nice to decouple that functionality into a standalone plugin.

### How do I use this?

Somewhat easily. It really depends on how you plan on implementing form validation. I like to validate user input while the form is being completed. In order to accomplish this, I have ```focusout``` events on ```input``` and ```textarea``` elements which pipe the ```Event``` into a validation sequence. Based on the result of validation either success, error, or clear methods will be called to notify the user.

##### How to configure Gravy:

###### Include it as a dependency..
After backbone, underscore, and jQuery/Zepto (obvi).
```html
<script type="text/javascript" src="PATH_TO_GRAVY"></script>
```

###### Extend Gravy..
Rather than extending ```Backbone.View``` like so:
```javascript
var myView = Backbone.View.extend({});
```

Extend Gravy:
```javascript
var myView = Backbone.Gravy.extend({});
```

###### Set up your gravy train..
Place a gravy object on your view.
```javascript
gravy : {
    success : "successFunction",
    error   : "errorFunction",
    clear   : "clearFunction", // optional

    "attribute" : "validationMethod",
    "attribute" : {
        validator : "validationMethod",
        success   : "customSuccessFunction"
    }
    ...
}
```

As you can see, in order to use gravy properly you need to set up success and error callbacks along with validation methods for attributes handled in your form.
For example, I have a form for new users and I want to validate username on focusout:
```javascript
gravy : {
    success : "success",
    error   : "error",
    clear   : "clear",

    "username" : "validateUserName"
}
```

This will call the validateUsername function found in *EITHER* your view *OR* your view's model. On success, the success or error callback will be invoked depending on the results of the validation method.

Validation methods should return true or false.

In the first gravy example, there is an object linked to the second attribute. In this case, the developer may want to call a custom success function for certain field(s).

###### Pipe events to gravy..
Lastly, the Gravy API has two methods: ```validate```, and ```validateAll```.

```validate``` handles individual form field validation and ```validateAll``` handles form submission validation. In order to use these methods, pipe events into Gravy like so:
```javascript
events : {
    "focusout input" : "validate",
    "submit"         : "validateAll"
}
```

![Now it's all gravy..](http://dl.dropbox.com/u/1654579/Screenshots/o097.png)


### Conclusion

I hope this helps. If you have any problems using Gravy please feel free to drop me a line or fix a bug! :D
