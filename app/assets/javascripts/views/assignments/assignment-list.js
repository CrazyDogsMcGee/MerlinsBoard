MerlinsBoard.Views.assignmentList = Backbone.View.extend({
  initialize: function () {
    this.course = this.collection.course 
    //this.listenTo(this.collection, "add remove reset", this.render);
    this.listenTo(this.course, "sync", this.render)
    //insert conditional for teacher access to new-assignments button
  },
  
  events: {
    "click button.form":"newAssignment"
  },
  
  tagName: "section",
  
  className: "assignments-list",
  
  template: JST["assignments/assignment-list"],
  
  render: function () {
    var isInstructor = this.course.isInstructor(MerlinsBoard.CurrentUser.id);
    var renderedContent = this.template({assignments: this.collection, isInstructor: isInstructor});
    this.$el.html(renderedContent);
    return this
  },
    
  newAssignment: function () {
    Backbone.history.navigate("course/"+this.course.id+"/assignments/new", {trigger: true});
  }
  
})