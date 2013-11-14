define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var BarModel = Backbone.Model.extend({
  	defaults: {
  		attr1: 'foo',
  		attr2: 'bar',
  		attr3: false,
  		attr4: true,
  		donkey: 'horse'
  	},

    initialize: function () {
      window.bar = this;
    }
  });

  return BarModel;

});
