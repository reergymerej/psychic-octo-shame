// This view is one of the Bar views.

define([
  'jquery',
  'underscore',
  'backbone'
],
function(
  $,
  _,
  Backbone
){

  var BarView = Backbone.View.extend({
    initialize: function () {
      console.log('I am a BarView.');
    }	
	});

	return BarView;
});