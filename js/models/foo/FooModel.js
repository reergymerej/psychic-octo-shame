define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var FooModel = Backbone.Model.extend({
  	defaults: {},

    initialize: function () {
      window.foo = this;
    }
  });

  return FooModel;

});
