MerlinsBoard.Models.CoursesStudent = Backbone.Model.extend({
	urlRoot: "api/coursesstudents",
  
	validate: function (attrs) {
		//course conflicts are better suited to server-side validatons
		// might just want to use gem for attr presence
	}
  
  
});
