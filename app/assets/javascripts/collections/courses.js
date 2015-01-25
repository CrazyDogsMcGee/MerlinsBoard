MerlinsBoard.Collections.Courses = Backbone.Collection.extend({
  model: MerlinsBoard.Models.Course,
	url: "api/courses",
	getOrFetch: function (id) {
		course = this.get(id);
		if (!course) {
			course = new MerlinsBoard.Models.Course({id: id});
			course.fetch({ success: function () {
				this.add(course);
				}.bind(this) //needs to be bound because it's a callback. Otherwise refers to course itself?
			});
		} else {
			course.fetch();						 
		}
		
		return course
	}
	
});
