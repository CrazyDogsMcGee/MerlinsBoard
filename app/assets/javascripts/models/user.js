MerlinsBoard.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",
  
  toJSON: function () { 
    var json = {grade: _.clone(this.attributes); //this refers to model
    
    if (this._avatar) {
      json.grade.avatar = this._avatar;
    }
    
    json.supplied_password = this.supplied_password
    
    return json;
  },
  
  courses: function () {
    if (!this._courses) {
      this._courses = new MerlinsBoard.Collections.Courses([],{owner: this});  
    }
    
    return this._courses
  },
  
  taughtcourses: function () {
    if (!this._taughtcourses) {
      this._taughtcourses = new MerlinsBoard.Collections.Courses([],{owner: this});
    }
    
    return this._taughtcourses
  },
  
  announcements: function () {
    if (!this._announcements) {
      this._announcements = new MerlinsBoard.Collections.Announcements([],{owner: this});
    }
    
    return this._announcements
  },
  //the above are populated by the jbuilder response - I should wonder if I need to pass a parent reference in, it may make sense...but let's bench that idea for now.
  parse: function (resp) {
    if (resp.courses) {
      this.courses().set(resp.courses);
      delete resp.courses;
    }
    
    if (resp.taughtcourses) {
      this.taughtcourses().set(resp.taughtcourses);
      delete resp.courses;
    }
    
    if (resp.announcements) {
      this.announcements().set(resp.announcements);
      delete resp.announcements
    }
    
    if (resp.assignments) {
      this.assignments().set(resp.assignments)
      delete resp.assignments
    }
    
    return resp
  }
});
