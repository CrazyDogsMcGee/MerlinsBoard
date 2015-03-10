MerlinsBoard.Views.CoursesTaught = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "change add remove", this.render);
  },
   
  render: function () {
    var renderedContent = this.template({courses: this.collection});
    this.$el.html(renderedContent);
    return this
  },
  
	template: JST["courses/course-taught"],
  
	tagName: "section",
  
	className: "course-taught"
})