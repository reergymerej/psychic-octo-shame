// This view is for the Foo page.

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/taskTemplate.html'
],
function(
  $,
  _,
  Backbone,
  taskTemplate
){

	var TaskView = Backbone.View.extend({
		
    initialize: function () {
      var me = this;

      this.model.on('change', this.render, this);
      
      this.$el.on('click', '.editable', function (event) {
        me.showEditField($(this));
      });

      this.$el.on('click', '.stop', function () {
        me.stopTask();
      });

      this.render();
    },
    
    render: function () {
      var data = this.model.toJSON();

      data.startLabel = this.model.dateIntToTimeString(data.start);
      data.endLabel = this.model.dateIntToTimeString(data.end);
      data.durationLabel = data.end && this.model.getTimeDiffAsString(data.end, data.start);

			this.$el.html(_.template(taskTemplate, {
        data: data
      }));
			return this;
		},

    showEditField: function (labelEl) {
      var me = this,
        field = labelEl.attr('name'),
        input,
        val;

      val = this.model.get(field);

      if (field === 'start' || field === 'end') {
        val = this.model.dateIntToTimeString(val);
      }

      input = $('<input />', {
        type: 'text',
        value: val
      });

      labelEl.hide().after(input);
      input.select().blur(function (event) {
        me.handleInputBlur($(this), field);
      });
    },

    handleInputBlur: function (inputEl, field) {
      var val = inputEl.val();

      if (this.model.isValid(field, val)) {
        if (field === 'start' || field === 'end') {
          val = this.model.timeStringToDateInt(val);
        }
        this.model.set(field, val);
      } else {
        inputEl.hide().prev().show();
      }
    },

    stopTask: function () {
      this.model.set('end', Date.now());
    }
	});
  
	return TaskView;
});