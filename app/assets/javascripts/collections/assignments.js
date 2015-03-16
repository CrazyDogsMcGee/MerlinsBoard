MerlinsBoard.Collections.Assignments = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.owner = options["owner"];
  },
  
  model: MerlinsBoard.Models.Assignment,
  
  url: "api/assignments",
  
  getOrFetch: function (id) {
    var assignment = this.get(id);
    
    if (!assignment) {
      assignment = new MerlinsBoard.Models.Assignment({id:id});
      var collection = this
      
      assignment.fetch({success: function () {
        collection.add(assignment)
      }
      })
    } else {
      assignment.fetch();
    }
    
    return assignment
  }
})