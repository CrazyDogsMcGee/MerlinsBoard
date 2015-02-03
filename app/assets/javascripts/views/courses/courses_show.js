MerlinsBoard.Views.CoursesShow = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render)
    this.user_id = MerlinsBoard.CurrentUser.id
    this.course_id = this.model.id
	},
	
	template: JST['courses/show'],
	
	render: function () {
		this.$el.html(this.template({course: this.model, userID: this.user_id}));
		return this
	},
		
	events: {
		"submit .dropcourse": "dropcourse",
    "submit .enrollcourse": "enrollcourse",
    "submit .cancelcourse": "cancelcourse"
	},
	
//assume everything's fetched already...
//need error handling to render as well
	enrollcourse: function (event) {
		event.preventDefault();
    var enrollment = new MerlinsBoard.Models.CoursesStudent();
    enrollment.save({user_id: this.user_id, course_id: this.course_id},
    {success: function () {
        MerlinsBoard.CurrentUser.courses.add(this.model)
        this.model.enrollments.add
        this.render();
      }.bind(this),
      error: function (resp) {
        this.$("section.errors").html(resp)
      }.bind(this)
    })
	},

	dropcourse: function (event) {
    
		event.preventDefault();
    
    var enrollment = this.model.enrollments.findWhere({user_id: this.user_id, course_id: this.course_id});
    enrollment.destroy({
      success: function () {
        MerlinsBoard.CurrentUser.courses.remove(this.model)
        this.render();
      }.bind(this)
    });

	},

	cancelcourse: function (event) {
    
		event.preventDefault();
		this.model.destroy({
      success: function () {
        Backbone.history.navigate("course/search", {trigger: true});
      },
      error: function (errors) {
        console.log(errors);
      }
    });
		
	}
});