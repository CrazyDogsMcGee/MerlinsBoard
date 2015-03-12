MerlinsBoard.Collections.Assignments = Backbone.Collection.extend({
  initialize: function (models, options) {
    if (options["course"]) {
      this.course = options["course"];
    }
  },
  
  model: MerlinsBoard.Models.Assignment,
  
  url: "api/assignments"
})