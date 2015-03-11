MerlinsBoard.Collections.Assignments = Backbone.Collection.extend({
  initialize: function (options) {
    if (options) {
      this.course = options["course"]; //optional ownership...
    }
  },
  
  model: MerlinsBoard.Models.Assignment,
  
  url: "api/assignments"
})