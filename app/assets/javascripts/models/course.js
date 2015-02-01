MerlinsBoard.Models.Course = Backbone.Model.extend({
	instructors: function () {
		if (!this._instructors) {
			this._instructors = new MerlinsBoard.Collections.Users([],{course: this});
		}
		
		return this._instructors
	},
	
	students: function () {
		if (!this._students) {
			this._students = new MerlinsBoard.Collections.Students([],{course: this});
		}
		
		return this._students
	},
	
	enrollments: function () {
		if (!this._enrollments) {
			this._enrollments = new MerlinsBoard.Collections.CoursesStudents([],{course: this});
		}
		
		return this._enrollments
	},
	
  urlRoot: "api/courses",
	
	parse: function (resp) {
		if (resp.instructors) {
			this.instructors().set(resp.instructors);
			resp.instructors.delete
			//the jbuilder file I made made would yield incomplete data..but lets go ahead and see what happens
		}
		
		if (resp.students) {
			this.students().set(resp.students);
			resp.students.delete	
		}
		
		if (resp.enrollments) {
			this.enrollments().set(resp.enrollments);
			resp.enrollments.delete
		}
		
		
		return resp
	},
	
  validate: function (attrs) {
		if (attrs.end_time < attrs.start_time) {
			return "Class cannot end before it starts"
		} 
	}
	
	//https://github.com/thedersen/backbone.validation
});
