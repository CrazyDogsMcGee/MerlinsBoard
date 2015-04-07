MerlinsBoard.Models.Course = Backbone.Model.extend({
  urlRoot: "api/courses",
  //nested resources
  initialize: function () {
  },

  getOrSetAttributeCollection: function (attrString, collection) { //limitation- user/instructors/enrollments, also should be careful about naming
    if (!this["_".concat(attrString)] && collection) {
      this["_".concat(attrString)] = new MerlinsBoard.Collections[collection]([],{owner: this}); //if it doesn't exist, set it
    } else if (this["_".concat(attrString)] && collection) {
      this["_".concat(attrString)] = new MerlinsBoard.Collections[collection]([],{owner: this}); //if it exists, reset it to the new collection
    }

    return this["_".concat(attrString)] //only allows collection to be set once...
  },

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

  professorships: function () {
    if (!this._professorships) {
      this._professorships = new MerlinsBoard.Collections.CoursesInstructors([],{owner: this});
    }

    return this._professorships
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

    if (resp.professorships) {
      this.professorships().set(resp.professorships);
      resp.professorships.delete;
    }
		//probably should iterate through this to reduce the space
		return resp
	},

  isInstructor: function (userID) {
    return !!this.instructors().get(userID)
  }
})
