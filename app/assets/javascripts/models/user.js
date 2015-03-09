MerlinsBoard.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",
  
  courses: function () {
    if (!this._courses) {
      this._courses = new MerlinsBoard.Collections.Courses();  
    }
    
    return this._courses
  },
  
  taughtcourses: function () {
    if (!this._taughtcourses) {
      this._taughtcourses = new MerlinsBoard.Collections.Courses();
    }
    
    return this._taughtcourses
  },
  //the above two are populated by the jbuilder response
  parse: function (resp) {
    if (resp.courses) {
      this.courses().set(resp.courses);
      delete resp.courses;
    }
    
    if (resp.taughtcourses) {
      this.taughtcourses().set(resp.taughtcourses);
      delete resp.courses;
    }
    
    return resp
  },
  
  courseIDs: function () {
    var courseIDArray = []
    _.each(this.courses, function (course) {
      courseIDArray.push(course.id);
    });
    return courseIDArray
  },
  
  taughtCourseIDs: function () {
    var taughtCourseIDArray = []
  }
});
