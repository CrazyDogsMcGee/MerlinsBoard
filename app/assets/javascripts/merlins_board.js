window.MerlinsBoard = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Vent: _.extend({}, Backbone.Events),
  initialize: function() {
    alert('Application loaded');
		MerlinsBoard.Courses = new MerlinsBoard.Collections.Courses([],{owner: MerlinsBoard});
		MerlinsBoard.CurrentUser = new MerlinsBoard.Models.User({id: window.currentUserID});
		new MerlinsBoard.Routers.Router({
     rootEl: $("main#content"),
     sideNav: $("nav.side-nav"),
     tabNav: $("nav.header-nav")
    });
		Backbone.history.start();
  }
};
