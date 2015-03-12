MerlinsBoard.Collections.Users = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.course = options["course"]; 
		//Note: There is no reciprocal relationship of a course collection having a reference to a user ID- is that even needed?
	},
  
  model: MerlinsBoard.Models.User,
  
	url: "api/users",
  
  getOrFetch: function (id) {
    var user = this.get(id)
    var userCollection = this
  
    if (!user) {
      user = new MerlinsBoard.Models.User({id: id})
      user.fetch({success: function () {
        userCollection.add(user)
        } 
      })
    } else {
      user.fetch()
    }
    
    return user
  }
//for profile display
});
