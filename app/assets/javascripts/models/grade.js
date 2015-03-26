MerlinsBoard.Models.Grade = Backbone.Model.extend({
  urlRoot: 'api/grades',
  validate: function () {},
  
  toJSON: function () { //called in Backbone.model.save
    var json = {grade: _.clone(this.attributes)}; //this refers to model
    
    if (this._submission) {
      json.grade.submission = this._submission;
    }
    
    return json;
  }
})
