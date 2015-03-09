MerlinsBoard.Views.CourseForm = Backbone.View.extend({
  initialize: function () {
    
    this.listenTo(this.model,"sync",this.render)
  },
  
	template: JST["courses/form"],
	
	render: function () {
		var renderedContent = this.template({course: this.model})
    this.$el.html(renderedContent);
    return this
	},
	
	events: {
		"submit form.course-form": "submitform"
	},
	
	submitform: function (event) {
		event.preventDefault();
		var attrs = $(event.target).serializeJSON();
		this.model.save(attrs, {
			success: function () {
				MerlinsBoard.Courses.add(this.model)
				Backbone.history.navigate("",{trigger: true}) //instead do a "course created/saved"
			}.bind(this),
			error: function (model,resp) {
				var errorArray = resp.responseJSON;
        var $errorList = $("<ul>");
        
        _.each(errorArray, function (error) {
          var $error = $("<li>").text(error);
          $errorList.append($error);
        })
        
        $("section.form-errors").html($errorList);
			}
		})
	}
})