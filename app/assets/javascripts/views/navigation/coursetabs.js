MerlinsBoard.Views.CourseTabs = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render)  
  },
  
	template: JST["navigation/coursetabs"],
  
	tagName: "nav",
  
	className: "nav-coursetabs",
  
	events: {
		"click .tab":"showcourse"
	},
  
  showcourse: function (event) {
    //change view in primary - show I have a permanent listener?
    //Or perhaps just a router change
    var course_id = event.currentTarget.data("id");
    Backbone.history.navigate("course/show" + course_id, {trigger: true})
  }
})