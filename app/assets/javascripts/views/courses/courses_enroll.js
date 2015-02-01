MerlinsBoard.Views.CoursesEnroll = Backbone.View.extend({
	initialize: function () {
		this.coursesearchView = new MerlinsBoard.Views.CoursesSearch({collection: this.collection}); //render will put these in manually
		this.usercoursesView = new MerlinsBoard.Views.CoursesList({collection: this.model.courses()});
		this.usertaughtcoursesView = new MerlinsBoard.Views.CoursesList({collection: this.model.taughtcourses()});
	},
	
  template: JST['courses/enroll'],
	
	render: function () {
    
		this.$el.html(this.template());
    
    this.$("section.courses-attended").html(this.usercoursesView.render().$el);
    this.$("section.courses-taught").html(this.usertaughtcoursesView.render().$el);
    this.$("section.course-search").html(this.coursesearchView.render().$el);
		
    //need to instantiate the views in the correct places in here
    //will refactor to composite view sometime later
    return this
  //maybe I'll need to bind this? I think backbone  does it for me
  // only when called by an internal callback function...
	},
																												
	show: function (event) {
		event.preventDefault();
    debugger
		var id = $(event.currentTarget).data("id");
		Backbone.history.navigate("course/" + id + "/enroll", {trigger:true})
	},
	
	events: {
		"click a": "show" //should be propogated from internal lists...
	}

});
