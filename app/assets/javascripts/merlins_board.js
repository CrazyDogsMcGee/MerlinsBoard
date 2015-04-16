window.MerlinsBoard = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Vent: _.extend({}, Backbone.Events),
  initialize: function() {
		MerlinsBoard.Courses = new MerlinsBoard.Collections.Courses([],{owner: MerlinsBoard}); //global course collection to fetch resources from
		MerlinsBoard.CurrentUser = new MerlinsBoard.Models.User({id: window.currentUserID}); //global user object to base perimissions off of
		new MerlinsBoard.Routers.Router({
     rootEl: $("main#content"),
     sideNav: $("nav.side-nav"),
     tabNav: $("nav.header-nav")
    }); //Gets all elements with jquery to render appropriate navigation views and content
		Backbone.history.start();
  }
};
