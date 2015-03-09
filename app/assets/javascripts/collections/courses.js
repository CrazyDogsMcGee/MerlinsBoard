MerlinsBoard.Collections.Courses = Backbone.Collection.extend({
//   initialize: function (options) {
//     this.user = options["user"] || "none";
//   },
  
  model: MerlinsBoard.Models.Course,
  
	url: "api/courses",
  
	getOrFetch: function (id) {
		course = this.get(id);
		if (!course) {
			course = new MerlinsBoard.Models.Course({id: parseInt(id)});
			course.fetch({ success: function () {
				this.add(course);
				}.bind(this) //needs to be bound because it's a callback. Otherwise refers to course itself?
			});
		} else {
			course.fetch();						 
		}
	  
		return course
	}
  
	//this fetch takes ALL attributes in the model, but will not offer any extensibles like could be offered with jbuilder
	//provided for by @courses/Course.all toJson
});
