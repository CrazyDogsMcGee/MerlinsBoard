MerlinsBoard.Models.Course = Backbone.Model.extend({
  urlRoot: "api/courses",

  //nested resources
  initialize: function () {
  },

  //internal data - the distinction is somewhat arbitrary - wonder how I can refactor this...
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
    //could refactor this to an array + an iterative function with "call"

		if (resp.instructors) {
			this.instructors().set(resp.instructors);
			resp.instructors.delete;
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
		// if (attrs.end_time < attrs.start_time) {
		// 	return "Class cannot end before it starts"
		// }
	},

  isInstructor: function (userID) {
    return !!this.instructors().get(userID)
  }
});
