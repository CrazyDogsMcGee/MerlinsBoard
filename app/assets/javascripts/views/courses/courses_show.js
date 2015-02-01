MerlinsBoard.Views.CoursesShow = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render)
    var user_id = MerlinsBoard.CurrentUser.id
    var course_id = this.model.id
	},
	
	template: JST['courses/show'],
	
	render: function () {
		this.$el.html(template({course: this.model}));
		return this
	},
		
	events: {
		//need different handlers for all three button
	},
	
//assume everything's fetched already...
//need error handling to render as well
	enrollcourse: function (event) {
		event.preventDefault();
    var enrollment = new MerlinsBoard.Models.CoursesStudent();
    enrollment.save({user_id: user_id, course_id: course_id },
    {success: function () {
        MerlinsBoard.CurrentUser.courses.add(this.model)
        this.model.enrollments.add
        this.render();
      }.bind(this),
      error: function (resp) {
        this.$("section.errors").html(resp)
      }.bind(this)
     //maybe use bindAll?
    })
	},

	dropcourse: function (event) {
    
		event.preventDefault();
    
    var enrollment = this.model.enrollments.findWhere({user_id: user_id, course_id: course_id});
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