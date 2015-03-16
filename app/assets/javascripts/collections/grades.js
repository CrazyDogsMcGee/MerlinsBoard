MerlinsBoard.Collections.Grades = Backbone.Collection.extend({
  initialize (options) {
    this.owner = options["owner"];
  },
  
  model: MerlinsBoard.Models.Grade,
  
  url: 'api/grades',
  
  getOrFetch: function (id) {
    var grade = this.get(id);
    var grades = this;
    
    if (!grade) {
      grade = new MerlinsBoard.Models.Grade({id: id});
      grade.fetch({ success: function () {
        this.add(grade);
      }  
      })
    } else {
      grade.fetch();
    }
    
    return grade
  }
  
  
})