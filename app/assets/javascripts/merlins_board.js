window.MerlinsBoard = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert('Api initialization good');
		//make router and set rootel to $('#content')
  }
};

// $(document).ready(function(){
//   MerlinsBoard.initialize(); is $(app.initialize) a shortcut for that? YES, EXACTLY.
// });

//do I even need this here? No, should just call initialize from root el, it automatically knows I reference the window