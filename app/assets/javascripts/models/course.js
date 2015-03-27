MerlinsBoard.Models.Course = Backbone.Model.extend({
  urlRoot: "api/courses",
  //nested resources
  initialize: function () {
  },
  
  getAttributeModel: function (attrString) { //limitation- user/instructors/enrollments, also should be careful about naming
    if (!this["_".concat(attrString)]) {
      this["_".concat(attrString)] = new MerlinsBoard.Collections[attrString]([],{owner: this});
    }

    return this[attrString]
  },

  //internal data - the distinction is somewhat arbitrary - wonder how I can refactor this...
  announcements: function () { //OK
    if (!this._announcements) {
      this._announcements = new MerlinsBoard.Collections.Announcements([],{owner:this});
    }

    return this._announcements
  },

  assignments: function () { //OK
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
  
  resources: function () { //OK
    if (!this._resources) {
      this._resources = new MerlinsBoard.Collections.Resources([],{owner: this});
    }
    
    return this._resources
  },

  parse: function (resp) {
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
    
    if (resp.resources) {
      this.resources().set(resp.resources);
      resp.resources.delete;
    }
		//probably should iterate through this to reduce the space
		return resp
	},

  isInstructor: function (userID) {
    return !!this.instructors().get(userID)
  }
})