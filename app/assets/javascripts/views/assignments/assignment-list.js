MerlinsBoard.Views.assignmentList = Backbone.View.extend({
  initialize: function () {
    this.course = this.collection.owner;
    this.listenTo(this.course, "sync", this.render);
  },
  
  events: {
    "click button.assignment-new-button" : "newAssignment",
    "click button.assignment-edit" : "editAssignment",
    "click button.assignment-destroy" : "destroyAssignment"
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
  },
  
  editAssignment: function (event) {
    var assignmentID = $(event.currentTarget).data('id');
    var assignment = this.collection.getOrFetch(assignmentID);
    var editUrl = '#course/'+assignment.get('course_id')+'/assignments/' + assignment.id + '/edit';
    Backbone.history.navigate(editUrl,{trigger: true});
  },
  
  destroyAssignment: function (event) {
    var assignmentID = $(event.currentTarget).data('id');
    var assignment = this.collection.getOrFetch(assignmentID);
    
    assignment.destroy({success: function () {
      this.render();
    }.bind(this),
    data: $.param({assignment: {course_id: this.course.id}})
    })
  }
  
})