MerlinsBoard.Models.Grade = Backbone.Model.extend({
  urlRoot: 'api/grades',

  toJSON: function () { //called in Backbone.model.save
    var json = {grade: _.clone(this.attributes)}; //this refers to model

    if (this._submission) {
      json.grade.submission = this._submission;
    }

    return json;
  },

  getAttribute: function (attrString) {
    if (!this["_".concat(attrString)]) {
      this.["_".concat(attrString)] = new MerlinsBoard.Models[attrString]();
    }

    return this[attrString]
  },

  assignment: function () { //this is not good, how to combine this into a single reusable method?
    //for attributes use obj["name"]
    //can easily refactor all of this into a singular method that can set whatever object attributes on the fly

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
    this.course().set(response.course) //should refactor this to use myobj["name"]
    this.assignment().set(response.assignment)
    this.student().set(response.student)

    response.course.delete
    response.assignment.delete
    response.student.delete

    return response
  }
});

// For instance, the following will log "parse":
//
// var Model = Backbone.Model.extend({
//
//   parse: function(resp) {
//     console.log('parse');
//     return resp;
//   }
//
// });
//
// var Collection = Backbone.Collection.extend({model: Model});
// new Collection().reset([{id: 1}], {parse: true});
