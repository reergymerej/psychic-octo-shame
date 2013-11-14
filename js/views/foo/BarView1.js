// This view is one of the Bar views.

define([
  'jquery',
  'underscore',
  'backbone',
  'views/foo/BarView',
  'text!templates/foo/barTemplate1.html'
],
function(
  $,
  _,
  Backbone,
  BarView,
  barTemplate1
){

  var BarView1 = BarView.extend({
    initialize: function () {
      BarView.prototype.initialize();

      this.$el.appendTo($('#bars'));
      this.model.on('change', this.render, this);
      this.render();
    },

    render: function () {
			this.$el.html(_.template(barTemplate1, {
        data: this.model.toJSON()
      }));
			return this;
		}	
	});

	return BarView1;
});