MerlinsBoard.Models.Grade = Backbone.Model.extend({
  urlRoot: 'api/grades',

  toJSON: function () { //called in Backbone.model.save
    var json = {grade: _.clone({id: this.get('id'), score: this.get('score')})}; //this refers to model
    
    if (this._submission) {
      json.grade.submission = this._submission;
    }
    
    json.course_id = this.course().id
    json.user_id = this.student().id
    
    return json;
  },

  assignment: function () {
    if (!this._assignment) {
      this._assignment = new MerlinsBoard.Models.Assignment();
    }

    return this._assignment
  },

  course: function () {
    if (!this._course) {
      this._course = new MerlinsBoard.Models.Course();
    }

    return this._course
  },

  student: function () {
    if (!this._student) {
      this._student = new MerlinsBoard.Models.User();
    }

    return this._student
  },

  parse: function (response) {
    if (response === null) {return}
    
    if (response.course) {
      this.course().set(response.course);
      response.course.delete
    }
    
    if (response.assignment) {
      this.assignment().set(response.assignment);
      response.assignment.delete
    }
    
    if (response.student) {
      this.student().set(response.student);
      response.student.delete
    }

    return response
  },
  
  fetch: function(options) {
    if (!options) {
      options = {};
    }
    
    _.extend(options,{
      data: $.param({
        course_id: this.course().id,
        user_id: this.student().id
      })
    });
    
    return Backbone.Model.prototype.fetch.call(this, options);
  }

});