MerlinsBoard.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",
  
  toJSON: function () { 
    var json = {user: _.clone(this.attributes)}; 
    //is this bad practice to leave the extra params on here even if they'll be filtered?
    
    if (this._avatar) {
      json.user.avatar = this._avatar;
    }
    
    json.supplied_password = this.get("supplied_password");
    
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
      delete resp.taughtcourses;
    }
    
    if (resp.announcements) {
      this.announcements().set(resp.announcements);
      delete resp.announcements
    }
    
    if (resp.assignments) {
      this.assignments().set(resp.assignments)
      delete resp.assignments
    }
    debugger
    return resp
  }
});
