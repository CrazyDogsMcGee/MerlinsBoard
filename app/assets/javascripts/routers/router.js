MerlinsBoard.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    //rootEl and navEls here
    this.$rootEl = options["rootEl"];
    this.$sideNav = options["sideNav"];
    this.$tabNav = options["tabNav"];
    
    this.currentUser = MerlinsBoard.CurrentUser
    
    //this fetch may be a bit much
    var courseTabs = new MerlinsBoard.Views.CourseTabs({collection: this.currentUser.courses()})
    var courseDetails = new MerlinsBoard.Views.CourseDetails();
    //response prompt should be courseDetails.trigger("render", true/false, courseID/0)
    
    this.currentUser.fetch();
    this.$tabNav.html(courseTabs.$el)
    this.$sideNav.html(courseDetails.$el)
  },
  
	routes: {
    "course/search" : "enrollcourses",
    "course/:id/enroll" : "showcourse",
    "course/new": "newcourse",
    "course/edit/:id": "editcourse",
    //announcement resources
    "" : "homeAnnouncements",
    "course/:id/announcements/new": "newAnnouncement",
    "course/:course_id/announcements/:id/edit":"editAnnouncement",
    "course/:id/announcements" : "homecourse", //shows announcements for course + navView
    //assignment resources
    "course/:id/assignments/new" : "newAssignment",
    "course/:id/assignments" : "showAssignments",
//     "course/:id/assignments/edit" : "",
    //grades
    
    //misc
    "user/:id": "showuser"
    //":wildcard": "does not exist" --self explanatory
	},
	
	enrollcourses: function () {
   var allcourses = MerlinsBoard.Courses;
   
   allcourses.fetch(); 
  
   var enrollView = new MerlinsBoard.Views.CoursesEnroll({collection: allcourses, model: this.currentUser});
   this.swapView(enrollView);
  },
    
	showuser: function () {
    var userView = new MerlinsBoard.Views.UserShow({model: currentUser});
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
  homeAnnouncements: function () {
    var allAnnouncements = new MerlinsBoard.Collections.Announcements({courseIDs: this.currentUser.courseIDs()});
    
    allAnnouncements.fetch();
    
    var allAnnouncementsView = new MerlinsBoard.Views.announcementList({collection: allAnnouncements, allCourses: true});
    this.swapView(allAnnouncementsView);
  },
  
  homecourse: function (id) {
    //course detail nav should be instantiated here + announcements!
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var announcements = course.announcements;
    
    course.fetch() //I'm unsure this fetch is necessary
    announcements.fetch() //It looks like a fetch will have to occur every time anyway, but I guess its slightly less resource intensive to do so
    
    var courseAnnouncements = new MerlinsBoard.Views.announcementList({collection: announcements, allCourses: false});
    this.swapView(courseAnnouncements);
  },
  
  newAnnouncement: function (id) {
    var newAnnouncement = new MerlinsBoard.Models.Announcement();
    var announcementForm = new MerlinsBoard.Views.announcementForm({model: newAnnouncement, course_id: id});
    this.swapView(announcementForm);
  },
  
  editAnnouncement: function (course_id,id) {
    var course = MerlinsBoard.Courses.getOrFetch(course_id);
    var announcement = course.announcements.get(id)
    var announcementForm = new MerlinsBoard.Views.announcementForm({model: announcement});
    this.swapView(announcementForm);
  },
  
  //assignments
  
  showAssignments: function (id) {
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var assignments = course.assignments;
    
    course.fetch(); //test later
    assignments.fetch();
    
    var courseAssignments = new MerlinsBoard.Views.assignmentList({collection: assignments}); //collection not being assigned for some reason
    this.swapView(courseAssignments);
  },
  
  newAssignment: function (id) {
    var newAssignment = new MerlinsBoard.Models.Assignment();
    var assignmentForm = new MerlinsBoard.Views.assignentForm({model: newAssignment, course_id: id});
    this.swapView(assignmentForm);
  },
  
  editAssignment: function () {},
  
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