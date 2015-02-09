MerlinsBoard.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    //rootEl and navEls here
    this.$rootEl = options["rootEl"];
    this.$sideNav = options["sideNav"];
    this.$tabNav = options["tabNav"];
    
    this.CurrentUser = MerlinsBoard.CurrentUser
    
    //this fetch may be a bit much
    //tabNav should also be instantiated here
  },
  
	routes: {
    "" : "enrollcourses",
    "course/:id/enroll" : "showcourse",
    "course/new": "newcourse",
    "course/edit/:id": "editcourse",
    //announcement resources
    //"" : "home", should show announcement for all course + navView
    "course/:id/announcements/new": "newAnnouncement",
    "course/:id/announcements" : "homecourse", //shows announcements for course + navView
    
    //assignment resources
    "user/:id": "showuser"
	},
	
	enrollcourses: function () {
   var allcourses = MerlinsBoard.Courses;
   
   this.CurrentUser.fetch();
   allcourses.fetch(); 
  
   var enrollView = new MerlinsBoard.Views.CoursesEnroll({collection: allcourses, model: this.CurrentUser});
   this.swapView(enrollView);
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
    
  //announcements
  homecourse: function (id) {
    //course detail nav should be instantiated here + announcements!
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var announcements = course.announcements
    
    course.fetch()
    announcements.fetch()

    var courseAnnouncements = new MerlinsBoard.Views.announcementList({collection: announcements});
    this.swapView(courseAnnouncements);
  },
  
  newAnnouncement: function (id) {
    var newAnnouncement = new MerlinsBoard.Models.Announcement();
    var announcementForm = new MerlinsBoard.Views.announcementForm({model: newAnnouncement, course_id: id});
    this.swapView(announcementForm);
  },
  
  editAnnouncement: function (id) {},
  
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