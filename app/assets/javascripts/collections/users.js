MerlinsBoard.Collections.Users = Backbone.Collection.extend({
	initialize: function (options) {
		this.course = options["course"]; 
		//Note: There is no reciprocal relationship of a course collection having a reference to a user ID- is that even needed?
	},
  
  model: MerlinsBoard.Models.User,
  
	url: "api/users"
	//may eventually need getOrFetch here for profiles
});
