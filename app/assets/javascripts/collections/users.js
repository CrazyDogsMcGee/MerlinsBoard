MerlinsBoard.Collections.Users = Backbone.Collection.extend({
	initialize: function () {
		this.course = options["course"]; 
		//I might want other ownerships eventually, depending on how I instantiate the collection.
	},
  
  model: MerlinsBoard.Models.User,
	url: "api/users"
	//may eventually need getOrFetch here for profiles
});
