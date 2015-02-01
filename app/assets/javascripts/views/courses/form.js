MerlinsBoard.Views.CourseForm = Backbone.View.extend({
	template: JST["courses/form"],
	
	tagName: "form",
	
	className: "course-form",
	
	render: function () {
		var renderedContent = this.template({course: this.model})
	},
	
	events: {
		"submit form.course-form":"submit"
	},
	
	submit: function (event) {
		event.preventDefault();
		var attrs = event.target.serializeJSON();
		this.model.set(attrs);
		this.model.save({
			success: function () {
				MerlinsBoard.Courses.add(this.model)
				Backbone.history.navigate("",{trigger: true})
			},
			error: function (resp) {
				console.log(resp);
			}
		})
	}
})