MerlinsBoard.Collections.CoursesStudents = Backbone.Collection.extend({
  initialize: function (models,options) {
    this.owner = options["owner"];
  },
  
  model: MerlinsBoard.Models.CoursesInstructor,
  
	url: "api/coursesinstructors",
  
	initialize: function (options) {
		this.course = options["course"];
	}
});
