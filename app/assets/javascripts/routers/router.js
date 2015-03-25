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
    //course resources
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
    
    //document resources
    "course/:id/resources":"courseResources",
    "course/:id/resources/new":"newResource",
    "course/:course_id/resources/:id/edit":"editResource",
    
    //grades
    "course/:id/grades/student-search" : "gradeSearch",
    "course/:course_id/grades/user/:user_id" : "gradesAdminShow",
    "course/:id/grades/my-grades": "gradesStudentShow"
    
    //misc
//     "user/:id": "showuser"
    //":wildcard": "does not exist" --self explanatory
	},


  //course resources
	enrollcourses: function () {
    var allcourses = new MerlinsBoard.Collections.Courses([],{owner: this.currentUser});

    this.currentUser.fetch()

    var enrollView = new MerlinsBoard.Views.CoursesEnroll({model: this.currentUser});
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

    var courseAnnouncements = new MerlinsBoard.Views.announcementList({collection: announcements});
    this.swapView(courseAnnouncements);

    MerlinsBoard.Vent.trigger("courseRender",{courseModel: course});
  },

  newAnnouncement: function (id) {
    var newAnnouncement = new MerlinsBoard.Models.Announcement();
    var announcementForm = new MerlinsBoard.Views.announcementForm({model: newAnnouncement, course_id: id});
    this.swapView(announcementForm);
  },

  editAnnouncement: function (course_id,id) {
    var announcement = new MerlinsBoard.Models.Announcement({id: id})
    announcement.fetch()

    var announcementForm = new MerlinsBoard.Views.announcementForm({model: announcement, course_id: course_id});
    this.swapView(announcementForm);
  },

  //assignments

  showAssignments: function (id) {
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var assignments = course.assignments();

    var courseAssignments = new MerlinsBoard.Views.assignmentList({collection: assignments});
    this.swapView(courseAssignments);

    MerlinsBoard.Vent.trigger("courseRender",{courseID: id});
  },

  newAssignment: function (id) {
    var newAssignment = new MerlinsBoard.Models.Assignment();
    var assignmentForm = new MerlinsBoard.Views.assignmentForm({model: newAssignment, course_id: id});
    this.swapView(assignmentForm);
  },

  editAssignment: function (course_id,id) {
    var assignment = new MerlinsBoard.Models.Assignment({id: id});
    assignment.fetch();

    var assignmentForm = new MerlinsBoard.Views.assignmentForm({model: assignment, course_id: course_id});
    this.swapView(assignmentForm);
  },
  
  //course resources
  
  courseResources: function (id) {
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var resources = course.resources();
    
    var courseResources = new MerlinsBoard.Views.resourceList({collection: resources});
    this.swapView(courseResources);
  },
  
  newResource: function (id) {
    var resource = new MerlinsBoard.Models.Resource({course_id: id});
    var courseForm = new MerlinsBoard.Views.resourceForm({model: resource});
    this.swapView(courseForm);
  },
  
  editResource: function (course_id, id) {
    var resource = new MerlinsBoard.Models.Resource({id: id})
    resource.fetch();
    var courseForm = new MerlinsBoard.Views.resourcForm({model: resource});
    this.swapView(courseForm);
  },

  //grades

  gradeSearch: function (id) {
    //just link to this on the homepage of admins...unsure yet how to gracefully prevent access client-side
    var gradeLinkTemplate = MerlinsBoard.Views.SearchStudentGradesResults;
    var userSearch = new MerlinsBoard.Views.UsersSearch({collectionView: gradeLinkTemplate, course_id: id});
    
    this.swapView(userSearch);
    // var usersList = MerlinsBoard.Views.
  },

  gradeAdminShow: function (course_id, user_id) {
    // var course = MerlinsBoard.Courses.getOrFetch(id);
    var grades = new MerlinsBoard.Collections.Grades({course_id: course_id, user_id: user_id});

    grades.fetch();

    var gradesList = new MerlinsBoard.Views.GradesStudent({collection: grades, model: grades.student(), adminView: true});
    this.swapView(gradesList);
  },
  
  gradesStudentShow: function (course_id) {
    var grades = new MerlinsBoard.Collections.Grades({course_id: course_id, user_id: this.currentUser.id});
    
    grades.fetch();
    
    var gradesList = new MerlinsBoard.Views.GradesStudent({collection: grades, model: grades.student(), adminView: false})
    this.swapView(gradesList);
  },

  // utils
  resourceNotFound: function () {
    //this.swapView();
  },
  
  unauthorizedAccess: function () {
    
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
