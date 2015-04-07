MerlinsBoard.Collections.CoursesStudents = Backbone.Collection.extend({
  initialize: function (models,options) {
    this.owner = options["owner"];
  },

  model: MerlinsBoard.Models.CoursesStudent,

	url: "api/coursesstudents"
});
