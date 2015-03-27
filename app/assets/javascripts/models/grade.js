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
    
    // var expected = [x,y,z]
    //
    // _.each(expected, function (attr) {
    //    if (response[attr]) {
    //      this.getattrmodel
    //    }
    // })
    
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
  }
  
//     save : function(key, value, options) {

//         var attributes={}, opts={};

//         //Need to use the same conditional that Backbone is using
//         //in its default save so that attributes and options
//         //are properly passed on to the prototype
//         if (_.isObject(key) || key == null) {
//             attributes = key;
//             opts = value;
//         } else {
//             attributes = {};
//             attributes[key] = value;
//             opts = options;
//         }

//         //Since backbone will post all the fields at once, we
//         //need a way to post only the fields we want. So we can do this
//         //by passing in a JSON in the "key" position of the args. This will
//         //be assigned to opts.data. Backbone.sync will evaluate options.data
//         //and if it exists will use it instead of the entire JSON.
//         if (opts && attributes) {
//             opts.data = JSON.stringify(attributes);
//             opts.contentType = "application/json";
//         }

//         //Finally, make a call to the default save now that we've
//         //got all the details worked out.
//         return Backbone.Model.prototype.save.call(this, attributes, opts);
//     }
});