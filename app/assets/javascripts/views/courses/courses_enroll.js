MerlinsBoard.Views.CoursesEnroll = Backbone.View.extend({
	initialize: function () {
		this.coursesearchView = new MerlinsBoard.Views.CoursesSearch();
		this.usercoursesView = new MerlinsBoard.Views.CoursesList({collection: this.model.courses()});
		this.usertaughtcoursesView = new MerlinsBoard.Views.CoursesList({collection: this.model.taughtcourses()});
	},

  template: JST['courses/enroll'],
  
  events: {
    "click .course-new":"newCourse"
  }
  

	render: function () {
		this.$el.html(this.template());

    this.$("section.courses-attended").html(this.usercoursesView.render().$el);
    this.$("section.courses-taught").html(this.usertaughtcoursesView.render().$el);
    this.$("section.course-search").html(this.coursesearchView.render().$el);

    return this
	},
  
  newCourse: function () {
    Backbone.history.navigate("course/new",{trigger: true})
  }
}

});
