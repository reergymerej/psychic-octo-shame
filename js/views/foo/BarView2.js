// This view is one of the Bar views.

define([
  'jquery',
  'underscore',
  'backbone',
  'views/foo/BarView',
  'text!templates/foo/barTemplate2.html'
],
function(
  $,
  _,
  Backbone,
  BarView,
  barTemplate2
){

  var BarView2 = Backbone.View.extend({
    initialize: function () {
      BarView.prototype.initialize();
      this.$el.appendTo($('#bars'));
      this.model.on('change', this.render, this);
      this.render();
    },

    render: function () {
			this.$el.html(_.template(barTemplate2, {
        data: this.model.toJSON()
      }));
			return this;
		}	
	});

	return BarView2;
});