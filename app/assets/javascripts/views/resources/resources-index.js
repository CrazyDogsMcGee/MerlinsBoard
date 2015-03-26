MerlinsBoard.Views.resourceList = Backbone.View.extend({
  initialize: function () {
    this.course = this.collection.owner;
    this.listenTo(this.course,"sync",this.render);
  },
  
  events: {
    "click button.resource-new":"newResource",
    "click button.resource-edit":"editResource",
    "click button.resource-destroy":"destroyResource"
  },

  template: JST['resources/resource-index'],
  
  render: function () {
    var isInstructor = this.course.isInstructor(MerlinsBoard.CurrentUser.id);
    var renderedContent = this.template({resources: this.collection, isInstructor: isInstructor});
    this.$el.html(renderedContent);
    return this
  },
  
  newResource: function (event) {
    Backbone.history.navigate("#course/"+this.course.id+"/resources/new",{trigger: true})
  },
    
  editResource: function (event) {
    var resourceID = $(event.currentTarget).data('id');
    
    Backbone.history.navigate("#course/"+this.course.id+"/resources/"+resourceID+"/edit",{trigger: true})
  },
    
  destroyResource: function (event) {
    var resourceID = $(event.currentTarget).data('id');
    var resource = this.collection.getOrFetch(resourceID);
    
    resource.destroy({
      success: this.render.bind(this),
      data: $.param({resource: {course_id: this.course.id}})
    })
  }

})