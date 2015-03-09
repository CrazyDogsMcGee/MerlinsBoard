MerlinsBoard.Collections.Assignments = Backbone.Collection.extend({
  initialize: function (options) {
    if (options) {
      this.course = options["course"];
      this.on("sync",this.filter, this)
    }
  },
  
  filter: function () {
    this.models = this.models.filter(function (assignment) {
      return (assignment.get("course_id") == this.course.id); //what is "this" in this context? Whatever it is, it's not the view object. It is the window, which makes it strange that this worked at all before
    },this)
    
    this.trigger("filter");
  },
  
  model: MerlinsBoard.Models.Assignment,
  
  url: "api/assignments"
})