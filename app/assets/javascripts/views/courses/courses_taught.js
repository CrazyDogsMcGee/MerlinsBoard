MerlinsBoard.Views.CoursesTaught = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "change add remove", this.render);
  },
  
  template: JST["courses/course-taught"],
	tagName: "section",
	className: "course-taught",
  
  events: {
    "click button":"editCourse"
//     "click a":"goToCourse"
  },
   
  render: function () {
    var renderedContent = this.template({courses: this.collection});
    this.$el.html(renderedContent);
    return this
  },

  editCourse: function (event) {
    var course_id = $(event.currentTarget).data("id");
    Backbone.history.navigate("course/"+course_id+"/edit",{trigger:true});
  }
  
})