MerlinsBoard.Models.CoursesStudent = Backbone.Model.extend({
	urlRoot: "api/coursesstudents",
	validate: function (attrs) {
		course = MerlinsBoard.Courses.getorFetch(attrs.course_id)
		if course.students
	}
});
