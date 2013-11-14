define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var TaskModel = Backbone.Model.extend({
  	defaults: function () {
      return {
        category: 'category',
  		  label: 'label',
        start: Date.now(),
        end: undefined,
        duration: 0
      };
  	},

    initialize: function () {
      this.on('change', function (model, changeEvent) {
        var end;
        if (model.changed.start || model.changed.end) {
          end = this.get('end');
          if (end) {
            this.set('duration', end - this.get('start'));
          }
        }
      });
    },

    dateIntToTimeString: function (dateInt) {
      var date,
        h,
        m,
        str;

      if (dateInt) {
        date = new Date(dateInt);
        h = date.getHours();
        m = date.getMinutes();
        str = this.pad(h) + ':' + this.pad(m);
      }
      return str;
    },

    timeStringToDateInt: function (time) {
      var parts = time.split(':'),
        h = parseInt(parts[0], 10),
        m = parseInt(parts[1], 10),
        date = new Date();

      date.setHours(h);
      date.setMinutes(m);
      return date.getTime();
    },

    pad: function (num) {
      num = String(num);
      while (num.length < 2) {
        num = '0' + num;
      }
      return num;
    },

    isValid: function (field, val) {
      var valid,
        regex;
      if (field === 'start' || field === 'end') {
        regex = new RegExp(/^[0-2]?[\d]{1}:[0-5][\d]$/);
        valid = regex.test(val);
      } else {
        valid = val.length > 0 && val !== this.get(field);
      }
      return valid;
    },

    getTimeDiffAsString: function (timeInt1, timeInt2) {
      var diff = Math.abs(timeInt1 - timeInt2),
        seconds = diff / 1000,
        hours,
        minutes;

      hours = Math.floor(seconds / (60 * 60));
      seconds = seconds % (60 * 60);
      minutes = Math.floor(seconds / 60);

      return this.pad(hours) + ':' + this.pad(minutes);
    }
  });

  return TaskModel;
});