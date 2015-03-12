MerlinsBoard.Models.Course = Backbone.Model.extend({
  urlRoot: "api/courses",
  
  //nested resources
  initialize: function () {
  },
  
  //internal data - the distinction is somewhat arbitrary
  announcements: function () {
    if (!this._announcements) {
      this._announcements = new MerlinsBoard.Collections.Announcements([],{owner:this});
    }
    
    return this._announcements
  },
  
  assignments: function () {
    if (!this._assignments) {
      this._assignments = new MerlinsBoard.Collections.Assignments([],{owner: this});
    }
    
    return this._assignments
  },
  
	instructors: function () {
		if (!this._instructors) {
			this._instructors = new MerlinsBoard.Collections.Users([],{owner: this});
		}
		
		return this._instructors
	},
	
	students: function () {
		if (!this._students) {
			this._students = new MerlinsBoard.Collections.Users([],{owner: this});
		}
		
		return this._students
	},
	
	enrollments: function () {
		if (!this._enrollments) {
			this._enrollments = new MerlinsBoard.Collections.CoursesStudents([],{owner: this});
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
    
    if (resp.announcements) {
      this.announcements().set(resp.announcements);
      resp.enrollments.delete;
    }
    
    if (resp.assignments) {
      this.assignments().set(resp.assignments);
      resp.assignments.delete;
    }
		//probably should iterate through this to reduce the space
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
