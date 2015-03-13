MerlinsBoard.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options["rootEl"];
    this.$sideNav = options["sideNav"];
    this.$tabNav = options["tabNav"];
    this.currentUser = MerlinsBoard.CurrentUser
    
    var courseTabs = new MerlinsBoard.Views.CourseTabs({collection: this.currentUser.courses()})
    var courseDetails = new MerlinsBoard.Views.CourseDetails();
    
    this.currentUser.fetch();
    
    this.$tabNav.html(courseTabs.$el)
    this.$sideNav.html(courseDetails.$el)
  },
  
	routes: {
    "course/search" : "enrollcourses",
    "course/:id/enroll" : "showcourse",
    "course/new": "newcourse",
    "course/:id/edit": "editcourse",
    "course/taught": "taughtcourses",
    //announcement resources
    "" : "homeAnnouncements",
    "course/:id/announcements/new": "newAnnouncement",
    "course/:course_id/announcements/:id/edit":"editAnnouncement",
    "course/:id/announcements" : "courseAnnouncements", //shows announcements for course + navView
    //assignment resources
    "course/:id/assignments/new" : "newAssignment",
    "course/:id/assignments" : "showAssignments",
    "course/:course_id/assignments/:id/edit" : "editAssignment",
    //grades
    
    //misc
    "user/:id": "showuser"
    //":wildcard": "does not exist" --self explanatory
	},
	
	enrollcourses: function () {
    var allcourses = new MerlinsBoard.Collections.Courses([],{owner: this.currentUser});
   
    allcourses.fetch(); 
  
    var enrollView = new MerlinsBoard.Views.CoursesEnroll({collection: allcourses, model: this.currentUser});
    this.swapView(enrollView);
  },
    
	showuser: function () {
    var userView = new MerlinsBoard.Views.UserShow({model: this.currentUser});
    this.swapView(userView);
  },
                                                   
	newcourse: function () {
    var newcourse = new MerlinsBoard.Models.Course();
    var courseform = new MerlinsBoard.Views.CourseForm({model: newcourse});
    this.swapView(courseform);
  },
  
	editcourse: function (id) {
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var courseform = new MerlinsBoard.Views.CourseForm({model: course});
    this.swapView(courseform);
  },
  
	showcourse: function (id) {
    var course = MerlinsBoard.Courses.getOrFetch(id); //here
    var showCourse = new MerlinsBoard.Views.CoursesShow({model: course});
    this.swapView(showCourse);
  },
  
  taughtcourses: function () {
    var taughtCourses = this.currentUser.taughtcourses();
    var taughtCourseView = new MerlinsBoard.Views.CoursesTaught({collection: taughtCourses});
    this.swapView(taughtCourseView);
  },
    
  //announcements
  homeAnnouncements: function () {
    this.currentUser.fetch()
    
    var allAnnouncements = this.currentUser.announcements();
    var allAnnouncementsView = new MerlinsBoard.Views.announcementHome({collection: allAnnouncements});
    this.swapView(allAnnouncementsView)
    
    MerlinsBoard.Vent.trigger("homeRender");
  },
  
  courseAnnouncements: function (id) {
    //course detail nav should be instantiated here + announcements!
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var announcements = course.announcements();
    
    course.fetch();
    
    var courseAnnouncements = new MerlinsBoard.Views.announcementList({collection: announcements});
    this.swapView(courseAnnouncements);
  },
  
  newAnnouncement: function (id) {
    var newAnnouncement = new MerlinsBoard.Models.Announcement();
    var announcementForm = new MerlinsBoard.Views.announcementForm({model: newAnnouncement, course_id: id});
    this.swapView(announcementForm);
  },
  
  editAnnouncement: function (course_id,id) {
    var course = MerlinsBoard.Courses.getOrFetch(course_id);
    var announcement = course.announcements().get(id)
    var announcementForm = new MerlinsBoard.Views.announcementForm({model: announcement});
    this.swapView(announcementForm);
  },
  
  //assignments
  
  showAssignments: function (id) {
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var assignments = course.assignments();
    
    course.fetch();

    var courseAssignments = new MerlinsBoard.Views.assignmentList({collection: assignments});
    this.swapView(courseAssignments);
  },
  
  newAssignment: function (id) {
    var newAssignment = new MerlinsBoard.Models.Assignment();
    var assignmentForm = new MerlinsBoard.Views.assignentForm({model: newAssignment, course_id: id});
    this.swapView(assignmentForm);
  },
  
  editAssignment: function (course_id,id) {
    var course = MerlinsBoard.Courses.getOrFetch(course_id)
    var assignment = course.assignments().get(id);
  },
  
  // utils
  resourceNotFound: function () {
    //this.swapView();
  },

  swapView: function (newView, navView) {
    if (!this._currentView) {
      this._currentView = newView;
    } else {
      this._currentView.remove();
      this._currentView = newView;
    }
    
    this.$rootEl.html(newView.render().$el);
  }
})

//var course = new MerlinsBoard.Models.Course({id: course_id})
//course.fetch()
//