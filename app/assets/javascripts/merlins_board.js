window.MerlinsBoard = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert('Api initialization good');
		//make router and set rootel to $('#content')
		MerlinsBoard.Courses = new MerlinsBoard.Collections.Courses()
		MerlinsBoard.CurrentUser = new MerlinsBoard.Models.User({id: window.currentUserID})
		
		//Will have to fetch for both of these when appropriate. I think I can have two paralell fetch/success events, just be sure to separate the logic
  }
};

// $(document).ready(function(){
//   MerlinsBoard.initialize(); is $(app.initialize) a shortcut for that? YES, EXACTLY.
// });

//do I even need this here? No, should just call initialize from the root html, it automatically knows I reference the window