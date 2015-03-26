MerlinsBoard.Collections.Grades = Backbone.Collection.extend({
  initialize: function (options) {
    // this.owner = options["owner"];
    this.course_id = options["course_id"]
    this.url = "api/users/" + options["user_id"] + "/grades"
  },

  //comparator: function () {},

  model: MerlinsBoard.Models.Grade,

  getOrFetch: function (id) {
    var grade = this.get(id);
    var grades = this;
    var courseData = {data: $.param({"course_id": this.course_id})}

    if (!grade) {
      grade = new MerlinsBoard.Models.Grade({id: id});
      grade.fetch({ success: function () {
        this.add(grade);
      },
      data: $.param({"course_id": this.course_id})
      })
    } else {
      grade.fetch(courseData);
    }

    return grade
  },

  fetch: function(options) {
    if (!options) {
      options = {};
    }

    _.extend(options,{ data: $.param({ course_id: this.course_id}) });
    return Backbone.Collection.prototype.fetch.call(this, options);
  },

  student: function () {
    if (!this._student) {
      this._student = new MerlinsBoard.Models.User();
    }

    return this._student
  },

  parse: function (resp) {
    this.student().set({fname: resp.student_fname,lname: resp.student_lname});

    resp.student_fname.delete
    resp.student_fname.delete
    resp.course_id.delete

    return resp.grades
  },

  gpa: function () {
    var average
    
    this.models.each(function (grade) {
      
    })
  }

})
