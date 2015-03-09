MerlinsBoard.Models.Course = Backbone.Model.extend({
  urlRoot: "api/courses",
  
  //nested resources
  initialize: function () {
    this.announcements = new MerlinsBoard.Collections.Announcements({course: this}),
    this.assignments = new MerlinsBoard.Collections.Assignments({course: this})
    //assignments, announcements, resources
    //One question, is this bad practice? The difference I can guess is that the above attrs need to be fetched every single time. I'll refactor later
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
			resp.instructors.delete;
			//the jbuilder file I made made would yield incomplete data..but lets go ahead and see what happens
		}
		
		if (resp.students) {
			this.students().set(resp.students);
			resp.students.delete;
		}
		
		if (resp.enrollments) {
			this.enrollments().set(resp.enrollments);
			resp.enrollments.delete;
		}
		
		
		return resp
	},
	
  validate: function (attrs) {
		if (attrs.end_time < attrs.start_time) {
			return "Class cannot end before it starts"
		} 
	},
  
  isInstructor: function (userID) {
    return !!this.instructors().get(userID)
  }
});

//for some reason, the id on the course object returns as a string...This may be because I construct these course objects with the attributes fished from the jbuilder response
