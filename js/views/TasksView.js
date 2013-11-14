// This view is for the Foo page.

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tasksTemplate.html',
  'models/TaskModel',
  'views/TaskView'
],
function(
  $,
  _,
  Backbone,
  tasksTemplate,
  TaskModel,
  TaskView
){

  var TaskCollection = Backbone.Collection.extend({
    model: TaskModel
  });    

  // Collection
  var tasks = [],
    taskViews = [],
    taskCollection = new TaskCollection();

  window.taskCollection = taskCollection;

	var TasksView = Backbone.View.extend({
		
    el: $('#page'),
    
    initialize: function () {
      this.$el.on('click', '#newTask', function (event) {
        addTask(this);
        return false;
      });
    },
    
    render: function () {
			this.$el.html(_.template(tasksTemplate, {}));
			return this;
		}
	});

  function addTask(button) {
    var taskModel = new TaskModel(),
      taskView,
      el = $('<div>');

    tasks.push(taskModel);
    taskCollection.add(taskModel);

    el.appendTo('#tasks');

    taskView = new TaskView({
      model: taskModel,
      el: el
    });
    taskViews.push(this);
  }
  
	return TasksView;
});