# Gravy

## What is Gravy?

Gravy is a small form validation layer that helps decouple form events and callbacks from your views and models.

## Why is this useful?

I found myself rewriting a lot of form validation code throughout all my views so I thought it would be nice to decouple that functionality into a standalone plugin.

## How do I use this?

Somewhat easily. It really depends on how you plan on implementing form validation. I like to validate user input while the form is being completed. In order to accomplish this, I have ```focusout``` events on ```input``` and ```textarea``` elements which pipe the ```Event``` into a validation sequence. Based on the result of validation either success, error, or clear methods will be called to notify the user.

### How to configure Gravy:
    - Include it as a dependency.
    - Instead of extending ```Backbone.View```, extend ```Backbone.Gravy```.
    - Instantiate a ```gravy``` object on your view.
    - Pipe ```focusout``` events on your form elements to ```validate```.
