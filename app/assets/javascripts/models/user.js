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
  }
});
