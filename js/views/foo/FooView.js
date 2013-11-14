// This view is for the Foo page.

define([
  'jquery',
  'underscore',
  'backbone',
  'models/foo/FooModel',
  'models/bar/BarModel',
  'views/foo/BarView1',
  'views/foo/BarView2',
  'text!templates/foo/fooTemplate.html',
  'text!templates/foo/barTemplate1.html'
],
function(
  $,
  _,
  Backbone,
  FooModel,
  BarModel,
  BarView1,
  BarView2,
  fooTemplate,
  barTemplate
){

  var bar = new BarModel();
  var foo = new FooModel({
    bars: [bar]
  });

	var FooView = Backbone.View.extend({
		el: $('#page'),
    render: function () {
			this.$el.html(_.template(fooTemplate, {}));
      createBarViews();
			return this;
		}	
	});

  var barView1,
    barView2;

  function createBarViews() {
    barView1 = new BarView1({
      model: bar
    });

    barView2 = new BarView2({
      model: bar
    });
  }

	return FooView;
});