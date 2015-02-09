MerlinsBoard.Models.Course = Backbone.Model.extend({
  urlRoot: "api/courses",
  
  //nested resources
  initialize: function () {
    this.announcements = new MerlinsBoard.Collections.Announcements({course: this})
    //assignments, announcements, resources
  },
  
  //internal data - the distinction is somewhat arbitrary
	instructors: function () {
		if (!this._instructors) {
			this._instructors = new MerlinsBoard.Collections.Users([],{course: this});
		}
		
		return this._instructors
	},
	
	students: function () {
		if (!this._students) {
			this._students = new MerlinsBoard.Collections.Users([],{course: this});
		}
		
		return this._students
	},
	
	enrollments: function () {
		if (!this._enrollments) {
			this._enrollments = new MerlinsBoard.Collections.CoursesStudents([],{course: this});
		}
		
		return this._enrollments
	},
	
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
});
