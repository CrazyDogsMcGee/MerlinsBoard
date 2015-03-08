 MerlinsBoard.Views.CourseTabs = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "change add remove", this.render);
  },
   
  render: function () {
    var renderedContent = this.template({courses: this.collection});
    this.$el.html(renderedContent);
    return this
  },
  
	template: JST["navigation/coursetabs"],
  
	tagName: "nav",
  
	className: "nav-coursetabs",
  
	events: {
		"click .course-tab":"showcourse"
    //How to get back to home?
	},
  
  showcourse: function (event) {
    //change view in primary - show I have a permanent listener?
    //Or perhaps just a router change
    event.preventDefault()
    var course_id = event.currentTarget.data("id");
    Backbone.history.navigate("course/" + course_id +"/announcements", {trigger: true});
    MerlinsBoard.Vent.trigger("courseRender",{renderCourse:true ,courseID:course_id})
  }
})