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
  
  // To make things consistent, I should consider removing the below properties and hardcoding the links directly into the tabs, and moving the Vent triggers to the router
   
	events: {
		"click .course-tab":"showcourse"
	},
  
  showcourse: function (event) {
    event.preventDefault()
    var course_id = $(event.currentTarget).data("id");
    
    Backbone.history.navigate("course/" + course_id +"/announcements", {trigger: true});
    MerlinsBoard.Vent.trigger("courseRender",{courseID: course_id});
  }
})