MerlinsBoard.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    //rootEl and navEls here
    this.$rootEl = options["rootEl"];
    this.$sideNav = options["sideNav"];
    this.$tabNav = options["tabNav"];
    
    var CurrentUser = MerlinsBoard.CurrentUser
    
    //this fetch may be a bit much
    //tabNav should also be instantiated here
  },
  
	routes: {
		//"" : "home", show announcements
    "" : "enrollcourses",
    "course/:id/enroll" : "showcourse",
    "course/new": "newcourse",
    "course/edit/:id": "editcourse",
    "course/:id" : "homecourse",
    "user/:id": "showuser"
	},
	
	enrollcourses: function () {
   var allcourses = MerlinsBoard.Courses;
   var CurrentUser = MerlinsBoard.CurrentUser
   
   CurrentUser.fetch();
   allcourses.fetch(); 
  
   var enrollView = new MerlinsBoard.Views.CoursesEnroll({collection: allcourses, model: CurrentUser});
   this.swapView(enrollView);
  //will need to jiggle the render function a bit...
  },
    
	showuser: function () {
    var userView = new MerlinsBoard.Views.UserShow({model: CurrentUser});
    this.swapView(userView);
  },
                                                   
	newcourse: function () {
    var newcourse = new MerlinsBoard.Models.Course();
    var courseform = new MerlinsBoard.Views.CourseForm({model: newcourse});
    this.swapView(courseform);
  },
  
	editcourse: function (id) {
    var course = MerlinsBoard.Courses.getOrFetch(id); //
    var courseform = new MerlinsBoard.Views.CourseForm({model: course});
    this.swapView(courseform);
  },
  
	showcourse: function (id) {
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var showCourse = new MerlinsBoard.Views.CoursesShow({model: course});
    this.swapView(showCourse);
  },
    
  homecourse: function (id) {
    //course detail nav should be instantiated here + announcements!
    var course = MerlinsBoard.Courses.getOrFetch(id);
    //no announcements view yet
  },
    
  //everything below this point is accessed in the detail view/direct navigation- nested routes
  
  
  // utils

  swapView: function (newView, navView) {
    if (!this._currentView) {
      this._currentView = newView;
      //this._currentNav = navView
    } else {
      this._currentView.remove();
      this._currentView = newView;
    }
    
    this.$rootEl.html(newView.render().$el);
  }
})