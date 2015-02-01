MerlinsBoard.Collections.CoursesStudents = Backbone.Collection.extend({
  model: MerlinsBoard.Models.CoursesStudent,
  
	url: "api/coursesstudents",
  
	initialize: function () {
		this.course = options["course"];
	}
});
