MerlinsBoard.Collections.Assignments = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.owner = options["owner"];
  },
  
  model: MerlinsBoard.Models.Assignment,
  
  url: "api/assignments"
})